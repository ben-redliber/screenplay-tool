export default function CurrentProject({
  projectName,
}: {
  projectName: string;
}) {
  return (
    <section className="flex flex-row gap-2 px-32 underline decoration-primary dark:decoration-primary-foreground">
      <p className="font-mono text-sm text-primary dark:text-primary-foreground">
        {projectName}
      </p>
    </section>
  );
}
