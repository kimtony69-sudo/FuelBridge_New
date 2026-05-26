// ============================================================
// FuelBridge ZA — Core Types
// ============================================================

export type UserRole = "seller" | "buyer" | "intermediary" | "admin";
export type VerificationStatus = "pending" | "verified" | "rejected";
export type DealMethod = "CoC" | "In-Tank Transfer";

export type Region =
  | "Gauteng" | "KwaZulu-Natal" | "Western Cape" | "Eastern Cape"
  | "Limpopo" | "Mpumalanga" | "North West" | "Free State" | "Northern Cape";

export type StorageType = "Vopak" | "Own Depot" | "Third-party Depot";

export type DealPeriod =
  | "Spot (immediate)" | "Within 7 days" | "Within 30 days"
  | "Q2 2026" | "Q3 2026" | "Negotiable";

// ---- Listings ----
export interface SellListing {
  id: string;
  anonymousId: string;
  region: Region;
  storageType: StorageType;
  volumeLitres: number;
  minVolumeLitres: number;
  pricePerLitre: number;          // ~R23 range
  dealPeriod: DealPeriod;
  dealMethod: DealMethod;
  status: VerificationStatus;
  hasVopakCode: boolean;
  hasDipTest: boolean;
  createdAt: string;
  referralCode?: string;
}

export interface BuyListing {
  id: string;
  anonymousId: string;
  region: Region;
  deliveryRegion: Region;
  volumeLitres: number;
  pricePerLitre: number;          // ~R22 range
  dealPeriod: DealPeriod;
  dealMethod: DealMethod;
  status: VerificationStatus;
  createdAt: string;
  referralCode?: string;
}

// ---- Negotiation ----
export interface NegoEvent {
  timestamp: string;
  actor: "seller" | "buyer" | "platform";
  message: string;
  price?: number;
}

// ---- Deal stages ----
export type DealStage =
  | "negotiation"
  | "admin_review"       // admin notified; sends IMFPA to seller
  | "imfpa_signing"      // seller signs IMFPA
  | "admin_approval"     // admin approves → identities revealed
  | "identity_reveal"    // both see each other's details
  | "doc_exchange"       // parties exchange docs directly
  | "payment"
  | "title_transfer"
  | "fee_settlement";

export interface Deal {
  id: string;
  sellListingId: string;
  buyListingId: string;
  agreedPrice: number;
  agreedVolume: number;
  stage: DealStage;
  sellNcndaSigned: boolean;
  sellImfpaSigned: boolean;
  buyNcndaSigned: boolean;
  adminApproved: boolean;
  sellerRefCode?: string;
  buyerRefCode?: string;
  createdAt: string;
  negoHistory: NegoEvent[];
}

// ---- Commission ----
export interface CommissionSplit {
  totalRate: number;
  platformRate: number;
  sellerRefRate: number;
  buyerRefRate: number;
  totalAmount: number;
  platformAmount: number;
  sellerRefAmount: number;
  buyerRefAmount: number;
}

export function calcCommission(
  volumeLitres: number,
  hasSellerRef: boolean,
  hasBuyerRef: boolean
): CommissionSplit {
  const TOTAL = 0.10;
  const REF   = 0.02;
  const sellerRefRate = hasSellerRef ? REF : 0;
  const buyerRefRate  = hasBuyerRef  ? REF : 0;
  const platformRate  = TOTAL - sellerRefRate - buyerRefRate;
  return {
    totalRate: TOTAL, platformRate, sellerRefRate, buyerRefRate,
    totalAmount:     volumeLitres * TOTAL,
    platformAmount:  volumeLitres * platformRate,
    sellerRefAmount: volumeLitres * sellerRefRate,
    buyerRefAmount:  volumeLitres * buyerRefRate,
  };
}

export type RevealStage = 1 | 2 | 3 | 4;

// ---- Constants ----
export const MIN_VOLUME            = 1_000_000;
export const COMMISSION_PER_LITRE  = 0.10;
export const REFERRAL_PER_LITRE    = 0.02;
export const PLATFORM_PER_LITRE    = 0.06;
export const ADMIN_EMAIL           = "kimtony.69@gmail.com";

// ---- Helpers ----
export function fmtRand(n: number): string {
  return "R " + n.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
export function fmtVol(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M L";
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + "K L";
  return n + " L";
}
// No grid price reference — prices are market-driven
export function priceDiff(price: number, reference: number): { text: string; positive: boolean } {
  const d = price - reference;
  const sign = d >= 0 ? "+" : "";
  return { text: `${sign}${d.toFixed(2)} vs avg`, positive: d >= 0 };
}
export const GRID_PRICE = 0.10;