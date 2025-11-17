
import { Button } from '@/components/ui/button'
import { CATEGORIES_DATA } from '@/data/categories'
import SafeIcon from '@/components/common/SafeIcon'

export default function CategoriesSection() {
  const featuredCategories = CATEGORIES_DATA.filter(c => c.isFeatured && c.slug !== 'new-arrivals')

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Explore Our Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium imported fashion, from elegant lehengas to stylish accessories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredCategories.map((category) => (
            <a
              key={category.id}
              href={category.linkPath}
              className="group relative overflow-hidden rounded-lg aspect-square bg-secondary hover:shadow-card transition-all duration-300"
            >
              {/* Image */}
              <img
                src={category.thumbnailUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-2">
                  {category.description}
                </p>
                <Button
                  variant="secondary"
                  className="bg-white/95 text-foreground hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Explore
                  <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/5"
          >
            <a href="./shop-all-page.html">
              View All Products
              <SafeIcon name="ArrowRight" className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
