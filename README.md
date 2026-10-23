# ShiftKey Fin test site

A static landing page where ShiftKey testers run 10 Fin scenarios (plus 3 negative tests) by chat or by phone.
It is plain HTML, CSS and JS with no build step, so it can be hosted on any static host.
Open locally: run `python3 -m http.server` from this folder, then visit http://localhost:8000.
Edit scenario text and demo emails in `scenarios.js`; layout lives in `index.html` and `styles.css`.
The only external call is the Intercom Messenger widget (widget.intercom.io), booted anonymously with no email or user id.
Pass checkboxes are stored in the browser's localStorage only.

## Results and sharing

Ticks, tester name and notes are saved in the tester's browser and also encoded in the page URL
(`#r=...`). "Copy share link" copies that URL; opening it on any machine restores the same ticks and
notes. "Copy results" copies a plain-text summary with the link for email or Slack. There is no
backend: the link is the record.
