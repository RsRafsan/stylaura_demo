
'use client'

import { useState, useMemo } from 'react'
import { getProductsBySlug, PRODUCT_FILTERS, type FilterConfig } from '@/data/products'
import CategoryFilters from './CategoryFilters'
import ProductGrid from './ProductGrid'
import SortDropdown from './SortDropdown'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular'

interface ActiveFilters {
  priceRange: [number, number]
  availability: 'all' | 'in_stock'
}

export default function CategoryLehengas() {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    priceRange: [3000, 20000],
    availability: 'all',
  })

  // Get all lehenga products
  const allProducts = useMemo(() => {
    return getProductsBySlug('lehengas')
  }, [])

  // Apply filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Price filter
      if (product.price < activeFilters.priceRange[0] || product.price > activeFilters.priceRange[1]) {
        return false
      }

      // Availability filter
      if (activeFilters.availability === 'in_stock' && product.stockStatus === 'Out of Stock') {
        return false
      }

      return true
    })
  }, [allProducts, activeFilters])

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'newest':
        return sorted.sort((a, b) => {
          if (a.isNewArrival === b.isNewArrival) return 0
          return a.isNewArrival ? -1 : 1
        })
      case 'popular':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const handleFilterChange = (filters: ActiveFilters) => {
    setActiveFilters(filters)
  }

  const handleResetFilters = () => {
    setActiveFilters({
      priceRange: [3000, 20000],
      availability: 'all',
    })
  }

  return (
    <div className="flex-1 w-full">
      {/* Hero Section */}
      <section className="bg-gradient-beige border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-foreground">
              Lehengas
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover our exquisite collection of premium imported lehengas, perfect for weddings, festive celebrations, and special occasions. Each piece is carefully curated for elegance and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <CategoryFilters
              filters={PRODUCT_FILTERS}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SafeIcon name="Filter" className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground">
                  {sortedProducts.length} products
                </span>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Mobile Filters - Collapsible */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 border border-border rounded-lg bg-card">
                <CategoryFilters
                  filters={PRODUCT_FILTERS}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            )}

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <div className="py-12 text-center">
                <SafeIcon name="Package" className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={handleResetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
