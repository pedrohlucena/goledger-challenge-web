type TvShowDescriptionProps = {
  description: string;
};

export function TvShowDescription({ description }: TvShowDescriptionProps) {
  return (
    <div className="border-t border-edge pt-4">
      <p className="text-sm text-soft leading-relaxed">{description}</p>
    </div>
  );
}
