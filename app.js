/* Dane cennika i kreatora w jednym miejscu (w wersji docelowej edytowane w prostym panelu).
   Ceny i opisy wg cennika na psychodia.pl/cennik. */
const ZABIERZ_KIER = ['prawo jazdy', 'dowód osobisty', 'skierowanie, jeśli je otrzymałeś', 'okulary, jeśli ich używasz', 'coś do picia i przekąskę'];
const ZABIERZ_PRAC = ['dowód osobisty', 'skierowanie od pracodawcy lub lekarza medycyny pracy', 'okulary, jeśli ich używasz'];
const ZABIERZ_SKIER = ['prawo jazdy (jeśli nie zostało zatrzymane)', 'dowód osobisty', 'skierowanie z policji, starostwa lub sądu', 'okulary, jeśli ich używasz', 'coś do picia i przekąskę'];
const UWAGA_30 = 'Jeżeli od odebrania skierowania minęło 30 dni, zadzwoń przed przyjściem: 511 035 215.';
const T_KIER = 'ok. 1,5 godziny', T_OPER = '30-45 minut', T_INNE = 'podamy przy zapisie';

const GRUPY = [
  { nazwa: 'Kierowcy', opcje: [
    { id: 'zaw', kto: 'Kierowca zawodowy (np. kat. C, C+E, D)', badanie: 'Badanie psychologiczne kierowcy zawodowego', cena: 150, czas: T_KIER, zab: ZABIERZ_KIER },
    { id: 'kand', kto: 'Kandydat na kierowcę lub kurs na przewóz rzeczy i osób', badanie: 'Badanie psychologiczne kandydata na kierowcę', cena: 150, czas: T_KIER, zab: ZABIERZ_KIER },
    { id: 'instr', kto: 'Instruktor lub egzaminator nauki jazdy', badanie: 'Badanie psychologiczne instruktora i egzaminatora', cena: 150, czas: T_KIER, zab: ZABIERZ_KIER },
    { id: 'taxi', kto: 'Kierowca taksówki', badanie: 'Badanie psychologiczne kierowcy taxi', cena: 150, czas: T_KIER, zab: ZABIERZ_KIER },
    { id: 'upr', kto: 'Pojazd uprzywilejowany lub przewóz wartości pieniężnych', badanie: 'Badanie psychologiczne kierowcy pojazdu uprzywilejowanego / przewożącego wartości pieniężne', cena: 150, czas: T_KIER, zab: ZABIERZ_KIER },
    { id: 'zatrz', kto: 'Zatrzymane prawo jazdy (alkohol, środki odurzające, punkty karne)', badanie: 'Badanie psychologiczne po zatrzymaniu prawa jazdy', cena: 150, czas: T_KIER, zab: ZABIERZ_SKIER, uwaga: UWAGA_30 },
    { id: 'wyp', kto: 'Sprawca wypadku drogowego', badanie: 'Badanie psychologiczne kierowcy sprawcy wypadku', cena: 150, czas: T_KIER, zab: ZABIERZ_SKIER, uwaga: UWAGA_30 },
    { id: 'sluzb', kto: 'Kierowca samochodu służbowego kat. B', badanie: 'Badanie psychologiczne kierowcy samochodu służbowego', cena: 100, czas: T_INNE, zab: ['prawo jazdy', 'dowód osobisty', 'skierowanie od pracodawcy, jeśli je masz', 'okulary, jeśli ich używasz'] },
  ]},
  { nazwa: 'Operatorzy maszyn i praca', opcje: [
    { id: 'wozek', kto: 'Operator wózka widłowego', badanie: 'Badanie psychologiczne kierowcy wózka jezdniowego', cena: 80, czas: T_OPER, zab: ZABIERZ_PRAC },
    { id: 'masz', kto: 'Operator ciężkich maszyn budowlanych', badanie: 'Badanie psychologiczne operatora maszyn budowlanych', cena: 80, czas: T_OPER, zab: ZABIERZ_PRAC },
    { id: 'dzwig', kto: 'Pracownik obsługujący dźwig', badanie: 'Badanie psychologiczne pracownika obsługującego dźwig', cena: 80, czas: T_OPER, zab: ZABIERZ_PRAC },
    { id: 'ochr', kto: 'Pracownik ochrony, licencja ochrony fizycznej', badanie: 'Badanie psychologiczne pracownika ochrony', cena: 100, czas: T_INNE, zab: ZABIERZ_PRAC },
    { id: 'motor', kto: 'Motorniczy', badanie: 'Badanie psychologiczne motorniczego', cena: 100, czas: T_INNE, zab: ZABIERZ_PRAC },
    { id: 'inne', kto: 'Inne stanowisko ze skierowaniem lekarza lub pracodawcy', badanie: 'Badanie sprawności psychomotorycznej na stanowisko pracy', cena: 100, czas: T_INNE, zab: ZABIERZ_PRAC },
  ]},
  { nazwa: 'Wymiar sprawiedliwości i opinie', opcje: [
    { id: 'kur', kto: 'Kurator sądowy', badanie: 'Badanie psychologiczne kuratora sądowego', cena: 150, czas: T_INNE, zab: ['dowód osobisty', 'skierowanie lub pismo z sądu, jeśli je masz', 'okulary, jeśli ich używasz'] },
    { id: 'sedz', kto: 'Sędzia lub prokurator', badanie: 'Badanie psychologiczne sędziego, prokuratora', cena: 200, czas: T_INNE, zab: ['dowód osobisty', 'skierowanie, jeśli je masz', 'okulary, jeśli ich używasz'] },
    { id: 'pozn', kto: 'Ocena funkcji poznawczych z opinią', badanie: 'Badanie funkcji poznawczych z wydaniem opinii psychologicznej', cena: 280, czas: T_INNE, zab: ['dowód osobisty', 'dokumentacja medyczna, jeśli ją masz', 'okulary, jeśli ich używasz'] },
  ]},
];

const CENNIK = [
  { grupa: 'Kierowcy', ktos: ['egzaminatorzy i instruktorzy jazdy', 'kierowcy zawodowi', 'kandydaci na kierowców', 'pojazdy uprzywilejowane i przewóz wartości pieniężnych', 'sprawcy wypadków', 'po alkoholu lub środkach odurzających', 'po przekroczeniu limitu punktów', 'kierowcy taxi'], cena: 150 },
  { grupa: 'Operatorzy maszyn', ktos: ['wózki jezdniowe', 'medycyna pracy na podstawie skierowania', 'ciężkie maszyny budowlane', 'obsługa dźwigu'], cena: 80 },
  { grupa: 'Samochody służbowe kat. B i inne stanowiska', ktos: ['sprawność psychomotoryczna', 'stanowiska na zlecenie lekarza lub pracodawcy', 'pracownicy ochrony i licencja ochrony fizycznej', 'motorniczy'], cena: 100 },
  { grupa: 'Kurator sądowy', ktos: ['badanie psychologiczne kuratora sądowego'], cena: 150 },
  { grupa: 'Sędzia, prokurator', ktos: ['badanie psychologiczne sędziego i prokuratora'], cena: 200 },
  { grupa: 'Funkcje poznawcze', ktos: ['badanie funkcji poznawczych z wydaniem opinii psychologicznej'], cena: 280 },
];

const $ = s => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

/* ---------- menu ---------- */
const ham = $('#ham'), panel = $('#panel');
ham.addEventListener('click', () => {
  const o = ham.getAttribute('aria-expanded') !== 'true';
  ham.setAttribute('aria-expanded', o); ham.setAttribute('aria-label', o ? 'Zamknij menu' : 'Otwórz menu');
  panel.hidden = !o;
});
panel.addEventListener('click', e => { if (e.target.closest('a')) { panel.hidden = true; ham.setAttribute('aria-expanded', 'false'); } });

/* ---------- cennik ---------- */
const cenTab = $('#cenTab');
CENNIK.forEach(c => {
  const w = el('div', 'cen-wiersz');
  w.append(el('h3', '', c.grupa), el('ul', '', c.ktos.map(k => `<li>${k}</li>`).join('')), el('p', 'cena', `${c.cena} zł<small>z VAT</small>`));
  cenTab.append(w);
});

/* ---------- kreator ---------- */
const lista = $('#krLista');
const wszystkie = {};
GRUPY.forEach(g => {
  const box = el('div', 'kr-grupa');
  box.append(el('h3', '', g.nazwa));
  g.opcje.forEach(o => {
    wszystkie[o.id] = o;
    const b = el('button', 'opcja', `${o.kto}<span>${o.cena} zł</span>`);
    b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false'); b.dataset.id = o.id;
    box.append(b);
  });
  lista.append(box);
});

let wybor = null, dzien = null, godzina = null;
const karta = $('#krKarta'), pusto = $('#krPusto');

lista.addEventListener('click', e => {
  const b = e.target.closest('.opcja'); if (!b) return;
  lista.querySelectorAll('.opcja').forEach(x => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
  wybor = wszystkie[b.dataset.id];
  $('#krKto').textContent = wybor.kto;
  $('#krNazwa').textContent = wybor.badanie;
  $('#krCena').textContent = wybor.cena + ' zł';
  $('#krCzas').textContent = wybor.czas;
  $('#krZabierz').innerHTML = wybor.zab.map(z => `<li>${z}</li>`).join('');
  const u = $('#krUwaga'); u.hidden = !wybor.uwaga; u.textContent = wybor.uwaga || '';
  pusto.hidden = true; karta.hidden = false;
  odswiez();
  if (innerWidth <= 980) {
    const r = $('#krWynik').getBoundingClientRect();
    if (r.top > innerHeight * .6 || r.top < 0) $('#krWynik').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* terminy: najbliższe 10 dni roboczych (pon-sob), dziś tylko jeśli są jeszcze wolne godziny.
   PRZYKLADOWE godziny - w wersji docelowej kalendarz ustawia placówka. */
const DNI = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'];
const MIES = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
const GODZ_TYG = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const GODZ_SOB = ['9:00', '10:00', '11:00', '12:00'];
const teraz = new Date();
const terminy = [];
for (let i = 0; terminy.length < 10 && i < 20; i++) {
  const d = new Date(teraz.getFullYear(), teraz.getMonth(), teraz.getDate() + i);
  if (d.getDay() === 0) continue;
  let g = d.getDay() === 6 ? GODZ_SOB : GODZ_TYG;
  if (i === 0) g = g.filter(h => parseInt(h) > teraz.getHours() + 1);
  if (!g.length) continue;
  terminy.push({ d, g, dzis: i === 0, jutro: i === 1 });
}
const dniBox = $('#dni'), godzBox = $('#godz');
terminy.forEach((t, i) => {
  const b = el('button', 'dzien', `${t.dzis ? 'dziś' : t.jutro ? 'jutro' : DNI[t.d.getDay()]}<b>${t.d.getDate()}</b>${MIES[t.d.getMonth()]}`);
  b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false'); b.dataset.i = i;
  dniBox.append(b);
});
/* zajete godziny - deterministycznie, zeby kalendarz wygladal realnie */
const zajete = (t, h) => ((t.d.getDate() * 7 + parseInt(h) * 3) % 5) === 0;
function pokazGodziny() {
  godzBox.innerHTML = '';
  if (dzien == null) return;
  terminy[dzien].g.forEach(h => {
    const b = el('button', 'godzina', h); b.type = 'button'; b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', h === godzina ? 'true' : 'false'); b.dataset.h = h;
    if (zajete(terminy[dzien], h)) { b.disabled = true; b.setAttribute('aria-label', h + ' zajęte'); }
    godzBox.append(b);
  });
}
dniBox.addEventListener('click', e => {
  const b = e.target.closest('.dzien'); if (!b) return;
  dzien = +b.dataset.i; godzina = null;
  dniBox.querySelectorAll('.dzien').forEach(x => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
  pokazGodziny(); odswiez();
});
godzBox.addEventListener('click', e => {
  const b = e.target.closest('.godzina'); if (!b || b.disabled) return;
  godzina = b.dataset.h;
  godzBox.querySelectorAll('.godzina').forEach(x => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
  odswiez();
});
$('#fImie').addEventListener('input', odswiez);
$('#fTel').addEventListener('input', odswiez);

const zapisz = $('#zapisz');
function dataTxt() { const t = terminy[dzien]; return `${DNI[t.d.getDay()]} ${t.d.getDate()} ${MIES[t.d.getMonth()]}, godz. ${godzina}`; }
function odswiez() {
  const p = $('#podsum');
  const st = document.querySelector('.potw'); if (st) st.remove();
  if (!wybor) return;
  if (dzien == null || !godzina) { p.innerHTML = 'Wybierz dzień i godzinę.'; zapisz.setAttribute('aria-disabled', 'true'); return; }
  const tel = $('#fTel').value.replace(/\D/g, '');
  p.innerHTML = `<b>${wybor.badanie}</b>, ${dataTxt()}, ${wybor.cena} zł.` + (tel.length >= 9 ? '' : ' Podaj telefon, oddzwonimy z potwierdzeniem.');
  zapisz.setAttribute('aria-disabled', tel.length >= 9 ? 'false' : 'true');
}
zapisz.addEventListener('click', e => {
  e.preventDefault();
  if (zapisz.getAttribute('aria-disabled') === 'true') return;
  const imie = $('#fImie').value.trim(), tel = $('#fTel').value.trim();
  const tresc = `Dzień dobry, chcę zarezerwować termin.\nBadanie: ${wybor.badanie} (${wybor.cena} zł)\nTermin: ${dataTxt()}\n${imie ? 'Imię i nazwisko: ' + imie + '\n' : ''}Telefon: ${tel}`;
  const mail = `mailto:ekursyonlinepl@gmail.com?subject=${encodeURIComponent('Zapis na badanie: ' + dataTxt())}&body=${encodeURIComponent(tresc)}`;
  const box = el('div', 'potw', `<p>W gotowej stronie zgłoszenie trafi od razu do kalendarza placówki, a placówka potwierdzi termin telefonicznie lub SMS-em. W tej wizualizacji możesz wysłać je e-mailem: <a href="${mail}">otwórz gotową wiadomość</a>.</p>`);
  $('.akcje').after(box);
});

/* ---------- dolny pasek na telefonie: dopiero po przewinieciu za CTA w hero ---------- */
const mob = $('#mob'), cta = $('#heroCta');
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([en]) => {
    const pod = !en.isIntersecting && en.boundingClientRect.top < 0;
    mob.classList.toggle('widac', pod);
    mob.setAttribute('aria-hidden', pod ? 'false' : 'true');
    mob.querySelectorAll('a').forEach(a => a.tabIndex = pod ? 0 : -1);
  }).observe(cta);
}
