import React from 'react';
import { ArrowPathIcon, StarIcon } from '@heroicons/react/24/outline';

interface ContractorSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedExperience: string[];
  onExperienceChange: (experience: string[]) => void;
  selectedSpecialties: string[];
  onSpecialtiesChange: (specialties: string[]) => void;
  onReset: () => void;
}

export const ContractorSidebar: React.FC<ContractorSidebarProps> = ({
  priceRange,
  onPriceRangeChange,
  selectedExperience,
  onExperienceChange,
  selectedSpecialties,
  onSpecialtiesChange,
  onReset
}) => {
  const experienceLevels = [
    { label: 'Supermalter', count: 43, verified: true },
    { label: '0-2 ans', count: 40 },
    { label: '3-7 ans', count: 392 },
    { label: '8-15 ans', count: 393 },
    { label: '16 ans et +', count: 116 }
  ];

  const specialties = [
    { label: 'Node.js', count: 335 },
    { label: 'React.js', count: 330 },
    { label: 'Python', count: 227 },
    { label: 'JavaScript', count: 180 },
    { label: 'TypeScript', count: 150 },
    { label: 'Solidity', count: 89 },
    { label: 'Blockchain', count: 67 },
    { label: 'Smart Contract', count: 45 }
  ];

  const handleExperienceToggle = (experience: string) => {
    if (selectedExperience.includes(experience)) {
      onExperienceChange(selectedExperience.filter(e => e !== experience));
    } else {
      onExperienceChange([...selectedExperience, experience]);
    }
  };

  const handleSpecialtyToggle = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      onSpecialtiesChange(selectedSpecialties.filter(s => s !== specialty));
    } else {
      onSpecialtiesChange([...selectedSpecialties, specialty]);
    }
  };

  return (
    <div className="w-80 bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Réinitialiser
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Tarif / jour</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="200"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <span className="text-gray-500">€ et -</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="1210"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 1500])}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <span className="text-gray-500">€ et +</span>
          </div>
          {/* Price Range Slider Visualization */}
          <div className="relative mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-teal-600 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Niveau d'expérience</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedExperience.includes(level.label)}
                onChange={() => handleExperienceToggle(level.label)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <div className="flex items-center gap-2 flex-1">
                {level.verified && <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />}
                <span className="text-sm text-gray-700">{level.label}</span>
                <span className="text-xs text-gray-500">({level.count})</span>
              </div>
            </label>
          ))}
        </div>
        
        {/* Supermalter Info */}
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            Travaillez avec des freelances reconnus par la communauté.
          </p>
          <a href="#" className="text-xs text-teal-600 hover:text-teal-700 underline">
            En savoir plus
          </a>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Spécialité</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <label key={specialty.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty.label)}
                onChange={() => handleSpecialtyToggle(specialty.label)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <div className="flex items-center justify-between flex-1">
                <span className="text-sm text-gray-700">{specialty.label}</span>
                <span className="text-xs text-gray-500">({specialty.count})</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}; 