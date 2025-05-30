import React, { useState, useMemo } from 'react';
import { ContractorCard } from '../components/ContractorCard';
import { ContractorFilters } from '../components/ContractorFilters';
import { ContractorSidebar } from '../components/ContractorSidebar';
import { contractorsData } from '../data/contractorsData';

export const ContractorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 1210]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter contractors based on search criteria
  const filteredContractors = useMemo(() => {
    return contractorsData.filter((contractor) => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        contractor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        contractor.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Price range filter
      const matchesPrice = contractor.rate >= priceRange[0] && contractor.rate <= priceRange[1];

      // Specialty filter
      const matchesSpecialty = selectedSpecialties.length === 0 ||
        selectedSpecialties.some(specialty => 
          contractor.skills.some(skill => skill.toLowerCase().includes(specialty.toLowerCase()))
        );

      return matchesSearch && matchesPrice && matchesSpecialty;
    });
  }, [searchTerm, priceRange, selectedSpecialties]);

  const handleToggleFavorite = (contractorId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(contractorId)) {
      newFavorites.delete(contractorId);
    } else {
      newFavorites.add(contractorId);
    }
    setFavorites(newFavorites);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setPriceRange([200, 1210]);
    setSelectedExperience([]);
    setSelectedSpecialties([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Filters */}
      <ContractorFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <ContractorSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedExperience={selectedExperience}
              onExperienceChange={setSelectedExperience}
              selectedSpecialties={selectedSpecialties}
              onSpecialtiesChange={setSelectedSpecialties}
              onReset={handleResetFilters}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Over {filteredContractors.length} "blockchain" talents available
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Find the perfect blockchain talent for your project
              </p>
            </div>

            {/* Talents Grid */}
            {filteredContractors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredContractors.map((contractor) => (
                  <ContractorCard
                    key={contractor.id}
                    contractor={contractor}
                    isFavorited={favorites.has(contractor.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No talents found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your search criteria
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {filteredContractors.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Load more talents
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 