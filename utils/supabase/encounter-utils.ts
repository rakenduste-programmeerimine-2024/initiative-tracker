import { createClient } from "@/utils/supabase/client";

export const saveEncounter = async (encounterData: {
  name: string;
  is_public: boolean;
  user_id: string;
}) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("encounters").insert(encounterData);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Failed to save encounter:", err);
    throw err;
  }
};