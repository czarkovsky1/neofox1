# NEOFOX — strona główna

Statyczna strona (HTML/CSS/JS, bez frameworka/buildu) odtwarzająca makietę Figma
"NEOFOX — producent reklam" (neony, kasetony, litery przestrzenne, montaż reklam).
Obecnie budowana **tylko pod desktop** — responsywność (mobile/tablet) będzie
robiona w kolejnym etapie, więc nie ma jeszcze media queries.

## Struktura plików

```
index.html          – cała strona, jedna sekcja po drugiej
css/style.css        – wszystkie style (jeden plik, sekcje oddzielone komentarzami)
js/main.js            – hero slider + karuzela opinii (vanilla JS, bez zależności)
assets/logo/          – logo (logoneofox.svg)
assets/images/         – zdjęcia sekcji (hero, "Dwa Noże", "Cześć piękna" itd.)
assets/images/tiles/   – zdjęcia kafelków usług
koszyk.svg, ludzik.svg, lupka.svg, serce.svg  – ikony header (cart/user/search/heart),
  na razie NIEUŻYWANE — w HTML ikony header są inline SVG. Do podpięcia na życzenie.
.Codex/launch.json    – konfiguracja lokalnego serwera podglądu (npx serve, port 5173)
```

Brak systemu budowania — otwiera się `index.html` bezpośrednio albo przez
prosty statyczny serwer (`npx serve .`).

## Siatka / layout

- **Content width = 1200px**, wyśrodkowane na stronie. Realizowane przez klasę
  `.container`: `max-width: 1280px` (czyli 1200 + 2×40px paddingu), `padding: 0 40px`.
  Efektywna szerokość treści to zawsze 1200px na ekranach ≥1280px.
- **Zdjęcia w tle mogą "wychodzić" poza tę siatkę** i dotykać krawędzi ekranu
  (hero, sekcja "Ale ile to będzie kosztować", sekcja "Jak wygląda współpraca z nami").
  Tekst/formularze zawsze trzymają się siatki 1200px, zdjęcia są pełną szerokością/
  wysokością kolumny i się bleedują.
- Gdy trzeba wyrównać element do prawej/lewej krawędzi siatki 1200px w sekcji,
  która sama nie jest opakowana w `.container` (np. bo pół sekcji to zdjęcie na
  pełną szerokość), używamy tego samego wzoru co `.container`, ręcznie:
  `calc(max(40px, (100vw - 1200px) / 2))` jako padding od strony zewnętrznej.
  Patrz `.coop-content`, `.quote-form-wrap`.

### Ważna pułapka (już naprawiana kilka razy)

Gdy sekcja ma dwie kolumny flex (tekst | zdjęcie) i chcemy, żeby **wysokość
sekcji wynikała z wysokości tekstu** (stały padding góra/dół), a zdjęcie się
tylko przycinało do tej wysokości:

- Zdjęcie **musi** być `position: absolute; inset: 0;` wewnątrz
  `position: relative` kolumny, z `object-fit: cover`.
- Jeśli zdjęcie zostanie zwykłym `<img>` w normalnym przepływie z
  `height: 100%`, to jego naturalne proporcje (przy nieznanej wysokości
  rodzica) wymuszą wysokość całej kolumny (i przez `align-items: stretch`
  całej sekcji) — sekcja robi się dużo wyższa niż treść i wygląda "rozjechana".
- Przykłady poprawnego wzorca: `.hero-bg` + `.hero-slide`, `.quote-image`,
  `.coop-image`.

Druga pułapka: `overflow-x: auto` na flex-childzie (np. `.reviews-track`)
**nie zadziała**, jeśli flex item nie ma `min-width: 0` — domyślne
`min-width: auto` na flex childach blokuje kurczenie się i psuje scroll.

## Kolory i typografia (`:root` w `css/style.css`)

```css
--color-orange: #f5821f;       /* główny akcent, przyciski, numeracja list */
--color-orange-dark: #e06f0f;  /* hover na przyciskach */
--color-black: #1a1a1a;        /* tekst podstawowy / nagłówki */
--color-gray-text: #4a4a4a;    /* body text / paragrafy */
--color-border: #e4e4e4;
--font-heading: "Bebas Neue";  /* WSZYSTKIE nagłówki sekcji */
--font-body: "Raleway";        /* cały pozostały tekst, przyciski, formularze */
```

### Nagłówki sekcji (Bebas Neue, weight 400)

Wszystkie duże nagłówki sekcji (hero, "Niech Twoja firma...", "Ale ile to
będzie kosztować", "Jak wygląda współpraca z nami", "Zobacz nasze
realizacje") są **ujednolicone na `font-size: 54px`**, `letter-spacing: 0.5px`.
Hero ma specjalny przypadek: 100px (mniejszy niż reszta, bo to główny hero
claim) — patrz `.hero-headline`.

### Body text — zasada 16px

Cały zwykły tekst na stronie (paragrafy, opisy, pola formularza, tekst
kafelków, listy) ma **`font-size: 16px`**, `line-height: 1.6`,
`color: var(--color-gray-text)`. Wyjątki, które NIE są na 16px celowo:
- checkboxy i ich etykiety (`.checkbox-field` = 15px),
- drobny druk zgody RODO (`.checkbox-fine-print` = 12px),
- data/nazwa w karcie opinii Google (`.review-name`, `.review-date` — mniejsze,
  to metadane, nie treść).

### Przyciski (`.btn`)

Wszystkie przyciski na stronie mają **ten sam rozmiar**:
`font-size: 16px`, `padding: 16px 20px`, `border-radius: 999px` (pigułka).
Różnią się tylko kolorem/wariantem:
- `.btn-primary` — pomarańczowe tło, biały tekst (główne CTA "Wyceń swój projekt").
- `.btn-outline` — pomarańczowy obrys, pomarańczowy tekst, hover wypełnia na pomarańczowo.
- `.btn-tile` — biały obrys na zdjęciu (kafelki usług), hover wypełnia na biało.

Jeśli dodajesz nowy przycisk — używaj klasy bazowej `.btn` + wariant kolorystyczny,
nie ustawiaj paddingu/font-size lokalnie.

## Sekcje strony (w kolejności w `index.html`)

1. **Header** (`.site-header`) — logo (SVG), menu, ikony (szukaj/user/serce/koszyk
   jako inline SVG), przycisk "Wyceń swój projekt".
2. **Hero** (`.hero`) — dwukolumnowy split: biały tekst po lewej z nagłówkiem
   "PRODUCENT `<span class="accent">`NEONÓW`</span>` / DLA FIRM" (białe tło TYLKO
   za słowem NEONÓW, nie za całą linią), zdjęcie w tle po prawej jako **slider
   2 zdjęć** (fade, autoplay 6s, kropki klikalne — `js/main.js`). Zdjęcie
   przesunięte w prawo (`--content-offset` w `:root`) tak, żeby tylko końcówka
   słowa "NEONÓW" nachodziła na fotografię.
3. **Intro** (`.intro`) — "Niech Twoja firma zabłyśnie z nami" + przycisk w
   jednym rzędzie, opis pod spodem.
4. **Tiles** (`.tiles`) — pełna szerokość ekranu (bez `.container`), siatka
   4×2 kafelków usług ze zdjęciem, gradientem, tytułem i przyciskiem
   "Zobacz więcej". Tytuł kafelka (`.tile-title`) ma `font-size: 24px`, Raleway
   SemiBold.
5. **Quote** (`.quote`) — "Ale ile to będzie kosztować?" — zdjęcie neonu po
   lewej (bleed do lewej krawędzi), formularz wyceny po prawej (imię/email,
   telefon, select tematu, textarea, checkbox montażu, lokalizacja, submit,
   zgoda RODO). Prawa krawędź formularza przypięta do prawej krawędzi
   siatki 1200px (`calc(max(40px, (100vw - 1200px) / 2))`).
   Padding góra/dół: **100px**.
6. **Coop** (`.coop`) — "Jak wygląda współpraca z nami?" — tekst + numerowana
   lista (`/1`…`/7`, numer pomarańczowy) po lewej (lewa krawędź przypięta do
   siatki 1200px), zdjęcie "Dwa Noże" po prawej (bleed do prawej krawędzi).
   Padding góra/dół: **100px**. Odstęp między punktami listy (`.coop-list`):
   `gap: 22px`.
7. **Realizations** (`.realizations`) — nagłówek + przycisk w rzędzie, potem
   mozaika 5 zdjęć w siatce (środkowa kolumna szersza, pionowa, na całą
   wysokość — `.mosaic-a`…`.mosaic-e` przez `grid-area`).
8. **Reviews** (`.reviews`) — karuzela mockowych opinii Google (6 kart:
   avatar z inicjałami, imię, data, 5 gwiazdek, ikona Google, treść),
   przewijana strzałkami (`scrollBy` + `scroll-snap`) — dane wymyślone,
   do podmiany na prawdziwe opinie później.
9. **Footer** (`.site-footer`) — ciemne tło (`var(--color-black)`), układ
   4-kolumnowy CSS Grid (`grid-template-columns: 1fr 1fr 1fr 1.4fr`):
   - Kolumna 1: logo (filter: brightness(0) invert(1) — odwrócone do bieli),
     tagline, ikonki social media (FB/IG/LI/YT) z hover pomarańczowym.
   - Kolumna 2: "Oferta" — lista produktów.
   - Kolumna 3: "Firma" — linki firmowe.
   - Kolumna 4: "Kontakt" — telefon/email/adres z ikonkami + przycisk CTA.
   - Pasek dolny (`.footer-bottom`): copyright po lewej, linki prawne po prawej,
     oddzielony `border-top: 1px solid rgba(255,255,255,0.1)`.

   Typografia stopki:
   - `.footer-col-title` — Bebas Neue, `font-size: 24px`, `letter-spacing: 0.066em`, kolor `#fff`.
   - `.footer-links a`, `.footer-contact-list li`, `.footer-tagline` — Raleway, `font-size: 16px`,
     kolor `rgba(255,255,255,0.55)`, hover: `var(--color-orange)`.
   - `.footer-copy`, `.footer-legal a` — `font-size: 13px`, `color: rgba(255,255,255,0.35)`.

## Zasady współpracy / rzeczy do pamiętania

- Zdjęcia są dostarczane przez użytkownika **do folderu głównego projektu**
  (nie od razu do `assets/...`) — trzeba je tam samemu przenieść i dowiązać
  w HTML pod właściwą nazwą/rozszerzeniem (użytkownik czasem podaje inne
  rozszerzenie niż się spodziewamy, np. `.png` zamiast `.jpg`).
- Pracujemy **sekcja po sekcji** na podstawie zrzutów ekranu z Figmy —
  użytkownik wkleja screen, ja odtwarzam proporcje/kolory/fonty, potem
  dostrajam na podstawie kolejnych poprawek.
- Serwer podglądu: `.Codex/launch.json` uruchamia `npx serve .` na porcie
  5173 (konfiguracja `static-server`).
