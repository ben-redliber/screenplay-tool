import { Button } from "../ui/Button";

export default function BodySection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="body-section" className="flex flex-col gap-6 px-32 pb-8 pt-4">
      {children}
    </section>
  );
}
