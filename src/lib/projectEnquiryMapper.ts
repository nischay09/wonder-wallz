/**
 * src/lib/projectEnquiryMapper.ts
 *
 * Translates the Project Builder's domain types (ProjectRequest,
 * CustomerDetails) into the provider-agnostic shape that emailService.ts
 * expects. Keeping this mapping separate means:
 *   - emailService.ts stays fully reusable / provider-swappable
 *   - Project Builder components never talk to EmailJS directly
 */

import type { CustomerDetails, ProjectRequest } from './types';
import { getMaterialById, getDefaultMaterial } from './materials';
import { toSquareFeet, calculateEstimatedTotal, formatArea, formatCurrency } from './estimator';
import type {
  ProjectEnquiryPayload,
  ProjectRequestEmailData,
  ImageAttachmentSummary,
} from './emailService';

function toRequestEmailData(request: ProjectRequest): ProjectRequestEmailData {
  const material = getMaterialById(request.product, request.materialId) ?? getDefaultMaterial(request.product);
  const areaSqFt = toSquareFeet(parseFloat(request.width), parseFloat(request.height), request.unit);
  const estimatedTotal = calculateEstimatedTotal(areaSqFt, material);

  return {
    product: request.product,
    material: material?.name ?? 'Not selected',
    width: request.width,
    height: request.height,
    unit: request.unit,
    coverageArea: formatArea(areaSqFt),
    estimatedTotal: formatCurrency(estimatedTotal),
    estimatedProductionTime: material?.estimatedProductionDays ?? '—',
    notes: request.notes,
  };
}

function toImageSummary(request: ProjectRequest): ImageAttachmentSummary[] {
  return request.images.map((file) => ({
    fileName: file.name,
    fileSizeKb: Math.round(file.size / 1024),
  }));
}

/** Build the full email payload from the Project Builder's live state. */
export function buildProjectEnquiryPayload(
  customer: CustomerDetails,
  requests: ProjectRequest[]
): ProjectEnquiryPayload {
  return {
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: customer.email.trim(),
      city: customer.city?.trim() || undefined,
    },
    requests: requests.map(toRequestEmailData),
    imagesSummary: requests.map(toImageSummary),
    // `attachments` intentionally omitted for now — see emailService.ts.
  };
}
