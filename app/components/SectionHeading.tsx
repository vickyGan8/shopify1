export function SectionHeading({
  title,
  subtitle,
  className = '',
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`section-heading ${className}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
