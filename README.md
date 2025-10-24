MAPSPRO - Codemap & dynamic functions

This README lists the dynamic functions in the project, where to find them, what they do, their inputs/outputs and side effects, and short usage notes. It is intended as internal notes for future maintenance.

Files scanned
- `MAPSPRO.aspx` - Entry HTML page (loads React and mounts `js/main.js`).
- `js/main.js` - App bootstrap (imports `ui/App.js`).
- `js/config/links.js` - Central configuration of tabs, groups and link templates; exports `tabbladen` and `gemeenteCodes`.
- `js/services/linkService.js` - Helper function `bouwLink` to construct URL strings.
- `js/services/mapsApiService.js` - Service `fetchBeroepenCount` to query MAPS API counts.
- `js/services/spService.js` - Service `getCurrentUserEmail` to get the current user's email from SharePoint.
- `js/ui/App.js` - Main React view. Contains many interactive functions and UI wiring.
- `css/style.css` - Styling for the UI.

Dynamic functions (detailed)

1) getCurrentUserEmail
- Location: `js/services/spService.js`
- Signature: async function getCurrentUserEmail()
- Inputs: none
- Outputs: Promise<string> (user's email, or placeholder `gebruiker@onbekend.nl` on error)
- Side effects: performs a network fetch to `/_api/web/currentuser` if `_spPageContextInfo.userEmail` not present; logs errors to console.
- Usage: imported by `js/ui/App.js` to populate the current user's email into state.
- Notes: relies on SharePoint global `_spPageContextInfo` when available; fallback uses REST API. Returns a placeholder email on error.

2) fetchBeroepenCount
- Location: `js/services/mapsApiService.js`
- Signature: async function fetchBeroepenCount(email, hoorfase = null, datumtijdHoorzittingVanaf = null, datumtijdHoorzittingTotEnMet = null)
- Inputs:
  - email: string (used as `eigenaar` filter)
  - hoorfase: string|null (optional filter for hearing phase)
  - datumtijdHoorzittingVanaf / datumtijdHoorzittingTotEnMet: optional date/time range values used in payload
- Outputs: Promise<number> (totalElements on success, -1 on error)
- Side effects: POST fetch to MAPS API endpoint `mapsApiBasisUrl` with JSON payload; logs errors.
- Usage: Not directly used in current `App.js` snapshot, but exported for potential UI counters.
- Notes: constructs a payload with filter objects and optionally fills `hoorverzoek` fields. Returns -1 if fetch fails.

3) bouwLink
- Location: `js/services/linkService.js`
- Signature: function bouwLink(basisUrl, parameters)
- Inputs:
  - basisUrl: string (base URL)
  - parameters: object (key -> string | array)
- Outputs: string (fully formed URL as string)
- Side effects: none (pure function)
- Usage: low-level URL builder used by `bouwDynamischeLink`. Also usable by other modules.
- Notes: Handles arrays by appending multiple searchParams entries for the same key (for `sort` etc.). Uses URL and URLSearchParams.

4) bouwDynamischeLink
- Location: `js/services/linkService.js`
- Signature: function bouwDynamischeLink(linkConfig, context, gemeenteCode = null, customParams = {})
- Inputs:
  - linkConfig: object (link configuration from `tabbladen`)
  - context: object with `email` and `actiefTab` properties
  - gemeenteCode: string|null (optional gemeente code for gemeente-specific links)
  - customParams: object (optional custom parameters for special links like eigenaar input or date ranges)
- Outputs: string (complete URL ready for navigation)
- Side effects: none (pure function, but reads current date)
- Usage: main link builder used by `App.js` for `openLink`, `openGemeenteLink`, `openCustomEigenaarLink`, and `openCustomDateRangeLink`.
- Notes: Handles all dynamic parameter logic (owner injection, date ranges, gemeente codes, custom eigenaar with * wrapping, custom date ranges). Centralizes URL construction logic that was previously scattered in UI component.

5) React App component functions
- Location: `js/ui/App.js` (default exported React component)
- Key internal functions and behaviors found inside `App`:
  - handleSelectChange(key, value)
    - Updates `selecties` React state with the selected value for a given key.
    - Inputs: key (string), value (string)
    - Outputs: none (state update)
    - Side effects: triggers React re-render.
  - React.useEffect(...) mounting hook
    - Calls `getCurrentUserEmail()` and sets `email` state.
    - Inputs: none
    - Outputs: none (state set)
  - openLink(linkConfig)
    - Simplified function that delegates URL construction to `bouwDynamischeLink`.
    - Inputs: linkConfig object as defined in `tabbladen`.
    - Outputs: none
    - Side effects: calls `bouwDynamischeLink` with context, then `window.open`.
    - Important behavior: now much cleaner - just passes context to the dedicated link builder.
  - openGemeenteLink(linkConfig, selectieKey)
    - Validates gemeente selection, then delegates to `bouwDynamischeLink` with gemeente code.
    - Inputs: linkConfig, selectieKey (the key used in selects)
    - Outputs: none
    - Side effects: window.open, alert if no selection made.
    - Important behavior: now uses the same link builder as `openLink`, ensuring consistency.
  - openCustomEigenaarLink(linkConfig, inputKey)
    - Validates eigenaar input, then delegates to `bouwDynamischeLink` with custom eigenaar parameter (wrapped in * characters).
    - Inputs: linkConfig, inputKey (the key used for custom input state)
    - Outputs: none
    - Side effects: window.open, alert if no input provided.
  - openCustomDateRangeLink(linkConfig, startKey, endKey)
    - Validates start/end datetime inputs, then delegates to `bouwDynamischeLink` with custom date range parameters.
    - Inputs: linkConfig, startKey, endKey (keys used for datetime input state)
    - Outputs: none
    - Side effects: window.open, alert if inputs missing or invalid (start >= end).
  - renderSectie(sectieNaam, sectieConfig)
    - Renders either a werkbak grid (when `isWerkbak`) or a details panel with buttons/notes/custom input badges.
    - Inputs: sectieName, sectieConfig
    - Outputs: React elements
    - Side effects: None beyond UI rendering; wires click handlers to various link functions.
    - Important behavior: now handles `isCustomEigenaarLink` and `isCustomDateRangeLink` flags to render interactive input badges.

- Component state & props to be aware of
  - email: fetched via `getCurrentUserEmail`.
  - selecties: object keyed by select element keys to remember municipality selection(s).
  - actiefTab: name of active tab. Default is first key in `tabbladen`.
  - customInputs: object keyed by input element keys to remember custom eigenaar names and datetime values.

- Usage: App is bootstrapped from `js/main.js` which renders `App` into `#react-app`.

General notes & follow-ups
- Where to change the base MAPS URLs and parameters: `js/config/links.js` has centralized `basisUrl...` constants and the `tabbladen` structure. This is the recommended place to edit endpoints and parameter templates.

- If you want counters (e.g. number of matching items per link), use `fetchBeroepenCount` from `js/services/mapsApiService.js`. It expects an email to filter by owner; adapt payload for other filters if needed.

- The function `bouwDynamischeLink` (in `linkService.js`) contains the main dynamic behavior (owner injection, dynamic date ranges, gemeente codes, custom inputs). Be careful if you change the `tabbladen` objects: expected keys on link objects include `basisUrl`, `vasteParameters`, and optional booleans `dynamischeDatumTotVandaag`, `isNietPersoonlijk`, `isZittingenLink`, `isCustomEigenaarLink`, `isCustomDateRangeLink`.

- Styling: `css/style.css` holds all UI styles; it's straightforward to tweak spacing and colors.

Verification & next steps
- I scanned all JS files and the ASPX entry and created these notes. If you want, I can:
  - Add inline JSDoc comments to the service functions (`bouwLink`, `fetchBeroepenCount`, `getCurrentUserEmail`).
  - Implement small unit tests for `bouwLink`.
  - Add counts displayed next to buttons by integrating `fetchBeroepenCount` in `App.js`.

Done. 
