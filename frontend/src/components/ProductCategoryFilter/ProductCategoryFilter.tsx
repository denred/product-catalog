'use client';
import './styles.scss';

interface CategoryFilterProps {
  categories?: readonly string[];
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
  title?: string;
  className?: string;
}

const ProductCategoryFilter = ({
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  title = 'Category',
  className = 'category-filter',
}: CategoryFilterProps) => {
  const handleCategoryToggle = (category: string) => {
    if (!onCategoryChange) {
      return;
    }

    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    onCategoryChange(updated);
  };

  return (
    <div className={`category-filter ${className ?? ''}`}>
      <h3 className="category-title">{title}</h3>
      <div className="category-list">
        {categories.map((category) => (
          <label key={category} className="category-item">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
              className="category-checkbox"
            />
            <span className="category-label">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryFilter;
