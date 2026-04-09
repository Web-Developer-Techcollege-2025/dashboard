import { create } from "../utils/create";
import { set } from "../utils/set";

let dateContainer = null;
let dateElements = { weekdayEl: null, restEl: null };
let dateIntervalId = null;

function updateDateDisplay() {
  const date = new Date();
  const weekday = date.toLocaleDateString("da-DK", {
    weekday: "long",
  });
  const rest = date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (dateElements.weekdayEl) {
    dateElements.weekdayEl.textContent = weekday + " ";
  }
  if (dateElements.restEl) {
    dateElements.restEl.textContent = "" + rest;
  }
}

export function dateClock(date = new Date()) {
  // Only create container and elements once
  if (!dateContainer) {
    dateContainer = create(
      "div",
      "day-date-container flex w-full flex-col items-center justify-center gap-[0.2rem] py-1",
    );

    dateElements.weekdayEl = create(
      "span",
      "date-weekday text-3xl font-bold tracking-wider text-accent-yellow uppercase",
    );

    dateElements.restEl = create(
      "span",
      "date-rest text-left text-lg font-normal tracking-wider text-accent-yellow uppercase",
    );
    set([dateElements.weekdayEl, dateElements.restEl], dateContainer);

    // Calculate time until next minute boundary to sync updates
    const now = new Date();
    const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    setTimeout(() => {
      updateDateDisplay();
      // Update every minute after initial boundary sync
      dateIntervalId = setInterval(updateDateDisplay, 60000);
      dateContainer._intervalId = dateIntervalId;
    }, delay);
  }

  updateDateDisplay();
  return dateContainer;
}
