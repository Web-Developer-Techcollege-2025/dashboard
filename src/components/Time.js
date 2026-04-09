import { create } from "../utils/create";

export function time(date = new Date()) {
  const timeEl = create(
    "p",
    "time text-6xl font-extrabold text-shadow-accent-yellow",
  );

  function updateTime() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  updateTime();

  // Calculate time until next minute boundary to sync with clock
  const now = new Date();
  const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
  setTimeout(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    // Store interval on element for cleanup if needed
    timeEl._intervalId = intervalId;
  }, delay);

  return timeEl;
}
