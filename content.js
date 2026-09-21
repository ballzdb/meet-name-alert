// Names come from the extension popup (saved in chrome.storage)
let re = null;
function buildRegex(namesStr) {
  const list = namesStr.split(",").map((n) => n.trim().toLowerCase()).filter(Boolean)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  re = list.length ? new RegExp("(?<![\\p{L}])(?:" + list.join("|") + ")", "giu") : null;
}
const DEFAULT_NAMES = "paul, pavlo, павло, павл, павел";
chrome.storage.sync.get({ names: DEFAULT_NAMES }, (d) => buildRegex(d.names));
chrome.storage.onChanged.addListener((c) => { if (c.names) buildRegex(c.names.newValue); });
let prevCount = 0;

function findCaptions() {
  // Class names change often, so find the captions region by its aria-label (EN/UK/RU)
  return document.querySelector(
    '[role="region"][aria-label*="aption" i], [role="region"][aria-label*="убтитр" i], [role="region"][aria-label*="итры" i]'
  );
}

function flash() {
  const style = document.createElement("style");
  style.textContent = "@keyframes mna{0%,100%{opacity:0}50%{opacity:.75}}";
  const box = document.createElement("div");
  box.style.cssText =
    "position:fixed;inset:0;background:red;z-index:2147483647;pointer-events:none;animation:mna .5s 5";
  document.head.appendChild(style);
  document.body.appendChild(box);
  setTimeout(() => { box.remove(); style.remove(); }, 2600);
}

function beep() {
  try {
    const ctx = new AudioContext();
    [0, 0.35].forEach((t) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 880;
      g.gain.value = 0.3;
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + t);
      o.stop(ctx.currentTime + t + 0.25);
    });
  } catch (e) { console.log("[MeetNameAlert] beep failed", e); }
}

function blinkTitle() {
  const orig = document.title;
  let n = 0;
  const id = setInterval(() => {
    document.title = n % 2 ? orig : "🔴 YOUR NAME!";
    if (++n > 12) { clearInterval(id); document.title = orig; }
  }, 500);
}

function alertMe() {
  console.log("[MeetNameAlert] name detected");
  flash();
  beep();
  blinkTitle();
  chrome.runtime.sendMessage({ type: "name-said" });
}

setInterval(() => {
  const el = findCaptions();
  if (!el) { prevCount = 0; return; }
  const count = re ? (el.innerText.match(re) || []).length : 0;
  if (count > prevCount) alertMe();
  prevCount = count;
}, 400);

console.log("[MeetNameAlert] loaded");
