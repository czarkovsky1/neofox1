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
css/style.css        – style wspólne (jeden plik, sekcje oddzielone komentarzami)
css/o-nas.css        – style specyficzne dla podstrony o-nas (ładowane po style.css)
css/kontakt.css      – style specyficzne dla podstrony kontakt (ładowane po style.css)
css/galeria.css      – style specyficzne dla podstrony galeria (ładowane po style.css)
js/main.js            – hero slider + karuzela opinii (vanilla JS, bez zależności)
assets/logo/          – logo (logoneofox.svg)
assets/images/         – zdjęcia sekcji + podmienione zdjęcia kafelków (webp/jpg/JPG)
assets/images/tiles/   – oryginalne zdjęcia kafelków (PNG, niska rozdzielczość — zastępowane)
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

- `index.html` → "O nas" → `o-nas.html`, "Kontakt" → `kontakt.html`, "Galeria" → `galeria.html`
- `o-nas.html` → logo → `index.html`, "O nas" ma `aria-current="page"`
- `kontakt.html` → logo → `index.html`, "Kontakt" ma `aria-current="page"`
- `galeria.html` → logo → `index.html`, "Galeria" ma `aria-current="page"`
- "Sklep" jest tymczasowo `#`
- "Oferta B2B" — **nie jest linkiem** (`<span>`), po najechaniu rozwija dropdown
  z 8 pozycjami (patrz sekcja "Dropdown nawigacji" poniżej)

## Dropdown nawigacji (Oferta B2B)

"Oferta B2B" w menu to `<li class="has-dropdown">` z `<span>` (nie `<a>`) +
chevron SVG + `<ul class="dropdown">` z 8 pozycjami:
- Neony LED
- Litery 3D podświetlane
- Litery z efektem halo
- Litery 3D niepodświetlane
- Logo z plexi
- Montaż i instalacja
- Wynajem neonów
- Kasetony i semafory reklamowe

Dropdown pojawia się przy `:hover` na `li.has-dropdown`, z animacją opacity +
translateY. Style w `css/style.css` sekcja `/* Dropdown */`.

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
