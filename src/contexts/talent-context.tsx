import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Talent } from '../types/talent';
import { talentsData as initialTalentsData } from '../data/talentsData';

interface TalentContextType {
  talents: Talent[];
  updateTalent: (talentId: string, updates: Partial<Talent>) => void;
  getTalentByWalletAddress: (walletAddress: string) => Talent | undefined;
  createTalentProfile: (walletAddress: string, profileData: Partial<Talent>) => Talent;
}

const TalentContext = createContext<TalentContextType | undefined>(undefined);

interface TalentProviderProps {
  children: ReactNode;
}

export function TalentProvider({ children }: TalentProviderProps) {
  const [talents, setTalents] = useState<Talent[]>(initialTalentsData);

  const updateTalent = (talentId: string, updates: Partial<Talent>) => {
    setTalents(prevTalents => 
      prevTalents.map(talent => 
        talent.id === talentId 
          ? { ...talent, ...updates }
          : talent
      )
    );
  };

  const getTalentByWalletAddress = (walletAddress: string): Talent | undefined => {
    return talents.find(talent => talent.walletAddress === walletAddress);
  };

  const createTalentProfile = (walletAddress: string, profileData: Partial<Talent>): Talent => {
    const newTalent: Talent = {
      id: (talents.length + 1).toString(),
      name: profileData.name || 'New Talent',
      location: profileData.location || 'Unknown',
      rate: profileData.rate || 0,
      currency: '$',
      rateType: 'day',
      profileImage: profileData.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      title: profileData.title || 'Blockchain Developer',
      description: profileData.description || '',
      rating: 5.0,
      reviewCount: 0,
      isAvailable: true,
      isVerified: false,
      skills: profileData.skills || [],
      specialties: profileData.specialties || [],
      walletAddress,
      ...profileData
    };

    setTalents(prevTalents => [...prevTalents, newTalent]);
    return newTalent;
  };

  const value: TalentContextType = {
    talents,
    updateTalent,
    getTalentByWalletAddress,
    createTalentProfile,
  };

  return (
    <TalentContext.Provider value={value}>
      {children}
    </TalentContext.Provider>
  );
}

export function useTalent() {
  const context = useContext(TalentContext);
  if (context === undefined) {
    throw new Error('useTalent must be used within a TalentProvider');
  }
  return context;
} 