const kantineURL =
  "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

export async function fetchMenu() {
  const result = await fetch(kantineURL);
  if (!result.ok) {
    const error = new Error(
      `Fetching failed: ${result.status} ${result.statusText}`,
    );
    error.status = result.status;
    error.statusText = result.statusText;
    throw error;
  }

  const text = await result.text();

  try {
    return JSON.parse(text);
  } catch {
    const xml = new DOMParser().parseFromString(text, "application/xml");
    const week = parseInt(xml.querySelector("Week")?.textContent) || null;
    const days = [...xml.querySelectorAll("CanteenDay")].map((day) => ({
      DayName: day.querySelector("DayName")?.textContent ?? "",
      Dish: day.querySelector("Dish")?.textContent ?? "",
    }));
    return { Week: week, Days: days };
  }
}
