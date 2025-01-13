import { createEntityService } from "@/lib/services/entity-service"
import { TableName } from "@/types/enums/table-name"
import { Participant } from "@/lib/models/participant"

const ParticipantService = {
  ...createEntityService<Participant>(TableName.Participants),
}

export default ParticipantService
