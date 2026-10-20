# Logow Academy — GitHub Pages Website

This is a responsive static website for Logow Academy. It is designed to be published directly from a GitHub repository using GitHub Pages.

## Included
- Responsive home page and navigation
- Class 1–12 selector
- Search across sample classes and lessons
- Tamil/English medium and subject filters
- Sample free/premium lesson cards
- Browser-only like toggles and profile-name saving
- YouTube subscribe links and first-visit subscription prompt
- News/exam update display section
- Instagram link and configurable WhatsApp contact placeholder
- Footer branding assets
- No build step required

## Publish on GitHub Pages
1. Extract this ZIP on your device.
2. Upload **the contents** of this folder to the root of your GitHub repository. `index.html` must be at the repository root (not buried in another folder).
3. Open the repository on GitHub.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select your main branch (often `main`) and folder `/ (root)`, then click **Save**.
7. Wait for GitHub Pages to finish publishing and open the URL shown in the Pages settings.

## Update lesson content
Edit `script.js` and change the `lessons` array. Replace sample titles, class, medium, subject, descriptions, and each free lesson's `url` with your actual public YouTube video URL. Commit the changes to GitHub to publish them.

## Set WhatsApp
In `script.js`, replace the empty `WHATSAPP_NUMBER` value with your number in international format using digits only, including the country code. Do not include `+`, spaces or hyphens. Example format only: `919876543210`.

## Important limitations of GitHub Pages
GitHub Pages hosts static files only. This version does **not** provide secure admin login, server-side video uploads, a shared database, real student accounts, synchronized likes/comments, news management dashboard, payment processing, payment verification, or secure premium-video access. Browser localStorage only affects the current browser/device and can be changed by the visitor. Premium cards are examples and must not be used to sell protected content until a secure backend or trusted third-party service is connected.

A QR image alone cannot verify payment. Never put admin passwords, payment secrets, private student data, or protected video files in this public repository.

## Brand links
- YouTube: https://www.youtube.com/@logowacademy
- Instagram: https://www.instagram.com/logow_etern/

## Run locally
Open `index.html` in a modern browser. The page uses Google Fonts when internet is available; system fonts will be used if it is not.
