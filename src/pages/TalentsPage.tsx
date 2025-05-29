import React, { useState, useMemo } from 'react';
import { TalentCard } from '../components/TalentCard';
import { TalentFilters } from '../components/TalentFilters';
import { TalentSidebar } from '../components/TalentSidebar';
import { talentsData } from '../data/talentsData';

export const TalentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 1210]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter talents based on search criteria
  const filteredTalents = useMemo(() => {
    return talentsData.filter((talent) => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        talent.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Price range filter
      const matchesPrice = talent.rate >= priceRange[0] && talent.rate <= priceRange[1];

      // Specialty filter
      const matchesSpecialty = selectedSpecialties.length === 0 ||
        selectedSpecialties.some(specialty => 
          talent.skills.some(skill => skill.toLowerCase().includes(specialty.toLowerCase()))
        );

      return matchesSearch && matchesPrice && matchesSpecialty;
    });
  }, [searchTerm, priceRange, selectedSpecialties]);

  const handleToggleFavorite = (talentId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(talentId)) {
      newFavorites.delete(talentId);
    } else {
      newFavorites.add(talentId);
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
      <TalentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <TalentSidebar
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
                Over {filteredTalents.length} "blockchain" talents available
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Find the perfect blockchain talent for your project
              </p>
            </div>

            {/* Talents Grid */}
            {filteredTalents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredTalents.map((talent) => (
                  <TalentCard
                    key={talent.id}
                    talent={talent}
                    isFavorited={favorites.has(talent.id)}
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
            {filteredTalents.length > 0 && (
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