'use client';
import './styles.scss';
import { SearchIcon } from '../Icons';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SearchInput = ({
  value = '',
  onChange,
  placeholder = 'Search',
  className = 'search-input',
  disabled = false,
}: SearchInputProps) => {
  return (
    <div className={`search-input-wrapper ${className ?? ''}`}>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="search-field"
      />
      <div className="search-icon">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;
