import OBR from "@owlbear-rodeo/sdk";
import { getChestMetadata, toggleChestState, upsertChestMetadata } from "./chest";
import { LOOTHEO_CHEST_METADATA_KEY } from "./types";

const TOOL_ID = "io.lootheo.chest-tool";

type ContextItem = string | { id: string };

function getContextItemIds(context: any): string[] {
  const rawItems: ContextItem[] = Array.isArray(context?.items) ? context.items : [];

  return rawItems
    .map((item) => (typeof item === "string" ? item : item?.id))
    .filter((id): id is string => typeof id === "string" && id.length > 0);
}

async function markAsLootheoChest(context: any) {
  const itemIds = getContextItemIds(context);
  if (!itemIds.length) {
    await OBR.notification.show("No hay items seleccionados.", "WARNING");
    return;
  }

  await OBR.scene.items.updateItems(itemIds, (items: any[]) => {
    for (const item of items) {
      const chest = upsertChestMetadata(item, "common");
      item.metadata = {
        ...(item.metadata ?? {}),
        [LOOTHEO_CHEST_METADATA_KEY]: chest
      };
    }
  });

  await OBR.notification.show("Cofre Lootheo agregado al item seleccionado.", "SUCCESS");
}

async function toggleLootheoChestState(context: any) {
  const itemIds = getContextItemIds(context);
  if (!itemIds.length) {
    await OBR.notification.show("No hay items seleccionados.", "WARNING");
    return;
  }

  let updatedCount = 0;

  await OBR.scene.items.updateItems(itemIds, (items: any[]) => {
    for (const item of items) {
      const chest = getChestMetadata(item);
      if (!chest) continue;

      item.metadata = {
        ...(item.metadata ?? {}),
        [LOOTHEO_CHEST_METADATA_KEY]: toggleChestState(chest)
      };
      updatedCount += 1;
    }
  });

  if (!updatedCount) {
    await OBR.notification.show(
      "Los items seleccionados no tienen metadata de cofre Lootheo.",
      "WARNING"
    );
    return;
  }

  await OBR.notification.show(`Estado actualizado en ${updatedCount} cofre(s).`, "SUCCESS");
}

OBR.onReady(async () => {
  await OBR.contextMenu.create({
    id: `${TOOL_ID}/mark-chest`,
    icons: [
      {
        icon: "./icon.svg",
        label: "Agregar Lootheo al cofre"
      }
    ],
    filter: {
      min: 1,
      max: Infinity,
      roles: ["GM"]
    },
    onClick: markAsLootheoChest
  });

  await OBR.contextMenu.create({
    id: `${TOOL_ID}/toggle-state`,
    icons: [
      {
        icon: "./icon.svg",
        label: "Abrir / cerrar cofre Lootheo"
      }
    ],
    filter: {
      min: 1,
      max: Infinity,
      roles: ["GM"]
    },
    onClick: toggleLootheoChestState
  });

  console.log("Lootheo chest tool ready");
});
