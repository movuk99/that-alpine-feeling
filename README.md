# That Alpine Feeling

Landing page de mi solicitud a la **Pulp Friction Creative Grant** (Bedrock Foundation, 2026).
Documental de montaña · Perú y Bolivia · 2027.

Página publicada: https://movuk99.github.io/that-alpine-feeling/

Es HTML, CSS y JavaScript sin frameworks ni build. Funciona igual en GitHub Pages que abriendo `index.html` en local.

```
index.html   → estructura de la página (fotos, título, contacto)
styles.css   → diseño (colores, tipografías, tamaños, fundidos)
script.js    → CONFIGURACIÓN: frases, video, contactos
images/      → fotos (01.jpg, 02.jpg…), imagen para compartir (og.jpg) y favicon
```

---

## 1. Cambiar las frases, el video y los contactos

Todo está al principio de **`script.js`**, en el objeto `CONFIG`:

```js
const CONFIG = {
  VIDEO_URL: "",                      // link del video
  EMAIL: "",                          // vacío = no se muestra
  PORTFOLIO_URL: "https://movuk.me",
  INSTAGRAM: "outdoorscmt",           // sin la @
  QUESTION: "Have you ever felt minuscule in a place so gigantic?",
  PHRASES: [ "...", "...", ... ],     // una por foto, en orden
  CLOSING_LINE: "...",                // línea pequeña sobre el botón del video
};
```

- **Video:** pega el link entre las comillas de `VIDEO_URL` (YouTube, Vimeo, Drive…). El botón está al final, debajo de la última frase. Mientras esté vacío, dice *Video coming soon* y está desactivado. Con link, dice *Watch the video* y lo abre en una pestaña nueva.
- **Frases:** cada línea de `PHRASES` corresponde a una foto (el comentario `// 02.jpg` indica cuál). La última va sin foto, debajo del título *That Alpine Feeling*. Mantén las comillas y la coma al final de cada línea.
- **Email:** si lo dejas vacío, no aparece.

> Las mismas frases están también escritas en `index.html`. Solo se usan si el JavaScript no carga (casi nunca). Si quieres que coincidan siempre, cámbialas en los dos sitios.

- **Línea pequeña:** `CLOSING_LINE` es el texto en letra pequeña entre la última frase y el botón del video.

La mini bio del final está directamente en `index.html`.

**Tamaño de las frases:** al principio de `styles.css` están `--question-size` (la pregunta inicial) y `--phrase-size` (el resto). Las frases usan Helvetica Bold. En Mac e iPhone sale Helvetica; en Windows y Android, que no la traen, se ve Arial, que es casi igual.

**Fundido entre fotos:** al hacer scroll, cada foto aparece con un fundido sobre la anterior. La duración se cambia en `--fade` (por defecto `1.1s`), también al principio de `styles.css`. Si el visitante tiene activada la opción de reducir movimiento en su dispositivo, las fotos pasan con un scroll normal, sin fundidos.

## 2. Reemplazar las fotos

1. Prepara la foto: JPG de unos **2000 px de ancho** y **menos de 400 KB**. Sin instalar nada: [squoosh.app](https://squoosh.app) (Resize → width 2000, MozJPEG, calidad 70–75).
2. Ponle **exactamente el mismo nombre** que la que sustituye (`01.jpg`, `02.jpg`…) y súbela a `images/`.
3. Actualiza el texto `alt="…"` de esa foto en `index.html` (describe lo que se ve; lo usan los lectores de pantalla).

Qué foto va dónde:

Todas las fotos ocupan la pantalla completa, con su frase centrada encima.

| Archivo | Foto actual | Frase |
|---|---|---|
| `01.jpg` | Atardecer analógico en el cráter | La pregunta inicial |
| `02.jpg` | Dos montañeros sobre el Pirineo | `PHRASES[0]` |
| `03.jpg` | Cumbre en blanco y negro | `PHRASES[1]` |
| `04.jpg` | Flores y volcán nevado | `PHRASES[2]` |
| `05.jpg` | Amanecer en la nieve | `PHRASES[3]` |
| `og.jpg` | Vista previa al compartir el link (1200 × 630 px) | — |

**Ajustar el encuadre:** si una foto se recorta mal (sobre todo en móvil, donde se ve en vertical), cambia o añade en su `<img>` un `style="--pos: 70% 50%"`. El primer número mueve el encuadre en horizontal (0% izquierda, 100% derecha) y el segundo en vertical.

**Añadir o quitar fotos:** en `index.html`, copia o borra un bloque `<figure class="frame"> … </figure>` completo, cambia el `src` (por ejemplo `images/06.jpg`) y el número de `data-phrase`, y añade la frase en `PHRASES` en esa misma posición.

**Imagen al compartir:** después de cambiar `og.jpg`, WhatsApp y otras apps pueden tardar en refrescar la vista previa porque la guardan en caché.

## 3. Editar y publicar desde la web de GitHub (sin instalar nada)

1. Entra en https://github.com/movuk99/that-alpine-feeling.
2. **Editar texto:** abre el archivo (por ejemplo `script.js`), pulsa el lápiz ✏️ (*Edit this file*), cambia lo que quieras y pulsa **Commit changes…**. Escribe un mensaje corto y claro (*Update video link*) y confirma.
3. **Subir fotos:** entra en la carpeta `images`, pulsa **Add file → Upload files**, arrastra las fotos (con el mismo nombre para sustituir) y pulsa **Commit changes**.
4. GitHub Pages vuelve a publicar solo. En 1–2 minutos verás el cambio en la página (si no, recarga con Cmd+Shift+R). El progreso se ve en la pestaña **Actions**.

> **Caché:** los navegadores guardan `script.js` y `styles.css` hasta 10 minutos. Si cambias alguno de los dos, sube también el número de versión en `index.html` (`script.js?v=3` → `?v=4`, `styles.css?v=3` → `?v=4`). Así quien ya visitó la página recibe la versión nueva al momento.

## 4. Conectar un dominio propio (por ejemplo `film.movuk.me`)

1. En el panel de tu proveedor de dominio (donde gestionas `movuk.me`), crea un registro DNS:
   - **Tipo:** `CNAME`
   - **Nombre / host:** `film` (o el subdominio que quieras)
   - **Valor / destino:** `movuk99.github.io`
2. En GitHub: **Settings → Pages → Custom domain**, escribe `film.movuk.me` y pulsa **Save**. GitHub creará un archivo `CNAME` en el repositorio; no lo borres.
3. Cuando el DNS se propague (de minutos a unas horas), marca **Enforce HTTPS**.
4. En `index.html`, cambia las URLs que empiezan por `https://movuk99.github.io/that-alpine-feeling/` (canonical, `og:url`, `og:image` y `twitter:image`) por `https://film.movuk.me/`.

La dirección antigua de GitHub Pages redirigirá sola al dominio nuevo.
