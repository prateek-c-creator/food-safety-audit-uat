# Food Safety Audit: setup guide (about 30 minutes, once, all free)

What you get
- Server: Google Apps Script + a Google Sheet (keeps every audit forever) + a Drive folder (photos, flushed after N days).
- App for Android: an APK built free by GitHub. App for iPhone: the same app installed from a link to the Home Screen (free; see Part 4).
- On every submit: a report email to the address saved in Admin, with the table, photos inside the mail body and the Excel attached. The cinema name chosen in Settings is in the subject, the email header, the Excel title and the Excel file name.
- A Settings tab: Connections (the Google link, status and account) and Select cinema.
- An Admin tab protected by a one-time code emailed to the admin address.

The app holds no personal data of its own. Every name, email address, link and code is entered after install.

Nothing here runs on a company network. Staff only need mobile data or Wi-Fi.

## Part 1. Server (Google account, Sheet, script, Drive)
1. Create a dedicated Google account for the unit, for example your-unit.foodaudit@gmail.com. It will own the data and send the emails.
   (A company Google Workspace account may block "Anyone" web apps. A plain Gmail account does not.)
2. Signed in as that account, open https://sheets.new and name the file "Food Safety Audit Data".
3. Extensions > Apps Script. Delete the sample code, paste all of `backend/Code.gs`, click Save.
4. In the function picker choose `setup`, click Run, allow the permissions (Advanced > Go to project). This creates the tabs, the Drive folder "Food Safety Audit Photos" and a daily clean-up job.
5. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy.
6. Copy the Web app URL (ends with /exec). This is your server link.
7. Changing the script later: Deploy > Manage deployments > pencil > New version. The link stays the same.

## Part 2. Host the app (free, one link for everyone)
1. Create a free account at github.com and a new repository, for example `food-safety-audit`.
   Public is fine for the free web hosting (the site holds no secrets; use the staff access code in Part 5).
2. (Optional) Open `www/config.js` and paste your server link between the quotes so phones need no setup. Leave it empty to connect from the Settings tab instead; that is the default.
3. In the repository: Add file > Upload files, drag in everything from this folder (including the hidden `.github` folder), Commit to `main`.
   If `.github` did not upload: Add file > Create new file, type `.github/workflows/pages.yml` as the name and paste the file's text.
4. Settings > Pages > Build and deployment > Source: GitHub Actions.
5. Actions tab > "Publish web app" > Run workflow. After about a minute your link appears: https://YOUR-NAME.github.io/food-safety-audit/
   Updating the app later: upload the changed file; it republishes by itself.

## Part 3. Android
Option A (simplest): open the link above in Chrome > menu > Install app (or Add to Home screen). Works like an app, no APK needed.
Option B (APK file): Actions tab > "Build APK" > Run workflow (about 6 minutes). Open the finished run, download the artifact `food-safety-audit-apk`, unzip, send `app-debug.apk` to phones, allow "install unknown apps" once.
Company-managed phones often block APK installs. Use option A there.

## Part 4. iPhone (free)
Apple only allows a real App Store / TestFlight app with a paid Apple Developer account (about US$99 a year) and a Mac to build it, so there is no free native app.
The free way is the same app installed from the link, and it behaves like an app (own icon, full screen, camera):
1. On the iPhone open the link from Part 2 in Safari (not inside WhatsApp).
2. Tap the Share button > Add to Home Screen > Add.
3. Open "Food Safety" from the Home Screen. Allow Camera when asked.
Tips: iOS 16.4 or newer. Always open it from the Home Screen icon, not Safari, so its saved data is kept.
If you later buy an Apple Developer account, this project can be turned into a native iOS app with Capacitor (`npx cap add ios`) and built on a Mac.

## Part 5. First use and checks
1. On first launch the app asks you to pick your cinema (type part of the name, tap a match). Then open Settings > Connections, paste the server link (and the access code if one is set) and tap Connect Google. Status changes to Connected and shows the Google account that owns the server. Google access is given only here. Disconnect removes the link and code from that phone.
2. Open Admin > Email me a code. No admin email exists yet, so the code goes to the Google account that owns the server. Enter the 6 digits.
3. In Admin, type your own admin email under **Admin email** and tap Save admin email. Codes go there from now on (a bad address shows an error, a good one shows a success message).
4. Under Report email, type where reports should go (nothing is emailed until an address is saved). Set how many days photos are kept. Optionally set a staff access code (staff are asked for it once on each phone). Keep it private, it is the only thing stopping outsiders submitting audits.
5. Tap "Send test email (photos + Excel)". Open the mail in Outlook: sample photos must be inside the boxes and an Excel attached.
   If the mail goes to Junk or Quarantine, ask IT to allow the sender address.
6. Submit one real test audit: Submit stays locked until all 49 points are scored and every critical point has a remark and a photo.

Changing the cinema later: Settings > Select cinema. The header and all new reports use it at once. Each phone keeps its own choice.

## Good to know
- Gmail free accounts can send about 100 recipients a day, Workspace more. You need about 4 a day. Check Google's current quota page if volumes grow.
- Photos are taken with the camera only and stamped with date and time. After the keep-days pass they are deleted from Drive; scores, remarks, names and times stay forever in the sheet tabs "Audits" and "Detail".
- The Excel has Summary, Detail, Shortfalls and Photos sheets. In the email, the full checklist is shown for 1 or 2 audits and shortfalls only for bigger reports, to stay under Gmail's size limit.
- Not yet tested on real devices: the Apps Script server, the GitHub hosting and the installs. Run Part 5 steps 5 and 6 right after setup.

## Several people, one checklist (how clashes are handled)
- Read / write separation: lists and audits are read from a short-lived cached snapshot (25 s by default) and never wait for the write lock. Every write bumps a version so the next read is fresh.
- Write lock: one short script lock (10 s by default, then "busy, retrying") around the sheet write only. Photo uploads, the report email and Drive work run outside the lock.
- Pessimistic section locks: each checklist section (General, I to V) is a "leg". The first edit in a section claims it for that phone. A second phone sees "NAME filling" on that section and cannot change it; the server also refuses and keeps the first person's values. Submit is blocked while another person still holds a section.
- TTL: a section claim lasts 5 minutes by default and is renewed while the person is editing on screen. A closed or dead phone frees its sections by itself. Leaving the checklist releases them at once.
- Bitmasks: per audit the server stores `sm` (bit j of entry i = point j of section i is scored) and `ld` (bit i = section i fully scored). Claim, busy and rejected results are also section masks (63 = all six sections).
- Only the phone holding a section can change it, so a stale phone can never overwrite someone else's section. Employee details are last write wins.

### Manual controls (Admin tab, "Shared checklist control")
Sign in to Admin with the email code, then change the values and press **Save settings**:
- **Lock each section to one person at a time**: on = section locks; off = anyone can edit anything, last save wins.
- **Section lock time-out** (60 to 1800 s, default 300): how long a quiet phone keeps a section.
- **Save wait when busy** (2 to 30 s, default 10): how long a save queues behind another before asking the phone to retry.
- **Read cache** (0 to 120 s, default 25; 0 = off): how stale a list can be. Writes always refresh it.
- **Refresh read cache now**, the live list of held sections with **Release**, and **Release all section locks** for a stuck phone.
