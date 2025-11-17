
import { Button } from '@/components/ui/button'
import { HOME_HERO_BANNER } from '@/data/app_content'
import SafeIcon from '@/components/common/SafeIcon'

export default function HeroBanner() {
  return (
    <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HOME_HERO_BANNER.imageUrl}
          alt={HOME_HERO_BANNER.heading}
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 md:mb-6 leading-tight">
            {HOME_HERO_BANNER.heading}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed">
            {HOME_HERO_BANNER.subheading}
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90 px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-medium"
          >
            <a href={HOME_HERO_BANNER.ctaLink}>
              {HOME_HERO_BANNER.ctaText}
              <SafeIcon name="ArrowRight" className="ml-2 h-5 w-5" />
            </a>
          </Button>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <SafeIcon name="ChevronDown" className="h-6 w-6 text-white/70" />
          </div>
        </div>
      </div>
    </section>
  )
}
