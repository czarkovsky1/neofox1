> **STATUS: checkout.html został zbudowany** (patrz sekcja "Podstrona Checkout"
> w `CLAUDE.md` po pełny opis). `.koszyk-checkout-btn` w `koszyk.html` linkuje
> już do `checkout.html`. Reszta tego pliku to historyczny kontekst z sesji,
> która budowała sklep/kartę produktu/koszyk — zostawiony jako tło decyzji.

# Handoff — sesja "Sklep + Karta produktu + Koszyk"

Ten plik to skompresowane podsumowanie poprzedniej konwersacji z Claude Code.
Czytaj go na początku następnej sesji, w której budujemy **stronę checkout
(finalizacja zamówienia)**. Pełna, żywa dokumentacja design systemu i
struktury stron jest w [CLAUDE.md](CLAUDE.md) — ten plik dodaje kontekst
*decyzji* i *dlaczego*, którego CLAUDE.md nie zawiera.

## Co zbudowano w tej sesji (w kolejności)

1. **Design system** — wyekstrahowany z istniejącego CSS i zapisany w pamięci
   Claude (kolory, typografia, layout, komponenty, wzorce sekcji) tak, żeby
   kolejne podstrony trzymały spójny styl bez projektowania od zera.
2. **`sklep.html`** — strona listingu sklepu. Filtry kategorii (14 sztuk, ze
   scrapowanej strony neofox.pl/kategoria-produktu/wszystkie-produkty/),
   siatka 5 kolumn kafelków produktów stykających się bez odstępu (`gap: 0`).
   10 kart: 1 prawdziwy produkt + 9 mockupów (powtórzone 5 zdjęć realizacji).
3. **`produkt-happy-birthday.html`** — jedyna karta produktu. Dane w 100%
   prawdziwe, pobrane z neofox.pl/produkt/happy-birthday-neon-led-2/
   (cena 1500 zł, wymiary 98×72 cm, kolor "ciepła biel"). Układ inspirowany
   neonowo.co/products/swoosh i neofox.pl/produkt/happy-birthday-neon-led-3/
   (zakładki Opis/Opinie/Wysyłka), ale w wizualnym stylu NEOFOX.
4. **`koszyk.html`** — strona koszyka. Statyczna makieta (decyzja
   użytkownika — nie localStorage), ale w pełni interaktywna w obrębie jednej
   wizyty: przeliczanie sum, zmiana dostawy, usuwanie pozycji, stan pustego
   koszyka, komunikat po kuponie.
5. Poprawki wizualne koszyka: usunięcie obwódki (border) z szarego pola
   podsumowania, zmiana etykiety "Metody płatności" z caps locka na zwykły
   tekst — bo użytkownik ocenił poprzednią wersję jako "generyczny design
   Claude" i kazał wzorować się na `kontakt.html` (płaskie tło `#f8f8f8`,
   bez obramowania — patrz `.kontakt-card` w `css/kontakt.css`).

## Kluczowe decyzje i konwencje (ważne dla checkout)

- **To jest statyczna strona bez backendu** (brak bramki płatności, brak
  bazy danych, brak realnego systemu koszyka/localStorage — użytkownik
  świadomie wybrał "statyczną makietę" zamiast localStorage dla koszyka).
  Checkout powinien iść w tym samym duchu: **wyglądać i działać wizualnie
  w obrębie jednej wizyty** (JS liczy sumy, waliduje formularz wizualnie),
  ale bez prawdziwej integracji płatności.
- **Nigdy nie wymyślamy danych/parametrów produktowych.** Wszystko o
  "Happy Birthday" Neon LED musi zgadzać się z tym, co już ustalone (cena
  1500 zł, rozmiar 98×72 cm, kolor "ciepła biel", dostawa DPD 3 dni robocze).
- **"Przejdź do płatności"** w `koszyk.html` (`.koszyk-checkout-btn`) obecnie
  linkuje do `kontakt.html` jako tymczasowy placeholder — **to właśnie ten
  link trzeba przekierować na nową stronę checkout** (np. `checkout.html`)
  po jej zbudowaniu.
- **Metody płatności** pokazane jako proste tekstowe pigułki (Visa,
  Mastercard, BLIK, Przelewy24, Apple Pay, Google Pay) — świadomie NIE
  rysujemy prawdziwych logotypów marek (kwestia znaków towarowych), tylko
  neutralny tekst w `.koszyk-payment-pill`. Zachować tę konwencję w checkout.
- **Formularze** — istniejący wzorzec `.kf-row` / `.kf-field` / `.kf-label`
  z `kontakt.html` (patrz `css/style.css` sekcja "SHARED FORM COMPONENTS") to
  gotowy, przetestowany komponent do pól typu imię/e-mail/telefon/adres —
  użyj go zamiast tworzyć nowy system pól dla checkout.
- **Dostawa**: dwie opcje ustalone w koszyku — Kurier DPD (40 zł) i Odbiór
  osobisty w Poznaniu (0 zł). Checkout powinien pokazywać wybraną opcję
  (przekazaną jakoś z koszyka — w statycznej makiecie wystarczy powtórzyć
  wybór jako kolejny radio-select, bez realnego przekazywania stanu między
  stronami).
- **Design system — najważniejsze reguły** (pełne w CLAUDE.md i pamięci):
  brak `border-radius` na zdjęciach/kartach (tylko przyciski 999px i pola
  formularza 6px), nagłówki sekcji Bebas Neue, `--color-orange: #f5821f`
  jako jedyny akcent, płaskie tła (`#f8f8f8` / `#f4f4f4`) **bez obramowania**
  zamiast `border: 1px solid` — to była świeża poprawka po uwadze
  użytkownika o "generycznym designie".
- **Ikona koszyka w headerze** jest już prawdziwym linkiem (`<a href="koszyk.html">`)
  na wszystkich 8 podstronach (index, o-nas, kontakt, galeria, neony-led,
  sklep, produkt-happy-birthday, koszyk). Reszta ikon (szukaj/konto/ulubione)
  zostaje dekoracyjna.

## Co dalej: strona checkout

Nie zaczęliśmy jeszcze tej strony. Rzeczy do ustalenia z użytkownikiem na
starcie kolejnej sesji (podobnie jak przy koszyku warto zapytać o zakres):

1. Czy checkout to jedna strona czy proces wieloetapowy (dane → dostawa →
   płatność → podsumowanie)? Sądząc po prostocie reszty strony, najpewniej
   **jedna strona** z formularzem danych + podsumowaniem zamówienia obok
   (analogicznie do układu `koszyk.html`: lewa kolumna = treść, prawa =
   sticky podsumowanie).
2. Czy ma być realna walidacja pól (HTML5 `required` + wzorce, tak jak w
   `kontakt.html`) czy czysto wizualna makieta?
3. Co się dzieje po kliknięciu "Zapłać"/"Złóż zamówienie" — skoro nie ma
   backendu, prawdopodobnie strona "Dziękujemy za zamówienie" (nowa
   podstrona) albo redirect do `kontakt.html`/`index.html`. Do ustalenia.
4. Pamiętaj, żeby na końcu zaktualizować `koszyk.html` (`.koszyk-checkout-btn`)
   żeby wskazywał na nowy plik checkout zamiast `kontakt.html`.
5. Zaktualizuj `CLAUDE.md` o nową sekcję opisującą checkout, tak jak zrobiono
   to dla sklep/produktu/koszyka.

## Pliki utworzone/zmodyfikowane w tej sesji

- `sklep.html`, `css/sklep.css` (nowe)
- `produkt-happy-birthday.html`, `css/produkt.css` (nowe)
- `koszyk.html`, `css/koszyk.css` (nowe)
- `assets/images/products/happy-birthday-1.jpg` … `-4.jpg` (nowe, pobrane z neofox.pl)
- `.gitignore` (nowy, wcześniejsza sesja)
- Nawigacja "Sklep" i ikona "Koszyk" zaktualizowane w: `index.html`, `o-nas.html`,
  `kontakt.html`, `galeria.html`, `neony-led.html`
- `CLAUDE.md` — rozszerzony o sekcje: Sklep, Karta produktu, Koszyk
- Pamięć Claude (`project_neofox_design_system.md`) — rozszerzona o wzorce
  e-commerce (listing, karta produktu)
