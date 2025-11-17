
import { useState } from 'react'
import type { ProductSummaryModel } from '@/data/products'
import ProductCard from '@/components/common/ProductCard'

interface ProductGridProps {
  products: ProductSummaryModel[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const handleWishlistToggle = (productId: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
    // In a real app, this would sync with backend/localStorage
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
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
  )
}
