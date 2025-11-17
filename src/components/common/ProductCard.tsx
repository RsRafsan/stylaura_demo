
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  title: string
  price: number
  imageUrl: string
  inStock: boolean
  isNew?: boolean
  discount?: number
  variant?: 'grid' | 'list'
  onWishlistToggle?: (id: string) => void
  isWishlisted?: boolean
}

export default function ProductCard({
  id,
  title,
  price,
  imageUrl,
  inStock,
  isNew = false,
  discount,
  variant = 'grid',
  onWishlistToggle,
  isWishlisted = false
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [wishlistActive, setWishlistActive] = useState(isWishlisted)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlistActive(!wishlistActive)
    onWishlistToggle?.(id)
  }

  const discountedPrice = discount ? price * (1 - discount / 100) : price

  if (variant === 'list') {
    return (
      <a
        href={`./product-detail.html?id=${id}`}
        className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-card transition-shadow"
      >
        <div className="relative w-32 h-32 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="bg-white/90">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-foreground line-clamp-2">{title}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWishlistClick}
                className="flex-shrink-0"
              >
                <SafeIcon 
                  name="Heart" 
                  className={`h-5 w-5 ${wishlistActive ? 'fill-primary text-primary' : ''}`} 
                />
              </Button>
            </div>
            {isNew && <Badge className="bg-primary text-primary-foreground mb-2">New</Badge>}
          </div>

          <div className="flex items-center gap-2">
            {discount ? (
              <>
                <span className="text-lg font-semibold text-foreground">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${price.toFixed(2)}
                </span>
                <Badge variant="destructive" className="ml-auto">{discount}% OFF</Badge>
              </>
            ) : (
              <span className="text-lg font-semibold text-foreground">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      href={`./product-detail.html?id=${id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-secondary mb-3 aspect-[3/4]">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {discount && (
            <Badge variant="destructive">{discount}% OFF</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 bg-white/90 hover:bg-white transition-all ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <SafeIcon 
            name="Heart" 
            className={`h-5 w-5 ${wishlistActive ? 'fill-primary text-primary' : ''}`} 
          />
        </Button>

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              Out of Stock
            </Badge>
          </div>
        )}

        {/* Quick View Button */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <Button 
            variant="secondary" 
            className="w-full bg-white/95 hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `./product-detail.html?id=${id}`
            }}
          >
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {discount ? (
            <>
              <span className="text-lg font-semibold text-foreground">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-foreground">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
