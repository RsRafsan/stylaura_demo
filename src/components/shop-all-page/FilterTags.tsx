
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SafeIcon from '@/components/common/SafeIcon'
import { CATEGORIES_DATA } from '@/data/categories'

interface FilterTagsProps {
  activeFilters: {
    categories: string[]
    priceRange: [number, number]
    availability: 'all' | 'in_stock'
  }
  onRemoveFilter: (filterKey: string, value: any) => void
  onClearAll: () => void
  className?: string
}

export default function FilterTags({
  activeFilters,
  onRemoveFilter,
  onClearAll,
  className = '',
}: FilterTagsProps) {
  const tags: Array<{ label: string; key: string; value: any }> = []

  // Add category tags
  activeFilters.categories.forEach((catId) => {
    const category = CATEGORIES_DATA.find((c) => c.id === catId)
    if (category) {
      tags.push({
        label: category.name,
        key: 'category',
        value: catId,
      })
    }
  })

  // Add price range tag
  if (activeFilters.priceRange[0] !== 3000 || activeFilters.priceRange[1] !== 20000) {
    tags.push({
      label: `৳${activeFilters.priceRange[0].toLocaleString()} - ৳${activeFilters.priceRange[1].toLocaleString()}`,
      key: 'price',
      value: [3000, 20000],
    })
  }

  // Add availability tag
  if (activeFilters.availability === 'in_stock') {
    tags.push({
      label: 'In Stock Only',
      key: 'status',
      value: 'all',
    })
  }

  if (tags.length === 0) return null

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1.5"
        >
          {tag.label}
          <button
            onClick={() => onRemoveFilter(tag.key, tag.value)}
            className="ml-1 hover:opacity-70 transition-opacity"
            aria-label={`Remove ${tag.label} filter`}
          >
            <SafeIcon name="X" className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  )
}
