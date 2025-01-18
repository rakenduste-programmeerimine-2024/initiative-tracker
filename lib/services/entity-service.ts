import { getSupabaseClient } from "@/utils/supabase/client-provider"
import { Entity } from "@/lib/models/entity"
import { TableName } from "@/types/enums/table-name"
import {
  convertTimestamps,
  getAllowedFields,
} from "@/utils/entities/entity-utils"
import { getValidationFunction } from "@/utils/entities/validation-registry"

export function createEntityService<T extends Entity>(tableName: TableName) {
  return {
    // Fetch a single record by id
    async get(
      id: string,
      currentUserId: string,
    ): Promise<{ success: true; data: T }> {
      const supabase = await getSupabaseClient()

      const query = supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .or(`is_public.eq.true,user_id.eq.${currentUserId}`)
        .is("deleted_at", null)
        .single()

      const { data, error } = await query

      if (error) {
        throw new Error(
          `Error fetching record with id=${id} from ${tableName}: ${error.message}`,
        )
      }

      return { success: true, data: convertTimestamps(data) }
    },

    // Fetch multiple records by foreign key
    async getByForeignKey(
      foreignKey: string,
      value: string,
      currentUserId: string,
    ): Promise<{ success: true; data: T[] }> {
      const supabase = await getSupabaseClient()

      const query = supabase
        .from(tableName)
        .select("*")
        .eq(foreignKey, value)
        .or(`is_public.eq.true,user_id.eq.${currentUserId}`)
        .is("deleted_at", null)

      const { data, error } = await query

      if (error) {
        throw new Error(
          `Error fetching ${tableName} records with foreign key ${foreignKey}=${value}: ${error.message}`,
        )
      }

      return { success: true, data: data.map(convertTimestamps) }
    },

    // Fetch multiple records by owner
    async getByUserId(
      foreignKey: string,
      value: string,
      currentUserId: string,
    ): Promise<{ success: true; data: T[] }> {
      const supabase = await getSupabaseClient()

      const query = supabase
        .from(tableName)
        .select("*")
        .or(`user_id.eq.${currentUserId},is_public.eq.true`)
        .is("deleted_at", null)

      // TODO: Consider adding pagination

      const { data, error } = await query

      if (error) {
        throw new Error(
          `Error fetching ${tableName} records with user_id=${currentUserId}: ${error.message}`,
        )
      }

      return { success: true, data: data.map(convertTimestamps) }
    },

    // Fetch a single record's owner id by record's id
    async getUserId(id: string): Promise<string | null> {
      const supabase = await getSupabaseClient()

      const query = supabase
        .from(tableName)
        .select("user_id")
        .eq("id", id)
        .single()

      const { data, error } = await query

      if (error) {
        throw new Error(
          `Error fetching record owner ID with record ID=${id} from ${tableName}: ${error.message}`,
        )
      }

      return data?.user_id || null // Return the user_id if found, else null
    },

    // Create a single record
    async create(
      entity: Partial<T>,
      currentUserId: string,
    ): Promise<{ success: true; data: T }> {
      const supabase = await getSupabaseClient()

      const allowedInserts = getAllowedFields(entity)

      const recordToInsert: Partial<T> = {
        ...allowedInserts,
        created_at: new Date().toISOString(),
        modified_at: null,
        deleted_at: null,
        user_id: currentUserId,
      } as unknown as Partial<T>

      const validate = getValidationFunction<T>(tableName)
      if (validate) validate(recordToInsert)

      const query = supabase
        .from(tableName)
        .insert([recordToInsert])
        .select("*")
        .single()

      const { data, error } = await query

      if (error) {
        throw new Error(`Error creating ${tableName} record: ${error.message}`)
      }

      return { success: true, data: convertTimestamps(data) }
    },

    // Update a single record
    async update(
      id: string,
      entity: Partial<T>,
      currentUserId: string,
    ): Promise<{ success: true; data: T }> {
      const supabase = await getSupabaseClient()

      const allowedUpdates = getAllowedFields(entity)

      const recordToUpdate: Partial<T> = {
        ...allowedUpdates,
        modified_at: new Date().toISOString(),
      } as unknown as Partial<T>

      const validate = getValidationFunction<T>(tableName)
      if (validate) validate(recordToUpdate)

      const query = supabase
        .from(tableName)
        .update(recordToUpdate)
        .eq("id", id)
        .eq("user_id", currentUserId)
        .select("*")
        .single()

      const { data, error } = await query

      if (error) {
        throw new Error(
          `Error updating ${tableName} record with id=${id}: ${error.message}`,
        )
      }

      return { success: true, data: convertTimestamps(data) }
    },

    // Soft-delete a single record
    async softDelete(
      id: string,
      currentUserId: string,
    ): Promise<{ success: true; id: string }> {
      const supabase = await getSupabaseClient()
      
      const query = supabase
        .from(tableName)
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", currentUserId)
        .select("id")
        .single()

      const { data, error } = await query

      if (error) {
        throw new Error(
          `Error soft-deleting ${tableName} record with id=${id}: ${error.message}`,
        )
      }

      return { success: true, id: data.id }
    },

    // Hard-delete a single record
    async hardDelete(
      id: string,
      currentUserId: string,
    ): Promise<{ success: true; id: string }> {
      const supabase = await getSupabaseClient()

      const query = supabase
        .from(tableName)
        .delete()
        .eq("id", id)
        .eq("user_id", currentUserId)
        .select("id")
        .single()

      const { data, error } = await query

      if (error) {
        throw new Error(
          `Error hard-deleting ${tableName} record with id=${id}: ${error.message}`,
        )
      }

      return { success: true, id: data.id }
    },
  }
}
