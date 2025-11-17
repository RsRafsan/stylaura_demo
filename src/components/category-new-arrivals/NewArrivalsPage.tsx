
import { useState, useMemo } from 'react'
import type { ProductSummaryModel } from '@/data/products'
import { PRODUCT_FILTERS } from '@/data/products'
import FilterSidebar from './FilterSidebar'
import ProductGrid from './ProductGrid'
import SortDropdown from './SortDropdown'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface NewArrivalsPageProps {
  products: ProductSummaryModel[]
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular'

export default function NewArrivalsPage({ products }: NewArrivalsPageProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [priceRange, setPriceRange] = useState<[number, number]>([3000, 20000])
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      // Stock filter
      if (!showOutOfStock && product.stockStatus === 'Out of Stock') {
        return false
      }
      return true
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'popular':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'newest':
      default:
        return filtered
    }
  }, [products, sortBy, priceRange, showOutOfStock])

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <a href="./home-page.html" className="hover:text-primary transition-colors">Home</a>
        <SafeIcon name="ChevronRight" className="h-4 w-4" />
        <span className="text-foreground font-medium">New Arrivals</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-3">
          New Arrivals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover the latest additions to our curated collection. Fresh styles, premium quality, and timeless elegance.
        </p>
      </div>

      {/* Results Count and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-border">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> products
        </p>
        
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden"
          >
            <SafeIcon name="Filter" className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Sort Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block">
          <FilterSidebar
            filters={PRODUCT_FILTERS}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            showOutOfStock={showOutOfStock}
            onShowOutOfStockChange={setShowOutOfStock}
          />
        </div>

        {/* Mobile Filter Sidebar */}
        {isMobileFilterOpen && (
          <div className="md:hidden mb-6 p-4 bg-secondary/30 rounded-lg border border-border">
            <FilterSidebar
              filters={PRODUCT_FILTERS}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              showOutOfStock={showOutOfStock}
              onShowOutOfStockChange={setShowOutOfStock}
            />
          </div>
        )}

        {/* Product Grid */}
        <div className="md:col-span-3">
          {filteredAndSortedProducts.length > 0 ? (
            <ProductGrid products={filteredAndSortedProducts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <SafeIcon name="Package" className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or browse all products.
              </p>
              <Button asChild>
                <a href="./shop-all.html">Browse All Products</a>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-border">
          <div className="bg-gradient-beige rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Love what you see?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our complete collection or sign up for exclusive early access to new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" className="bg-primary text-primary-foreground hover:opacity-90">
                <a href="./shop-all.html">Shop All Products</a>
              </Button>
              <Button asChild variant="outline">
                <a href="./login-signup.html">Create Account</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
