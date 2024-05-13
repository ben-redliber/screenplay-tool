import { Button } from "../ui/Button";

export default function BodySection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="body-section" className="flex flex-col px-32 pb-8">
      {children}
    </section>
  );
}
