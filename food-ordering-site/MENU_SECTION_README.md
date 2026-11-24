# Menu Section – Food & Beverage Ordering

**Part of:** Online Food Ordering Web Application (Web Programming group project)
**Section owner:** Ari
**Design reference:** dark restaurant landing-page style (black background, red + yellow accents,
serif headline, round dish photos on dark cards) combined with the ordering flow of Korean delivery
apps such as Coupang Eats (category icon row, delivery time / fee / minimum order, floating "View cart" bar).
Icons use Google's **Material Symbols** icon font instead of emoji.

## How to see it
1. Open `index.html` in Chrome.
2. Photos load from Wikimedia Commons automatically (internet needed).
3. To put the photos **inside the `/images` folder** for submission (works offline):
   - Mac: open Terminal in this folder and run `bash get-images.sh`
   - Windows: double-click `get-images.bat`
   The page always tries `images/<dish>.jpg` first and only uses the online copy if the local file is missing.

## Menu: 38 items (28 foods + 10 drinks)
| Category | Foods | Drinks |
|---|---|---|
| Mongolian | Khuushuur, Buuz, Tsuivan, Bansh, Guriltai Shul | Suutei Tsai |
| Malaysian | Nasi Lemak, Roti Canai, Char Kway Teow, Chicken Satay, Curry Laksa | Teh Tarik |
| Thai | Pad Thai, Tom Yum Goong, Green Curry, Pad Krapow Moo, Mango Sticky Rice, Som Tam | Thai Iced Tea |
| Korean | Dolsot Bibimbap, Tteokbokki, Yangnyeom Chicken, Kimchi Jjigae, Bulgogi Rice Set, Japchae | Sikhye |
| Japanese | Tonkotsu Ramen, Nigiri Sushi, Katsudon, Takoyaki, Pan-fried Gyoza, Tempura Set | Iced Matcha Latte |
| Soft drinks | – | Mineral Water, Sparkling Water, Cola, Lemon-Lime Soda, Orange Soda |

Prices are in Korean won (₩1,500 – ₩23,000) and were set to look like typical Seoul delivery prices.
Ratings and review counts are sample data for the prototype.

## How this section meets the assignment brief
| Requirement | Where |
|---|---|
| Semantic HTML5 | `<section id="menu">`, each dish is an `<article>`, photo in `<figure>`, `<header>`/`<footer>` inside the cart, `<aside>` for the cart drawer, `<dl>` for the price summary |
| ≥5 items with name, price, description, image, link | 38 `<article>` cards; each has a **View details** link (`<a href="#desc-…">`) and an **+ Add** order button |
| Navigation anchor link | `#menu` (and the cart bar links to `#cart`) |
| CSS typography / colours | Alegreya (serif headings) + Noto Sans KR (body) from Google Fonts; black / red / yellow palette in CSS variables |
| Flexbox / Grid | Menu uses **CSS Grid** (`auto-fill, minmax(250px, 1fr)`); cards, chips, cart rows use **Flexbox** |
| Hover effects on buttons & links | Cards lift + photo zooms; category icons rise; **+ Add**, links, cart bar and checkout change colour |
| Responsive | ≤640px switches to a delivery-app list (text left, square photo right), toolbar stops being sticky, chips scroll sideways |
| JS: show/hide description on click | **View details / Hide details** toggles the `hidden` description and updates `aria-expanded` |
| JS additional feature – **Search/filter** | Live search box + cuisine chips (All / Mongolian / Malaysian / Thai / Korean / Japanese / Drinks, where Drinks shows all 10 drinks) + sort (price, rating) |
| JS additional feature – **Add to cart** | Cart drawer with quantity +/−, remove, subtotal, ₩3,000 delivery fee (free over ₩25,000), ₩10,000 minimum order, "Place order" confirmation with order number; cart is saved in `localStorage` |

## JavaScript concepts used (useful for the report)
- **DOM selection & manipulation:** `querySelector`, `createElement`, `appendChild` (re-ordering cards when sorting), toggling `hidden` and classes
- **Event handling:** `click`, `input`, `change`, `keydown` (Esc closes the cart), `error` (image fallback)
- **Event delegation:** one click listener on the grid handles all 38 cards
- **`data-*` attributes:** price, cuisine, rating and order stored on each `<article>`
- **Array methods:** `filter`, `sort`, `map`, `forEach`
- **Template literals** for cart rows and money formatting with `toLocaleString("ko-KR")`
- **localStorage + try/catch** so the cart survives a page refresh
- **Accessibility:** `aria-expanded`, `aria-pressed`, `aria-live` count and toast, visible focus outline, `prefers-reduced-motion`

## Merging into the group's index.html
- HTML: copy everything between `<!-- ===== MENU SECTION START ===== -->` and `<!-- ===== MENU SECTION END ===== -->`.
- CSS: copy section 1 (variables) and section 4–5 of `styles.css` (all classes start with `.menu-`).
- JS: copy `initMenu()` and the `DOMContentLoaded` line. It does not touch other sections.
- Dark mode: if a teammate builds a toggle, setting `<body data-theme="dark">` restyles the menu automatically.
- The header, contact section and footer in this file are only placeholders for testing.

## Testing done
| Test | Result |
|---|---|
| Search "ramen" | 1 item |
| Mongolian / Malaysian / Thai / Korean / Japanese / Drinks / All | 6 / 6 / 7 / 7 / 7 / 10 / 38 items |
| Search with no match | "No dishes match" message shown |
| Sort price low→high | Mineral Water (₩1,500) first |
| View details clicked twice | Description shows, then hides |
| Cart below ₩10,000 | Place order disabled + warning |
| Cart ₩41,400 | Delivery "Free" |
| Remove item → ₩22,900 | Delivery ₩3,000, "Add ₩2,100 more for free delivery" |
| Place order | Confirmation with order number, cart cleared |
| Mobile 390px | List layout, floating cart bar |
| Console | No JavaScript errors |

## Photo credits
See `IMAGE_CREDITS.md` (Wikimedia Commons, free licences).
