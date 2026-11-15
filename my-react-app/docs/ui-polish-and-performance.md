# UI polish and performance

All seven Home improvements and seven site-wide improvements are implemented within the existing navy, blue and white theme.

The subsequent Services-card and About refinement is detailed in `services-about-premium.md`.

## Home

1. Hero typography, text contrast, spacing and actions were refined, with concrete website/mobile/business-system copy.
2. Three compact capability cards link to matching Services sections.
3. A featured ecommerce concept reuses the existing optimized image and links to the Work showcase. It remains clearly illustrative.
4. Studio Method keeps its four scenes in a more compact layout with shorter copy and consistent image framing.
5. Benefits now explain clear scope, visible progress and thoughtful handover.
6. A navy closing invitation provides a project link and WhatsApp alternative.
7. A keyboard-accessible scroll cue replaces the static reel count and focuses Studio Method. Deep links focus their destination after the page loader.

## Across pages

1. Header spacing, content widths, title scale and artwork placement use a shared rhythm, including About.
2. Service and project cards have thin borders, balanced padding, modest rounding and restrained hover depth.
3. The first Work concept is a wide featured card without duplicating it in the grid. Category filtering still works.
4. FAQ and scope disclosures retain native details/summary behavior with plus/minus indicators and clear open styling.
5. The Services process has connecting lines on desktop and a vertical sequence on smaller screens.
6. Primary, secondary and text actions share a consistent button foundation.
7. Work ends with a project invitation that preserves the inquiry subject when navigating to Contact.

## Performance

The previous production artifact was measured before edits. Gzip-size comparisons use the same Node gzip settings and all emitted JS/CSS files. These are resource-size measurements, not real-device load-time benchmarks.

| Resource | Before | After, approximately |
| --- | ---: | ---: |
| JavaScript, minified | 412 KB | 299 KB |
| JavaScript, gzip estimate | 133 KB | 95.4 KB, about 28.3% smaller |
| CSS, gzip estimate | 16.2 KB | 15.6 KB, about 3.4% smaller |
| JavaScript, prebuilt Brotli | Not generated | 82 KB |
| CSS, prebuilt Brotli | Not generated | 13 KB |

The raw CSS output is slightly larger because of the new styling, while its compressed size is lower. The animation runtime dependency was removed; CSS handles entrances and one shared IntersectionObserver reveals Home sections once. All 22 original scene images remain intact, with 640px and 960px derivatives selected through srcset. Comparing all 22 at one width, the originals total 3,672,296 bytes; 640px variants total 1,038,970 bytes and 960px variants 1,706,144 bytes. Each browser selects a suitable version, rather than downloading every variant.

Extra font stylesheet imports were removed; the existing HTML font stylesheet supplies the shared typography. The ambient video pauses when offscreen or the document is hidden. Reduced motion and Save-Data use the poster without mounting/downloading the video. Unsupported observers leave content visible. The named loaders still finish before destination image elements mount.

Builds now generate Brotli/gzip text files. The included Node production server negotiates pre-compressed files, respects encoding preferences, supplies Vary headers and leaves video range responses uncompressed. This avoids runtime compression work. Static hosting platforms need to enable their equivalent compression behavior.

## Validation

Run `npm run check` for ESLint, a fresh production build and 24 automated checks. Coverage includes loader ordering, responsive derivatives and alpha, resource budgets, metadata, error handling, FAQ disclosure behavior, mobile keyboard navigation, contact drafts, Home section links, featured-concept/inquiry navigation, reveal cleanup, video pause/resume, Save-Data fallback and the refined Services/About navigation.

No connected browser or real phone was available. Visual layout, rendered animation smoothness and actual browser Core Web Vitals remain unverified; JSDOM and artifact-size checks do not replace those measurements. No deployment was performed.
