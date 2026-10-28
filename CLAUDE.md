# NEOFOX — strona główna

Statyczna strona (HTML/CSS/JS, bez frameworka/buildu) odtwarzająca makietę Figma
"NEOFOX — producent reklam" (neony, kasetony, litery przestrzenne, montaż reklam).
Obecnie budowana **tylko pod desktop** — responsywność (mobile/tablet) będzie
robiona w kolejnym etapie, więc nie ma jeszcze media queries.

## Struktura plików

```
index.html          – strona główna
o-nas.html          – podstrona "O nas"
kontakt.html        – podstrona "Kontakt"
galeria.html        – podstrona "Galeria"
sklep.html          – podstrona "Sklep" (listing produktów z filtrami po kategoriach)
produkt-happy-birthday.html – karta produktu "Happy Birthday" Neon LED (jedyna
  istniejąca karta produktu — pozostałe produkty w sklep.html nie są klikalne)
koszyk.html         – podstrona "Koszyk" — statyczna makieta (patrz sekcja niżej)
checkout.html       – podstrona "Zamówienie" (checkout) — statyczna makieta,
  niefunkcjonalna (patrz sekcja niżej)
neony-led.html, backlit-halo.html, frontlit-litery-3d.html,
kasetony-semafory.html, litery-niepodswietlane.html, logo-plexi.html,
banery.html, oklejanie-witryn.html, montaz-instalacja.html
  – 9 podstron usługowych z dropdownu "Oferta B2B" (patrz sekcja
  "Podstrony usługowe" niżej). "Wynajem neonów" z dropdownu celowo NIE ma
  jeszcze swojej podstrony (link zostaje "#").
paleta-kolorow.html – podstrona "Paleta kolorów" (link w stopce, kolumna "Nawigacja");
  odpowiednik neofox.pl/paleta-kolorow/ — patrz sekcja "Podstrona Paleta kolorów" niżej
css/style.css        – style wspólne (jeden plik, sekcje oddzielone komentarzami)
css/o-nas.css        – style specyficzne dla podstrony o-nas (ładowane po style.css)
css/kontakt.css      – style specyficzne dla podstrony kontakt (ładowane po style.css)
css/galeria.css      – style specyficzne dla podstrony galeria (ładowane po style.css)
css/sklep.css        – style specyficzne dla podstrony sklep (ładowane po style.css)
css/produkt.css      – style specyficzne dla karty produktu (ładowane po style.css)
css/koszyk.css       – style specyficzne dla podstrony koszyk (ładowane po style.css)
css/checkout.css     – style specyficzne dla podstrony checkout (ładowane po style.css)
css/neony-led.css    – **stary wspólny szablon** podstron usługowych (klasy `.nl-*`,
  `.neony-hero*` — nazwa historyczna). Wszystkie 9 podstron jest już przebudowanych,
  ale nadal ładują ten plik dla hero (`.neony-hero*`) i sekcji CTA (`.nl-cta`) — tych
  reguł nie zmieniać (zmiany robimy jako nadpisania w neony-led-strona.css).
css/neony-led-strona.css – **szablon wszystkich 9 podstron ofertowych** z dropdownu
  „Oferta B2B” (prefiks `.neon-*` — nazwa historyczna). Kolejne strony składamy z tych
  samych klas. Nowe warianty dodajemy jako modyfikatory (`--dark`, `--stacked`,
  `--white`…) albo nowe klasy, nigdy zmieniając istniejące reguły — patrz sekcje
  "Podstrona Neony LED" … "Podstrony Banery, Oklejanie witryn, Montaż" niżej
js/main.js            – hero slider + karuzela opinii (vanilla JS, bez zależności)
assets/logo/          – logo (logoneofox.svg)
assets/images/         – zdjęcia sekcji + podmienione zdjęcia kafelków (webp/jpg/JPG)
assets/images/tiles/   – oryginalne zdjęcia kafelków (PNG, niska rozdzielczość — zastępowane)
assets/images/products/ – prawdziwe zdjęcia produktów pobrane z neofox.pl (np. happy-birthday-*.jpg)
assets/images/neony-led/ – zoptymalizowane zdjęcia podstrony Neony LED (wyeksportowane
  z "Neony led/", obrócone wg EXIF, max ~1000×1700 px, JPG q82); `paleta-kolorow.jpg` =
  kadr z neonami wycięty z `assets/Paleta.jpg` (2400×880)
assets/Paleta.jpg     – źródłowa grafika palety 13 kolorów od klienta (29231×11123 px, 8 MB —
  NIE linkować w HTML, używamy `assets/images/neony-led/paleta-kolorow.jpg`)
assets/images/paleta/ – 13 zdjęć „kolor w realizacji” (960×1280) do paleta-kolorow.html, pobrane
  z neofox.pl/paleta-kolorow/ (pełne wersje przez /wp-json/wp/v2/media), `niebieski.jpg` = IMG_0057
Neony led/            – materiały źródłowe od klienta dla podstrony Neony LED: brief
  "1. TEKST.pdf" + oryginalne zdjęcia (2–5 MB każde, ~110 MB razem)
assets/images/backlit-halo/ – zoptymalizowane zdjęcia podstrony Backlit (te same zasady
  eksportu co neony-led; `*-poziomy.jpg` = poziome kadry do hero i paneli)
Backlit - litery z efektem _HALO_/ – materiały źródłowe od klienta dla podstrony
  Backlit: brief "1. Teskt.pdf" + oryginalne zdjęcia (do ~6 MB każde)
assets/images/frontlit/ – zoptymalizowane zdjęcia podstrony Frontlit (te same zasady
  eksportu; `*-poziomy.jpg` = poziome kadry do hero i paneli, `boki-*.jpg` = pojedyncze
  litery E wycięte z infografiki klienta, `notino-szyld.jpg` = kadr bez plakatów z modelem)
frontlit - litery 3D podświetlane/ – materiały źródłowe od klienta dla podstrony
  Frontlit: brief "1. Tekst" (to PDF, tylko bez rozszerzenia) + oryginalne zdjęcia
assets/images/kasetony/ – zoptymalizowane zdjęcia podstrony Kasetony (`*-poziomy.jpg` =
  kadry do hero i paneli, `melanin.jpg` = sam szyld bez montażystów z `melanin-montaz.jpg`)
Kasetony/             – materiały źródłowe od klienta dla podstrony Kasetony: brief
  "1. TEKST" (PDF bez rozszerzenia) + oryginalne zdjęcia
assets/images/litery-tworzywa/ – zoptymalizowane zdjęcia podstrony Litery z tworzyw
  (`litery-la-glowny.jpg` = „GŁOWNY OBRAZ” klienta do hero, `snipes.jpg` = kadr bez plakatu)
Litery z tworzyw sztucznych/ – materiały źródłowe: brief "1.TEKST" (PDF bez rozszerzenia)
  + zdjęcia; nazwy plików klienta podają materiał („Litery z PCV na plexi” itd.)
assets/images/logo-plexi/ – zoptymalizowane zdjęcia podstrony Logo z pleksi
  (`weranda-poziomy.jpg` = kadr „1. GŁÓWNY OBRAZ” do hero)
logo z plexi/         – materiały źródłowe: brief "1. TEKST" (PDF bez rozszerzenia) + zdjęcia
assets/images/banery/, assets/images/oklejanie/, assets/images/montaz/ – zdjęcia trzech
  ostatnich podstron (klatki z filmów klienta, zdjęcia z dodatkowe-zdjecia/ i z
  neofox.pl — szczegóły w sekcjach tych podstron)
Banery/, Oklejanie/, montaż/ – materiały źródłowe: briefy (PDF; w Oklejanie i montaż bez
  rozszerzenia), w Banery 2 zdjęcia + 2 filmy .MOV, w montaż 1 zdjęcie, w Oklejanie brak zdjęć
dodatkowe-zdjecia/    – zdjęcia i filmy źródłowe (niektóre >100 MB) — NIE commitować do git
koszyk.svg, ludzik.svg, lupka.svg, serce.svg  – ikony header (cart/user/search/heart),
  na razie NIEUŻYWANE — w HTML ikony header są inline SVG. Do podpięcia na życzenie.
.claude/launch.json    – konfiguracja lokalnego serwera podglądu (PowerShell, port 5173)
.claude/serve.ps1      – serwer statyczny PowerShell (HttpListener) na port 5173
```

Brak systemu budowania — otwiera się `index.html` bezpośrednio albo przez
serwer PowerShell: `.claude/serve.ps1` (uruchamiany przez `.claude/launch.json`).
`npx` NIE jest dostępne w środowisku — używamy wyłącznie PowerShell HttpListener.

## Nawigacja między podstronami

- `index.html` → "O nas" → `o-nas.html`, "Sklep" → `sklep.html`, "Kontakt" → `kontakt.html`, "Galeria" → `galeria.html`
- `o-nas.html` → logo → `index.html`, "O nas" ma `aria-current="page"`
- `kontakt.html` → logo → `index.html`, "Kontakt" ma `aria-current="page"`
- `galeria.html` → logo → `index.html`, "Galeria" ma `aria-current="page"`
- `sklep.html` → logo → `index.html`, "Sklep" ma `aria-current="page"`; pierwszy kafelek
  ("Happy Birthday" Neon LED) linkuje do `produkt-happy-birthday.html`, pozostałe 9
  kafelków to mockupy (nie są klikalne — nie mają jeszcze kart produktu)
- "Oferta B2B" — **nie jest linkiem** (`<span>`), po najechaniu rozwija dropdown
  z 10 pozycjami (patrz sekcja "Dropdown nawigacji" poniżej)
- `koszyk.html` → "Przejdź do płatności" (`.koszyk-checkout-btn`) → `checkout.html`
- stopka (wszystkie strony), kolumna "Nawigacja" → "Paleta kolorów" → `paleta-kolorow.html`

## Dropdown nawigacji (Oferta B2B)

"Oferta B2B" w menu to `<li class="has-dropdown">` z `<span>` (nie `<a>`) +
chevron SVG + `<ul class="dropdown">` z 10 pozycjami — **te same nazwy i ta sama
kolejność co 10 kafelków w sekcji `.tiles` na `index.html`/`o-nas.html`**:
- Neony LED → `neony-led.html`
- Backlit – litery z efektem „HALO" → `backlit-halo.html`
- Frontlit – litery 3D podświetlane → `frontlit-litery-3d.html`
- Kasetony i semafory reklamowe → `kasetony-semafory.html`
- Litery z tworzyw sztucznych, styroduru, PCV → `litery-niepodswietlane.html`
- Logo z plexi → `logo-plexi.html`
- Banery → `banery.html`
- Oklejanie witryn, naklejki na szyby → `oklejanie-witryn.html`
- Montaż i instalacja → `montaz-instalacja.html`
- Wynajem neonów → **jedyna pozycja bez podstrony**, `href="#"` (pominięta na
  życzenie użytkownika)

Dropdown pojawia się przy `:hover` na `li.has-dropdown`, z animacją opacity +
translateY. Style w `css/style.css` sekcja `/* Dropdown */` (`min-width: 300px`
żeby dłuższe nazwy jak "Litery z tworzyw sztucznych, styroduru, PCV" mieściły
się w jednej linii).

**Pułapka:** `.main-nav ul` ma `display: flex`, co dziedziczy `.dropdown ul`.
Dlatego `.dropdown` ma `flex-direction: column !important; align-items: stretch !important; gap: 0 !important`
żeby pozycje były pionowo, nie poziomo.

## Wzorzec podstron

Każda podstrona ma:
- Własny plik HTML (kopiujemy header i footer z `index.html`)
- Własny plik CSS `css/[nazwa].css` ładowany po `style.css` — tylko style specyficzne
- Aktywny link w nav oznaczony `aria-current="page"`
- Linki CTA w headerze/footerze odsyłają do `index.html#wycena`

## Hero podstron (wzorzec z kontakt.html i o-nas.html)

Obie podstrony mają identyczny wzorzec hero:
- `height: 420px`, `display: flex; align-items: center; justify-content: center`
- Zdjęcie absolutne (`position: absolute; inset: 0; object-fit: cover`)
- Ciemna nakładka `rgba(0,0,0,0.60)` — klasa `*-hero-overlay`
- Wycentrowana treść: nagłówek Bebas Neue 100px biały + podtytuł Raleway 16px szary
- Brak eyebrow label (usunięty)

Klasy w o-nas.css: `.onas-hero-new`, `.onas-hero-new-img`, `.onas-hero-new-overlay`, `.onas-hero-new-content`, `.onas-hero-new-heading`, `.onas-hero-new-sub`
Klasy w kontakt.css: analogicznie z prefiksem `.kontakt-hero-*`

Stary hero o-nas (4 zdjęcia + badge) jest **ukryty** `.onas-hero { display: none; }` — można usunąć regułę żeby przywrócić.

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
  Patrz `.coop-content`, `.quote-form-wrap`, `.onas-about-content`, `.onas-distinguish-content`.

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
  `.coop-image`, `.onas-about-image`, `.onas-distinguish-image`.

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

`html { scroll-behavior: smooth; }` — dodane na początku `style.css`, działa globalnie.

### Nagłówki sekcji (Bebas Neue, weight 400)

Wszystkie duże nagłówki sekcji (hero, "Niech Twoja firma...", "Ale ile to
będzie kosztować", "Jak wygląda współpraca z nami", "Zobacz nasze
realizacje") są **ujednolicone na `font-size: 54px`**, `letter-spacing: 0.5px`.
Hero ma specjalny przypadek: 100px — patrz `.hero-headline`.
Na podstronie o-nas nagłówki sekcji intro/specjalizujemy mają `font-size: 80px`.

### Akcent kolorystyczny w nagłówkach

Wzorzec wielokolorowych nagłówków: cały tekst w kolorze bazowym (czarny lub pomarańczowy),
wybrane słowa owinięte w `<span class="accent">` z `color: var(--color-orange)`.
Przykłady z o-nas.html:
- `PODŚWIETLIMY <span class="accent">CAŁY</span><br>ŚWIAT!` — "CAŁY" pomarańczowe, reszta czarna
- `Twoja satysfakcja to nasz <span class="accent">najwyższy priorytet</span>`

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
- `.btn-tertiary` — tekst-only, pomarańczowy, z ikoną strzałki w dół, zdefiniowany
  w `o-nas.css`. Używany w sekcji intro o-nas jako "Czytaj więcej" (anchor do `#onas-tresc`).

Przycisk wewnątrz flex-kolumny (np. pod tekstem w `.onas-about`) wymaga
`align-self: flex-start` żeby nie rozciągał się na całą szerokość kolumny.

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

   **Uwaga:** footer w `index.html` nadal ma placeholder dane kontaktowe.
   Footery w `o-nas.html`, `kontakt.html` i `galeria.html` mają prawdziwe dane NEOFOX.

## Podstrona O nas (`o-nas.html` + `css/o-nas.css`)

### Dane kontaktowe NEOFOX

- Telefon: +48 730 627 143
- Email: neofox.pl@gmail.com
- Adres: ul. Garbary 46/U1, 61-869 Poznań
- NIP: 782 283 9206

### Sekcje o-nas.html (w kolejności)

1. **Header** — skopiowany z `index.html`, "O nas" ma `aria-current="page"`.

2. **Hero nowy** (`.onas-hero-new`) — wzorzec identyczny jak kontakt.html:
   zdjęcie `tunnel-neon.jpg` z ciemną nakładką 60%, wycentrowany nagłówek
   "O NAS" Bebas Neue 100px + podtytuł. Stary hero (`.onas-hero` — 4 zdjęcia
   + badge) pozostaje w HTML ale jest ukryty przez `.onas-hero { display: none; }`.

3. **Intro** (`.onas-intro`) — białe tło, `padding: 87px 0`, `text-align: center`.
   Nagłówek `.onas-intro-heading`: Bebas Neue 80px. Pod tekstem przycisk
   `.btn-tertiary` "Czytaj więcej" ze strzałką w dół, linkujący do `#onas-tresc`
   (anchor na pierwszej sekcji `.onas-about`).

4. **About** (`.onas-about`, `id="onas-tresc"`) — obraz po lewej (bleed), tekst po prawej.
   - Zdjęcie: `belleza-place.jpg`
   - `.onas-about-content`: padding prawy = `calc(max(40px,(100vw-1200px)/2))`,
     padding lewy = 60px, padding góra/dół = 100px
   - Sekcja "Najnowsze projekty studia" reużywa tych samych klas `.onas-about`
     (bez `id`), zdjęcie: `mionetto-neons.jpg`

5. **Distinguish** (`.onas-distinguish`) — tekst po lewej, obraz po prawej (bleed).
   Zdjęcie: `sztuka-barberingu.jpg`.
   Treść: intro paragraph + lista `.coop-list` z 3 punktami (/1 Nowoczesną technologię,
   /2 Wszechstronne zastosowanie, /3 Profesjonalny design). Odstęp listy od paragrafu:
   `.onas-distinguish-content .coop-list { margin-top: 24px; }`.

6. **Process** (`.onas-process`) — 4 ikony na szarym tle (`#f4f4f4`), `padding: 80px 0`.
   Po gridie ikon jest wyśrodkowany przycisk CTA `.btn-primary` w divie `.onas-process-cta`
   (`margin-top: 48px; text-align: center`).

7. **Specialize** (`.onas-specialize`) — nagłówek "ZOBACZ W CZYM SIĘ SPECJALIZUJEMY"
   Bebas Neue 80px, "SPECJALIZUJEMY" w `<span class="accent">`.

8. **Tiles** (`.tiles`) — identyczna siatka jak na `index.html`. Zdjęcia kafelków
   (patrz tabela poniżej).

9. **Quote** (`.quote`) — ukryte regułą `.quote { display: none; }` w `o-nas.css`.

10. **Contact** (`.onas-contact`) — dwie kolumny, `min-height: 520px`.
    Lewa: dane kontaktowe + mapa Google Maps (iframe, Garbary 46, Poznań).

11. **Footer** — z prawdziwymi danymi kontaktowymi NEOFOX.

### Zdjęcia kafelków w o-nas.html (i index.html)

Kafelki stopniowo zastępowane wyższą rozdzielczością — ścieżki w HTML:

| Kafelek | Plik (src w HTML) |
|---|---|
| Neony LED | `assets/images/neony-led.webp` |
| Litery 3D podświetlane | `assets/images/litery-podswietlane.webp` |
| Litery z efektem halo | `assets/images/freixenet-halo.jpg` |
| Litery 3D niepodświetlane | `assets/images/litery-3d.webp` |
| Logo z plexi | `assets/images/juamo-logo-plexi.jpg` |
| Montaż i instalacja | `assets/images/montaz-instalacja.jpg` |
| Wynajem neonów | `assets/images/wynajem-neonow.webp` |
| Kasetony i semafory | `assets/images/kasetony.JPG` |

Stare pliki w `assets/images/tiles/*.png` już nie są używane w `o-nas.html`.
**Uwaga:** `index.html` nadal używa starych ścieżek `assets/images/tiles/` — do zaktualizowania.

## Podstrona Kontakt (`kontakt.html` + `css/kontakt.css`)

### Sekcje kontakt.html (w kolejności)

1. **Header** — "Kontakt" ma `aria-current="page"`.

2. **Hero** (`.kontakt-hero`) — identyczny wzorzec jak o-nas hero nowy.
   Zdjęcie: `showroom-neony.jpg`, nagłówek "KONTAKT", podtytuł.

3. **Główna sekcja** (`.kontakt-main`) — `.container`, dwa flex children:
   - **Lewa** (`.kontakt-form-col`, `flex: 1.1`) — formularz kontaktowy
   - **Prawa** (`.kontakt-info-col`, `flex: 1`) — dane + karty + godziny

4. **Formularz kontaktowy** (`.kontakt-form`) — pola:
   - Wiersz 1: Imię i nazwisko + Adres e-mail
   - Wiersz 2: Numer telefonu + **Select produktu** (8 opcji — patrz niżej)
   - Checkbox "Jestem zainteresowany/a montażem" (`#k-montaz`)
   - Pole lokalizacji (`#k-lokalizacja-wrap`, domyślnie `display: none`, klasa
     `.kf-lokalizacja.is-visible` pokazuje je) — toggle przez inline JS
   - Textarea "Treść wiadomości"
   - Przyciski: `.btn-primary` "Wyślij wiadomość" + `.btn-outline` "Wyczyść"

   Opcje selectu produktu:
   - Neon LED
   - Kaseton / semafor
   - Litery z efektem halo / backlit
   - Litery 3D podświetlane / litery blokowe LED / frontlit
   - Litery 3D niepodświetlane / litery z plexi, styroduru i PCV
   - Logo z plexi
   - Wynajem neonów
   - Inny produkt

5. **Dane kontaktowe** (`.kontakt-info-col`) — 3 karty z pomarańczowymi ikonami
   (telefon, email, adres), godziny otwarcia infolinii i sklepu, NIP.

6. **Mapa Google** (`.kontakt-map`) — iframe `height: 450px`, Garbary 46, Poznań.

7. **Footer** — z prawdziwymi danymi kontaktowymi NEOFOX.

## Podstrona Galeria (`galeria.html` + `css/galeria.css`)

### Sekcje galeria.html (w kolejności)

1. **Header** — "Galeria" ma `aria-current="page"`.

2. **Hero** (`.galeria-hero`) — identyczny wzorzec jak o-nas/kontakt.
   Zdjęcie: `mionetto-neons.jpg`, nagłówek "GALERIA", podtytuł.

3. **Sekcja A** (`.galeria-section-a`) — tekst po lewej / zdjęcie po prawej.
   Zdjęcie: `dodatkowe-zdjecia/IMG_0057.JPG`. Nagłówek "GALERIA" 54px.

4. **Sekcja B** (`.galeria-section-b`) — zdjęcie po lewej / tekst po prawej. Tło `#f9f9f9`.
   Zdjęcie: `dodatkowe-zdjecia/IMG_1067.JPG`.
   Nagłówek: "Projekty indywidualne: Autorskie neony i grafiki w technologii LED".

5. **Instagram** (`.galeria-ig`) — tło `#f4f4f4`. Header wewnątrz `.container`:
   ikona IG (gradient SVG) + nagłówek "Zobacz więcej na naszym Instagramie" po lewej,
   strzałki `#ig-prev` / `#ig-next` po prawej (dosunięte do prawej krawędzi 1200px,
   **bez przycisku "Obserwuj nas"**).
   Karuzela 6 kart 260px × 9:16, `scroll-snap`, scrollbar ukryty, JS w inline `<script>`.
   Zdjęcia z `dodatkowe-zdjecia/`.

6. **CTA** (`.galeria-cta`) — białe tło, `padding: 100px 0`, wyśrodkowany nagłówek +
   tekst + `.btn-primary` → `index.html#wycena`.

7. **Grid** (`.galeria-grid-section`) — reużywa `.gallery-grid` / `.gallery-item`
   ze `style.css`, 12 zdjęć z `dodatkowe-zdjecia/`, lightbox inline JS.

8. **Footer** — z prawdziwymi danymi kontaktowymi NEOFOX.

### Pułapka: scrollbar w karuzeli IG

`.galeria-ig-track-wrap` ma `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`.
Track jest `<div>` (nie `<ul>`), ma `overflow-x: auto` — działa bo nie jest flex-childem
z `min-width: auto`.

## Podstrona Sklep (`sklep.html` + `css/sklep.css`)

### Sekcje sklep.html (w kolejności)

1. **Header** — "Sklep" ma `aria-current="page"`.

2. **Hero** (`.sklep-hero`) — identyczny wzorzec jak pozostałe podstrony.
   Zdjęcie: `medicadent-nocna.jpg`, nagłówek "SKLEP", podtytuł.

3. **Filtry** (`.sklep-filters`) — nagłówek "NASZE PRODUKTY" + licznik produktów
   (`#sklep-count`, aktualizowany przez JS) w jednym rzędzie, pod spodem rząd
   pigułkowych przycisków filtrów (`.sklep-filter-btn`, `flex-wrap: wrap`) —
   14 kategorii wziętych z neofox.pl/kategoria-produktu/wszystkie-produkty/
   (Wszystkie produkty, Do domu, Do pokoju dziecka, Gamingowe, Ślubne, Świąteczne,
   Dla biznesu, Bary & Kluby, Gastronomia, Barbershopy, Salony Beauty,
   Siłownie & Sport, Neony Print Art, OUTLET).

4. **Siatka produktów** (`.sklep-grid`) — pełna szerokość ekranu (bez `.container`),
   5 kolumn, `gap: 0` — kafelki **stykają się** ze sobą (bez odstępów, bez
   border-radius, zgodnie z resztą design systemu). Każdy `.sklep-card` ma
   zdjęcie + badge (Bestseller/Nowość/Promocja/…) + nazwę + kategorię (etykieta
   kategorii filtrującej, np. "Bary & Kluby, Gastronomia" — **nie** typ produktu)
   + cenę. **Bez opisu i bez ocen/gwiazdek.** Wiersz ceny: stara cena
   (przekreślona) → nowa cena → etykieta "Wyprzedaż" dosunięta do prawej
   (`margin-left: auto`). `data-category` na każdej karcie (spacja-
   separated sluggi) — filtrowanie po stronie klienta w inline `<script>`
   (pokazuje/ukrywa `.sklep-card`, aktualizuje licznik, pokazuje `.sklep-empty`
   gdy brak wyników w danej kategorii).
   9 z 10 kart to **mockupy** (wymyślone nazwy/ceny, zdjęcia z `assets/images/`
   cyklicznie powtórzone z 5 realizacji) — nie są klikalne (`<article>`).
   **Pierwsza karta** ("Happy Birthday" Neon LED) to prawdziwy produkt z
   neofox.pl — jest owinięta w `<a href="produkt-happy-birthday.html">` i ma
   prawdziwe dane (cena, brak fałszywej "starej ceny"/rabatu, brak wymyślonej oceny).

5. **Footer** — z prawdziwymi danymi kontaktowymi NEOFOX.

## Karta produktu (`produkt-happy-birthday.html` + `css/produkt.css`)

Jedyna istniejąca karta produktu na razie.

**Wszystkie dane produktowe są prawdziwe**, pobrane z
neofox.pl/produkt/happy-birthday-neon-led-2/ — **nie dodawać nowych
parametrów ani nie brać danych ze stron konkurencji**. Prawdziwe dane: cena
1500 zł brutto, wymiary 98×72 cm, kolor światła "ciepła biel", kategorie
Do domu/Świąteczne, opis produktu, dostawa (DPD, 3 dni robocze realizacji,
1–2 dni PL / 4+ dni Europa, ubezpieczona paczka kartonowa, faktura w dniu
wysyłki). "24 miesiące gwarancji" to ogólna polityka firmy (patrz sekcja
"coop" na `index.html`), nie parametr tego produktu.

### Kolumna informacyjna (`.product-info`) — kolejność ustalona przez użytkownika

1. `.product-category` — kategoria pomarańczowym tekstem uppercase
2. `.product-title` — nazwa produktu (Bebas Neue)
3. `.product-price` — cena
4. `.product-params` — **tylko dwa parametry**: Rozmiar i Kolor, każdy jako
   `.product-param-label` + `.product-param-chip` (pigułka z pomarańczowym
   obrysem). Nie pokazujemy tu kodu produktu, typu ani pełnej palety kolorów —
   to zostało celowo uproszczone (wcześniejsza wersja z 12 kolorami do wyboru
   i osobną listą specyfikacji została usunięta na życzenie użytkownika).
5. `.product-purchase-row` — licznik ilości (`.product-qty` +/- działający
   przez inline JS, min. 1) + `.btn.btn-primary.product-add-cart` "Dodaj do
   koszyka" + `.btn.btn-outline.product-add-fav` "Dodaj do ulubionych"
   (serce SVG, JS przełącza `.is-active` — wypełnienie na pomarańczowo).
   **Oba przyciski są dekoracyjne** (`type="button"`, bez realnej logiki
   koszyka) — spójne z resztą strony, gdzie ikony koszyka/serca w headerze
   też są tylko wizualne (patrz sekcja "Struktura plików").

### Sekcja z tabami (`.product-tabs-section`) — wzorowana na neofox.pl/produkt/happy-birthday-neon-led-3/

Trzy zakładki przełączane JS (`.product-tab-btn` + `.product-tab-panel`,
`data-tab` ↔ `id="tab-*"`):
- **Opis** — treść opisowa produktu + lista cech (przeniesione ze starej
  osobnej sekcji "Opis produktu").
- **Opinie** — **stan pusty zgodny z prawdziwą stroną referencyjną**:
  rozkład 5★–1★ wszystkie "0" (`.product-reviews-bar-fill` width:0%) +
  tekst "Na razie nie ma opinii o tym produkcie." Świadomie **nie** używamy
  tu generycznych opinii firmowych (`.reviews` z `js/main.js`) — dla tego
  konkretnego produktu nie mamy prawdziwych opinii, więc pokazujemy uczciwy
  stan pusty zamiast fabrykować treść.
- **Wysyłka** — tekst o dostawie + `.product-trust` (3 ikony: DPD, realizacja
  3 dni, 24 mies. gwarancji) — przeniesione ze starej osobnej sekcji
  "Dostawa i realizacja" i z paska zaufania pod CTA.

Poniżej tabów zostaje sekcja "Może Cię zainteresować" (`.product-related`) —
używa mockowych produktów z `sklep.html`, niekliknalna (bez realnych stron
docelowych dla tamtych produktów).

Zdjęcia produktu: prawdziwe, pobrane z neofox.pl do
`assets/images/products/happy-birthday-1.jpg` … `happy-birthday-4.jpg`.
Galeria (`.product-gallery-main` + `.product-gallery-thumbs`) przełącza główne
zdjęcie po kliknięciu miniatury (inline `<script>` na dole pliku).

## Podstrona Koszyk (`koszyk.html` + `css/koszyk.css`)

**Statyczna makieta** (decyzja użytkownika) — nie zapisuje stanu między
odwiedzinami (brak localStorage), ale **jest w pełni interaktywna w obrębie
jednej wizyty**: licznik ilości przelicza sumy na żywo, zmiana metody wysyłki
przelicza `Łącznie`, usunięcie produktu pokazuje stan pustego koszyka, pole
kuponu pokazuje komunikat zwrotny (zawsze "nieprawidłowy kod" — nie ma
prawdziwych kuponów, więc nie udajemy że którykolwiek działa).

Ikona koszyka w headerze (`aria-label="Koszyk"`) jest teraz prawdziwym linkiem
`<a href="koszyk.html">` na **wszystkich** podstronach (wcześniej był to
dekoracyjny `<button>` bez akcji, tak jak ikony szukaj/konto/ulubione — te
trzy pozostają dekoracyjne).

Wypełniona przykładowym, prawdziwym produktem ("Happy Birthday" Neon LED,
1500 zł, wariant "Rozmiar: 98 × 72 cm · Kolor: Ciepła biel" — zgodnie z
parametrami z karty produktu).

### Sekcje koszyk.html (w kolejności)

1. **Breadcrumb** — Strona główna / Koszyk.
2. **Nagłówek** — "KOSZYK (X produkt/y/ów)" — licznik aktualizowany przez JS
   (uwaga na poprawną polską odmianę: 1 = produkt, 2–4 = produkty, 0 i 5+ =
   produktów — ten sam wzorzec co licznik filtrów w `sklep.html`).
3. **Layout dwukolumnowy** (`.koszyk-layout`): lewa = lista pozycji (`flex: 1`),
   prawa = podsumowanie (`flex: 0 0 380px`, `position: sticky`).
4. **Lista pozycji** (`.koszyk-items`) — każda pozycja: przycisk usuń (×) |
   miniatura + nazwa (link do karty produktu) + wariant | cena jednostkowa |
   stepper ilości | kwota (cena × ilość, przeliczana na żywo).
5. **Pod tabelą**: pole kuponu + przycisk "Wykorzystaj kupon" (z komunikatem
   zwrotnym) po lewej, link "← Kontynuuj zakupy" → `sklep.html` po prawej.
6. **Podsumowanie** (`.koszyk-summary`, tło `#f9f9f9`, sticky): Kwota (subtotal)
   → wybór wysyłki (radio: Kurier DPD 40 zł / Odbiór osobisty 0 zł) + notka
   o czasie realizacji → Łącznie → `.btn-primary` "Przejdź do płatności"
   (prowadzi do `checkout.html` — patrz sekcja "Podstrona Checkout" niżej)
   → metody płatności jako proste pigułki tekstowe (bez logotypów marek)
   → "14-dniowa gwarancja zwrotu".
7. **Stan pustego koszyka** (`.koszyk-empty`) — pokazywany zamiast
   `.koszyk-layout`, gdy usunięto ostatnią pozycję: komunikat + przycisk
   "Przejdź do sklepu".
8. **Footer** — z prawdziwymi danymi kontaktowymi NEOFOX.

## Podstrona Checkout (`checkout.html` + `css/checkout.css`)

**Statyczna makieta, celowo niefunkcjonalna** — to jedyny cel tej strony:
pokazać jak będzie wyglądał checkout, bez integracji z prawdziwą bramką
płatności. Wzorowana na obecnym checkoucie `neofox.pl/zamowienie/`
(WooCommerce: adres dostawy, płatność i wysyłka, "Kupuję i płacę") ale
przeprojektowana w stylu wizualnym NEOFOX i uproszczona do jednej strony
(bez logowania/rejestracji jako osobnego kroku — tylko dyskretny link
"Zaloguj się" nad formularzem).

Układ dwukolumnowy identyczny jak `koszyk.html`: lewa kolumna (`flex: 1`) —
formularz w 3 numerowanych sekcjach, prawa kolumna (`flex: 0 0 380px`,
`position: sticky`) — podsumowanie zamówienia. Numeracja sekcji
(`.checkout-section-num`) to zwykły pomarańczowy tekst Bebas Neue ("1"/"2"/"3"),
**nie** okrągła plakietka — zgodnie z regułą "brak border-radius poza
przyciskami/polami formularza".

### Sekcje formularza (`.checkout-form-col`)

1. **Dane do wysyłki** — pola imię/nazwisko, ulica + nr mieszkania
   (opcjonalnie), miasto + kod pocztowy, telefon + e-mail (wzorzec `.kf-row`/
   `.kf-field` z `css/style.css`, ten sam co w `kontakt.html`), uwagi
   opcjonalne. Checkbox "Chcę otrzymać fakturę VAT na firmę" pokazuje pola
   Nazwa firmy/NIP (`#co-nip-wrap`, toggle inline JS — ten sam wzorzec co
   pole lokalizacji montażu w `kontakt.html`).
2. **Sposób dostawy** — te same dwie opcje co `koszyk.html` (Kurier DPD 40 zł /
   Odbiór osobisty — Poznań 0 zł), stylizowane jako `.checkout-option` (radio +
   opis + cena, bez border-radius, separator `border-bottom`).
3. **Metoda płatności** — 4 opcje w tym samym stylu listy: Przelew bankowy
   (domyślnie zaznaczony), Karta płatnicza, BLIK, Przelewy24 — **bez logotypów
   marek** (zgodnie z konwencją z koszyka), każda z opisem który rozwija się
   inline pod zaznaczoną opcją (`.checkout-payment-note`, JS przełącza
   `.is-active` na `.checkout-payment-option`).

Poniżej: checkbox zgody na regulamin (wymagany, wzorzec `.checkbox-fine-print`
z `kontakt.html`) i przycisk `.btn-primary.checkout-submit-btn` "Złóż
zamówienie". Kliknięcie **nie wysyła żadnego zamówienia** — JS przechwytuje
submit i pokazuje komunikat `.checkout-submit-msg` informujący wprost, że to
makieta bez integracji płatności.

### Podsumowanie (`.checkout-summary-col`, sticky, tło `#f8f8f8`)

Powtarza pozycję z koszyka (Happy Birthday Neon LED, 1500 zł) jako pozycję
tylko do odczytu (link "Edytuj koszyk" → `koszyk.html` zamiast stepper/usuń) +
Produkty/Dostawa/Do zapłaty (dostawa i suma przeliczają się na żywo w
zależności od wybranej opcji w sekcji 2 — ten sam mechanizm co `koszyk.html`)
+ notka "Bezpieczna, szyfrowana transakcja" + "14-dniowa gwarancja zwrotu".

**Uwaga:** dane w formularzu (imię, adres, telefon...) to tylko placeholdery
w polach — nie ma żadnej walidacji wysyłanej dokądkolwiek, to zgodne z decyzją
użytkownika że ta strona ma być wyłącznie wizualną makietą.

## Podstrony usługowe (dropdown "Oferta B2B")

9 podstron — `neony-led.html` (istniała już wcześniej) + 8 nowych:
`backlit-halo.html`, `frontlit-litery-3d.html`, `kasetony-semafory.html`,
`litery-niepodswietlane.html`, `logo-plexi.html`, `banery.html`,
`oklejanie-witryn.html`, `montaz-instalacja.html`. Razem odpowiadają 9 z 10
pozycji dropdownu "Oferta B2B" — **"Wynajem neonów" celowo pominięty** (na
życzenie użytkownika, link zostaje `#`).

**Wszystkie 9 podstron jest przebudowanych na podstawie briefów klienta** (PDF w
folderach źródłowych) i składa się z klas wspólnego szablonu `css/neony-led-strona.css`
(+ hero `.neony-hero*` i CTA `.nl-cta` z `css/neony-led.css`) — opisy każdej w sekcjach
"Podstrona Neony LED" … "Podstrony Banery, Oklejanie witryn, Montaż" niżej. Stary szablon (`.nl-intro`,
`.nl-why`, `.nl-paths`, `.nl-tech`, `.nl-process`, treści „inspirowane neofox.pl”)
nie jest już używany przez żadną podstronę — reguły zostały w `css/neony-led.css`.

Wspólne zasady wszystkich 9: treść = tekst briefu bez zmian merytorycznych, w kolejności
briefu; h2 = tytuł rozdziału (część czarna + pomarańczowy akcent); podtytuł w hero =
hasło z końca briefu; formularz w CTA identyczny (prefiks id `nl-`, inny tylko domyślny
produkt); podpisy zdjęć tylko to, co widać; tła sekcji przeplatają się biała / czarna /
szara z „pasami” (`*-band`) na granicach.

**Galeria realizacji na podstronach (decyzja użytkownika):** tylko 2 rzędy (8 zdjęć,
siatka 4 kolumny), pod nagłówkiem (lub tekstem pod nim) przycisk `.btn.btn-primary`
„Zobacz galerię realizacji” → `galeria.html`. Pozostałe zdjęcia z pierwszej wersji
galerii (12–20 szt.) zostały usunięte z HTML, pliki zostały w `assets/images/<strona>/`.
Banery nie mają galerii (za mało zdjęć).

## Podstrona Neony LED (`neony-led.html` + `css/neony-led-strona.css`)

Przebudowana od zera na podstawie briefu klienta z folderu `Neony led/`
(`1. TEKST.pdf` — 13 sekcji + FAQ). **Cała treść jest tekstem klienta z PDF,
przeniesionym bez zmian merytorycznych** — nie dopisywać parametrów ani faktów
spoza briefu. Notatki z PDF typu "Miejsce na zdjęcie / realizację" i "Przy
każdej fotografii warto wskazać rodzaj podkładu, kolor, rozmiar…" to instrukcje
dla projektanta, nie treść strony. Stara wersja strony (wspólny szablon
`.nl-*`, "Dlaczego my?", "Proces" itp.) została w całości zastąpiona.

Strona reużywa komponentów design systemu zamiast nowych: hero jak na
pozostałych podstronach usługowych (`.neony-hero*` z `neony-led.css` — poziome
zdjęcie 420px + nakładka 60% + wyśrodkowany nagłówek; na życzenie klienta NIE
jak hero strony głównej), kafelki 5 w rzędzie (`.tiles-grid`/`.tile`),
siatka galerii + lightbox (`.gallery-grid`, `.lightbox`), formularz `.kf-*`
i ciemna sekcja CTA (`.nl-cta` z `neony-led.css`). Nagłówki: **wszystkie h2
na tej stronie mają 74px** (ustalone z klientem; `.neon-heading` + nadpisany
`.neon-cta .nl-cta-heading`), z `text-wrap: balance`, i twarde spacje po
jednoliterowych "i"/"z" (`i&nbsp;konstrukcjach`), żeby nie wisiały na końcu
linii. Akcent `.accent-text` od nowej linii (`display: block`), chyba że nagłówek
ma `.neon-heading--one-line` (cały w jednym wierszu — np. Technologia).
Odstępy ustalane z klientem sekcja po sekcji (prośba: więcej whitespace) —
zmienione wartości są opisane przy sekcjach niżej.

**H1 w hero (wszystkie 9 podstron ofertowych, decyzja użytkownika):** sama nazwa podstrony,
dokładnie jak w dropdownie „Oferta B2B” („Neony LED”, „Backlit – litery z efektem „HALO””,
„Logo z plexi”…), bez dopisków z tytułu briefu — długie tytuły briefów były za ciężkie,
a podtytuł pod spodem i tak opisuje ofertę. Rozmiar 100px z szablonu (jak hero O nas /
Kontakt), `text-wrap: balance`, treść hero ograniczona do siatki 1200px — dwie najdłuższe
nazwy („Litery z tworzyw…”, „Oklejanie witryn…”) łamią się na 2 równe linie. Tytuły briefów
zostały w `<title>` i meta description.

**Podtytuł w hero (wszystkie przebudowane podstrony: neony, backlit, frontlit, kasetony):**
`.neony-hero-sub` pod H1 to ostatnie zdanie briefu („… produkcja, dostawa i montaż”,
bez kropki na końcu). Wcześniej stało jako tagline w sekcji Zamów — użytkownik kazał je
przenieść do hero, a w CTA już go nie ma (klasa `.neon-cta-tagline` usunięta z CSS).
Na Backlit i Kasetonach zastąpiło wcześniejszy podtytuł spod tytułu briefu (dwa podobne
zdania pod nagłówkiem byłyby powtórzeniem).

Kolejność sekcji (id = kotwice):
1. Hero — H1 „Neony LED” (patrz „H1 w hero” wyżej); podtytuł `.neony-hero-sub` = ostatnie
   zdanie briefu (patrz „Podtytuł w hero” wyżej); tło: poziomy kadr
   zdjęcia "Fajnie, że jesteś!" (`hero-fajnie-ze-jestes-poziomy.jpg`), ostry —
   BEZ rozmycia (wcześniejszy `blur(3px)` użytkownik kazał usunąć); neon jest
   dokładnie za nagłówkiem, więc nakładka w hero przebudowanych podstron ma 70%
   zamiast 60% (`.neon-hero .neony-hero-overlay`, wspólne z backlit-halo.html).
   Pod hero NIE ma paska cech (`.features-bar`) — usunięty na życzenie klienta.
2. Intro (`.neon-intro`, padding 100px / 120px dół) — nagłówek (74px jak
   wszystkie h2) "Tworzymy nowoczesne / neony LED na zamówienie" (początek
   pierwszego akapitu briefu; `na&nbsp;zamówienie`, żeby nie łamać po "na"),
   po prawej 3 akapity briefu; pierwszy zaczyna się od "Tworzymy neony
   dopasowane do…" (ustalone z klientem). Pod spodem pasek 4 pionowych zdjęć
   (`.neon-strip`) W SIATCE 1200px, odstęp 24px, proporcje 9:16 (= proporcje
   zdjęć, kadry nieprzycięte): Barber, Beer Craft, Nails, postać z koroną.
   Do paska nadają się tylko zdjęcia pionowe (poziome TOGOTO usunięte).
   Pasek jest w `.neon-strip-band` — szare tło Technologii "najeżdża" na
   dolną połowę zdjęć (ten sam efekt co przy Podłożach/Kolorach).
3. `#technologia` (`.neon-tech`, padding 150px) — wyśrodkowany nagłówek w
   jednym wierszu + tekst pod nim (`.neon-head-center`, tekst max 760px),
   karty Neon Flex 6 mm / 8 mm (zdjęcia "Neon 6/8 mm"), pod nimi wyśrodkowany
   tekst o 12 V z ikoną piorunka nad nim, na całą szerokość treści
   (`.neon-flex-note--center`)
4. `#podklady` (`.neon-materials`, padding 150px, układ poziomy — na życzenie
   klienta nie split) — wyśrodkowany nagłówek + tekst (`.neon-head-center`),
   siatka 3×2 kafelków z materiałami (`.neon-materials-grid`, tło #f4f4f4,
   pomarańczowa kreska nad nazwą), pod nią galeria 4 zdjęć 3:4 z podpisami
   podkładów (`.neon-materials-gallery`). Galeria jest w pełnoszerokim pasie
   `.neon-materials-band` z gradientem biały→czarny w połowie wysokości, a sekcja
   nie ma dolnego paddingu — dzięki temu czarne tło sekcji Kolory "najeżdża"
   górną krawędzią na zdjęcia (efekt zamówiony przez klienta).
5. `#kolory` (`.neon-colors`, czarne tło, padding 150px) — zdjęcie ściany neonów
   ze stoiska targowego W SIATCE 1200px (kwadrat 560px, nie bleed do krawędzi
   ekranu) po lewej, tekst po prawej
5a. `#paleta` (`.neon-colors.neon-palette`, bez górnego paddingu — ten sam czarny pas co
   Kolory) — wyśrodkowany nagłówek „Dostępna paleta kolorów” + grafika palety klienta
   (`paleta-kolorow.jpg`, 1200px). Czerń grafiki (#040108) jest ciemniejsza niż
   `--color-black`, więc krawędzie są wygaszone `mask-image` (`.neon-palette-figure`).
   Dodana na życzenie użytkownika (nie ma jej w briefie)
6. `#personalizacja` — wyśrodkowany nagłówek, pod nim cały tekst sekcji
   (`.neon-head-center`; oba akapity briefu, także "Podczas opracowania
   projektu…"), pod spodem 5 kafelków
   (`.tile` ze style.css) w siatce 1200px: rząd 3 (`.neon-tiles--3`: logo /
   napis / własne pismo) + rząd 2 (`.neon-tiles--2`: czcionka / grafika),
   wysokość 460px, odstęp 24px. Drugi rząd jest w pasie `.neon-tiles-band`
   (biały→#f4f4f4 w połowie) — szare tło sekcji Wymiary "najeżdża" na kafelki,
   tak samo jak czarne tło Kolorów na galerię Podłoży
7. `#wymiary` (`.neon-sizes`, szare tło, padding 150px) — tekst + tabela
   rozmiarów po lewej (nagłówki tabeli pogrubione), zdjęcie dużej realizacji "#Sun&Fun" po prawej W SIATCE
   1200px (nie bleed), rozciągnięte na wysokość tekstu i odsunięte od górnej
   krawędzi sekcji
8. `#druk-uv` — układ poziomy jak Podłoża (reużywa `.neon-materials*`):
   wyśrodkowany nagłówek w jednym wierszu na szerokość treści, tekst pod nim,
   4 kafelki w rzędzie (`.neon-materials-grid--4`), pod nimi 3 zdjęcia z
   nadrukiem 3:4 (Vape Shop, Golf, Mionetto Spritz; `.neon-materials-gallery--3`)
   w pasie `.neon-materials-band--gray` — szare tło Wnętrz i zewnątrz
   "najeżdża" na dolną połowę zdjęć
9. `#wnetrza-zewnatrz` — dwa poziome panele 1200×560px W SIATCE 1200px, jeden
   pod drugim (odstęp 24px), z tekstem na zdjęciu: wnętrze restauracji / Men's
   Club. Zdjęcia to osobne poziome kadry (`*-poziomy.jpg`, ~2300px szerokości)
   wycięte pod te panele — pionowe wersje są dalej w galerii. Pod panelami
   tekst o odporności, wyśrodkowany z ikoną tarczy nad nim
   (`.neon-flex-note--center`, jak notka o 12 V w Technologii)
10. `#zasilanie` — infografika zasilaczy (`Zasilacze.png`)
11. `#akcesoria` (`.neon-materials--gray`, szare tło) — układ poziomy jak
    Podłoża: wyśrodkowany nagłówek, siatka 3×2 — 5 białych kafelków z tekstem
    + zdjęcie elementów montażowych (`Elementy montażowe.png`) jako szósty
    kafelek (`.neon-material-photo`, wysokość rzędu). Duży pas 1200px z tym
    zdjęciem klient odrzucił (kadr wyglądał jak "kawałek stołu"); innych zdjęć
    akcesoriów (piloty, sterowniki, zasilacze) w materiałach nie ma.
    (Układ "split" z bleedem zdjęcia do krawędzi ekranu nie jest już używany
    nigdzie na tej stronie — wszystkie zdjęcia są w siatce 1200px.)
12. `#zastosowania` — 6 kart z kwadratowymi zdjęciami
13. `#realizacje` — wyśrodkowany nagłówek z tekstem pod nim, przycisk „Zobacz galerię realizacji” → galeria.html, galeria 8 zdjęć (2 rzędy)
    (`.gallery-grid` + lightbox) BEZ filtrów — usunięte na życzenie klienta,
    pokazujemy po prostu wszystkie zdjęcia z podpisami
14. `#faq` — 10 pytań jako `<details>` + JSON-LD `FAQPage` w `<head>`
15. `#zamow` — ciemna sekcja `.nl-cta` z tekstem briefu po lewej i formularzem
    po prawej. Formularz ma DOKŁADNIE te same pola, etykiety, placeholdery,
    opcje i zgodę RODO co `kontakt.html` (ustalone z klientem), tylko z
    prefiksem id `nl-` i z domyślnie wybranym produktem "Neony LED"; checkbox
    montażu pokazuje pole lokalizacji (ten sam inline JS co w kontakcie).
    Stopka strony = stopka z `index.html` (`.footer-brand`, `.footer-socials`).

### Zdjęcia — zasady doboru

- Podpisy zdjęć opisują **tylko to, co widać** (np. "Transparentna plexi na
  dystansach"). Na żadnym zdjęciu nie widać obrysu z druku 3D, poliwęglanu,
  PCV ani Dibondu, więc nie podpisujemy tak zdjęć.
- **Pominięte celowo** (marki/postacie osób trzecich): kolaże "Neony z drukiem_"
  (Pikachu, Stitch, Sknerus McKwacz) i "Neony zewnętrzne" (Coca-Cola),
  IMG_7826 (Porsche), IMG_7958 (FC Barcelona), kolaże IMG_7727–7735 (niska
  rozdzielczość, marki Johnnie Walker / Jägermeister / booksy).
- `stoisko` (IMG_8479) jest przycięte tak, żeby nie było neonu "Barbie",
  cennika i wizytówek z danymi; `gelato-lodziarnia` to zdjęcie wycięte ze
  zrzutu ekranu Instagrama (bez interfejsu).
- Kadrowanie: `object-position` inline na `<img>`, policzone pod środek neonu.

### Stopka

Wszystkie podstrony (łącznie z 9 usługowymi) mają **tę samą stopkę co
`index.html`** (`.footer-brand`, `.footer-socials`, `.footer-col-contact` z
godzinami i NIP, `.footer-btn`). Dawna stopka szablonu usługowego
(`.footer-col--brand`, `.footer-social`, przycisk z inline style) nie pasowała
do klas w style.css i się rozsypywała — została wszędzie podmieniona. Przy
kopiowaniu stopki z index.html na podstronę: logo → `index.html` (nie `/`),
"O nas" → `o-nas.html`, "Galeria realizacji" → `galeria.html`, przycisk →
`index.html#wycena`.

### Nawigacja

Dropdown "Oferta B2B" i kolumna "Oferta" w stopce na **wszystkich** podstronach
serwisu (łącznie z tymi 9) linkują teraz do prawdziwych plików zamiast `#`.
Kolejność w stopce ujednolicono do tej samej co w dropdownie (10 pozycji,
"Wynajem neonów" na końcu jako jedyny nadal `#`). W kolumnie "Nawigacja" stopki
„Paleta kolorów” → `paleta-kolorow.html` (pozostałe `#` w tej kolumnie: Oferta B2B,
Polityka prywatności, Regulamin).

## Podstrona Backlit (`backlit-halo.html` + `css/neony-led-strona.css`)

Druga przebudowana podstrona ofertowa — **zbudowana z tych samych klas co
Neony LED** (żeby deweloper mógł powielać układ na kolejne podstrony), bez
własnego pliku CSS. Ładuje style.css + neony-led.css (hero, CTA) +
neony-led-strona.css. Treść = brief `Backlit - litery z efektem _HALO_/1. Teskt.pdf`
(14 rozdziałów + FAQ), przeniesiony bez zmian merytorycznych; nagłówki h2 to
tytuły rozdziałów briefu podzielone na część czarną + pomarańczowy akcent.

Ustalone z użytkownikiem: hero MA podtytuł (`.neony-hero-sub` = ostatnie zdanie briefu,
patrz „Podtytuł w hero” w sekcji Neony LED); rozdziały 3–5 (BASIC / EXCLUSIVE / porównanie) to jedna
sekcja; pojedyncze zdjęcia zamiast kolaży klienta „Opcja Basic/Exclusive.jpg”
(niska rozdzielczość, na kolażu Basic logo Telepizzy); galeria realizacji
dodana mimo braku w briefie — sam nagłówek, bez akapitu.

Kolejność sekcji (id = kotwice) i komponent z Neony LED, który reużywa:
1. Hero `.neony-hero.neon-hero` — poziomy kadr „1. GŁOWNY OBRAZ” (OMORFIA,
   ostry, nakładka 70% jak na Neony LED), H1 = nazwa z dropdownu + podtytuł.
2. Intro `.neon-intro` (nagłówek | 2 akapity) + pasek 4 pionowych zdjęć
   `.neon-strip` (OPTYK, NEX, LaserPro, PET MEDICA) w `.neon-strip-band--dark`
   — czarne tło następnej sekcji „najeżdża” na dolną połowę zdjęć.
3. `#efekt-halo` — rozdz. 1, czarna sekcja jak „Kolory” (`.neon-colors`):
   kwadratowe zdjęcie audeo studio + tekst.
4. `#materialy` — rozdz. 2, 4 kafelki `.neon-materials-grid--4`, bez galerii
   (`.neon-materials--no-gallery` = dolny padding 150px).
5. `#basic-exclusive` — rozdz. 3–5, szare tło jak „Technologia”: dwie karty
   `.neon-flex-card--stacked` (zdjęcie 3:2 nad tekstem; duże pomarańczowe
   BASIC/EXCLUSIVE bez słowa „Opcja” → zdanie porównania z rozdz. 5 mniejszym fontem (body2 = 14px, `.neon-text--small`) → pigułka
   = podtytuł rozdziału z briefu → punkty briefu jako `<dl class="neon-spec-list">`,
   kreski tylko między punktami), pod kartami notka z ikoną „Oba warianty…”.
   Porównania NIE pokazujemy jako osobnej tabeli (decyzja użytkownika).
   Zdjęcia: BASIC = „litery opcja BASIC.jpg” (litera „p” na dystansach),
   EXCLUSIVE = LÚVI (napis z kolażu klienta „Opcja Exclusive”).
6. `#kolorystyka` — rozdz. 6, jak „Druk UV”, ale nad zdjęciami tekst po lewej,
   nagłówek po prawej (`.neon-head-row--reverse`; wyśrodkowany tekst na 760px
   i na 1200px użytkownik odrzucił) + 3 zdjęcia 3:4 z podpisami
   (złote lustrzane / czarne / niebieskie litery), pas → szare tło.
7. `#podswietlenie` — rozdz. 7, jak „Zasilanie” (nagłówek | tekst) + ta sama
   infografika `assets/images/neony-led/zasilacze-12v.jpg` (klient przysłał
   identyczny plik Zasilacze.png) — na szarym tle jako biała karta.
8. `#konstrukcje` — rozdz. 8, jak „Podłoża”, z tym samym układem tekst | nagłówek
   co Kolorystyka (`.neon-head-row--reverse`) + 4 zdjęcia z podpisami
   (płyta matowa mleczna / biała / okrągła / litery na transparentnym stelażu), pas → szare.
9. `#wymiary` — rozdz. 9, jak „Wymiary”, ale bez tabeli (brief jej nie ma):
   tekst krótki, więc zdjęcie kwadratowe, a tekst wyrównany do jego górnej
   krawędzi (`.neon-sizes-inner--top` + `.neon-sizes-media--square`; ustalone
   z użytkownikiem — nie wyśrodkowywać w pionie). Black Crown.
10. `#wnetrza-zewnatrz` — rozdz. 10, dwa poziome panele jak na Neony LED (na
    białym tle): OMORFIA (inny kadr niż hero) / VELORA boutique; zdanie o
    warunkach atmosferycznych jako notka z ikoną tarczy pod panelami.
11. `#montaz` — rozdz. 11, ten sam układ co Wymiary, zdjęcie po lewej (figure
    pierwsza w HTML): veni andro wieczorem, z drabiną (montaż w toku).
12. `#renowacja` — rozdz. 12, nagłówek | tekst (jak intro).
13. `#realizacje` — przycisk „Zobacz galerię realizacji”, galeria 8 zdjęć (2 rzędy) `.gallery-grid` + lightbox, podpisy tylko
    z tym, co widać.
14. `#faq` — 6 pytań z briefu + JSON-LD `FAQPage` w `<head>`.
15. `#zamow` — `.nl-cta.neon-cta`, formularz identyczny jak na Neony LED
    (prefiks id `nl-`, ten sam skrypt), produkt domyślnie „Backlit”;
    zastrzeżenie „Ważne: …” z końca briefu jako `.neon-fine-print`.

Zdjęcia: ta sama zasada podpisów co na Neony LED (tylko to, co widać — np. na
zdjęciu BASIC dystanse wyglądają na metalowe, więc podpis nie mówi
„transparentne”). Pominięte: kolaże „Opcja Basic/Exclusive.jpg”, IMG_0804
(Velora z narożnika — mało widoczny szyld), IMG_0132 (Black Crown na
podłodze — duplikat, niska rozdzielczość), IMG_7890 (COSEDA w pracowni —
duplikat), E4D0BC86… (zbliżenie OMORFIA — ten napis jest już w hero i panelu).

## Podstrona Frontlit (`frontlit-litery-3d.html` + `css/neony-led-strona.css`)

Trzecia przebudowana podstrona ofertowa — te same klasy co Neony LED i Backlit, bez
własnego pliku CSS. Treść = brief `frontlit - litery 3D podświetlane/1. Tekst` (PDF
bez rozszerzenia; 14 rozdziałów + FAQ), bez zmian merytorycznych.

Ustalone z użytkownikiem: hero = momy's nocą (H1 = nazwa z dropdownu, podtytuł
= ostatnie zdanie briefu); rozdziały 2 i 3 (druk 3D / taśma aluminiowa)
to dwie osobne sekcje; infografika klienta „Opcje drukowanych liter” pocięta na 3
pojedyncze litery E (bez wtopionych napisów); rozdział 6 jako 2 karty ze zdjęciami.

Tła przeplatają się biała / czarna / szara — przy przestawianiu sekcji pilnować pasów
(`*-band`) i modyfikatorów tła. Kolejność (id = kotwice):
1. Hero `.neon-hero` — `momys-poziomy.jpg`, nakładka 70%.
2. Intro (nagłówek | tekst) + pasek 4 pionowych zdjęć (SOLMAR, OLD HAVANA, Strefa
   projektowania, TUNNEL) w `.neon-strip-band--dark`.
3. `#czym-sa` — rozdz. 1, czarna `.neon-colors` (litera R w ramie).
4. `#druk-3d` — rozdz. 2, biała `.neon-section.neon-tech`: nagłówek | tekst, śródtytuł
   z briefu (`.neon-subheading`), 3 karty wariantów boków (`.neon-apps-grid` — karty jak
   „Zastosowania” na Neony LED; tytuły kart to h4).
5. `#aluminium` — rozdz. 3, jak „Wymiary” na Neony LED: tekst + śródtytuł + tabela
   głębokości z briefu + zdjęcie „Litery aluminiowe”.
6. `#kolory-bokow` — rozdz. 4: po lewej „Standardowo dostępne są:” + lista 10 kolorów
   w 2 kolumnach jako wypunktowanie z pomarańczową kreską (`.neon-bullet-list--2col`), po
   prawej nagłówek z tekstem (`.neon-head-row--swap`). Użytkownik odrzucił zarówno pigułki
   z kolorami, jak i kwadratowe próbki kolorów przy nazwach — tylko zwykłe wypunktowanie.
   3 zdjęcia (czarne / białe / niebieskie boki) w pasie → czarne tło.
7. `#lico` — rozdz. 5, czarna `.neon-colors`, zdjęcie po prawej (klucz wiolinowy).
8. `#kolory-swiatla` — rozdz. 6, szara: 2 karty `--stacked` (medicadent / różowe
   „BREAK”); odcienie bieli jako wypunktowanie (`.neon-bullet-list`).
9. `#konstrukcja` — rozdz. 7, biała: nagłówek | tekst, 2 zdjęcia 3:2 (moduły / taśma LED,
   `.neon-materials-gallery--2`), notka 12 V z piorunkiem, infografika zasilaczy
   (`assets/images/neony-led/zasilacze-12v.jpg` — klient znów przysłał ten sam plik).
10. `#konstrukcje` — rozdz. 8, jak „Akcesoria” na Neony LED: 5 kafelków + zdjęcie liter
    na wspólnym pasie jako szósty kafelek.
11. `#wnetrza-zewnatrz` — rozdz. 9, panele L'OCCITANE / ESTEBELLE + notka z tarczą (24/7).
12. `#renowacja` — rozdz. 10, szara, nagłówek | tekst.
13. `#logo` — rozdz. 11, `.neon-sizes--white` (biały wariant „Wymiarów”), COSTA COFFEE.
14. `#montaz` — rozdz. 12, szara, zdjęcie po lewej (InBody).
15. `#realizacje` — przycisk + galeria 8 zdjęć (2 rzędy); nagłówek na BIAŁYM tle (sekcja wyżej jest szara).
16. `#faq` — 7 pytań + JSON-LD; 17. `#zamow` — formularz, produkt domyślnie „Frontlit”
    (brief nie ma zastrzeżenia „Ważne”).

Zdjęcia — pominięte: `img_mokka.jpeg` (obraz wygenerowany przez AI, bełkot zamiast
napisów), IMG_7737 (kolaż w niskiej rozdzielczości z obcymi markami PANERA/QUIK),
IMG_8482 (wizytówki z imionami i telefonami pracowników). Kadry chroniące dane:
`estebelle.jpg` ucięte nad busem NEOFOX (tablica rejestracyjna), `litery-przed-montazem.jpg`
bez nogi pracownika, `notino-szyld.jpg` bez plakatów perfum z modelem. Litery E w
„Druk 3D” to wizualizacja klienta — alt zaczyna się od „Wizualizacja:”.

## Podstrona Kasetony (`kasetony-semafory.html` + `css/neony-led-strona.css`)

Czwarta przebudowana podstrona — te same klasy, bez własnego CSS. Treść = brief
`Kasetony/1. TEKST` (PDF bez rozszerzenia; 15 rozdziałów + FAQ + „Uwaga” na końcu),
bez zmian merytorycznych. Notki „MIEJSCE NA ZDJĘCIE” z briefu wyznaczyły pasek zdjęć
po intro („kaseton na elewacji”), 3 zdjęcia kształtów semaforów i galerię realizacji.

Ustalone z użytkownikiem: hero = AM MARKET (H1 + podtytuł = ostatnie zdanie briefu);
rozdziały 2 i 3 (ścienne / semaforowe) to dwie osobne sekcje; rozdział 5 jako
kafelki ze zdjęciami 2×2; pominięte wątpliwe zdjęcia: semafor z sercem
(459FCB01… — wygląda na obraz z AI), zrzut relacji z Instagrama (KeepLook), „ideas
worth sharing” (hasło TED). Kafelek „Bez podświetlenia” ilustruje Melanin w dzień —
do potwierdzenia przez klienta, czy ten szyld rzeczywiście nie ma LED.

Kolejność (tła przeplatają się; id = kotwice):
1. Hero `am-market-poziomy.jpg` + podtytuł; 2. Intro + pasek 4 zdjęć (Atmosphere,
   cutcut-ulica, SZKOLNA 30, FRAVE) → czarne tło.
3. `#czym-jest` — czarna `.neon-colors` (złote litery pisane).
4. `#scienne` — szara `.neon-sizes` + `.neon-sizes-inner--top` / `.neon-sizes-media--square`,
   tekst + kwadratowe zdjęcie (cutcut).
5. `#semafory` — biała, nagłówek | tekst + 3 zdjęcia z podpisami okrągły / kwadratowy /
   prostokątny w pasie → szare.
6. `#technologie` — szara `.neon-materials--gray` + `.neon-materials-grid--4` (4 kafelki).
7. `#podswietlenie` — biała, kafelki `.tile` 2×2 jak „Personalizacja” na Neony LED
   (drugi rząd w `.neon-tiles-band` → szare).
8. `#materialy` — szara, jak „Kolory boków” na Frontlit: lista 7 wykończeń płyt jako
   wypunktowanie (`.neon-bullet-list--2col` — kolumny CSS, działa dla dowolnej liczby
   punktów) po lewej, nagłówek z tekstem po prawej (`.neon-head-row--swap`).
9. `#kolory` — biała, nagłówek | tekst + 3 zdjęcia kolorowych kasetonów → szare.
10. `#wymiary` — szara, nagłówek | tekst (bez zdjęcia).
11. `#zasilanie` — biała, nagłówek | tekst, BEZ infografiki zasilaczy: klient nie
    przysłał jej do kasetonów, a jej opisy (IP67, wtyczka w komplecie) są spoza briefu.
12. `#konstrukcje` — szara, zdjęcie po lewej (UMALOVANA z uchwytami).
13. `#wnetrza-zewnatrz` — panele Verona / iDenta; brief nie ma notki pod panelami,
    więc `.neon-env--no-note` (dolny padding 100px).
14. `#personalizacja` — szara, PAPI; 15. `#montaz` — `.neon-sizes--white`, montaż
    Melanin z drabin (montażyści w koszulkach NEOFOX).
16. `#realizacje` — przycisk + galeria 8 zdjęć (2 rzędy; nagłówek z notki briefu); 17. `#faq` — 6 pytań +
    JSON-LD, pod listą pytań „Uwaga: …” z końca briefu jako wyśrodkowana notka z ikoną
    „i” (`.neon-flex-note--center`, „Uwaga:” pogrubione) — użytkownik chciał ją lepiej
    widoczną niż drobny druk w CTA; 18. `#zamow` — produkt domyślnie „Kasetony i Semafory”.

## Podstrona Litery z tworzyw (`litery-niepodswietlane.html` + `css/neony-led-strona.css`)

Piąta przebudowana podstrona (pozycja dropdownu „Litery z tworzyw sztucznych, styroduru,
PCV”; nazwa pliku historyczna). Treść = brief `Litery z tworzyw sztucznych/1.TEKST`
(PDF bez rozszerzenia; 10 rozdziałów + FAQ), bez zmian merytorycznych. Teksty rozdz. 8
„W tym miejscu warto umieścić zdjęcia…” i „Przy każdym zdjęciu polecamy…” to instrukcje
dla projektanta — na stronie tylko nagłówek galerii.

Ustalone z użytkownikiem: hero = „GŁOWNY OBRAZ” klienta (ŁA na maszynie — wygląda na
wyretuszowaną wersję ich zdjęcia); rozdz. 1 jako karty ze zdjęciami 3 + 3; podpisy w
galerii: `<strong>` = materiał z nazwy pliku klienta (np. „Litery z PCV na plexi”),
`<span>` = to, co widać; grubości nie podajemy (pliki jej nie opisują). Zdjęcia BEZ danych
z aparatu (10 szt. — prawdopodobnie z internetu / AI: NOIR, Google, IGE, SM, Odontologia,
Beauty Bar, „Anan…”, złote „RA”, L'agence SMAC) tylko tam, gdzie brakuje własnych —
użyte 2: `dibond-szczotkowany.jpg` (karta Dibond) i `plexi-zlota-lustrzana.jpg`
(wykończenia lustrzane). Pominięte: zrzut ekranu „lico PCV.png” (jest oryginał z
iPhone'a), 2 duplikaty, „Szablon kartonowy” (brief nic o nim nie mówi).

Kolejność (tła: biała / szara / czarna; id = kotwice):
1. Hero `litery-la-glowny.jpg` + podtytuł = ostatnie zdanie briefu.
2. Intro (nagłówek | 3 akapity) + pasek 4 zdjęć („galeria otwierająca”: USPI WORK,
   litery na ścianie, BULLDOG, snipes) w `.neon-strip-band` → szare.
3. `#rodzaje` — szara: wyśrodkowany nagłówek z tekstem, potem 2 grupy: `.neon-subheading`
   + opis + 3 karty `.neon-apps-grid` (cienkie: plexi / Dibond / PCV; grube: styrodur /
   druk 3D / MDF); pogrubione „Grubości: …” na początku opisu karty.
4. `#grubosci` — `.neon-sizes--white`: tabela grubości z briefu + zdjęcie litery „K”.
5. `#wykonczenia` — `.neon-materials--on-gray` (szare tło + białe kafelki, z pasem
   zdjęć pod spodem): nagłówek | tekst, 3 kafelki z `.neon-bullet-list`, 3 zdjęcia
   (złota plexi lustrzana / złoty szczotkowany / czarny mat) → czarne tło.
6. `#malowanie` — czarna `.neon-colors` (brązowe litery „SWA…”).
7. `#folie` — biała, 4 kafelki + notka z ikoną warstw („Oklejanie może obejmować…”).
8. `#montaz` — szara, 3 karty: wolnostojące (litera A) / na ścianę (MDF na dystansach) /
   na zewnątrz (Faworytka).
9. `#zastosowania` — biała, nagłówek | tekst; 10. `#realizacje` — przycisk + galeria 8 zdjęć (2 rzędy);
11. `#faq` — 6 pytań + JSON-LD; 12. `#zamow` — produkt domyślnie „Litery z tworzyw…”.

## Podstrona Logo z pleksi (`logo-plexi.html` + `css/neony-led-strona.css`)

Szósta przebudowana podstrona. Treść = brief `logo z plexi/1. TEKST` (PDF bez
rozszerzenia; 16 rozdziałów + FAQ), bez zmian merytorycznych; w treści pisownia
„pleksi” jak w briefie (w menu i nazwie pliku zostaje „plexi”).

Ustalone z użytkownikiem: hero = „1. GŁÓWNY OBRAZ” (krąg WERANDA na posadzce, poziomy
kadr), H1 „Logo z plexi” (nazwa z dropdownu), podtytuł = hasło z końca rozdz. 16 (podtytuł spod
tytułu briefu pominięty); rozdz. 4 i 5 (pleksi / Dibond) jako jedna sekcja z 2
kafelkami obok siebie (`.neon-materials-grid--2`, punkty jako `.neon-bullet-list--text`
— całe zdania z briefu); rozdz. 12 ze zdjęciem bez danych z aparatu (Aesthetic Lab —
jedyne logo zamontowane na ścianie) TYLKO w tej sekcji. Galeria = wyłącznie własne
zdjęcia ze studia NEOFOX (biała zasłona, betonowa posadzka). Pominięte: „LeMaVi” (obraz
z AI), malwa / Atelié / Dr Marta Tsuguy / My Dessert (bez danych z aparatu, wyglądają
na zdjęcia z internetu). Zasilacze.png, Elementy montażowe.png i IMG_6933 (BULLDOG) to
te same pliki co na Neony LED / Litery z tworzyw — reużyte z tamtych folderów assets.

Kolejność (tła: biała / czarna / szara; id = kotwice):
1. Hero `weranda-poziomy.jpg`; 2. Intro (nagłówek | tekst) + pasek 4 zdjęć (Glowly,
   BONSAI, Beauty Studio z różowym LED, SOUL PLACE) → czarne.
3. `#co-wykonujemy` — czarna `.neon-colors` (WERANDA podświetlona).
4. `#podswietlenie` — szara, 2 karty `--stacked`: z LED (Sandra Janicka) / bez (INEZJA).
5. `#obrobka` — biała, 4 kafelki (CNC, laser, ploter, druk) + notka z ikoną.
6. `#materialy` — `.neon-materials--on-gray`, kafelki Pleksi | Dibond + 3 zdjęcia →
   czarne.
7. `#pcv` — czarna, zdjęcie po prawej (BULLDOG).
8. `#laminat` — `.neon-sizes--white`, tabliczka La Cara; 9. `#folie` — szara,
   Manufaktura Pączków; 10. `#malowanie` — biała, nagłówek | tekst.
11. `#dystanse` — szara, zdjęcie elementów montażowych; 12. `#zasilanie` — biała +
    infografika zasilaczy; 13. `#zastosowania` — szara, Aesthetic Lab.
14. `#projektowanie` — czarna `.neon-colors`, zdjęcie po prawej (Vandal Cut — szyld ze studia
    z odwzorowanym logo); `#dostawa` — osobna biała sekcja, układ pionowy `.neon-head-center`
    (nagłówek nad tekstem). Wcześniej obie były jedną białą sekcją z dwoma identycznymi
    układami nagłówek | tekst — użytkownik kazał je rozróżnić.
15. `#realizacje` — przycisk + galeria 8 zdjęć (2 rzędy); 16. `#faq` — 6 pytań + JSON-LD; 17. `#zamow` —
    produkt domyślnie „Logo z plexi”.

## Podstrony Banery, Oklejanie witryn, Montaż (zbudowane samodzielnie)

Trzy ostatnie podstrony użytkownik zlecił do zrobienia bez konsultacji („struktura jak
w pliku tekstowym, zdjęcia najwyżej podmienimy; brakujące zdjęcia z całego folderu albo
z neofox.pl”). Pliki HTML są złożone skryptem: `<head>` i `<main>` pisane ręcznie,
a header, dane kontaktowe w CTA, formularz i stopka skopiowane 1:1 z `logo-plexi.html`
(różni się tylko `aria-current` i domyślny produkt). Wszystkie rozdziały briefu są w
kolejności z PDF. Krótkie rozdziały, które pierwotnie dzieliły jedną sekcję jako dwa–trzy
identyczne układy nagłówek | tekst jeden pod drugim, zostały na życzenie użytkownika
rozdzielone (tak samo jak Projektowanie / Zamówienie na logo-plexi.html): każdy rozdział to
osobna sekcja z innym tłem, a z pary jeden dostaje zdjęcie albo układ pionowy
(`.neon-head-center` — nagłówek nad tekstem), drugi zostaje nagłówek | tekst/lista. Układ
pionowy na czarnym tle bez zdjęcia = `<section class="neon-colors">` + `.container.neon-head-center`
(bez nowego CSS). **Nie układać dwóch `.neon-head-row` jeden pod drugim** — żadna strona już
tego nie używa. Kolejność teł po zmianie (sprawdzona — nigdzie dwie sekcje o tym samym tle
obok siebie): przy przestawianiu sekcji pilnować przeplotu biała / szara / czarna.

**Banery** (`banery.html`, brief `Banery/1. Tekst_.pdf`, 17 rozdziałów + FAQ):
hero = poziomy kadr zdjęcia wieszania banera (IMG_8465), podtytuł = hasło z końca
briefu; „Ważne: …” jako notka z ikoną pod intro; pasek 4 zdjęć = klatki z filmów
klienta IMG_1877/1878.MOV (drukarka Roland, baner ZenRai Spa na stole; 720×1280,
wyciągnięte ffmpeg) + zdjęcie montażu; rozdz. 4–7 jako 2×2 kafelki z tytułami
rozdziałów w kafelkach (bez dodatkowego nagłówka sekcji — `.container >
.neon-materials-grid:first-child`); rozdz. 9 Oczkowanie (układ ustalony z użytkownikiem):
na górze wyśrodkowany nagłówek + pierwszy akapit (`.neon-head-center`), pod nimi
`.neon-sizes-inner` — tabela rozstawu oczek + drugi akapit po lewej, zdjęcie oczek po prawej
rozciągnięte na wysokość lewej kolumny (zwykłe `.neon-sizes-media`, bez `--square` — kwadrat
obok całego tekstu zostawiał dziurę pod zdjęciem); zdjęcie = IMG_1181 od klienta, bez danych
z aparatu, mały 680×440;
rozdz. 16 „(1)…(8)” jako lista `/1…/8` (`.coop-list` ze strony głównej). Brak galerii —
klient przysłał za mało zdjęć banerów (miejsce na nią jest w briefie). Rozdzielone pary:
Frontlit (biała, pionowa) / Laminowane (szara, nagłówek | tekst); Projektowanie (czarna,
zdjęcie `baner-logo.jpg` po lewej) / Wysyłka (szara, pionowa); Jak dobrać (czarna, pionowa,
`#jak-dobrac`; wyliczenie „Przed zamówieniem warto określić: …” jako wypunktowanie w 2
kolumnach `.neon-bullet-list--2col`, blok 880px — na czarnym tle punkty białe) / Jak zamówić
(szara, nagłówek | lista /1…/8).

**Oklejanie witryn** (`oklejanie-witryn.html`, brief `Oklejanie/1. Tekst`, 17 rozdziałów
+ FAQ + „Informacja o materiałach i wycenie”): folder klienta bez zdjęć — użyte witryny z
`dodatkowe-zdjecia/` (veni andro z folią z napisem IMG_0531 — hero i zdjęcie montażu,
BRAVE beauty z folią szronioną IMG_1736, Kwiatuszek IMG_2539, Base Barbershop IMG_0910,
cutcut IMG_3103), iDenta z `Kasetony/IMG_4522` (kadr samej witryny) i YUKO ze strony
neofox.pl (napisy na szybie; „zdjęcie główne” z briefu = panel 1200×560 pod intro). Hero
bez podtytułu (brief nie ma hasła końcowego). Druk Roland ilustruje klatka z filmu
banerów. Bez zdjęć: wzornik Oracal, folie specjalne, One Way Vision (nie ma takich
zdjęć). Galeria 8 zdjęć (2 rzędy) pod tekstem rozdz. 12 i przyciskiem — **cała sekcja
`#realizacje` stoi na końcu, tuż nad FAQ** (decyzja użytkownika; wyjątek od kolejności
briefu, wcześniej była po rozdz. 11); „Informacja o materiałach i wycenie” jako
notka z ikoną pod FAQ; produkt domyślnie „Naklejki na szyby”. Rozdzielone: Folie Oracal
(biała, pionowa) / Folie specjalne (szara, nagłówek | tekst); rozdz. 7–9 (One Way Vision,
lustrzane, przeciwsłoneczne) jako 3 kafelki w rzędzie z tytułami rozdziałów (jak rodzaje
materiałów na Banerach); Folie transparentne (szara, pionowa) / Projekt graficzny (czarna,
zdjęcie `cutcut-drzwi.jpg` — to samo jest w galerii); Naklejki na wymiar (szara,
nagłówek | tekst) / Realizacja zamówienia (czarna, pionowa).

**Montaż** (`montaz-instalacja.html`, brief `montaż/1. TEKST`, 13 rozdziałów + FAQ): w
PDF nazwa firmy jest grafiką (tekst z pliku czyta się „Meofox”) — na stronie „NEOFOX”.
Hero = `montaż/0709.jpg` (montaż liter SANCTYOUARY, montażysta w bluzie NEOFOX), podtytuł
= podtytuł z briefu „Profesjonalne usługi montażowe NEOFOX na terenie całej Polski”.
Zdjęcia montaży ze strony neofox.pl/instalacja-i-podlaczenie/ (Bajgiel, Młodość, faneco,
podnośnik — kadr bez tablicy rejestracyjnej, przechodniów i telefonu firmy od podnośnika,
biurowiec Bałtyk) + montaże z innych podstron (Melanin, veni andro, YUKO, litery przed
montażem, baner, folia). Pominięte z neofox.pl: przedszkole z Kubusiem Puchatkiem (postać
Disneya), Rogale Świętomarcińskie (twarze klientów w kolejce). Rozdz. 8 „Prosimy o: …;
…” jako lista numerowana /1…/10 (`.coop-list` jak „Jak wygląda współpraca” na stronie
głównej — użytkownik nie chciał tu myślników). Galeria 8 zdjęć, 2 rzędy („Realizacje i
montaże” — nagłówek dodany). Formularz: bez domyślnego produktu, checkbox „Jestem
zainteresowany/a montażem” od razu zaznaczony, pole lokalizacji widoczne. Rozdzielone: Ile
kosztuje (biała, pionowa) / Informacje do wyceny (szara, nagłówek | wypunktowanie);
Przygotowanie i uzgodnienia (szara, pionowa) / Dlaczego NEOFOX (biała, zdjęcie po prawej
`assets/images/montaz/uspi-work-paleta.jpg` = `dodatkowe-zdjecia/IMG_2864` — lada USPI WORK
owinięta folią na palecie; IMG_2872 z dwiema ladami odrzucone, w kwadracie nieczytelne).

## Podstrona Paleta kolorów (`paleta-kolorow.html` + `css/neony-led-strona.css`)

Odpowiednik neofox.pl/paleta-kolorow/ (tam: nagłówek, grafika palety, 13 zdjęć z nazwami
kolorów) w stylistyce podstron ofertowych — te same klasy, nowe tylko `.neon-palette*`.
Link „Paleta kolorów” w stopce (kolumna „Nawigacja”) prowadzi tu na **wszystkich**
podstronach; strony nie ma w menu głównym (header bez `aria-current`, w stopce link ma
`aria-current="page"`). Treść: tylko tekst klienta z briefu Neony LED (zdanie o 13 wariantach
+ RGB, zastrzeżenie o odcieniach, akapit z sekcji Zamów) — nie dopisywać parametrów kolorów.

Sekcje (tła: czarna / biała / szara):
1. Otwarcie `.neon-colors.neon-palette.neon-palette-hero` — czarne tło ZAMIAST zdjęcia w hero:
   H1 „Paleta kolorów” (`.neony-hero-heading`, 100px) + podtytuł, pod spodem ta sama grafika
   palety co w `#paleta` na neony-led.html (z wygaszonymi krawędziami).
2. `#kolory` — biała `.neon-section`: nagłówek „Kolory w realizacjach” + zastrzeżenie o
   odcieniach, siatka 13 zdjęć 3:4 (`.neon-palette-grid` — flex, 5 w rzędzie, ostatni rząd 3
   wyśrodkowany), nazwa koloru Bebas 28px na gradiencie (`.neon-palette-name`), kliknięcie
   otwiera lightbox (inline JS, wzorzec z galeria.html). Kolejność = kolejność na palecie.
3. CTA — szara `.neon-section--gray.neon-palette-cta`: „Zamów neon LED w wybranym kolorze”,
   akapit z sekcji Zamów na neony-led.html, przyciski „Wyceń swój projekt” (→ index.html#wycena)
   + „Zobacz ofertę neonów LED” (outline → neony-led.html). Bez formularza.

## Zasady współpracy / rzeczy do pamiętania

- Zdjęcia są dostarczane przez użytkownika **do folderu `assets/images/`** lub głównego
  folderu projektu — sprawdzić gdzie wylądowały przed podpięciem w HTML.
  Użytkownik czasem podaje inne rozszerzenie niż się spodziewamy (`.png` vs `.jpg`).
- Pracujemy **sekcja po sekcji** na podstawie zrzutów ekranu z Figmy —
  użytkownik wkleja screen, ja odtwarzam proporcje/kolory/fonty, potem
  dostrajam na podstawie kolejnych poprawek.
- Serwer podglądu: `.claude/launch.json` uruchamia `.claude/serve.ps1` (PowerShell
  HttpListener) na porcie 5173. `npx` NIE jest dostępne — nie używać.
- Git push: repozytorium `https://github.com/czarkovsky1/neofox1.git`, branch `master`.
  Push działa bez dodatkowego uwierzytelnienia w tym środowisku.
- Folder `dodatkowe-zdjecia/` zawiera zdjęcia i filmy źródłowe (niektóre >100 MB)
  — **nie commitować do git** (GitHub odrzuca pliki >100 MB).
- **Uwaga:** footer w `index.html` nadal ma placeholder dane (+48 123 456 789,
  biuro@neofox.pl). Footery w `o-nas.html`, `kontakt.html` i `galeria.html` mają
  prawdziwe dane NEOFOX.
