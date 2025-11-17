
import { useState } from 'react'
import type { FilterConfig } from '@/data/products'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'

interface FilterSidebarProps {
  filters: FilterConfig[]
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  showOutOfStock: boolean
  onShowOutOfStockChange: (show: boolean) => void
}

export default function FilterSidebar({
  filters,
  priceRange,
  onPriceRangeChange,
  showOutOfStock,
  onShowOutOfStockChange,
}: FilterSidebarProps) {
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(
    new Set(filters.map(f => f.key))
  )

  const toggleFilter = (key: string) => {
    const newExpanded = new Set(expandedFilters)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedFilters(newExpanded)
  }

  const priceFilter = filters.find(f => f.key === 'price')
  const statusFilter = filters.find(f => f.key === 'status')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onPriceRangeChange([3000, 20000])
            onShowOutOfStockChange(true)
          }}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          Reset Filters
        </Button>
      </div>

      {/* Price Range Filter */}
      {priceFilter && priceFilter.minMax && (
        <div className="space-y-4">
          <button
            onClick={() => toggleFilter('price')}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <span>{priceFilter.label}</span>
            <SafeIcon
              name={expandedFilters.has('price') ? 'ChevronUp' : 'ChevronDown'}
              className="h-4 w-4"
            />
          </button>

          {expandedFilters.has('price') && (
            <div className="space-y-4 pt-2">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceRangeChange([value[0], value[1]])}
                min={priceFilter.minMax.min}
                max={priceFilter.minMax.max}
                step={priceFilter.minMax.step}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>৳{priceRange[0].toLocaleString()}</span>
                <span>৳{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Availability Filter */}
      {statusFilter && (
        <div className="space-y-4">
          <button
            onClick={() => toggleFilter('status')}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <span>{statusFilter.label}</span>
            <SafeIcon
              name={expandedFilters.has('status') ? 'ChevronUp' : 'ChevronDown'}
              className="h-4 w-4"
            />
          </button>

          {expandedFilters.has('status') && (
            <div className="space-y-3 pt-2">
              <RadioGroup
                value={showOutOfStock ? 'all' : 'in_stock'}
                onValueChange={(value) => onShowOutOfStockChange(value === 'all')}
              >
                {statusFilter.options?.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`status-${option.value}`} />
                    <Label
                      htmlFor={`status-${option.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      )}

      {/* Category Filter Info */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Viewing products from all categories. Visit category pages for category-specific filters.
        </p>
      </div>
    </div>
  )
}
