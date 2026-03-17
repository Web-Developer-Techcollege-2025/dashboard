import { fetchMenu } from "../data/MenuAPI.js";
import { create } from "../utils/create.js";
import { set } from "../utils/set.js";

const DAYS = [
  { key: "mandag", label: "Mandag", dayCount: 1 },
  { key: "tirsdag", label: "Tirsdag", dayCount: 2 },
  { key: "onsdag", label: "Onsdag", dayCount: 3 },
  { key: "torsdag", label: "Torsdag", dayCount: 4 },
  { key: "fredag", label: "Fredag", dayCount: 5 },
];

export async function MenuModule() {
  const menuContainer = create("section", "menu-container");

  const heading = create("h2", "menu-heading");
  heading.textContent = "Kantinen";
  set(heading, menuContainer);

  const dishElement = {};
  DAYS.forEach(({ key, label }) => {
    const card = create("div", "menu-day-card");
    card.dataset.day = key;

    const title = create("h3", "menu-day-title");
    title.textContent = label;

    const dish = create("p", "menu-dish");
    dish.textContent = "–";

    dishElement[key] = dish;
    set([title, dish], card);
    set(card, menuContainer);
  });

  function highlightToday() {
    const todayKey = DAYS.find((d) => d.dayCount === new Date().getDay())?.key;
    DAYS.forEach(({ key }) => {
      const card = menuContainer.querySelector(`[data-day="${key}"]`);
      card.classList.toggle("menu-day-card--today", key === todayKey);
    });
  }

  async function updateMenu() {
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return;

    try {
      const data = await fetchMenu();
      if (!data || !Array.isArray(data.Days)) {
        heading.textContent = "Kantinen - utilgængelig";
        return;
      }

      heading.textContent = `Kantinen – Uge ${data.Week}`;
      data.Days.forEach(({ DayName, Dish }) => {
        if (dishElement[DayName] && dishElement[DayName].textContent !== Dish) {
          dishElement[DayName].textContent = Dish;
        }
      });
      highlightToday();
    } catch (err) {
      heading.textContent = "Kantinen - utilgængelig";
    }
  }

  await updateMenu();

  setInterval(updateMenu, 10 * 60 * 60 * 1000);

  return menuContainer;
}
