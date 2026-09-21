const input = document.getElementById("names");
chrome.storage.sync.get({ names: "paul, pavlo, павло, павл, павел" }, (d) => {
  input.value = d.names;
});
document.getElementById("save").onclick = () => {
  chrome.storage.sync.set({ names: input.value }, () => {
    document.getElementById("ok").textContent = "Saved ✓";
    setTimeout(() => (document.getElementById("ok").textContent = ""), 1500);
  });
};
