
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/common/ProductCard'
import { getNewArrivals } from '@/data/products'
import SafeIcon from '@/components/common/SafeIcon'
import { useState } from 'react'

export default function NewArrivalsSection() {
  const newArrivals = getNewArrivals(6)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const handleWishlistToggle = (productId: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <SafeIcon name="Sparkles" className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">New Arrivals</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Latest Additions to Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh styles just arrived. Discover the newest pieces from our curated selection of premium imported fashion.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              imageUrl={product.mainImageUrl}
              inStock={product.stockStatus !== 'Out of Stock'}
              isNew={product.isNewArrival}
              discount={product.isOnSale ? 15 : undefined}
              variant="grid"
              onWishlistToggle={handleWishlistToggle}
              isWishlisted={wishlist.has(product.id)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            <a href="./category-new-arrivals.html">
              View All New Arrivals
              <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
