
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import { useState, useEffect } from 'react'

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppFloatingButton({ 
  phoneNumber = '1234567890',
  message = 'Hello! I have a question about Stylaura products.'
}: WhatsAppFloatingButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after a short delay for smooth entrance
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className={`fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <SafeIcon name="MessageCircle" className="h-6 w-6" />
    </Button>
  )
}
