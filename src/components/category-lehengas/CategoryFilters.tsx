
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import SafeIcon from '@/components/common/SafeIcon'

interface ActiveFilters {
  priceRange: [number, number]
  availability: 'all' | 'in_stock'
}

interface FilterConfig {
  key: string
  label: string
  type: 'select' | 'checkbox' | 'range' | 'radio'
  options?: { value: string; label: string }[]
  minMax?: { min: number; max: number; step: number }
}

interface CategoryFiltersProps {
  filters: FilterConfig[]
  activeFilters: ActiveFilters
  onFilterChange: (filters: ActiveFilters) => void
  onReset: () => void
}

export default function CategoryFilters({
  filters,
  activeFilters,
  onFilterChange,
  onReset,
}: CategoryFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['price', 'status'])
  )

  const toggleSection = (key: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedSections(newExpanded)
  }

  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...activeFilters,
      priceRange: [value[0], value[1]],
    })
  }

  const handleAvailabilityChange = (value: 'all' | 'in_stock') => {
    onFilterChange({
      ...activeFilters,
      availability: value,
    })
  }

  const priceFilter = filters.find(f => f.key === 'price')
  const statusFilter = filters.find(f => f.key === 'status')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs text-primary hover:text-primary/80"
        >
          Reset
        </Button>
      </div>

      <Separator />

      {/* Price Range Filter */}
      {priceFilter && priceFilter.minMax && (
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors"
          >
            <span>{priceFilter.label}</span>
            <SafeIcon
              name={expandedSections.has('price') ? 'ChevronUp' : 'ChevronDown'}
              className="h-4 w-4"
            />
          </button>

          {expandedSections.has('price') && (
            <div className="mt-4 space-y-4">
              <Slider
                value={activeFilters.priceRange}
                onValueChange={handlePriceChange}
                min={priceFilter.minMax.min}
                max={priceFilter.minMax.max}
                step={priceFilter.minMax.step}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>৳{activeFilters.priceRange[0].toLocaleString()}</span>
                <span>৳{activeFilters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <Separator />

      {/* Availability Filter */}
      {statusFilter && statusFilter.options && (
        <div>
          <button
            onClick={() => toggleSection('status')}
            className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors"
          >
            <span>{statusFilter.label}</span>
            <SafeIcon
              name={expandedSections.has('status') ? 'ChevronUp' : 'ChevronDown'}
              className="h-4 w-4"
            />
          </button>

          {expandedSections.has('status') && (
            <div className="mt-4 space-y-3">
              {statusFilter.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`status-${option.value}`}
                    name="availability"
                    value={option.value}
                    checked={activeFilters.availability === option.value}
                    onChange={(e) =>
                      handleAvailabilityChange(e.target.value as 'all' | 'in_stock')
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  <Label
                    htmlFor={`status-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Separator />

      {/* Lehenga-Specific Filters */}
      <div>
        <button
          onClick={() => toggleSection('fabric')}
          className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors"
        >
          <span>Fabric Type</span>
          <SafeIcon
            name={expandedSections.has('fabric') ? 'ChevronUp' : 'ChevronDown'}
            className="h-4 w-4"
          />
        </button>

        {expandedSections.has('fabric') && (
          <div className="mt-4 space-y-3">
            {['Art Silk', 'Silk Blend', 'Cotton Silk', 'Georgette', 'Velvet'].map(
              (fabric) => (
                <div key={fabric} className="flex items-center space-x-2">
                  <Checkbox id={`fabric-${fabric}`} />
                  <Label htmlFor={`fabric-${fabric}`} className="text-sm font-normal cursor-pointer">
                    {fabric}
                  </Label>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Embroidery Filter */}
      <div>
        <button
          onClick={() => toggleSection('embroidery')}
          className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors"
        >
          <span>Embroidery</span>
          <SafeIcon
            name={expandedSections.has('embroidery') ? 'ChevronUp' : 'ChevronDown'}
            className="h-4 w-4"
          />
        </button>

        {expandedSections.has('embroidery') && (
          <div className="mt-4 space-y-3">
            {['Zari Work', 'Mirror Embroidery', 'Beadwork', 'Hand Embroidered', 'Plain'].map(
              (embroidery) => (
                <div key={embroidery} className="flex items-center space-x-2">
                  <Checkbox id={`embroidery-${embroidery}`} />
                  <Label
                    htmlFor={`embroidery-${embroidery}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {embroidery}
                  </Label>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
