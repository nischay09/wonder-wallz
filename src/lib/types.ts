// ─── Shared types & constants for the Wonder Wallz Project Builder ────────────

import { getDefaultMaterial } from './materials';

export type Unit = 'in' | 'ft' | 'cm';
export type Product = 'Wallpaper' | 'Custom Glass Film' | 'Canvas Print';

export interface ProjectRequest {
  id: string;
  product: Product;
  /** Selected material id — resolved against materials.ts, never a raw rate. */
  materialId: string;
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
  const defaultProduct: Product = 'Wallpaper';
  return {
    id: crypto.randomUUID(),
    product: defaultProduct,
    materialId: getDefaultMaterial(defaultProduct)?.id ?? '',
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

// ─── Customer details ──────────────────────────────────────────────────────────

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  /** Optional. */
  city: string;
}

export function makeCustomerDetails(): CustomerDetails {
  return { name: '', phone: '', email: '', city: '' };
}

export interface CustomerDetailsErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{10,15}$/;

/** Validates the required customer fields. City is optional and never validated. */
export function validateCustomerDetails(customer: CustomerDetails): {
  valid: boolean;
  errors: CustomerDetailsErrors;
} {
  const errors: CustomerDetailsErrors = {};

  if (!customer.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!customer.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!PHONE_RE.test(customer.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!customer.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_RE.test(customer.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

