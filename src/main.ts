import OBR from "@owlbear-rodeo/sdk";
import { getChestMetadata, toggleChestState, upsertChestMetadata } from "../chest";
import { LOOTHEO_CHEST_METADATA_KEY } from "../types";

const TOOL_ID = "io.lootheo.chest-tool";

OBR.onReady(async () => {
  await OBR.contextMenu.create({
    id: `${TOOL_ID}/mark-chest`,
    icons: [
      {
        icon: "/icon.svg",
        label: "Agregar Lootheo al cofre"
      }
    ],
    filter: {
      min: 1,
      max: Infinity,
      roles: ["GM"]
    },
    onClick: async (context) => {
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (const item of items) {
          const chest = upsertChestMetadata(item, "common");
          item.metadata = {
            ...(item.metadata ?? {}),
            [LOOTHEO_CHEST_METADATA_KEY]: chest
          };
        }
      });
    }
  });

  await OBR.contextMenu.create({
    id: `${TOOL_ID}/toggle-state`,
    icons: [
      {
        icon: "/icon.svg",
        label: "Abrir / cerrar cofre Lootheo"
      }
    ],
    filter: {
      min: 1,
      max: Infinity,
      roles: ["GM"]
    },
    onClick: async (context) => {
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (const item of items) {
          const chest = getChestMetadata(item);
          if (!chest) continue;
          item.metadata = {
            ...(item.metadata ?? {}),
            [LOOTHEO_CHEST_METADATA_KEY]: toggleChestState(chest)
          };
        }
      });
    }
  });

  console.log("Lootheo chest tool ready");
});
