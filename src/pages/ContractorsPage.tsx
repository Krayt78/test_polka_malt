import React, { useState, useMemo } from 'react';
import { ContractorCard } from '../components/ContractorCard';
import { ContractorFilters } from '../components/ContractorFilters';
import { ContractorSidebar } from '../components/ContractorSidebar';
import { contractorsData } from '../data/contractorsData';
import { Contractor } from '../types/contractor';

export const ContractorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('blockchain');
  const [location, setLocation] = useState('');
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

      // Location filter
      const matchesLocation = location === '' || 
        contractor.location.toLowerCase().includes(location.toLowerCase());

      // Price range filter
      const matchesPrice = contractor.rate >= priceRange[0] && contractor.rate <= priceRange[1];

      // Specialty filter
      const matchesSpecialty = selectedSpecialties.length === 0 ||
        selectedSpecialties.some(specialty => 
          contractor.skills.some(skill => skill.toLowerCase().includes(specialty.toLowerCase()))
        );

      return matchesSearch && matchesLocation && matchesPrice && matchesSpecialty;
    });
  }, [searchTerm, location, priceRange, selectedSpecialties]);

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
    setLocation('');
    setPriceRange([200, 1210]);
    setSelectedExperience([]);
    setSelectedSpecialties([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Filters */}
      <ContractorFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        location={location}
        onLocationChange={setLocation}
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Plus de {filteredContractors.length} freelances "blockchain" disponibles
              </h1>
              <p className="text-gray-600">
                Trouvez le freelance blockchain parfait pour votre projet
              </p>
            </div>

            {/* Contractors Grid */}
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
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun freelance trouvé
                </h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Load More Button */}
            {filteredContractors.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Charger plus de freelances
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 