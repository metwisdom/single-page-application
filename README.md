My Dictionary

**Project Type:** Single-page web application
**Status:** Functional prototype
**Prepared for:** local use and static hosting

**Overview**

This project is a lightweight dictionary app designed to help users look up English words and quickly review their pronunciation, definitions, and synonyms. It is built as a simple front-end app using HTML, CSS, and JavaScript, with live data pulled from a public dictionary API.

The interface is intentionally clean and easy to use, making it ideal for quick word lookup on both desktop and mobile-sized screens.

**Features**

- Search for any English word
- View phonetic spelling and pronunciation details
- Read one or more word definitions
- See the part of speech for each meaning
- Review available synonyms
- Play pronunciation audio when the source provides it
- Responsive layout for desktop, tablet, and phone screens

**How It Works**

1. A user types a word into the search field.
2. The browser sends a request to the Free Dictionary API.
3. The app receives the word data and displays the result.
4. If the word is not found or the API fails, the app shows a clear error message.

**Run the App**

Because this is a static app, there are two easy ways to run it:

Option 1: Open directly in a browser

Open the `index.html` file in any modern browser.

Option 2: Run a local web server

```bash
cd /home/user/ft19/mod2/single-page-application
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

**API Used**

This app uses the Free Dictionary API:

```text
https://api.dictionaryapi.dev/api/v2/entries/en/{word}
```

Example request:

```text
https://api.dictionaryapi.dev/api/v2/entries/en/hello
```

The app sends the searched word to that API and renders the returned data in the page.

**Project Files**

- `index.html` — page layout and app structure
- `style.css` — visual styling and responsive behavior
- `index.js` — search logic, API handling, and DOM rendering

**Deployment Note**

This app can be hosted on GitHub Pages or any static hosting service.

Example GitHub Pages format:

```text
https://your-username.github.io/single-page-application/
```

If a screenshot is added later, it can be placed in the repository and referenced here.

**Notes**

This is a simple, front-end-only project with no backend or database. It is designed to demonstrate how a single-page app can fetch real-time data from an external API and present it clearly to users.

**Summary**

My Dictionary is a clean, efficient dictionary search app that delivers quick access to word meanings and pronunciation in a minimal, user-friendly interface.
