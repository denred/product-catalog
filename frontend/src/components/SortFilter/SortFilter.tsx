'use client';
import { SortType } from '../../enums';
import './styles.scss';

interface SortOption {
  value: string;
  label: string;
}

interface SortFilterProps {
  sortBy?: string;
  onSortChange?: (sort: SortType) => void;
  options?: readonly SortOption[];
  title?: string;
  className?: string;
}

const SortFilter = ({
  sortBy = 'default',
  onSortChange,
  options = [],
  title = 'Sort by',
  className = 'sort-filter',
}: SortFilterProps) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange?.(e.target.value as SortType);
  };

  return (
    <div className={`sort-filter ${className ?? ''}`}>
      <h3 className="sort-title">{title}</h3>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="sort-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
