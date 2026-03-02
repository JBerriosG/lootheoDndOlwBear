export const LOOTHEO_CHEST_METADATA_KEY = "io.lootheo.chest";

export type LootRarity = "common" | "uncommon" | "rare";

export interface LootItem {
  name: string;
  quantity: number;
  rarity: LootRarity;
  goldValue: number;
}

export interface ChestMetadata {
  source: "chest";
  state: "closed" | "opened";
  rarity: LootRarity;
  generatedLoot: LootItem[];
  generatedAt: string;
}
