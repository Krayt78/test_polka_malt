import React from 'react';
import { ArrowPathIcon, StarIcon } from '@heroicons/react/24/outline';

interface TalentSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedExperience: string[];
  onExperienceChange: (experience: string[]) => void;
  selectedSpecialties: string[];
  onSpecialtiesChange: (specialties: string[]) => void;
  onReset: () => void;
}

export const TalentSidebar: React.FC<TalentSidebarProps> = ({
  priceRange,
  onPriceRangeChange,
  selectedExperience,
  onExperienceChange,
  selectedSpecialties,
  onSpecialtiesChange,
  onReset
}) => {
  const experienceLevels = [
    { label: 'Expert', count: 43, verified: true },
    { label: '0-2 years', count: 40 },
    { label: '3-7 years', count: 392 },
    { label: '8-15 years', count: 393 },
    { label: '16+ years', count: 116 }
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

  const minPrice = 100;
  const maxPrice = 2000;

  const handleMinChange = (value: number) => {
    if (value <= priceRange[1]) {
      onPriceRangeChange([value, priceRange[1]]);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value >= priceRange[0]) {
      onPriceRangeChange([priceRange[0], value]);
    }
  };

  const getSliderProgress = () => {
    const minPercent = ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent = ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;
    return { minPercent, maxPercent };
  };

  const { minPercent, maxPercent } = getSliderProgress();

  return (
    <div className="w-80 bg-white dark:bg-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Daily rate</h3>
        
        {/* Price Display */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">$</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handleMinChange(parseInt(e.target.value) || minPrice)}
              className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              min={minPrice}
              max={maxPrice}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">to</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">$</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handleMaxChange(parseInt(e.target.value) || maxPrice)}
              className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>

        {/* Double Range Slider */}
        <div className="relative">
          {/* Track */}
          <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full relative">
            {/* Active Range */}
            <div 
              className="absolute h-2 bg-teal-600 dark:bg-teal-500 rounded-full"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`
              }}
            />
          </div>

          {/* Min Range Slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
            style={{ top: '0px' }}
          />

          {/* Max Range Slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
            style={{ top: '0px' }}
          />
        </div>

        {/* Range Labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>${minPrice}</span>
          <span>${maxPrice}+</span>
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Experience level</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedExperience.includes(level.label)}
                onChange={() => handleExperienceToggle(level.label)}
                className="w-4 h-4 text-teal-600 border-gray-300 dark:border-gray-600 rounded focus:ring-teal-500"
              />
              <div className="flex items-center gap-2 flex-1">
                {level.verified && <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />}
                <span className="text-sm text-gray-700 dark:text-gray-300">{level.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">({level.count})</span>
              </div>
            </label>
          ))}
        </div>
        
        {/* Expert Info */}
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Work with talents recognized by the community.
          </p>
          <a href="#" className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 underline">
            Learn more
          </a>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Specialty</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <label key={specialty.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty.label)}
                onChange={() => handleSpecialtyToggle(specialty.label)}
                className="w-4 h-4 text-teal-600 border-gray-300 dark:border-gray-600 rounded focus:ring-teal-500"
              />
              <div className="flex items-center justify-between flex-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{specialty.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">({specialty.count})</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}; 