# Oh KAY Gamers — Claude Session Notes

## Last Session: 2026-06-04
## Status: Link contrast fix DONE (committed+pushed cec5e16). Email marketing strategy brainstormed — planning only, nothing built.

### Changes this session (2026-06-04)
- **Link color fix** (`src/styles/global.css`, commit cec5e16, pushed): links changed from
  `--accent` (#8b0000, ~2.1:1 contrast on black, FAILED WCAG AA) → `--accent-bright`
  (#b91c1c, ~3.3:1). Kay chose on-brand red over full AA (#e74c3c/~5.5:1 was offered, declined).
- Readability audit: bg #000, headings #f0e6e6 (great), body #9a8080 (OK ~5.8:1). Theme fine;
  only links were weak. Now fixed.

### Email marketing plan (BRAINSTORM — decisions made, NOT built)
Tool: **Omnisend** (free tier ~250 contacts / 500 emails/mo to start).
- **Two audiences, ONE Omnisend account, segmented by TAGS** (not separate lists):
  - `gamers` — horror/game fans. Magnets: free demo (itch WebGL embed), free Steam key at launch
    + wishlist, beta list, giveaways/sweepstakes.
  - `readers` — **readers of Kay's FICTION** (confirmed, NOT copywriting clients). Magnets: free
    Book 1/prequel, discount on next book, deleted scenes/bonus content.
  - Each page shows only its form → auto-tags the subscriber.
- **Series funnel** (Kay's idea, refined): each book sells the next. Book 1 = cheap/free hook →
  "join list + wishlist for discount on Book 2" → nurture between launches → repeat to Book 3.
  Lead with Book 1 as magnet (not 2). Don't make coupon the ONLY reason to join (add bonus content).
- **Sales channels = Steam + Android** (NOT Amazon/ebook). Coupon mechanics differ:
  - Steam: wishlist = email-equivalent. Valve forbids selling keys below Steam price off-platform,
    so NO per-person codes — use a timed Steam SALE + email the list; free keys for top fans.
  - Android/Google Play: Play Console PROMO CODES = real emailable coupons ✅ (cleanest coupon path).
- **OPEN Q (ask Kay next time):** are the novellas the same as the book-games (e.g. EverThawe), or
  separate prose stories? Book-games blur the gamers/readers wall — changes tagging.

### Next steps for email work
1. Confirm novellas = book-games vs prose (changes tagging).
2. Sketch sequences: welcome → between-launch nurture → launch-day sale blast.
3. Build Omnisend forms (gamers + readers, each auto-tagging) → add to relevant pages.
4. Add end-screen/back-of-book CTAs in games → signup + Steam wishlist.

---

## Last Session: 2026-05-26
## Status: Added "The Hefty Workload of Making a Game" — second Origin Stories post — live on localhost & verified. Not yet committed/pushed (Kay to review first).

## What was changed this session (2026-05-26, part 3)
- Added dedicated **/everthawe** page (`src/pages/everthawe.astro`) for Kay's hybrid book-and-game project (Door to the EverThawe, set in the world of Neridia).
- Added "EverThawe" nav link in `src/components/Header.astro` between Games and Blog.
- Page structure: hero (title + tagline + divider) → The Project (placeholder description, Kay to rewrite in her voice) → The World (Neridia/EverThawe, with an atmospheric pull-quote placeholder) → Status & Platforms (In Development, PC + Android + WebGL soon) → Follow the Build CTA → blog link.
- Visual style matches site palette (black + red accent, Cinzel + Crimson Text). Added one new visual element: atmospheric italic blockquote with left border for in-world prose excerpts.
- Several `<!-- KAY -->` comments left in place where she should drop her own copy when ready (project description, in-world quote, etc.).
- Verified live: /everthawe → 200, nav link renders on every page (verified on homepage).

## What was changed this session (2026-05-26)
- Added `src/content/blog/hefty-workload-of-making-a-game.md` — "The Hefty Workload of Making a Game". Origin Stories category, 2nd of its kind. Light spelling/grammar polish on Kay's draft (preserved voice — kept her dashes, parenthetical asides, "And"-starts).
- Added `src/assets/blog/hefty-workload-hero.jpg` (matrix code, source: wastedgeneration-digital-8280790.jpg).
- Added 2 inline images in `public/images/blog/hefty-workload-of-making-a-game/`:
  - `solo-dev.png` — after "Life as an Indie Developer" section (source: mzaya_blan-boy-9087310_1280.png)
  - `the-vision.jpg` — before "Is It Worth It?" section (source: facusio-fantasy-world-7446064.jpg)
- Verified live on localhost:4321: post 200, index 200, /blog/category/origin-stories/ 200, both inline images 200.

### Fix: blog card "only image is clickable" bug
- **Root cause**: Card markup had nested `<a>` (outer `.post-card` wrapping inner `.post-category`). HTML5 forbids nested anchors — browsers silently close the outer `<a>` when they hit the inner one. Result: image was inside the outer link, but title/desc/date/tags after the category chip ended up *outside* the link in the DOM. So only the image was clickable.
- **Fix**: Switched to the standard "card with title link expanded via `::after`" pattern.
  - `.post-card` is now a `<div>` (not an `<a>`) with `position: relative`.
  - Post title is now `<h2 class="post-title"><a href=...>{title}</a></h2>` — title text is the actual semantic link (good for a11y + SEO).
  - `.post-title a::after { content:''; position:absolute; inset:0; }` expands the title link's click area over the entire card — clicking image, description, date, or empty space all navigate to the post.
  - `.post-category` got `position: relative; z-index: 1` so it stays above the `::after` and remains independently clickable.
  - Removed now-unnecessary `onclick="event.stopPropagation()"` from `.post-category`.
- **Files**: `src/pages/blog/index.astro`, `src/pages/blog/category/[category].astro` (identical fix in both — same card pattern).
- **Home page**: also uses a card-link, but doesn't nest an inner `<a>`, so it already worked — left alone.

## Previous session (2026-05-16)
Added "Paranoia — Devlog #1" + launched **Devlogs** category — live & verified, committed (edb4bf4)

## How YouTube embeds work (for Kay) — IMPORTANT
**Use `.mdx`, not `.md`, for any post with YouTube videos.**

In `.mdx` posts, add the import once at the top, then drop a component per video:
```mdx
import { YouTube } from 'astro-embed';

<YouTube id="0HjdiohVOik" />
```
This is the ONLY method that actually works. The old "bare URL on its own line in a
`.md` file auto-embeds" claim is **FALSE** — it silently renders an empty `<div></div>`.
Tested 2026-05-14.

Powered by `astro-embed` (already in `astro.config.mjs`). Player is `<lite-youtube>` —
only loads the heavy YouTube JS after a user clicks Play, so page stays fast.

## Gotcha: renaming a post's extension (.md <-> .mdx)
If you change a post file from `.md` to `.mdx` (or vice versa) while the dev server
runs, the content-collection cache breaks -> 500 `UnknownContentCollectionError`.
Fix: kill node, delete `.astro/data-store.json` + `node_modules/.vite`, restart `npm run dev`.

## How new-tab links work (for Kay)
- **Blog posts (`.md`/`.mdx`):** Every external link auto-gets `target="_blank" rel="noopener noreferrer"` via `rehype-external-links`. Internal links (relative paths) stay in same tab.
- **Astro page files (`.astro`):** Hand-written `<a>` tags need it set manually. All current ones (Header GitHub link, games.astro Steam/itch links) are correct.

## What was changed this session (2026-05-16)
- Added `src/content/blog/paranoia-devlog-1.mdx` — "Paranoia — Devlog #1: What If My Game Fails?". Light spelling/spacing edits to Kay's draft (preserved voice). 1 YouTube embed (`R94ZsdALbpw`), Steam demo link, two section subheads added.
- Added `src/assets/blog/paranoia-devlog-1-hero.jpg` (Kay-supplied matrix art from Downloads).
- **New category "Devlogs"** — first post of its kind. Chip auto-renders on `/blog/` and `/blog/category/devlogs/` because the chip system is dynamic (no nav edits needed).

## Verified live (2026-05-16)
- `/blog/paranoia-devlog-1/` → 200, hero image renders, YouTube `R94ZsdALbpw` embed present, Steam link present.
- `/blog/` → 200, Devlogs (1) chip shows alongside Spotlight (3) and Origin Stories (1). New post sits at top of list.
- `/blog/category/devlogs/` → 200, lists the one post.

## Previous session (2026-05-14)
- Added `src/content/blog/idols-of-ash.mdx` — "Idols of Ash" spotlight post (2 YouTube embeds, Steam links, grammar-edited from Kay's draft).
- Corrected the YouTube-embed notes above (`.md` auto-embed does NOT work).

## Next Steps (optional)
- Kay to source/add a hero image for the Idols of Ash post.
- If Kay adds new `.astro` pages with external links, remember to include `target="_blank" rel="noopener noreferrer"` manually
- Consider a `<YTEmbed />` Astro component if she wants captions or custom thumbnail per video

## Known Issues
None.
