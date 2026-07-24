const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const isSupabaseConfigured = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return (
    url &&
    typeof url === 'string' &&
    url.trim().startsWith('http') &&
    key &&
    key !== 'your_service_role_key_here' &&
    key.length > 20
  );
};

let supabase = null;
if (isSupabaseConfigured()) {
  try {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err.message);
    supabase = null;
  }
} else {
  console.warn('Supabase not configured or using placeholder credentials. Falling back to local disk storage for uploads.');
}

const BUCKET_NAME = 'uploads';

/**
 * Save file locally to server/uploads/ directory as a fallback.
 */
const saveToLocalUploads = async (buffer, filename) => {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, filename);
  await fs.promises.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
};

/**
 * Upload a file buffer to Supabase Storage or fallback to local disk storage.
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {string} filename - Desired filename (unique)
 * @param {string} mimetype - File MIME type
 * @returns {Promise<string>} Public URL or relative path (/uploads/...) of the uploaded file
 */
const uploadToSupabase = async (buffer, filename, mimetype) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filename, buffer, {
          contentType: mimetype,
          upsert: true,
        });

      if (!error && data?.path) {
        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(data.path);
        return publicUrlData.publicUrl;
      }
      console.warn(`Supabase storage upload error, falling back to local: ${error?.message}`);
    } catch (err) {
      console.warn(`Supabase upload failed, falling back to local storage: ${err.message}`);
    }
  }

  // Fallback to local storage
  return await saveToLocalUploads(buffer, filename);
};

module.exports = { supabase, uploadToSupabase, BUCKET_NAME };

