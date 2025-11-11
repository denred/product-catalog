interface SearchIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const SearchIcon = ({
  width = 16,
  height = 16,
  className,
}: SearchIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
};

export default SearchIcon;
