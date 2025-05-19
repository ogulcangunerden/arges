"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/firebase/categories";
import { getBrands } from "@/lib/firebase/brands";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";

interface ProductFilterSidebarProps {
  selectedCategory: string | undefined;
  selectedBrand: string | undefined;
  onCategoryChange: (category: string | undefined) => void;
  onBrandChange: (brand: string | undefined) => void;
}

export default function ProductFilterSidebar({
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: ProductFilterSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    // If already selected, clear it; otherwise, select it
    onCategoryChange(selectedCategory === categoryId ? undefined : categoryId);
  };

  const handleBrandClick = (brandId: string) => {
    // If already selected, clear it; otherwise, select it
    onBrandChange(selectedBrand === brandId ? undefined : brandId);
  };

  const clearAllFilters = () => {
    onCategoryChange(undefined);
    onBrandChange(undefined);
  };

  const hasActiveFilters = !!selectedCategory || !!selectedBrand;
  const activeFiltersCount =
    (selectedCategory ? 1 : 0) + (selectedBrand ? 1 : 0);

  // Mobile filter toggle button
  const renderFilterToggleButton = () => (
    <button
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="md:hidden flex items-center w-full justify-between p-4 bg-white rounded-lg shadow-md mb-4"
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span>Filtreler</span>
        {activeFiltersCount > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">
            {activeFiltersCount}
          </span>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-transform duration-200 ${
          isFilterOpen ? "transform rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );

  if (loading) {
    return (
      <div className="w-full">
        {renderFilterToggleButton()}
        <div className="p-6 bg-white rounded-lg shadow-md animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mt-6"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {renderFilterToggleButton()}

      <div
        className={`w-full p-6 bg-white rounded-lg shadow-md ${
          isFilterOpen ? "block" : "hidden md:block"
        }`}
      >
        {hasActiveFilters && (
          <div className="mb-6">
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Tüm filtreleri temizle
            </button>
          </div>
        )}

        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category.name
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Markalar</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandClick(brand.name)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedBrand === brand.name
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
