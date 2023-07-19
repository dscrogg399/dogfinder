export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-gray-100 font-sans">{children}</div>
  );
}
