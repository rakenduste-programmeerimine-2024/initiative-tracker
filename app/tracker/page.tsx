import DiceRoller from "@/components/dice-roller";
import Tracker from "@/components/tracker";

export default function TrackerPage() {
  return (
      <div className="max-w-4xl mx-auto space-y-12">

        <section>
          <DiceRoller />
        </section>

        <section>
          <Tracker />
        </section>
      </div>
  );
}