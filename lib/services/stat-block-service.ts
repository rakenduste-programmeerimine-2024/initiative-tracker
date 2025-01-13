import { createEntityService } from "@/lib/services/entity-service"
import { TableName } from "@/types/enums/table-name"
import { StatBlock } from "@/lib/models/stat-block"

const StatBlockService = {
  ...createEntityService<StatBlock>(TableName.StatBlocks),
}

export default StatBlockService
