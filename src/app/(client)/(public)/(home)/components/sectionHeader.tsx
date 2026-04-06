import { ChevronRightIcon } from "@/common/assets/svgs/chevronRightIcon";

type SectionHeaderProps = {
  title: string;
  href?: string;
  tabs?: Array<{ label: string; active?: boolean }>;
};

export default function SectionHeader({ title, href, tabs }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-accent rounded-sm" />
        {href ? (
          <a href={href} className="flex items-center gap-1 group">
            <h2 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
              {title}
            </h2>
            <ChevronRightIcon className="text-accent" />
          </a>
        ) : (
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        )}
      </div>

      {tabs && tabs.length > 0 && (
        <div className="flex gap-6 mt-3 ml-3">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`text-xs font-bold tracking-wider uppercase pb-1 transition-colors
                ${tab.active
                  ? "text-white border-b-2 border-accent"
                  : "text-dim hover:text-white border-b-2 border-transparent"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
