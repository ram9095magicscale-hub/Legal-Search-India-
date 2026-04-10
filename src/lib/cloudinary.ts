import { v2 as cloudinary } from 'cloudinary';

cloudinary.config();

// Debug logs (Safe: NO secrets logged)
console.log("Cloudinary Config Check:");
console.log("- Cloud Name:", cloudinary.config().cloud_name);
console.log("- API Key:", cloudinary.config().api_key ? "Configured (Ends with " + cloudinary.config().api_key?.slice(-4) + ")" : "Missing");

export const uploadToCloudinary = async (fileUri: string, folder: string) => {
  try {
    // Determine resource type: 
    // If it's a PDF, force 'raw' as requested by the user
    // Images stay as 'image' for viewing support
    const isPdf = fileUri.startsWith('data:application/pdf');
    const resourceType = isPdf ? 'raw' : 'image';

    console.log(`Uploading as resource_type: ${resourceType}`);

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: `legal-search/${folder}`,
      resource_type: resourceType,
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};

export default cloudinary;
