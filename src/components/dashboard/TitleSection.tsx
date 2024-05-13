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
      className="flex flex-row justify-between gap-2 border-b-2 border-b-zinc-50/10 px-32 pb-10"
    >
      <div className="flex flex-col">
        <p className="text-4xl">{title}</p>
        <p className="text-zinc-400">{description}</p>
      </div>
      <div className="flex flex-wrap gap-4 pr-20">{children}</div>
    </section>
  );
}
