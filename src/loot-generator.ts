import type { LootItem, LootRarity } from "./types";

const TABLES: Record<LootRarity, LootItem[]> = {
  common: [
    { name: "Poción de curación menor", quantity: 1, rarity: "common", goldValue: 25 },
    { name: "Bolsa de monedas", quantity: 1, rarity: "common", goldValue: 15 },
    { name: "Antorcha alquímica", quantity: 2, rarity: "common", goldValue: 10 }
  ],
  uncommon: [
    { name: "Pergamino arcano I", quantity: 1, rarity: "uncommon", goldValue: 75 },
    { name: "Gema pulida", quantity: 2, rarity: "uncommon", goldValue: 50 },
    { name: "Poción de resistencia", quantity: 1, rarity: "uncommon", goldValue: 90 }
  ],
  rare: [
    { name: "Anillo rúnico", quantity: 1, rarity: "rare", goldValue: 250 },
    { name: "Daga de plata bendita", quantity: 1, rarity: "rare", goldValue: 180 },
    { name: "Reliquia menor", quantity: 1, rarity: "rare", goldValue: 300 }
  ]
};

const randomInt = (maxExclusive: number) => Math.floor(Math.random() * maxExclusive);

export function generateChestLoot(rarity: LootRarity): LootItem[] {
  const table = TABLES[rarity];
  if (!table?.length) return [];

  const picks = rarity === "rare" ? 2 : 1;
  const result: LootItem[] = [];

  for (let i = 0; i < picks; i += 1) {
    const item = table[randomInt(table.length)];
    result.push({ ...item });
  }

  return result;
}
