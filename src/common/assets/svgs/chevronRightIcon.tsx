type ChevronRightIconProps = {
  className?: string;
  stroke?: string;
};

export function ChevronRightIcon({ className = "h-5 w-5", stroke = "currentColor" }: ChevronRightIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}
