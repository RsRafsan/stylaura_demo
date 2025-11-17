
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import SafeIcon from '@/components/common/SafeIcon'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface CommonHeaderProps {
  variant?: 'transparent' | 'solid'
  className?: string
}

export default function CommonHeader({ variant = 'solid', className = '' }: CommonHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `./search-results.html?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const categories = [
    { name: 'Lehengas', href: './category-lehengas.html' },
    { name: 'Bags', href: './category-bags.html' },
    { name: 'New Arrivals', href: './category-new-arrivals.html' },
  ]

  const headerBg = variant === 'transparent' && !isScrolled 
    ? 'bg-transparent' 
    : 'bg-background/95 backdrop-blur-sm border-b border-border'

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerBg} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="./index.html" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">Stylaura</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <a href="./shop-all.html" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Shop All
                  </a>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-2 p-4">
                      {categories.map((category) => (
                        <li key={category.name}>
                          <NavigationMenuLink asChild>
                            <a
                              href={category.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium">{category.name}</div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border focus:bg-background"
              />
            </div>
          </form>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
              <a href="./wishlist.html" aria-label="Wishlist">
                <SafeIcon name="Heart" className="h-5 w-5" />
              </a>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <a href="./cart.html" aria-label="Shopping Cart">
                <SafeIcon name="ShoppingBag" className="h-5 w-5" />
              </a>
            </Button>
            
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
              <a href="./login-signup.html" aria-label="Account">
                <SafeIcon name="User" className="h-5 w-5" />
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <SafeIcon name="Menu" className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-4">
                    <a href="./shop-all.html" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                      Shop All
                    </a>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">Categories</p>
                      {categories.map((category) => (
                        <a
                          key={category.name}
                          href={category.href}
                          className="block text-base text-foreground hover:text-primary transition-colors pl-4"
                        >
                          {category.name}
                        </a>
                      ))}
                    </div>
                    <a href="./wishlist.html" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                      Wishlist
                    </a>
                    <a href="./login-signup.html" className="text-base font-medium text-foreground hover:text-primary transition-colors">
                      My Account
                    </a>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
