export interface Encounter {
    id: string;
    name: string;
    created_at: string;
    updated_at?: string | null;
    user_id: string;
  }
  
  export interface Participant {
    id: string;
    encounter_id: string;
    name: string;
    initiative: number;
    hit_points: number;
    armor_class: number;
    created_at: string;
    updated_at?: string | null;
    user_id: string;
  }
  