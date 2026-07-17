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
  CheckCircle2,
  ClipboardCheck,
  Image as ImageIcon,
  Leaf,
  Loader2,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Upload,
  Wind,
  X,
} from 'lucide-react';

type Unit = 'in' | 'ft' | 'cm';
type SubmitStatus = 'idle' | 'submitting' | 'success';

const MAX_FILE_SIZE_MB = 25;

const STEPS = [
  { Icon: Upload, label: 'Upload Design' },
  { Icon: Ruler, label: 'Enter Measurements' },
  { Icon: ClipboardCheck, label: 'Approve Artwork' },
  { Icon: Truck, label: 'Print & Deliver' },
];

const TRUST_INDICATORS = [
  { Icon: ShieldCheck, label: 'HP Latex Printed' },
  { Icon: Leaf, label: 'Eco-Friendly' },
  { Icon: Wind, label: 'Odour Free' },
  { Icon: Truck, label: 'Pan India Delivery' },
];

const UNITS: { value: Unit; label: string }[] = [
  { value: 'in', label: 'Inches' },
  { value: 'ft', label: 'Feet' },
  { value: 'cm', label: 'CM' },
];

const WALLPAPER_TYPES = ['Premium Vinyl', 'Smooth Matte', 'Textured Finish', 'Peel & Stick', 'Custom Canvas', 'Framed Custom Canvas'];

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
      className="relative overflow-hidden bg-[#FAF6EE] py-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left: copy + process + trust */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D9C28A]/60 bg-[#FBF3DF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#8A6D2E]">
            <Sparkles className="h-3.5 w-3.5" /> Custom Upload
          </span>

          <h2
            id="upload-design-heading"
            className="mt-5 font-serif text-4xl font-semibold leading-[1.1] text-[#2B2620] sm:text-5xl"
          >
            Have Your Own{' '}
            <span className="bg-gradient-to-r from-[#C9A227] to-[#8A6D2E] bg-clip-text text-transparent">
              Design?
            </span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#6E6457] sm:text-lg">
            Upload any photo, artwork, or inspiration image and our design team will turn it into a
            museum-quality custom wallpaper, sized exactly to your wall.
          </p>

          {/* Lightweight social proof */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6E6457]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#2B2620]">
              <Star className="h-4 w-4 fill-[#C9A227] text-[#C9A227]" /> 4.8 Rating
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[#D9C9A0] sm:inline-block" aria-hidden />
            <span>1000+ Walls Transformed</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#D9C9A0] sm:inline-block" aria-hidden />
            <span>500+ Designs</span>
          </div>

          {/* How it works */}
          <div className="mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A6D2E]">
              How It Works
            </h3>
            <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" role="list">
              {STEPS.map(({ Icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex flex-col gap-2 rounded-xl border border-[#EDE3CB] bg-white/60 px-3 py-4"
                >
                  <span className="flex items-center gap-2 text-[#8A6D2E]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3E9CF] text-[10px] font-bold text-[#8A6D2E]">
                      {i + 1}
                    </span>
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-medium leading-snug text-[#2B2620]">{label}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap gap-2.5" role="list" aria-label="Trust indicators">
            {TRUST_INDICATORS.map(({ Icon, label }) => (
              <span
                key={label}
                role="listitem"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EDE3CB] bg-white px-3.5 py-1.5 text-xs font-medium text-[#6E6457]"
              >
                <Icon className="h-3.5 w-3.5 text-[#8A6D2E]" strokeWidth={1.75} /> {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: upload card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl border border-[#EDE3CB] bg-white p-6 shadow-xl shadow-black/5 sm:p-8"
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
            className={`relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed text-center transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 ${
              isDragging
                ? 'scale-[1.01] border-[#C9A227] bg-[#FBF3DF]'
                : 'border-[#D9C9A0] bg-[#FBF8F1] hover:border-[#C9A227] hover:bg-white'
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
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-all duration-200 ease-out hover:bg-red-500/80 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="mt-2 truncate text-xs text-[#8A8070]">
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
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E9CF]">
                    <Upload className="h-6 w-6 text-[#8A6D2E]" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-[#2B2620]">
                    Drag &amp; drop your image here
                  </p>
                  <p className="mt-1 text-xs text-[#8A8070]">
                    or click to browse · up to {MAX_FILE_SIZE_MB}MB
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    {['JPG', 'PNG', 'WEBP'].map((fmt) => (
                      <span
                        key={fmt}
                        className="inline-flex items-center gap-1 rounded-full border border-[#EDE3CB] bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#8A6D2E]"
                      >
                        <ImageIcon className="h-2.5 w-2.5" /> {fmt}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
              className="mt-3 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
            </motion.p>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="wallWidth" className="mb-1.5 block text-xs font-medium text-[#6E6457]">
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
                className="w-full rounded-xl border border-[#E7DEC8] bg-white px-3 py-2.5 text-sm text-[#2B2620] placeholder:text-[#A89F8C] outline-none transition-colors focus:border-[#C9A227] focus:ring-4 focus:ring-[#F3E9CF]"
              />
            </div>
            <div>
              <label htmlFor="wallHeight" className="mb-1.5 block text-xs font-medium text-[#6E6457]">
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
                className="w-full rounded-xl border border-[#E7DEC8] bg-white px-3 py-2.5 text-sm text-[#2B2620] placeholder:text-[#A89F8C] outline-none transition-colors focus:border-[#C9A227] focus:ring-4 focus:ring-[#F3E9CF]"
              />
            </div>
            <div>
              <label htmlFor="unit" className="mb-1.5 block text-xs font-medium text-[#6E6457]">
                Unit
              </label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as Unit)}
                className="w-full rounded-xl border border-[#E7DEC8] bg-white px-3 py-2.5 text-sm text-[#2B2620] outline-none transition-colors focus:border-[#C9A227] focus:ring-4 focus:ring-[#F3E9CF]"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="wallpaperType" className="mb-1.5 block text-xs font-medium text-[#6E6457]">
              Print Type
            </label>
            <select
              id="wallpaperType"
              value={wallpaperType}
              onChange={(e) => setWallpaperType(e.target.value)}
              className="w-full rounded-xl border border-[#E7DEC8] bg-white px-3 py-2.5 text-sm text-[#2B2620] outline-none transition-colors focus:border-[#C9A227] focus:ring-4 focus:ring-[#F3E9CF]"
            >
              {WALLPAPER_TYPES.map((t) => (
                <option key={t} value={t}>
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
                className="mt-4 flex items-center gap-2 overflow-hidden rounded-xl border border-[#CFE0C7] bg-[#F3F6EE] px-4 py-3 text-sm text-[#4B6B3E]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" /> Request received — we will
                reach out within 24 hours.
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA hierarchy: WhatsApp primary, Quote request secondary */}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#21bd5c] hover:shadow-xl hover:shadow-[#25D366]/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp — Fastest Response
            </a>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#C9A227]/50 bg-transparent px-6 py-3.5 text-sm font-semibold text-[#8A6D2E] transition-all duration-300 ease-out hover:bg-[#FBF3DF] hover:border-[#C9A227] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending Request...
                </>
              ) : (
                'Request a Quote by Email'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
