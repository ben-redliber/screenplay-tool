import { Button } from "../ui/Button";

export default function TitleSection({
  title,
  description,
  children,
}: {
  title: string | null | undefined;
  description: string | null | undefined;
  children: React.ReactNode;
}) {
  return (
    <section
      id="project-title"
      className="flex flex-row justify-between gap-2 border-b-2 border-b-secondary/25 px-32 pb-10 dark:border-b-muted-foreground/50"
    >
      <div className="flex flex-col">
        <p className="text-4xl text-primary dark:text-primary-foreground">
          {title}
        </p>
        <p className="text-secondary dark:text-secondary-foreground">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 pr-20">{children}</div>
    </section>
  );
}
