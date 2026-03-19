import { fetchMenu } from "../data/MenuAPI.js";

const DAYS = [
  { key: "mandag", label: "Mandag", dayCount: 1 },
  { key: "tirsdag", label: "Tirsdag", dayCount: 2 },
  { key: "onsdag", label: "Onsdag", dayCount: 3 },
  { key: "torsdag", label: "Torsdag", dayCount: 4 },
  { key: "fredag", label: "Fredag", dayCount: 5 },
];

export async function MenuModule() {
  const section = document.createElement("section");
  section.className =
    "w-[939px], h-[1192px], top-[296px], left-[1347px], border-radius-[30px]";

  const heading = document.createElement("h2");
  heading.className = "font-family, font-bold, text-[98px]";
  heading.textContent = "Kantinen";
  section.appendChild(heading);

  const dishElement = {};
  const priceElement = {};
  DAYS.forEach(({ key, label }) => {
    const card = document.createElement("div");
    card.className = "p-4";
    card.dataset.day = key;

    const title = document.createElement("h3");
    title.className = "font-black";
    title.textContent = label;

    const row = document.createElement("div");
    row.className = "flex justify-between";

    const dish = document.createElement("p");
    dish.className = "";
    dish.textContent = "–";

    const price = document.createElement("p");
    price.className = "";

    dishElement[key] = dish;
    priceElement[key] = price;
    row.appendChild(dish);
    row.appendChild(price);
    card.appendChild(title);
    card.appendChild(row);
    section.appendChild(card);
  });

  function highlightToday() {
    const today = new Date().getDay();
    const todayKey = DAYS.find((d) => d.dayCount === today)?.key;
    DAYS.forEach(({ key, dayCount }) => {
      const card = section.querySelector(`[data-day="${key}"]`);
      const isPast = dayCount < today;
      const isToday = key === todayKey;
      card.classList.toggle("opacity-40", isPast);
      card.classList.toggle("ring-2", isToday);
      card.classList.toggle("ring-pink-400", isToday);
      card.classList.toggle("rounded-xl", isToday);
    });
  }

  async function updateMenu() {
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return;

    try {
      const data = await fetchMenu();
      heading.textContent = `Kantinen – Uge ${data.Week}`;
      if (!data.Days || !Array.isArray(data.Days)) return;
      data.Days.forEach(({ DayName, Dish }) => {
        const key = DayName.toLowerCase();
        if (!dishElement[key]) return;
        const priceMatch = Dish.match(/kr\..+$/i);
        const dishName = priceMatch
          ? Dish.slice(0, priceMatch.index).trim()
          : Dish;
        const dishPrice = priceMatch ? priceMatch[0] : "";
        dishElement[key].textContent = dishName;
        priceElement[key].textContent = dishPrice;
      });
      highlightToday();
    } catch (err) {
      console.error("Failed to fetch canteen menu:", err);
    }
  }

  await updateMenu();

  setInterval(updateMenu, 10 * 60 * 60 * 1000);

  return section;
}
