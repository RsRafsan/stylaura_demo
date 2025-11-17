
import NewsletterSignup from '@/components/common/NewsletterSignup'

export default function NewsletterSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup variant="modal" />
        </div>
      </div>
    </section>
  )
}
