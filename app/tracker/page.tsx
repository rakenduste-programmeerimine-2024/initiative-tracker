import DiceRoller from "@/components/dice-roller";
import Tracker from "@/components/tracker";
import ThreeScene from "@/components/threejs/three-scene";

export default async function TrackerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const encounterId = (await searchParams).encounterId || null
  console.log(encounterId)
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <Tracker encounterId={encounterId} />
      </section>
      <ThreeScene />
    </div>
  )
}