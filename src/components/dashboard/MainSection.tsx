export default function MainSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-background pb-12 pt-4 text-white dark:bg-foreground/90 ">
      {children}
    </main>
  );
}
