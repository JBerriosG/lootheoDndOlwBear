import type { ChestMetadata, LootRarity } from "../types";
import { LOOTHEO_CHEST_METADATA_KEY } from "../types";
import { generateChestLoot } from "../loot-generator";

interface ItemLike {
  id: string;
  metadata?: Record<string, unknown>;
}

export function getChestMetadata(item: ItemLike): ChestMetadata | undefined {
  return item.metadata?.[LOOTHEO_CHEST_METADATA_KEY] as ChestMetadata | undefined;
}

export function upsertChestMetadata(item: ItemLike, rarity: LootRarity): ChestMetadata {
  const existing = getChestMetadata(item);
  if (existing) return existing;

  return {
    source: "chest",
    state: "closed",
    rarity,
    generatedLoot: generateChestLoot(rarity),
    generatedAt: new Date().toISOString()
  };
}

export function toggleChestState(chest: ChestMetadata): ChestMetadata {
  return {
    ...chest,
    state: chest.state === "closed" ? "opened" : "closed"
  };
}
