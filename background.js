chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "name-said") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Google Meet",
      message: "Someone said your name!",
      priority: 2
    });
  }
});
