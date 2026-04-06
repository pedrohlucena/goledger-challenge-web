type ImagePlaceholderIconProps = {
  className?: string;
};

export function ImagePlaceholderIcon({ className = "h-12 w-12" }: ImagePlaceholderIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <circle cx="8" cy="8" r="2" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}
