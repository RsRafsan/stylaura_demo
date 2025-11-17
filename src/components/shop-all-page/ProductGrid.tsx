
import ProductCard from '@/components/common/ProductCard'
import type { ProductSummaryModel } from '@/data/products'
import { useState } from 'react'

interface ProductGridProps {
  products: ProductSummaryModel[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set())

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
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
          isWishlisted={wishlistedProducts.has(product.id)}
        />
      ))}
    </div>
  )
}
