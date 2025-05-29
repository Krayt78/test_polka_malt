import React from 'react';
import { HeartIcon, StarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { Contractor } from '../types/contractor';

interface ContractorCardProps {
  contractor: Contractor;
  isFavorited?: boolean;
  onToggleFavorite?: (contractorId: string) => void;
}

export const ContractorCard: React.FC<ContractorCardProps> = ({
  contractor,
  isFavorited = false,
  onToggleFavorite
}) => {
  const renderStars = (rating: number, reviewCount: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarSolidIcon
          key={i}
          className={`w-3 h-3 ${i < fullStars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      );
    }
    
    return (
      <div className="flex items-center gap-1">
        <div className="flex">{stars}</div>
        <span className="text-xs text-gray-600 dark:text-gray-400">({reviewCount})</span>
      </div>
    );
  };

  const getSkillColor = (skill: string) => {
    const colorMap: { [key: string]: string } = {
      'Blockchain': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Ethereum': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Solidity': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Smart Contract': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'NFT': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'DeFi': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Crypto': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'React.js': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      'Node.js': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
      'API': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'JavaScript': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    };
    return colorMap[skill] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 relative">
      {/* Availability Badge */}
      {contractor.isAvailable && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Disponibilité confirmée
          </div>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={() => onToggleFavorite?.(contractor.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
      >
        {isFavorited ? (
          <HeartSolidIcon className="w-5 h-5 text-red-500" />
        ) : (
          <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Profile Image */}
      <div className="aspect-w-16 aspect-h-12 bg-gray-100 dark:bg-gray-700">
        <img
          src={contractor.profileImage}
          alt={contractor.name}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header with name and rate */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{contractor.name}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              <MapPinIcon className="w-4 h-4 mr-1" />
              {contractor.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {contractor.rate} {contractor.currency}/{contractor.rateType}
            </div>
          </div>
        </div>

        {/* Title/Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {contractor.title}
        </p>

        {/* Rating */}
        <div className="mb-3">
          {renderStars(contractor.rating, contractor.reviewCount)}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {contractor.skills.slice(0, 6).map((skill, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${getSkillColor(skill)}`}
            >
              {skill}
            </span>
          ))}
          {contractor.skills.length > 6 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              +{contractor.skills.length - 6}
            </span>
          )}
        </div>

        {/* Recommendations */}
        {contractor.isVerified && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center">
              ⚡ 1 recommendation
            </span>
          </div>
        )}
      </div>
    </div>
  );
}; 