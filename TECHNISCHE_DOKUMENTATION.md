# Technische Dokumentation

## Verwendete Technologien

Die App ist eine kleine Frontend-Anwendung ohne Backend.

- React: baut die Benutzeroberfläche aus Komponenten.
- Vite: startet den lokalen Entwicklungsserver und erstellt den Production-Build.
- TailwindCSS: wird für das Styling und das responsive Layout genutzt.
- JavaScript/JSX: enthält die App-Logik und React-Komponenten.
- JSON-Dateien: enthalten alle Fragen, Spiele- und Regelkarten.
- localStorage: speichert die eingegebenen Spielernamen lokal im Browser.
- ESLint: prüft den Code auf typische Fehler und Stilprobleme.

## App-Struktur

Die wichtigsten Dateien liegen unter `src/`:

```text
src/
  App.jsx
  main.jsx
  index.css
  data/
    piccolo.json
    deep.json
    games.json
    rules.json
  pages/
    StartPage.jsx
    GamePage.jsx
  components/
    Button.jsx
    CardShell.jsx
    GameCard.jsx
    ModeSelector.jsx
    PlayerInputs.jsx
```

`src/main.jsx` startet die React-App.

`src/App.jsx` enthält die zentrale Spiel-Logik:

- Verwaltung der Spieler.
- Auswahl des Modus.
- Aufbau und Mischen des Karten-Decks.
- Ersetzen von Platzhaltern wie `{player1}` und `{player2}`.
- Wechsel zur nächsten Karte.
- Speichern der Spielernamen im Browser.

`src/pages/StartPage.jsx` ist der Startbildschirm mit Spielerauswahl und Modusauswahl.

`src/pages/GamePage.jsx` zeigt die aktuelle Karte, den Fortschritt sowie die Buttons für `Next`, `Skip` und `New Game`.

`src/components/` enthält wiederverwendbare UI-Bausteine wie Buttons, Karten und Eingabefelder.

`src/data/` enthält die Inhalte:

- `piccolo.json`: Party-Fragen.
- `deep.json`: Deep-Talk-Fragen.
- `games.json`: Spielekarten.
- `rules.json`: Regelkarten.

## Spielmodi

Es gibt drei sichtbare Modi:

- Piccolo
- Deep Talk
- Mixed

Es wurden keine zusätzlichen Reiter für `games.json` oder `rules.json` gebaut. Diese Karten werden nur automatisch in passende Runden eingefügt.

## Kartenlogik

### Piccolo

Piccolo nutzt die Fragen aus `piccolo.json`.

Zusätzlich werden eingefügt:

- Games-Karten aus `games.json` nach jeweils etwa 5 normalen Fragen.
- Rules-Karten aus `rules.json` nach zufällig 10 bis 15 normalen Fragen.

### Deep Talk

Deep Talk nutzt nur die Fragen aus `deep.json`.

Games- und Rules-Karten werden hier nicht eingefügt.

### Mixed

Mixed nutzt Party-Fragen aus `piccolo.json` und Deep-Fragen aus `deep.json`.

Die Deep-Fragen werden bewusst seltener eingebaut:

- Das Verhältnis Deep:Party wird pro Deck zufällig zwischen `1:4` und `1:8` gewählt.
- Dadurch kommen deutlich häufiger Party-Fragen als Deep-Fragen.

Zusätzlich werden wie bei Piccolo eingefügt:

- Games-Karten nach jeweils etwa 5 normalen Fragen.
- Rules-Karten nach zufällig 10 bis 15 normalen Fragen.

## Platzhalter in Fragen

Fragen können Platzhalter enthalten:

```text
{player1}
{player2}
```

Beim Anzeigen einer Karte ersetzt die App diese Platzhalter automatisch durch zufällige aktive Spielernamen.

Beispiel:

```json
{
  "type": "party",
  "text": "{player1} verteilt 2 Schlücke an {player2}."
}
```

## App lokal starten

Voraussetzung:

- Node.js muss installiert sein.

Dann im Projektordner ausführen:

```bash
npm install
npm run dev
```

Danach zeigt Vite im Terminal eine lokale Adresse an, meistens:

```text
http://localhost:5173
```

Diese Adresse im Browser öffnen.

## Production-Build erstellen

Für eine fertige Version:

```bash
npm run build
```

Dadurch entsteht der Ordner `dist/`. Dieser Ordner kann zum Beispiel bei Vercel, Netlify oder GitHub Pages deployed werden.

Den fertigen Build lokal testen:

```bash
npm run preview
```

## Code prüfen

Zum Prüfen mit ESLint:

```bash
npm run lint
```

## Neue Fragen hinzufügen

Neue Karten können direkt in den JSON-Dateien unter `src/data/` ergänzt werden.

Eine Karte sollte diese Struktur haben:

```json
{
  "type": "party",
  "text": "Dein Fragetext"
}
```

Wichtig:

- In `piccolo.json` sollte `type` meistens `party` sein.
- In `deep.json` sollte `type` `deep` sein.
- In `games.json` sollte `type` `games` sein.
- In `rules.json` sollte `type` `rules` sein.

