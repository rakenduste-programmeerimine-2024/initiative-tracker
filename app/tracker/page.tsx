import Tracker from "@/components/tracker"
import ThreeScene from "@/components/threejs/three-scene"

export default async function TrackerPage({
  searchParams,
}: {
  searchParams: any // TODO: Refactor searchParams to use a stricter type
}) {
  const encounterId = searchParams?.encounterId ?? null

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <Tracker encounterId={encounterId} />
      </section>
      <ThreeScene />
    </div>
  )
}
