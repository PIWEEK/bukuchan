export default function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={`text-6xl font-bold ${className}`}>{children}</h1>;
}
