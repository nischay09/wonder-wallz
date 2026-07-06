import axios from "axios";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

export interface UploadedImage {
  secureUrl: string;
  publicId: string;
}

export async function uploadImages(
  files: File[]
): Promise<UploadedImage[]> {
  const uploads = files.map(async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return {
      secureUrl: response.data.secure_url,
      publicId: response.data.public_id,
    };
  });

  return Promise.all(uploads);
}