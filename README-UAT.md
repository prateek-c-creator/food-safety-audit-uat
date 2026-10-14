# Food Safety Audit: UAT build

Same code as live, with a UAT label in the header and tab title. No server link, access code, email or personal data is stored here.

## Publish (GitHub Pages)
1. Repo Settings > Pages > Build and deployment > Source: **GitHub Actions**. (Pages on a private repo needs a paid GitHub plan; on the free plan make the repo public. The app holds no secrets.)
2. Actions tab > "Publish web app" > Run workflow. The UAT link appears after about a minute: https://prateek-c-creator.github.io/food-safety-audit-uat/
3. Testers open the link, pick a cinema, then Settings > Connections > paste the **UAT** server link.

## UAT server (keep it separate from live)
Follow SETUP.md Part 1 with a separate Google Sheet and Drive folder (name it for UAT) and its own /exec link, so test audits never mix with live data. Use a test report address in Admin.

## Checks
SETUP.md Part 5 steps 1 to 6.
