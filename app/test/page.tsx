import ThreeScene from "@/components/threejs/three-scene";

export default function TestPage() {
  return (
      <div className="max-w-4xl mx-auto space-y-12">

        <section>
          <ThreeScene />
        </section>
      </div>
  );
}