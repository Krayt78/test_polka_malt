export interface Contractor {
  id: string;
  name: string;
  location: string;
  rate: number;
  currency: string;
  rateType: string;
  profileImage: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isVerified: boolean;
  skills: string[];
  specialties: string[];
  walletAddress?: string;
}

export interface ContractorFilters {
  priceRange: [number, number];
  experience: string[];
  skills: string[];
  availability: boolean;
} 