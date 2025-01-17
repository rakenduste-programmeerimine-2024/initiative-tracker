export interface Encounter {
  id: string;
  name: string;
  is_public: boolean;
  created_at: Date;
  modified_at?: Date | null;
  deleted_at?: Date | null;
  user_id: string;
}