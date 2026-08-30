import {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../repositories/product.repository.js';

export async function getAllProductsController(req, res) {
  try {
    const products = await findAllProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
    });
  }
}

export async function getProductByIdController(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Product ID must be a positive integer',
      });
    }

    const product = await findProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
    });
  }
}

export async function createProductController(req, res) {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    if (!name || price === undefined || stock === undefined || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, stock and categoryId are required',
      });
    }

    const product = await createProduct({
      name,
      description,
      price,
      stock,
      categoryId,
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error('Failed to create product:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
    });
  }
}

export async function updateProductController(req, res) {
  try {
    const id = Number(req.params.id);

    const { name, description, price, stock, categoryId } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Product ID must be a positive integer',
      });
    }

    if (!name || price === undefined || stock === undefined || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, stock and categoryId are required',
      });
    }

    const product = await updateProduct(id, {
      name,
      description,
      price,
      stock,
      categoryId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    console.error('Failed to update product:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
    });
  }
}

export async function deleteProductController(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Product ID must be a positive integer',
      });
    }

    const product = await deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    console.error('Failed to delete product:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
    });
  }
}
