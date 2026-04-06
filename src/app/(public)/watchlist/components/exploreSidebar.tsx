type ExploreItemProps = {
  label: string;
  subtitle: string;
};

function ExploreItem({ label, subtitle }: ExploreItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-divider last:border-b-0">
      <div className="w-[45px] h-[67px] bg-divider flex-shrink-0 rounded-sm" />
      <div>
        <p className="text-sm font-bold text-link">{label}</p>
        <p className="text-xs text-subtle mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

const EXPLORE_ITEMS: ExploreItemProps[] = [
  {
    label: "Suas avaliações",
    subtitle: "Títulos que você já avaliou",
  },
  {
    label: "Sua lista",
    subtitle: "Adicione até 1 item para 1 lista",
  },
];

export function ExploreSidebar() {
  return (
    <aside className="w-64 flex-shrink-0">
      <h2 className="text-base font-bold mb-1">Explore mais</h2>
      <div>
        {EXPLORE_ITEMS.map((item) => (
          <ExploreItem key={item.label} label={item.label} subtitle={item.subtitle} />
        ))}
      </div>
    </aside>
  );
}
