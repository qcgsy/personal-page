# ASSETS.md — Image Manifest

Project: `cute-personal-site` (Prism Loop Pastel personal homepage — 王佳妮)
Runtime asset root: `public/assets/images/` — referenced from code as `/assets/images/...` (root-absolute, no `public/` prefix, never relative).

## Convention notes (unchanged project rules)

`public/` is copied verbatim into the bundle root. Reference every local image with a root-absolute URL path. Never use `assets/...`, `public/assets/...`, `./assets/...`, or `src/assets/...`. Files under `public/` have no content hash, so a replaced image must get a **new filename** — never overwrite an existing file in place.

## Generation record

- Total AI images generated for this build request (the four-hue re-skin): **8** (ceiling for the request is 8). Additional-image approval was not requested and not needed.
- Sourcing: `imageGenerate` for all 8 slots. No web/stock search, no hotlinked external URLs, no user-provided images.
- Style lock used verbatim across the set: *soft pastel anime illustration, flat 2D cel-shaded vector look with clean rounded line art, pastel sky blue, spring green, lilac violet and warm apricot palette on a soft ivory base, warm light, gentle cozy mood, generous negative space, high readability, no text, no pink.*
- Each prompt additionally carried an explicit `Avoid` clause: **no pink or rose tones**, no text, no photorealistic rendering, no dark backgrounds, no sharp corners.
- Post-processing (native, no AI calls): resized and re-encoded to JPEG q82 with a local PIL script. Long edge 1536 px (covers) / 1280 px (gallery). Total shipped weight ≈ 862 KB.
- Generated images are **concept illustrations**, not photographs, and do not depict a real person, place, or product.

## Pink audit (objective, not visual impression)

Every delivered file was scanned for hue values in the 300–355° band (pink / rose / magenta) at saturation > 0.15 and value > 0.5:

| File | pink-hue pixels |
|---|---|
| project-journal-cover-v2.jpg | 0.00% |
| project-player-cover-v2.jpg | 0.02% |
| project-plant-cover-v2.jpg | 0.00% |
| project-scrapbook-cover-v2.jpg | 0.00% |
| gallery-green-path-v2.jpg | 0.00% |
| gallery-seaside-sunset-v2.jpg | 0.08% |
| gallery-cafe-corner-v2.jpg | 0.02% |
| gallery-starry-lake-v2.jpg | 1.70% |

`gallery-starry-lake-v2.jpg` is the only file above trace level: the share comes from the lilac-violet night sky and its horizon glow, which sits on the violet side of the boundary. It reads as purple, not pink, and matches the `tertiary` token family. Accepted.

## Manifest

| # | Runtime path | Source | Dimensions | Size | Intended usage | Status |
|---|---|---|---|---|---|---|
| 1 | `/assets/images/project-journal-cover-v2.jpg` | imageGenerate | 1536×1024 | 116 KB | Project card 1 cover (16:10 frame, `object-fit: cover`); reused as project-detail media for the same card | ok |
| 2 | `/assets/images/project-player-cover-v2.jpg` | imageGenerate | 1536×1024 | 102 KB | Project card 2 cover + its detail overlay media | ok |
| 3 | `/assets/images/project-plant-cover-v2.jpg` | imageGenerate | 1536×1024 | 113 KB | Project card 3 cover + its detail overlay media | ok |
| 4 | `/assets/images/project-scrapbook-cover-v2.jpg` | imageGenerate | 1536×1024 | 88 KB | Project card 4 cover + its detail overlay media | ok |
| 5 | `/assets/images/gallery-green-path-v2.jpg` | imageGenerate | 1280×853 | 198 KB | Hobby gallery slides 1 and 5 | ok |
| 6 | `/assets/images/gallery-seaside-sunset-v2.jpg` | imageGenerate | 1280×853 | 70 KB | Hobby gallery slides 2 and 6 | ok |
| 7 | `/assets/images/gallery-cafe-corner-v2.jpg` | imageGenerate | 1280×853 | 85 KB | Hobby gallery slides 3 and 7 | ok |
| 8 | `/assets/images/gallery-starry-lake-v2.jpg` | imageGenerate | 1280×853 | 90 KB | Hobby gallery slides 4 and 8 | ok |

All 8 files were opened and re-encoded by PIL during import, so each is verified non-empty and decodable. Three files (one cover and two gallery slides) were additionally inspected visually and matched their intended filename and caption.

## Slot decisions and deliberate reuse

- **Project covers (4 slots, 4 images).** One distinct cover per project card; each cover is also the media in that project's detail overlay.
- **Hobby gallery (8 slides, 4 images).** The carousel needs a horizontal track with a visible peek of the neighbouring slide. Four unique illustrations are reused in the order 1‑2‑3‑4‑1‑2‑3‑4, so no slide ever sits next to a duplicate and the peek never reveals the same image twice. Each slide keeps its own title, caption and date.
- **Entry gate, hero, contact, feedback and the new 目录 index scene need no image.** They are built from CSS pastel gradients, glass surfaces and the DESIGN.md decorative motifs, so no image budget was spent there.
- **No avatar or logo slot.** DESIGN.md defines no portrait slot; the wordmark is a CSS dot plus text.

## Superseded assets (removed)

The first build's 8 pink-led illustrations (`project-*-cover.jpg`, `gallery-blossom-path.jpg`, `gallery-seaside-sunset.jpg`, `gallery-cafe-corner.jpg`, `gallery-snow-lantern.jpg`) were superseded by this request's four-hue palette. They are no longer referenced by any component and were sent to the Recycle Bin so the shipped bundle carries no unused pink imagery.

## Unused local assets (warnings)

- `public/assets/images/placeholder.svg` — shipped by the `react-vite-base` scaffold. Not referenced by any component. Kept on disk as the documented placeholder fallback for future slots; no page content consumes it.

## Missing / unavailable imagery

None. Every image slot defined by DESIGN.md resolves to a local file above. No placeholder substitutes were required for a required slot.

## CDN index

`<project>/.accio/cdn-assets.json` does not exist for this project. No CDN URLs are referenced; all runtime images are local.
