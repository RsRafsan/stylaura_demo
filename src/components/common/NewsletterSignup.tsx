
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import SafeIcon from '@/components/common/SafeIcon'

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal'
  className?: string
}

export default function NewsletterSignup({ variant = 'inline', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('Thank you for subscribing! Check your inbox for exclusive offers.')
      setEmail('')
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }, 1000)
  }

  if (variant === 'modal') {
    return (
      <div className={`bg-gradient-beige rounded-lg p-8 ${className}`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <SafeIcon name="Mail" className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Stay in Style</h3>
          <p className="text-muted-foreground">
            Get exclusive access to new arrivals, special offers, and style tips.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="bg-background"
          />
          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:opacity-90"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </Button>
          
          {message && (
            <p className={`text-sm text-center ${status === 'success' ? 'text-primary' : 'text-destructive'}`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1 bg-background"
        />
        <Button 
          type="submit" 
          className="bg-primary text-primary-foreground hover:opacity-90"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      
      {message && (
        <p className={`text-sm mt-2 ${status === 'success' ? 'text-primary' : 'text-destructive'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
