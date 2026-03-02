# Lootheo for Owlbear Rodeo

Extensión MVP para integrar **Lootheo** en Owlbear Rodeo empezando por cofres en el mapa.

## Qué hace este MVP

- Registra una acción de menú contextual llamada **"Agregar Lootheo al cofre"** para los items seleccionados.
- Marca el item como cofre con metadata propia (`io.lootheo.chest`).
- Genera botín inicial con una tabla simple por rareza.
- Permite abrir/cerrar el cofre y mantener el estado persistido en metadata.

## Estructura

- `manifest.json`: manifiesto de la extensión.
- `src/main.ts`: punto de entrada de la integración con el SDK.
- `src/chest.ts`: utilidades de metadata para cofres.
- `src/loot-generator.ts`: motor de generación inicial para Lootheo.
- `src/types.ts`: tipos compartidos.

## Siguiente paso recomendado

Agregar proveedores de fuentes de botín (`chest`, `monster`, `puzzle`) con una interfaz común para escalar el sistema.
