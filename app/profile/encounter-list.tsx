"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Encounter {
  id: string;
  name: string;
  created_at: string;
}

export default function EncounterList({ userId }: { userId: string }) {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEncounters = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("encounters")
        .select("id, name, created_at")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching encounters:", error);
      } else {
        setEncounters(data || []);
      }

      setLoading(false);
    };

    fetchEncounters();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading encounters...</p>;
  }

  if (encounters.length === 0) {
    return (
      <p className="text-center text-gray-500">No saved encounters found.</p>
    );
  }
}
  