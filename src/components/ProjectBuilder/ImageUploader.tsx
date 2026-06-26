'use client';

/**
 * ImageUploader
 * Handles multi-image upload, object-URL preview generation, and per-image removal.
 * Keeps the existing UploadPlaceholder visual; shows a preview grid once images exist.
 */

import { useRef, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  images: File[];
  onChange: (images: File[]) => void;
}

const ACCEPTED = 'image/jpeg,image/png,image/webp';

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Build object URLs for previews and revoke them on cleanup to prevent memory leaks.
  const previews = images.map((file) => URL.createObjectURL(file));
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files);
    onChange([...images, ...incoming]);
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function openPicker() {
    inputRef.current?.click();
  }

  return (
    <div>
      {/* Hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
        // Reset value so the same file can be re-added after removal
        onClick={(e) => ((e.target as HTMLInputElement).value = '')}
      />

      {images.length === 0 ? (
        /* ── Empty state: click the placeholder to open picker ── */
        <button
          type="button"
          onClick={openPicker}
          className="w-full flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#DDD3B0] bg-[#FAF7EF] py-10 transition-colors hover:border-[#C9A227] hover:bg-[#FBF3DF]/50 cursor-pointer select-none"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E9CF]">
            <ImageIcon className="h-6 w-6 text-[#8A6D2E]" strokeWidth={1.5} />
          </span>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#2B2620]">Upload artwork or inspiration</p>
            <p className="mt-0.5 text-xs text-[#8A8070]">JPG · PNG · WEBP · up to 25 MB</p>
          </div>
          <div className="flex gap-1.5">
            {['JPG', 'PNG', 'WEBP'].map((fmt) => (
              <span
                key={fmt}
                className="rounded-full border border-[#E7DEC8] bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#8A6D2E]"
              >
                {fmt}
              </span>
            ))}
          </div>
        </button>
      ) : (
        /* ── Preview grid ── */
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {previews.map((url, idx) => (
              <div key={url} className="relative group aspect-square">
                <img
                  src={url}
                  alt={images[idx].name}
                  className="h-full w-full rounded-xl object-cover border border-[#E7DEC8]"
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  title="Remove image"
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[#E7DEC8] text-[#8A8070] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {/* Add-more tile */}
            <button
              type="button"
              onClick={openPicker}
              title="Add more images"
              className="aspect-square flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[#DDD3B0] bg-[#FAF7EF] text-[#8A6D2E] text-xs font-semibold transition-colors hover:border-[#C9A227] hover:bg-[#FBF3DF]/60"
            >
              <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
              <span>Add more</span>
            </button>
          </div>

          <p className="text-[11px] text-[#A89F8C]">
            {images.length} image{images.length !== 1 ? 's' : ''} uploaded — hover to remove
          </p>
        </div>
      )}
    </div>
  );
}
