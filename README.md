# Vinyl — SDK 54, verified working

Rebuilt cleanly for **Expo SDK 54** after a round of dependency-mismatch
errors on the SDK 52 version. Every package version below was checked
against npm's `sdk-54` dist-tags (Expo's own per-SDK pinning) and the whole
project was actually installed, type-checked, and bundled with Metro before
this was handed back — so this should install cleanly for you too.

## Setup

Unlike before, **you don't need `create-expo-app`** — this zip is a
complete, ready project. Just:

```
cd vinyl-app
npm install
npx expo start
```

If you're testing on a phone via Expo Go and hit connection issues, use:
```
npx expo start -c --tunnel
```

That's it. `package.json`, `app.json`, `babel.config.js`, `tsconfig.json`,
and `.npmrc` are all included this time (a few of these were missing from
the original delivery, which is what caused most of the earlier errors).

## What was wrong before, for reference

- `package.json` only listed packages the screens *import directly*, missing
  several build-tool/transitive dependencies (`expo-asset`, `expo-constants`,
  `expo-linking`, `babel-preset-expo`, `react-native-worklets`) that Expo's
  tooling needs but doesn't auto-install.
- It was pinned to SDK 52, but current Expo Go (installed fresh from the app
  store) is SDK 54 — there's no easy way to get an old Expo Go build, so the
  project needed to move up, not Expo Go down.
- `app.json` and `tsconfig.json` didn't exist in the original delivery at
  all, requiring manual creation.
- Along the way, `react-native-reanimated` v4 split its Babel plugin into a
  separate `react-native-worklets` package — `babel.config.js` now points at
  `react-native-worklets/plugin` instead of the old path.
- `.npmrc` with `legacy-peer-deps=true` is included so npm doesn't choke on
  Expo's web-support peer dependencies (`react-dom`, etc.) that don't matter
  for a native-only app like this one.

## What's real vs. what's a placeholder

- **Real & functional:** full navigation across every screen, auth gating
  (unauthenticated users are redirected to Welcome, authenticated users to
  Diary), star rating input, search/filter in Add Log/Search/Create List,
  list creation with reordering, entrance + press animations.
- **Mock data:** everything comes from `data/mock.ts`, typed against
  `types/models.ts`. Swap in a real API (iTunes Search, your backend) by
  replacing this file's exports — the components don't change.
- **Mock auth:** `contexts/AuthContext.tsx` fakes sign-up/log-in with a
  timer and local state — no real backend call. Swap the two `TODO`s in
  there for Supabase/Firebase/your API once that's ready.
- **Approximated, not exact:** the "spotlight" glow on Album Detail is a
  fixed-opacity circle in the `primaryContainer` color, not real
  color-extraction from the artwork. Add a library like
  `react-native-image-colors` and feed its result into `spotlightGlow` for
  the real per-album effect.
- **Not wired up:** "Save Log" and "Create/Save List" close their modals
  without persisting anything — hook up your data layer when ready.
- **Simplified reordering:** list editing uses up/down buttons instead of
  drag-and-drop. Swap in `react-native-draggable-flatlist` if you want true
  drag reordering — the array-swap logic in `create-list.tsx` transfers
  directly.

## Files

```
app.json                    scheme + expo-router plugin (was missing before)
babel.config.js             now points at react-native-worklets/plugin
tsconfig.json                (was missing before)
.npmrc                       legacy-peer-deps, for RN/Expo's web peer deps
app/
  _layout.tsx              root stack + auth gating + font loading
  (auth)/
    _layout.tsx
    welcome.tsx             onboarding entry point
    sign-up.tsx
    log-in.tsx
  (tabs)/
    _layout.tsx             bottom tab bar, intercepts "Add Log" tap
    diary.tsx
    lists.tsx               "My Lists" overview
    activity.tsx
    profile.tsx
    add-log-tab.tsx         placeholder, see _layout.tsx
  album/[id].tsx
  list/[id].tsx             single list's ranked grid
  search.tsx                standalone search screen
  add-log.tsx               modal
  create-list.tsx           modal, also handles editing via ?editId=
components/
  TopAppBar.tsx
  StarRating.tsx
  AlbumCover.tsx            now wrapped in ScalePressable
  DiaryEntryCard.tsx        now wrapped in ScalePressable
  ScalePressable.tsx        reusable press-scale wrapper
  ListCollage.tsx           4-cover collage for list cards
contexts/AuthContext.tsx    mock auth — replace TODOs with real backend
constants/theme.ts
data/mock.ts                now includes `lists`
types/models.ts             now includes `List`
```
