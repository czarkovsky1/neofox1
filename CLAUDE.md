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
css/style.css        – style wspólne (jeden plik, sekcje oddzielone komentarzami)
css/o-nas.css        – style specyficzne dla podstrony o-nas (ładowane po style.css)
css/kontakt.css      – style specyficzne dla podstrony kontakt (ładowane po style.css)
css/galeria.css      – style specyficzne dla podstrony galeria (ładowane po style.css)
css/sklep.css        – style specyficzne dla podstrony sklep (ładowane po style.css)
css/produkt.css      – style specyficzne dla karty produktu (ładowane po style.css)
css/koszyk.css       – style specyficzne dla podstrony koszyk (ładowane po style.css)
css/checkout.css     – style specyficzne dla podstrony checkout (ładowane po style.css)
css/neony-led.css    – **wspólny szablon** dla wszystkich 9 podstron usługowych
  (neony-led.html + 8 nowych), ładowany po style.css. Klasy `.nl-*` i
  `.neony-hero*` (nazwa historyczna po pierwszej podstronie) są celowo
  generyczne — każda podstrona różni się tylko treścią HTML, nie CSS-em.
js/main.js            – hero slider + karuzela opinii (vanilla JS, bez zależności)
assets/logo/          – logo (logoneofox.svg)
assets/images/         – zdjęcia sekcji + podmienione zdjęcia kafelków (webp/jpg/JPG)
assets/images/tiles/   – oryginalne zdjęcia kafelków (PNG, niska rozdzielczość — zastępowane)
assets/images/products/ – prawdziwe zdjęcia produktów pobrane z neofox.pl (np. happy-birthday-*.jpg)
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

## Dropdown nawigacji (Oferta B2B)

"Oferta B2B" w menu to `<li class="has-dropdown">` z `<span>` (nie `<a>`) +
chevron SVG + `<ul class="dropdown">` z 10 pozycjami — **te same nazwy i ta sama
kolejność co 10 kafelków w sekcji `.tiles` na `index.html`/`o-nas.html`**:
- Neony LED → `neony-led.html`
- Backlit — litery z efektem „HALO" → `backlit-halo.html`
- Frontlit — litery 3D podświetlane → `frontlit-litery-3d.html`
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

**Wszystkie mają identyczną strukturę HTML i ten sam plik stylów**
(`css/neony-led.css` — patrz sekcja "Struktura plików"). Różni je tylko
treść: nagłówki, teksty, zdjęcia i domyślnie zaznaczona opcja w select
produktu. Kolejność sekcji (identyczna na każdej):

1. **Hero** (`.neony-hero`) — zdjęcie pełnoekranowe 420px + nakładka 60% +
   nagłówek Bebas Neue 100px + podtytuł.
2. **Korzyści** (`.nl-intro`) — nagłówek + lead paragraph + 3 kafelki korzyści
   z ikoną SVG.
3. **Dlaczego my?** (`.nl-why`) — lista 4 cech z ikonami po lewej, zdjęcie
   bleed po prawej.
4. **Dwa typy klienta** (`.nl-paths`) — 2 karty: "Zobacz nasze realizacje"
   (→ `galeria.html`) i "Twój projekt" (→ `index.html#wycena`, ciemna karta).
   **Uwaga:** w przeciwieństwie do oryginalnego `neony-led.html` (które linkuje
   pierwszą kartę do sklepu, bo neony LED faktycznie sprzedajemy w
   `sklep.html`), pozostałe 8 podstron **nie ma odpowiednika w sklepie** —
   dlatego ich pierwsza karta zawsze prowadzi do galerii, nigdy do sklepu.
5. **Detale techniczne** (`.nl-tech`) — zdjęcie bleed po lewej, lista 3
   parametrów technicznych po prawej.
6. Pasek 4 zdjęć (`.nl-photo-strip`) — zdjęcia realizacji w rzędzie.
7. **Proces** (`.nl-process`) — 4 kroki "od pomysłu do realizacji" z ikonami.
8. **CTA + formularz** (`.nl-cta`) — ciemne tło, telefon + dane kontaktowe po
   lewej, formularz zapytania (`.kf-row`/`.kf-field`) po prawej z selectem
   produktu (10 opcji, ta sama lista co dropdown, z domyślnie zaznaczoną
   opcją odpowiadającą danej podstronie).

### Źródło treści

Treści (nagłówki, paragrafy, listy cech) są **inspirowane prawdziwymi
podstronami usługowymi neofox.pl**, odwiedzonymi i przeanalizowanymi podczas
budowy tych stron:
- `neofox.pl/litery-przestrzenne-3d-z-led/` → `frontlit-litery-3d.html`
- `neofox.pl/litery-przestrzenne-3d/` → `litery-niepodswietlane.html`
- `neofox.pl/instalacja-i-podlaczenie/` → `montaz-instalacja.html`
- `neofox.pl/ciecie-frezowanie-cnc/` → `logo-plexi.html`
- `neofox.pl/semafory-reklamowe/` + `neofox.pl/kasetony-reklamowe/` →
  `kasetony-semafory.html` (połączone w jedną podstronę, tak jak w naszym
  dropdownie)

Dla **`backlit-halo.html`, `banery.html` i `oklejanie-witryn.html`** neofox.pl
**nie ma dedykowanych podstron** — te trzy kategorie istnieją na prawdziwej
stronie tylko jako pozycje w formularzu kontaktowym (`neofox.pl/wlasny-projekt/`),
nie jako pełne podstrony z treścią. Dla backlit/halo wykorzystano wzmianki
o efekcie halo znalezione na stronach kasetonów/semaforów; dla banerów i
oklejania witryn treść jest ogólną, wiarygodną wiedzą branżową w tym samym
tonie co reszta strony — **nie są to więc parametry/fakty przepisane z
neofox.pl**, tylko prawdopodobny, spójny stylistycznie opis usługi (podobnie
jak mockowe produkty w `sklep.html` nie mają wymyślonych fałszywych
parametrów, tak i tu unikano zmyślania konkretnych, sprawdzalnych danych).

### Zdjęcia

Każda podstrona używa jako hero tego samego zdjęcia, co odpowiadający jej
kafelek w sekcji `.tiles` na `index.html`/`o-nas.html` (np. `freixenet-halo.jpg`
dla backlitu, `juamo-logo-plexi.jpg` dla logo z plexi) — zachowuje to spójność
wizualną między kafelkiem na stronie głównej a podstroną docelową. Pozostałe
zdjęcia (`.nl-why-image`, `.nl-tech-image`, pasek 4 zdjęć) to zdjęcia realizacji
z `assets/images/` dobrane tematycznie i **powtarzane cyklicznie między
podstronami** (ten sam wzorzec co mockowe karty w `sklep.html` — nie mamy
osobnej sesji zdjęciowej na każdą z 9 usług).

### Nawigacja

Dropdown "Oferta B2B" i kolumna "Oferta" w stopce na **wszystkich** podstronach
serwisu (łącznie z tymi 9) linkują teraz do prawdziwych plików zamiast `#`.
Kolejność w stopce ujednolicono do tej samej co w dropdownie (10 pozycji,
"Wynajem neonów" na końcu jako jedyny nadal `#`).

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
