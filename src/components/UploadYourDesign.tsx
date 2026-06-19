'use client';

/**
 * UploadYourDesign
 * Drop-in section for Wonder Wallz allowing customers to upload their own
 * image and request a custom wallpaper quote. Mock-only: no network calls,
 * state lives entirely in React. Drop this into any page; since it's a
 * client component, set page-level <Metadata> / SEO tags in the parent
 * server component (page.tsx), not here.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Briefcase,
  Bookmark,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  X,
} from 'lucide-react';

type Unit = 'in' | 'ft' | 'cm';
type SubmitStatus = 'idle' | 'submitting' | 'success';

const MAX_FILE_SIZE_MB = 25;

const FEATURES = [
  { Icon: Users, label: 'Family Photos' },
  { Icon: Sparkles, label: 'AI Generated Art' },
  { Icon: Bookmark, label: 'Pinterest Inspiration' },
  { Icon: ImageIcon, label: 'Shutterstock Images' },
  { Icon: Briefcase, label: 'Business Branding' },
];

const UNITS: { value: Unit; label: string }[] = [
  { value: 'in', label: 'Inches' },
  { value: 'ft', label: 'Feet' },
  { value: 'cm', label: 'CM' },
];

const WALLPAPER_TYPES = ['Premium Vinyl', 'Smooth Matte', 'Textured Finish', 'Peel & Stick'];

const WHATSAPP_HREF = `https://wa.me/10000000000?text=${encodeURIComponent(
  "Hi! I'd like a custom wallpaper quote for my own design."
)}`;

export default function UploadYourDesign() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<Unit>('in');
  const [wallpaperType, setWallpaperType] = useState(WALLPAPER_TYPES[0]);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  // Revoke the previous object URL whenever it changes or on unmount.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFiles = useCallback((files: FileList | null) => {
    const next = files?.[0];
    if (!next) return;
    setStatus('idle');
    if (!next.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, or WEBP).');
      return;
    }
    if (next.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    setError(null);
    setFile(next);
    setPreviewUrl(URL.createObjectURL(next));
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setStatus('idle');
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const handleSubmit = useCallback(() => {
    if (!file) {
      setError('Please upload an image to continue.');
      return;
    }
    if (!width || !height) {
      setError('Please enter wallpaper width and height.');
      return;
    }
    setError(null);
    setStatus('submitting');
    // Mock network delay — replace with real submission logic later.
    setTimeout(() => setStatus('success'), 1600);
  }, [file, width, height]);

  return (
    <section
      aria-labelledby="upload-design-heading"
      className="relative overflow-hidden bg-[#FAF8F5] py-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left: copy + features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-300/60 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-600">
            <Sparkles className="h-3.5 w-3.5" /> Custom Upload
          </span>

          <h2
            id="upload-design-heading"
            className="mt-5 text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-5xl"
          >
            Have Your Own{' '}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-orange-300 bg-clip-text text-transparent">
              Design?
            </span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
            Upload any photo, artwork, or inspiration image and our design team will turn it into a
            museum-quality custom wallpaper, sized exactly to your wall.
          </p>

          <ul className="mt-8 space-y-3" role="list">
            {FEATURES.map(({ Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-3 transition-colors hover:border-teal-400/30 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-50 to-purple-50 border border-cyan-200 text-teal-600">

                  <Icon className="h-4 w-4 text-cyan-500" strokeWidth={2} />
                </span>
                <span className="text-sm font-medium text-slate-800">{label}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
            <ShieldCheck className="h-4 w-4 text-orange-300" /> Printed using HP Latex technology
          </div>
        </motion.div>

        {/* Right: upload card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8"
        >
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload your design image"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed text-center transition-all duration-300 ${
              isDragging
                ? 'scale-[1.01] border-teal-300 bg-teal-400/10'
                : 'border-slate-300 bg-slate-50 hover:border-teal-500 hover:bg-white'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <AnimatePresence mode="wait">
              {previewUrl && file ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative w-full p-3"
                >
                  <img
                    src={previewUrl}
                    alt={`Preview of uploaded design: ${file.name}`}
                    className="mx-auto max-h-[220px] rounded-xl object-contain shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    aria-label="Remove uploaded image"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-slate-900 backdrop-blur transition-colors hover:bg-red-500/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="mt-2 truncate text-xs text-slate-400">
                    {file.name} · {(file.size / 1024 / 1024).toFixed(1)}MB
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center px-6"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/20 via-purple-500/20 to-orange-400/20">
                    <Upload className="h-6 w-6 text-teal-300" />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-slate-500">Drag & drop your image here</p>
                  <p className="mt-1 text-xs text-slate-400">
                    or click to browse · JPG, PNG, WEBP up to {MAX_FILE_SIZE_MB}MB
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
              className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-300"
            >
              <AlertCircle className="h-3.5 w-3.5" /> {error}
            </motion.p>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="wallWidth" className="mb-1.5 block text-xs font-medium text-slate-600">
                Width
              </label>
              <input
                id="wallWidth"
                type="number"
                min="0"
                inputMode="decimal"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>
            <div>
              <label htmlFor="wallHeight" className="mb-1.5 block text-xs font-medium text-slate-600">
                Height
              </label>
              <input
                id="wallHeight"
                type="number"
                min="0"
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />
            </div>
            <div>
              <label htmlFor="unit" className="mb-1.5 block text-xs font-medium text-slate-600">
                Unit
              </label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as Unit)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value} className="bg-[#0d1420]">
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="wallpaperType" className="mb-1.5 block text-xs font-medium text-slate-600">
              Wallpaper Type
            </label>
            <select
              id="wallpaperType"
              value={wallpaperType}
              onChange={(e) => setWallpaperType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            >
              {WALLPAPER_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#0d1420]">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="status"
                className="mt-4 flex items-center gap-2 overflow-hidden rounded-xl border border-teal-400/30 bg-teal-400/10 px-4 py-3 text-sm text-teal-200"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" /> Request received — our design team will
                reach out within 24 hours.
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-orange-400 px-6 py-3.5 text-sm font-bold text-[#0a0f1a] shadow-lg shadow-teal-500/20 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending Request...
                </>
              ) : (
                'Get Custom Quote'
              )}
            </button>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#3fe07f] transition-colors hover:bg-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
