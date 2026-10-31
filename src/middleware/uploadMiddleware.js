import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { fileTypeFromFile } from 'file-type';

// Resolve directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload directory: backend/uploads/products
const uploadDirectory = path.resolve(__dirname, '../../uploads/products');

// Create directory if not exists
fs.mkdirSync(uploadDirectory, { recursive: true });

// Allowed image types
const allowedMimeTypes = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = allowedMimeTypes[file.mimetype];

    const filename = `${randomUUID()}${extension}`;

    cb(null, filename);
  },
});

// Multer configuration
const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },

  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes[file.mimetype]) {
      const error = new Error('Invalid image format. Only JPG, PNG, and WEBP are allowed.');

      error.statusCode = 400;

      return cb(error);
    }

    cb(null, true);
  },
});

// Upload middleware with error handling
export const uploadProductImage = (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Image size must not exceed 5 MB.',
        });
      }

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error) {
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message || 'Image upload failed.',
      });
    }

    next();
  });
};

// Validate actual file signature
export const validateProductImage = async (req, res, next) => {
  // Allow requests without an image.
  // Controller can decide whether an image is required.
  if (!req.file) {
    return next();
  }

  try {
    const detectedFile = await fileTypeFromFile(req.file.path);

    const isValidImage =
      detectedFile &&
      Object.hasOwn(allowedMimeTypes, detectedFile.mime) &&
      detectedFile.mime === req.file.mimetype;

    if (!isValidImage) {
      await fs.promises.unlink(req.file.path);

      return res.status(400).json({
        success: false,
        message: 'Uploaded file is not a valid image.',
      });
    }

    next();
  } catch (error) {
    // Remove uploaded file if validation fails
    await fs.promises.unlink(req.file.path).catch(() => {});

    return res.status(400).json({
      success: false,
      message: 'Unable to validate uploaded image.',
    });
  }
};
