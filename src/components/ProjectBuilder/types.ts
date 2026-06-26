// ─── Shared types & constants for the Wonder Wallz Project Builder ────────────

export type Unit = 'in' | 'ft' | 'cm';
export type Product = 'Wallpaper' | 'Custom Glass Film' | 'Canvas Print';

export interface ProjectRequest {
  id: string;
  product: Product;
  images: File[];
  width: string;
  height: string;
  unit: Unit;
  notes: string;
}

export const PRODUCTS: Product[] = ['Wallpaper', 'Custom Glass Film', 'Canvas Print'];

export const UNITS: { value: Unit; label: string }[] = [
  { value: 'in', label: 'in' },
  { value: 'ft', label: 'ft' },
  { value: 'cm', label: 'cm' },
];

export const NOTE_EXAMPLES = [
  'Remove sofa',
  'Make background cream',
  'Mirror image',
  'Repeat pattern',
];

export const PRODUCT_ICONS: Record<Product, string> = {
  Wallpaper: '🖼',
  'Custom Glass Film': '🪟',
  'Canvas Print': '🎨',
};

/** Create a fresh request with sensible defaults. */
export function makeRequest(overrides?: Partial<ProjectRequest>): ProjectRequest {
  return {
    id: crypto.randomUUID(),
    product: 'Wallpaper',
    images: [],
    width: '',
    height: '',
    unit: 'in',
    notes: '',
    ...overrides,
  };
}

/** Deep-clone a request with a brand-new id (images array is shallow-copied; File objects are immutable). */
export function cloneRequest(src: ProjectRequest): ProjectRequest {
  return {
    ...src,
    id: crypto.randomUUID(),
    images: [...src.images],
  };
}
