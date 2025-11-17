
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon'
import { useState } from 'react'

interface CommonFooterProps {
  variant?: 'full' | 'simple'
}

export default function CommonFooter({ variant = 'full' }: CommonFooterProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Simulate newsletter signup
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About Us', href: './about.html' },
    { name: 'Contact', href: './contact.html' },
    { name: 'FAQs', href: './faqs.html' },
    { name: 'Size Guide', href: './size-guide.html' },
  ]

  const customerService = [
    { name: 'Shipping & Delivery', href: './shipping-policy.html' },
    { name: 'Returns & Exchanges', href: './return-policy.html' },
    { name: 'Privacy Policy', href: './privacy-policy.html' },
    { name: 'Terms & Conditions', href: './terms.html' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/stylaura' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com/stylaura' },
    { name: 'MessageCircle', icon: 'MessageCircle', href: 'https://tiktok.com/@stylaura' },
  ]

  if (variant === 'simple') {
    return (
      <footer className="bg-secondary/30 border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <SafeIcon name={social.icon} className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Stylaura. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-secondary/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">Stylaura</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium women's fashion. Curated lehengas, festive outfits, Indo-western wear, and stylish bags. Elegance meets modern trends.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <SafeIcon name={social.icon} className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
                Subscribe
              </Button>
              {isSubscribed && (
                <p className="text-xs text-primary">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Stylaura. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="./privacy-policy.html" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <span>•</span>
              <a href="./terms.html" className="hover:text-primary transition-colors">
                Terms
              </a>
              <span>•</span>
              <a href="./contact.html" className="hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
