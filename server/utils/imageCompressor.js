const sharp = require('sharp');
const path = require('path');

/**
 * Compress an image buffer to WebP format with quality optimization.
 * If the file is not an image (e.g. PDF), returns the original buffer, filename, and mimetype unmodified.
 * 
 * @param {Buffer} buffer - File buffer from multer memory storage
 * @param {string} filename - Target or original filename
 * @param {string} mimetype - File MIME type
 * @returns {Promise<{ buffer: Buffer, filename: string, mimetype: string }>}
 */
const compressToWebP = async (buffer, filename, mimetype) => {
  // If not an image (e.g. application/pdf), skip compression
  if (!mimetype || !mimetype.startsWith('image/')) {
    return { buffer, filename, mimetype };
  }

  try {
    const compressedBuffer = await sharp(buffer)
      .rotate() // Auto-orient image based on EXIF tag
      .webp({ quality: 80, effort: 4 })
      .toBuffer();

    // Replace extension with .webp if it's not already .webp
    const ext = path.extname(filename);
    const basename = ext ? filename.slice(0, -ext.length) : filename;
    const webpFilename = `${basename}.webp`;

    return {
      buffer: compressedBuffer,
      filename: webpFilename,
      mimetype: 'image/webp',
    };
  } catch (err) {
    console.warn(`[ImageCompressor] WebP conversion error for ${filename}, preserving original:`, err.message);
    return { buffer, filename, mimetype };
  }
};

module.exports = { compressToWebP };
