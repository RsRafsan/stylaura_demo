
'use client'

import { useState, useMemo } from 'react'
import { PRODUCT_CATALOG_SUMMARIES, PRODUCT_FILTERS, type FilterConfig } from '@/data/products'
import FilterSidebar from './FilterSidebar'
import SortDropdown from './SortDropdown'
import FilterTags from './FilterTags'
import ProductGrid from './ProductGrid'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest'

interface ActiveFilters {
  categories: string[]
  priceRange: [number, number]
  availability: 'all' | 'in_stock'
}

export default function ShopAllPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    priceRange: [3000, 20000],
    availability: 'all',
  })

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCT_CATALOG_SUMMARIES.filter((product) => {
      // Category filter
      if (activeFilters.categories.length > 0) {
        if (!activeFilters.categories.includes(product.categoryId)) {
          return false
        }
      }

      // Price filter
      if (product.price < activeFilters.priceRange[0] || product.price > activeFilters.priceRange[1]) {
        return false
      }

      // Availability filter
      if (activeFilters.availability === 'in_stock') {
        if (product.stockStatus === 'Out of Stock') {
          return false
        }
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'newest':
        return filtered.sort((a, b) => {
          if (a.isNewArrival === b.isNewArrival) return 0
          return a.isNewArrival ? -1 : 1
        })
      case 'featured':
      default:
        return filtered
    }
  }, [activeFilters, sortBy])

  const handleFilterChange = (filterKey: string, value: any) => {
    setActiveFilters((prev) => {
      if (filterKey === 'category') {
        return {
          ...prev,
          categories: prev.categories.includes(value)
            ? prev.categories.filter((c) => c !== value)
            : [...prev.categories, value],
        }
      } else if (filterKey === 'price') {
        return {
          ...prev,
          priceRange: value,
        }
      } else if (filterKey === 'status') {
        return {
          ...prev,
          availability: value,
        }
      }
      return prev
    })
  }

  const handleClearFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: [3000, 20000],
      availability: 'all',
    })
  }

  const hasActiveFilters =
    activeFilters.categories.length > 0 ||
    activeFilters.priceRange[0] !== 3000 ||
    activeFilters.priceRange[1] !== 20000 ||
    activeFilters.availability !== 'all'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">Shop All</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium women's fashion
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <SafeIcon name="Filter" className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <span className="text-sm text-muted-foreground">
            {filteredAndSortedProducts.length} products
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <FilterTags
          activeFilters={activeFilters}
          onRemoveFilter={handleFilterChange}
          onClearAll={handleClearFilters}
          className="mb-6"
        />
      )}

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar
            filters={PRODUCT_FILTERS}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-background border-r border-border overflow-y-auto">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <SafeIcon name="X" className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <FilterSidebar
                  filters={PRODUCT_FILTERS}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredAndSortedProducts.length > 0 ? (
            <ProductGrid products={filteredAndSortedProducts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <SafeIcon name="Package" className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
