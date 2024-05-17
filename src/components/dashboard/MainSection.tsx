export default function MainSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-background py-12 text-white dark:bg-foreground ">
      {children}
    </main>
  );
}
