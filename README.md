# Rental Contract Web (prototyp pre iPad)

Tento projekt je pripravený tak, aby si ho vedel spustiť a nasadiť **len cez prehliadač na iPade**.

## 1) Ako to spustím lokálne (voliteľné)
- Nepotrebuješ. Môžeš preskočiť na nasadenie.

## 2) Nasadenie na Vercel cez iPad (bez konzoly)
1. Vytvor si prázdny repozitár na GitHube (cez web).
2. Nahraj súbory z tohto ZIPu do repozitára (Upload files).
3. Otvor vercel.com → New Project → Import Git Repository → vyber svoj repo.
4. Build Command: `next build`, Output: `.next` (predvolené).
5. Deploy → dostaneš URL, ktorú môžeš hneď používať na iPade.

## 3) Čo je pripravené
- Next.js (app router) + Tailwind.
- Stránka s formulárom (podnájom / nájom) – zatiaľ ukáže alert s dátami.

## 4) Čo doplníme nabudúce
- Firebase Auth + Firestore.
- Generovanie PDF z DOCX šablóny (Cloud Function) a uloženie do Storage.



## 5) Firebase nastavenie (1× cez web)
- Console → Create project → Web app (</>) → zober SDK config.
- Authentication → Sign-in method → Google → Enable.
- Firestore Database → Create database (test mode dočasne).
- Vercel → Project Settings → Environment Variables (NEXT_PUBLIC_FIREBASE_...).

Potrebné premenné (NEXT_PUBLIC_…):
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID

## 6) Ako to funguje teraz
- Po prihlásení vyplníš formulár → uloží sa dokument do `contracts` (Firestore).
- Zároveň sa na klientovi vygeneruje jednoduché PDF (jsPDF) a stiahne sa do zariadenia.

## 7) Ďalší krok
- Nahradiť klientsky PDF náhľad za **Cloud Function**, ktorá použije tvoju DOCX šablónu a uloží PDF do Storage `contracts/{contractId}.pdf`.
