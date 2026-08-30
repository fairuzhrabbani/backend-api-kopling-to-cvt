import {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../repositories/category.repository.js';

export async function getAllCategoriesController(req, res) {
  try {
    const categories = await findAllCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
    });
  }
}

export async function getCategoryByIdController(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Category ID must be a positive integer',
      });
    }

    const category = await findCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Failed to fetch category:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
      error: error.message,
    });
  }
}

export async function createCategoryController(req, res) {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required',
      });
    }

    const category = await createCategory({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    console.error('Failed to create category:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create category',
    });
  }
}

export async function updateCategoryController(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Category ID must be a positive integer',
      });
    }

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required',
      });
    }

    const category = await updateCategory(id, {
      name,
      description,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    console.error('Failed to update category:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update category',
    });
  }
}

export async function deleteCategoryController(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Category ID must be a positive integer',
      });
    }

    const category = await deleteCategory(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: category,
    });
  } catch (error) {
    console.error('Failed to delete category:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete category',
    });
  }
}
