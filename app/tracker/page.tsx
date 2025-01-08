import DiceRoller from "@/components/dice-roller";

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">D&D Initiative Tracker</h1>
      <div className="max-w-2xl mx-auto">
        <DiceRoller />
      </div>
    </div>
  );
}