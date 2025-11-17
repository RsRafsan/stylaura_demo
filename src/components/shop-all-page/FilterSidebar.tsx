
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import type { FilterConfig } from '@/data/products'

interface FilterSidebarProps {
  filters: FilterConfig[]
  activeFilters: {
    categories: string[]
    priceRange: [number, number]
    availability: 'all' | 'in_stock'
  }
  onFilterChange: (filterKey: string, value: any) => void
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
}: FilterSidebarProps) {
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['category', 'price', 'status'])

  const toggleFilter = (filterId: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-foreground mb-4">Filters</h3>

      <Accordion type="multiple" value={expandedFilters} onValueChange={setExpandedFilters}>
        {filters.map((filter) => (
          <AccordionItem key={filter.key} value={filter.key} className="border-border">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="font-medium text-sm">{filter.label}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              {filter.type === 'checkbox' && filter.options && (
                <div className="space-y-3">
                  {filter.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`filter-${filter.key}-${option.value}`}
                        checked={activeFilters.categories.includes(option.value)}
                        onCheckedChange={() => onFilterChange('category', option.value)}
                      />
                      <Label
                        htmlFor={`filter-${filter.key}-${option.value}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {filter.type === 'range' && filter.minMax && (
                <div className="space-y-4">
                  <Slider
                    min={filter.minMax.min}
                    max={filter.minMax.max}
                    step={filter.minMax.step}
                    value={activeFilters.priceRange}
                    onValueChange={(value) => onFilterChange('price', value as [number, number])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ৳{activeFilters.priceRange[0].toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      ৳{activeFilters.priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {filter.type === 'radio' && filter.options && (
                <RadioGroup
                  value={activeFilters.availability}
                  onValueChange={(value) => onFilterChange('status', value)}
                >
                  <div className="space-y-3">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={`filter-${filter.key}-${option.value}`}
                        />
                        <Label
                          htmlFor={`filter-${filter.key}-${option.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
