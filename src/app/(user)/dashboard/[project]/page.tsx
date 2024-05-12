export default function ProjectPage({
  params,
}: {
  params: { project: number };
}) {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 px-12 py-12 text-white">
      <p>{JSON.stringify(params)}</p>
    </main>
  );
}
