SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."combat_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "encounter_id" "uuid",
    "participant_id" "uuid",
    "round_no" smallint DEFAULT '1'::smallint NOT NULL,
    "hit_points_current" smallint NOT NULL,
    "death_save_successes" smallint DEFAULT '-1'::smallint NOT NULL,
    "death_save_failures" smallint DEFAULT '-1'::smallint NOT NULL,
    "is_public" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "modified_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."combat_logs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."encounters" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "is_public" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "modified_at" timestamp with time zone,
    "deleted_at" timestamp without time zone,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."encounters" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."participants" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "encounter_id" "uuid",
    "stat_block_id" "uuid",
    "type" "text" NOT NULL,
    "name" "text",
    "rolled_initiative" smallint NOT NULL,
    "hit_points_max" smallint NOT NULL,
    "group_no" smallint,
    "status" "text" DEFAULT ''::"text" NOT NULL,
    "is_public" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "modified_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."participants" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "full_name" "text",
    "username" character varying,
    "website" "text",
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."stat_blocks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "dexterity_score" smallint DEFAULT '10'::smallint NOT NULL,
    "hit_points_average" smallint,
    "hit_points_formula" "text",
    "base_armor_class" smallint DEFAULT '10'::smallint NOT NULL,
    "dex_applies_to_ac" boolean DEFAULT true NOT NULL,
    "speed" smallint DEFAULT '30'::smallint NOT NULL,
    "is_public" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "modified_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."stat_blocks" OWNER TO "postgres";

ALTER TABLE ONLY "public"."combat_logs"
    ADD CONSTRAINT "combat_log_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."encounters"
    ADD CONSTRAINT "encounter_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participant_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."stat_blocks"
    ADD CONSTRAINT "stat_block_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."combat_logs"
    ADD CONSTRAINT "combat_log_encounter_id_fkey" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id");

ALTER TABLE ONLY "public"."combat_logs"
    ADD CONSTRAINT "combat_log_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id");

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participant_encounter_id_fkey" FOREIGN KEY ("encounter_id") REFERENCES "public"."encounters"("id");

ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participant_stat_block_id_fkey" FOREIGN KEY ("stat_block_id") REFERENCES "public"."stat_blocks"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable Users to Delete Their Profile" ON "public"."profiles" FOR DELETE USING (("auth"."uid"() = "id"));

CREATE POLICY "Enable Users to Read Their Profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));

CREATE POLICY "Enable Users to Update Their Profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."combat_logs" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."encounters" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."participants" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."stat_blocks" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."combat_logs" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."encounters" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."participants" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable insert for users based on user_id" ON "public"."stat_blocks" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable read access for authenticated or anonymous users" ON "public"."combat_logs" FOR SELECT TO "anon", "authenticated" USING (true);

CREATE POLICY "Enable read access for authenticated or anonymous users" ON "public"."encounters" FOR SELECT TO "anon", "authenticated" USING (true);

CREATE POLICY "Enable read access for authenticated or anonymous users" ON "public"."participants" FOR SELECT TO "anon", "authenticated" USING (true);

CREATE POLICY "Enable read access for authenticated or anonymous users" ON "public"."stat_blocks" FOR SELECT TO "anon", "authenticated" USING (true);

CREATE POLICY "Enable update for users based on user_id" ON "public"."combat_logs" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable update for users based on user_id" ON "public"."encounters" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable update for users based on user_id" ON "public"."participants" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable update for users based on user_id" ON "public"."stat_blocks" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

ALTER TABLE "public"."combat_logs" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enable users to insert their profile" ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

ALTER TABLE "public"."encounters" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."participants" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."stat_blocks" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."combat_logs" TO "anon";
GRANT ALL ON TABLE "public"."combat_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."combat_logs" TO "service_role";

GRANT ALL ON TABLE "public"."encounters" TO "anon";
GRANT ALL ON TABLE "public"."encounters" TO "authenticated";
GRANT ALL ON TABLE "public"."encounters" TO "service_role";

GRANT ALL ON TABLE "public"."participants" TO "anon";
GRANT ALL ON TABLE "public"."participants" TO "authenticated";
GRANT ALL ON TABLE "public"."participants" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."stat_blocks" TO "anon";
GRANT ALL ON TABLE "public"."stat_blocks" TO "authenticated";
GRANT ALL ON TABLE "public"."stat_blocks" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

CREATE OR REPLACE FUNCTION get_last_combat_logs(encounter_id UUID, user_id UUID)
RETURNS TABLE (
  participant_id UUID,
  name TEXT,
  rolled_initiative INTEGER,
  round_no INTEGER,
  hit_points_current INTEGER,
  death_save_successes INTEGER,
  death_save_failures INTEGER,
  hit_points_max INTEGER,
  dexterity_score INTEGER,
  base_armor_class INTEGER,
  dex_applies_to_ac BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS participant_id,
    p.name,
    p.rolled_initiative,
    cl.round_no,
    cl.hit_points_current,
    cl.death_save_successes,
    cl.death_save_failures,
    p.hit_points_max,
    sb.dexterity_score,
    sb.base_armor_class,
    sb.dex_applies_to_ac
  FROM participants p
  LEFT JOIN LATERAL (
    SELECT *
    FROM combat_logs cl
    WHERE cl.participant_id = p.id
    ORDER BY cl.round_no DESC
    LIMIT 1
  ) cl ON true
  LEFT JOIN stat_blocks sb ON p.stat_block_id = sb.id
  WHERE p.encounter_id = encounter_id
    AND p.user_id = user_id
    AND p.deleted_at IS NULL
  ORDER BY p.rolled_initiative DESC;
END;
$$ LANGUAGE plpgsql;

CREATE POLICY "Allow authenticated users to insert" ON storage.objects FOR INSERT TO public WITH CHECK (((auth.role() = 'authenticated'::text) AND (bucket_id = 'avatars'::text)));
