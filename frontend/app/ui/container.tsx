export default function Container({
  children,
  className,
  variant = "center",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "center";
}) {
  return (
    <section
      className={`max-w-md mx-auto grid place-content-center h-full ${className}`}
    >
      {children}
    </section>
  );
}
