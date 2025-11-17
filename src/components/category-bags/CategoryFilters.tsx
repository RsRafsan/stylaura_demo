
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { FilterConfig } from '@/data/products'

interface CategoryFiltersProps {
  filters: FilterConfig[]
  activeFilters: {
    category: string[]
    priceRange: [number, number]
    availability: string
  }
  onFilterChange: (filterKey: string, value: any) => void
  onReset: () => void
  isFiltered: boolean
}

export default function CategoryFilters({
  filters,
  activeFilters,
  onFilterChange,
  onReset,
  isFiltered,
}: CategoryFiltersProps) {
  const handlePriceChange = (value: number[]) => {
    onFilterChange('priceRange', [value[0], value[1]] as [number, number])
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updated = checked
      ? [...activeFilters.category, categoryId]
      : activeFilters.category.filter(c => c !== categoryId)
    onFilterChange('category', updated)
  }

  const priceFilter = filters.find(f => f.key === 'price')
  const categoryFilter = filters.find(f => f.key === 'category')
  const statusFilter = filters.find(f => f.key === 'status')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-primary hover:text-primary/80"
          >
            Reset
          </Button>
        )}
      </div>

      {/* Price Range Filter */}
      {priceFilter && priceFilter.type === 'range' && priceFilter.minMax && (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground text-sm">{priceFilter.label}</h4>
          <Slider
            min={priceFilter.minMax.min}
            max={priceFilter.minMax.max}
            step={priceFilter.minMax.step}
            value={[activeFilters.priceRange[0], activeFilters.priceRange[1]]}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>৳{activeFilters.priceRange[0].toLocaleString()}</span>
            <span>৳{activeFilters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Category Filter */}
      {categoryFilter && categoryFilter.type === 'checkbox' && categoryFilter.options && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground text-sm">{categoryFilter.label}</h4>
          <div className="space-y-2">
            {categoryFilter.options.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={activeFilters.category.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={option.value}
                  className="text-sm font-normal cursor-pointer text-foreground"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Availability Filter */}
      {statusFilter && statusFilter.type === 'radio' && statusFilter.options && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground text-sm">{statusFilter.label}</h4>
          <RadioGroup
            value={activeFilters.availability}
            onValueChange={(value) => onFilterChange('availability', value)}
          >
            {statusFilter.options.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="text-sm font-normal cursor-pointer text-foreground"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  )
}
