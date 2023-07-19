// Flex row component
export default function Row({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`flex flex-row ${className}`}>{children}</div>;
}
