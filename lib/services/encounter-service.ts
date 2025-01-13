import { createEntityService } from "@/lib/services/entity-service"
import { TableName } from "@/types/enums/table-name"
import { Encounter } from "@/lib/models/encounter"

const EncounterService = {
  ...createEntityService<Encounter>(TableName.Encounters),
}

export default EncounterService
