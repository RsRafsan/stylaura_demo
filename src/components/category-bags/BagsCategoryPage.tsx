import { useState, useMemo } from 'react'
import { getProductsBySlug, PRODUCT_FILTERS, type FilterConfig } from '@/data/products'
import CategoryFilters from './CategoryFilters'
import ProductGrid from './ProductGrid'
import SortDropdown from './SortDropdown'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular'

interface ActiveFilters {
  category: string[]
  priceRange: [number, number]
  availability: string
}

export default function BagsCategoryPage() {
  // Initialize with all bag products
  const allProducts = useMemo(() => getProductsBySlug('bags'), [])
  
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    category: ['cat_bags'],
    priceRange: [3000, 20000],
    availability: 'all',
  })

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
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

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
    }

    return filtered
  }, [allProducts, activeFilters, sortBy])

  const handleFilterChange = (filterKey: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: value,
    }))
  }

  const handleResetFilters = () => {
    setActiveFilters({
      category: ['cat_bags'],
      priceRange: [3000, 20000],
      availability: 'all',
    })
  }

  const isFiltered = 
    activeFilters.priceRange[0] !== 3000 || 
    activeFilters.priceRange[1] !== 20000 || 
    activeFilters.availability !== 'all'

  return (
    <div className="flex-1 bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-beige border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Stylish Bags
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover our curated collection of premium bags, from elegant clutches to versatile totes. Each piece is handpicked for quality and style.
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
              isFiltered={isFiltered}
            />
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SafeIcon name="Filter" className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-secondary/30 rounded-lg">
                <CategoryFilters
                  filters={PRODUCT_FILTERS}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  isFiltered={isFiltered}
                />
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="py-12 text-center">
                <SafeIcon name="Package" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No bags found
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
