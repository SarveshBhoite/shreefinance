import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
    fileBuffer: Buffer,
    filename: string
): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "shree-finance",
                public_id: `banner_${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}`,
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error("No result from Cloudinary"));
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );
        uploadStream.end(fileBuffer);
    });
}

export async function deleteFromCloudinary(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
