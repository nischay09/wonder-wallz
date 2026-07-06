/**
 * src/lib/server/cloudinaryUpload.ts
 *
 * Server-side, isolated Cloudinary logic. Nothing outside this file knows
 * how Cloudinary's unsigned upload API works. Used only from the
 * /api/project route handler — never imported into client components.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
}

/**
 * Uploads a single File to Cloudinary via an unsigned upload. Cloudinary's
 * upload endpoint accepts multipart file data directly, so the File is
 * appended as-is — no base64 encoding needed.
 */
export async function uploadFileToCloudinary(
  file: File
): Promise<CloudinaryUploadResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Cloudinary upload failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  return { secureUrl: data.secure_url, publicId: data.public_id };
}

/**
 * Uploads multiple files in parallel and returns results in the same
 * order as the input array.
 */
export async function uploadManyToCloudinary(
  files: File[]
): Promise<CloudinaryUploadResult[]> {
  return Promise.all(files.map((file) => uploadFileToCloudinary(file)));
}
