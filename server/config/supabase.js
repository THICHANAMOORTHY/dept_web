const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. File uploads will fail.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = 'uploads';

/**
 * Upload a file buffer to Supabase Storage and return the public URL.
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {string} filename - Desired filename (unique)
 * @param {string} mimetype - File MIME type
 * @returns {Promise<string>} Public URL of the uploaded file
 */
const uploadToSupabase = async (buffer, filename, mimetype) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, buffer, {
      contentType: mimetype,
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase storage upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

module.exports = { supabase, uploadToSupabase, BUCKET_NAME };
