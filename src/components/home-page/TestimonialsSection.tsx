
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SafeIcon from '@/components/common/SafeIcon'
import { MOCK_TESTIMONIALS } from '@/data/reviews'

export default function TestimonialsSection() {
  const testimonial = MOCK_TESTIMONIALS[0]

  // Generate star rating display
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <SafeIcon
        key={i}
        name="Star"
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ))
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Loved by Our Customers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our satisfied customers have to say about Stylaura's premium collections.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Average Rating Card */}
          <Card className="border-border bg-card hover:shadow-card transition-shadow">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="mb-4">
                <div className="text-5xl font-bold text-primary mb-2">
                  {testimonial.averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {renderStars(testimonial.averageRating)}
                </div>
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>

          {/* Total Reviews Card */}
          <Card className="border-border bg-card hover:shadow-card transition-shadow">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {testimonial.totalReviews}+
              </div>
              <p className="text-muted-foreground">Customer Reviews</p>
            </CardContent>
          </Card>

          {/* 5-Star Reviews Card */}
          <Card className="border-border bg-card hover:shadow-card transition-shadow">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {testimonial.byRating[5]}
              </div>
              <p className="text-muted-foreground">5-Star Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="border-border bg-secondary/30">
          <CardContent className="pt-8 pb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Rating Distribution</h3>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = testimonial.byRating[rating] || 0
                const percentage = testimonial.totalReviews > 0 
                  ? (count / testimonial.totalReviews) * 100 
                  : 0

                return (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-20">
                      {Array.from({ length: rating }).map((_, i) => (
                        <SafeIcon
                          key={i}
                          name="Star"
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to experience Stylaura's premium collections?
          </p>
          <a
            href="./shop-all-page.html"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Start Shopping
            <SafeIcon name="ArrowRight" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
