
# Real or Not? — Shark Week Lite

## Overview
A fun mix of AI, Cyber Security, and Crypto trivia statements. Players decide whether statements are Real or Not. Includes fun & educational content.

## Files
- `index.html` — main game
- `style.css` — styling
- `script.js` — logic, score tracking, and Power Automate integration
- `assets/` — images & icons (cyber shark, real/not)
- `sample_payload.json` — example JSON for Power Automate schema

## Hosting Instructions
1. Upload all files to your GitHub repository.
2. Enable GitHub Pages on the branch/folder you uploaded.
3. Copy the Pages URL and embed it in SharePoint using the Embed Web Part.

## Power Automate Integration
1. Create a new Automated Cloud Flow with "When an HTTP request is received" trigger.
2. Use `sample_payload.json` to generate the request schema:
```json
{
  "playerName": "string",
  "score": "number",
  "timestamp": "string"
}
```
3. Add an action "Create Item" to your SharePoint list `PhishOrReal_Results`.
4. Copy the HTTP POST URL and paste it into `script.js` at `const FLOW_URL = "YOUR_FLOW_URL_HERE";`.
5. Test by playing the game — scores should appear in the SharePoint list.

## Customization
- Change colors, fonts, or layout in `style.css`.
- Edit questions in `script.js` under the `questions` array.
- Update icons in `assets/`.

