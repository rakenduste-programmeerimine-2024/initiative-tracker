import { createEntityService } from "@/lib/services/entity-service"
import { TableName } from "@/types/enums/table-name"
import {
  StatBlock,
  StatBlockDTO,
  StatBlockUtils,
} from "@/lib/models/stat-block"

const StatBlockService = {
  ...createEntityService<StatBlock, StatBlockDTO>(
    TableName.StatBlocks,
    StatBlockUtils.mapToDTO,
  ),
}

export default StatBlockService
