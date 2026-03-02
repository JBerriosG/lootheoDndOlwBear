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

## ¿Qué link va en Owlbear Rodeo Extension Management?

Owlbear te pide una **URL pública al `manifest.json`** de la extensión.

Formato esperado:

```txt
https://tu-dominio-o-hosting/manifest.json
```

Ejemplos válidos:

- `https://tuusuario.github.io/lootheoDndOlwBear/manifest.json`
- `https://lootheo-extension.netlify.app/manifest.json`

## Opción recomendada: GitHub Pages (rápida)

1. Sube este repo a GitHub.
2. Activa **GitHub Pages** para la rama principal (root o carpeta `docs`, según prefieras).
3. Asegúrate de publicar estos archivos en la raíz del sitio:
   - `manifest.json`
   - `index.html`
   - `icon.svg`
   - assets de build (si compilas)
4. Copia la URL pública del manifest:

```txt
https://<usuario>.github.io/<repo>/manifest.json
```

5. En Owlbear Rodeo:
   - abre **Manage Extensions**
   - pega esa URL
   - instala la extensión

## Probar localmente (solo desarrollo)

Si quieres validar antes de publicar, necesitas un URL público temporal (localhost no sirve directo en Owlbear).

1. Instala dependencias y levanta Vite:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

2. Expón el puerto con un túnel (Cloudflare Tunnel, ngrok, etc.).
3. Usa la URL pública del túnel apuntando a `manifest.json`.

## Siguiente paso recomendado

Agregar proveedores de fuentes de botín (`chest`, `monster`, `puzzle`) con una interfaz común para escalar el sistema.

## Nota sobre `homepage_url`

Buena observación: **no es obligatorio** poner la URL del tutorial de Owlbear en `homepage_url`.

- `homepage_url` debe apuntar a la página oficial de **tu extensión/proyecto** (por ejemplo, tu repo o landing).
- Si aún no tienes una URL propia, es mejor **omitir ese campo** en el `manifest`.
- Lo único imprescindible para instalar en Owlbear es que la URL que pegues en Extension Management apunte a tu `manifest.json` público.

