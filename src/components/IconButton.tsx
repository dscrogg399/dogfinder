// This is an icon button, meant to have an icon as the content within the button
export default function IconButton({
  className,
  onClick,
  icon,
  disabled,
  title,
}: {
  className?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  color?: string;
  size?: string;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      title={title || undefined}
      type="button"
      onClick={onClick}
      className={`flex flex-none items-center justify-center rounded-full ${className}`}
      disabled={disabled || false}
    >
      {icon}
    </button>
  );
}
