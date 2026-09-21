# Meet Name Alert

A tiny Chrome/Edge extension that alerts you the moment someone says your name in a Google Meet call, so you can zone out safely and still catch it when it matters.

It reads Meet's live captions **locally in your browser**, matches your name(s), and triggers:

- a red full-screen flash
- a double beep
- a blinking tab title
- a desktop notification (works even if you're in another window)

## Install (2 minutes)

1. Download the latest zip from [Releases](https://github.com/ballzdb/meet-name-alert/releases) and **extract it**.
2. Open `chrome://extensions` (or `edge://extensions`) and enable **Developer mode**.
3. Click **Load unpacked** and select the extracted folder.
4. Pin the extension, click its icon, enter your names (comma-separated, e.g. `paul, pavlo, павло, павл`) and press **Save**.
5. In Meet, **turn on captions (CC)**. Reload any Meet tab that was already open.

## How it works

A content script polls the captions region (found via its `aria-label`, since Meet's class names change often) and counts name matches. When the number of matches increases, it fires the alerts. Names are matched from the start of a word, so `павл` catches Павло, Павле, Павлу.

## Limitations

- Captions must be on, and set to the language being spoken.
- If Google's captions mishear your name, it won't match. Add the variants you see to your list.
- It also triggers when *you* say your name.
- If Google changes Meet's page structure, the captions selector in `content.js` may need updating.
- Windows Focus Assist / Do Not Disturb can suppress the desktop notification.

## Privacy

Everything runs locally. Nothing is collected or sent anywhere. See [PRIVACY.md](PRIVACY.md).

## Roadmap

- [ ] Ignore the user's own speech
- [ ] Sound on/off and volume control
- [ ] Log of recent mentions with context
- [ ] Audio-based detection (Whisper) for calls without captions
- [ ] Zoom / Teams support

## Contributing

Issues and pull requests are welcome. If it stops working, open an issue and include what you see in the browser console (F12) after reloading the Meet tab.

## License

[MIT](LICENSE)
