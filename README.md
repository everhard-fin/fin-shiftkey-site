# ShiftKey Fin test site

A static landing page where ShiftKey testers run 10 Fin scenarios (plus 3 negative tests) by chat or by phone.
It is plain HTML, CSS and JS with no build step, so it can be hosted on any static host.
Open locally: run `python3 -m http.server` from this folder, then visit http://localhost:8000.
Edit scenario text and demo emails in `scenarios.js`; layout lives in `index.html` and `styles.css`.
The only external call is the Intercom Messenger widget (widget.intercom.io), booted anonymously with no email or user id.
Pass checkboxes are stored in the browser's localStorage only.
