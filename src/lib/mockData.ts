import type { SellListing, BuyListing, Deal, NegoEvent } from "@/types";

// Prices updated: Sellers ~R23, Buyers ~R22
export const MOCK_SELLS: SellListing[] = [
  {
    id: "SELL-0041", anonymousId: "SELL-0041",
    region: "KwaZulu-Natal", storageType: "Vopak",
    volumeLitres: 5_000_000, minVolumeLitres: 1_000_000,
    pricePerLitre: 23.20, dealPeriod: "Spot (immediate)",
    dealMethod: "CoC",
    status: "verified", hasVopakCode: true, hasDipTest: true,
    createdAt: "2026-05-16T09:00:00Z", referralCode: "REF-0041",
  },
  {
    id: "SELL-0038", anonymousId: "SELL-0038",
    region: "Gauteng", storageType: "Own Depot",
    volumeLitres: 1_500_000, minVolumeLitres: 1_000_000,
    pricePerLitre: 23.35, dealPeriod: "Spot (immediate)",
    dealMethod: "In-Tank Transfer",
    status: "verified", hasVopakCode: false, hasDipTest: true,
    createdAt: "2026-05-15T14:30:00Z",
  },
  {
    id: "SELL-0035", anonymousId: "SELL-0035",
    region: "Western Cape", storageType: "Vopak",
    volumeLitres: 2_000_000, minVolumeLitres: 1_000_000,
    pricePerLitre: 23.50, dealPeriod: "Within 30 days",
    dealMethod: "CoC",
    status: "verified", hasVopakCode: true, hasDipTest: true,
    createdAt: "2026-05-14T11:00:00Z",
  },
  {
    id: "SELL-0029", anonymousId: "SELL-0029",
    region: "Eastern Cape", storageType: "Third-party Depot",
    volumeLitres: 3_000_000, minVolumeLitres: 1_000_000,
    pricePerLitre: 23.65, dealPeriod: "Within 30 days",
    dealMethod: "In-Tank Transfer",
    status: "verified", hasVopakCode: false, hasDipTest: true,
    createdAt: "2026-05-13T08:15:00Z", referralCode: "REF-0029",
  },
  {
    id: "SELL-0022", anonymousId: "SELL-0022",
    region: "KwaZulu-Natal", storageType: "Own Depot",
    volumeLitres: 2_000_000, minVolumeLitres: 1_000_000,
    pricePerLitre: 23.80, dealPeriod: "Within 7 days",
    dealMethod: "CoC",
    status: "pending", hasVopakCode: false, hasDipTest: false,
    createdAt: "2026-05-16T07:00:00Z",
  },
  {
    id: "SELL-0018", anonymousId: "SELL-0018",
    region: "Gauteng", storageType: "Own Depot",
    volumeLitres: 1_000_000, minVolumeLitres: 1_000_000,
    pricePerLitre: 23.95, dealPeriod: "Negotiable",
    dealMethod: "CoC",
    status: "pending", hasVopakCode: false, hasDipTest: false,
    createdAt: "2026-05-15T16:45:00Z",
  },
];

export const MOCK_BUYS: BuyListing[] = [
  {
    id: "BUY-0087", anonymousId: "BUY-0087",
    region: "Gauteng", deliveryRegion: "Gauteng",
    volumeLitres: 3_000_000, pricePerLitre: 22.80,
    dealPeriod: "Q2 2026", dealMethod: "CoC",
    status: "verified",
    createdAt: "2026-05-16T09:14:00Z", referralCode: "REF-0087",
  },
  {
    id: "BUY-0081", anonymousId: "BUY-0081",
    region: "Western Cape", deliveryRegion: "Western Cape",
    volumeLitres: 1_000_000, pricePerLitre: 22.65,
    dealPeriod: "Spot (immediate)", dealMethod: "In-Tank Transfer",
    status: "verified",
    createdAt: "2026-05-15T13:30:00Z",
  },
  {
    id: "BUY-0074", anonymousId: "BUY-0074",
    region: "KwaZulu-Natal", deliveryRegion: "KwaZulu-Natal",
    volumeLitres: 2_000_000, pricePerLitre: 22.50,
    dealPeriod: "Within 30 days", dealMethod: "CoC",
    status: "verified",
    createdAt: "2026-05-14T10:00:00Z", referralCode: "REF-0074",
  },
  {
    id: "BUY-0068", anonymousId: "BUY-0068",
    region: "Eastern Cape", deliveryRegion: "Eastern Cape",
    volumeLitres: 3_000_000, pricePerLitre: 22.30,
    dealPeriod: "Q3 2026", dealMethod: "In-Tank Transfer",
    status: "verified",
    createdAt: "2026-05-13T09:00:00Z",
  },
  {
    id: "BUY-0055", anonymousId: "BUY-0055",
    region: "Gauteng", deliveryRegion: "Gauteng",
    volumeLitres: 2_000_000, pricePerLitre: 22.10,
    dealPeriod: "Spot (immediate)", dealMethod: "CoC",
    status: "pending",
    createdAt: "2026-05-12T15:00:00Z",
  },
];

export const MOCK_NEGO_HISTORY: NegoEvent[] = [
  { timestamp: "09:00", actor: "seller",   message: "SELL-0041 listed at R 23.20/L", price: 23.20 },
  { timestamp: "09:14", actor: "buyer",    message: "BUY-0087 expressed interest" },
  { timestamp: "09:22", actor: "buyer",    message: "Counter-offer: R 22.80/L",      price: 22.80 },
  { timestamp: "09:35", actor: "seller",   message: "Seller counter: R 23.00/L",     price: 23.00 },
  { timestamp: "09:41", actor: "platform", message: "Platform logged negotiation milestone" },
];

export const MOCK_DEAL: Deal = {
  id: "FB-2026-0041",
  sellListingId: "SELL-0041",
  buyListingId: "BUY-0087",
  agreedPrice: 23.00,
  agreedVolume: 5_000_000,
  adminApproved: false, //
  stage: "negotiation",
  sellNcndaSigned: false,
  sellImfpaSigned: false,
  buyNcndaSigned: false,
  sellerRefCode: "REF-0041",
  buyerRefCode: "REF-0087",
  createdAt: "2026-05-16T09:00:00Z",
  negoHistory: MOCK_NEGO_HISTORY,
};
