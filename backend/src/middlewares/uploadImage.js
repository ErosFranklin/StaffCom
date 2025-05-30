const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const uploadImage = (options = {}) => {
  const defaultOptions = {
    folder: 'StaffComImage',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    maxFileSize: 5 * 1024 * 1024,
    transformations: [{ width: 800, height: 800, crop: 'limit' }]
  };

  const finalOptions = { ...defaultOptions, ...options };

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: finalOptions.folder,
      allowed_formats: finalOptions.allowedFormats,
      transformation: finalOptions.transformations,
      resource_type: 'auto'
    }
  });

  return multer({
    storage,
    limits: { fileSize: finalOptions.maxFileSize },
    fileFilter: (req, file, cb) => {
      if (finalOptions.allowedFormats.includes(file.mimetype.split('/')[1])) {
        cb(null, true);
      } else {
        cb(new Error(`Formato de arquivo não suportado. Use: ${finalOptions.allowedFormats.join(', ')}`), false);
      }
    }
  }).single('image');
};

module.exports = uploadImage;