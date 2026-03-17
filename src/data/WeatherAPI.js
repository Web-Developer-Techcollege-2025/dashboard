const weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric";

export async function fetchWeather() {
  try {
    const weatherResponse = await fetch(weatherURL);
    if (!weatherResponse.ok)
      throw new Error(
        `Fetching failed: ${weatherResponse.status} ${weatherResponse.statusText}`,
      );

    const contentType = weatherResponse.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error(
        `Weather API returned non-JSON content (${contentType || "unknown"})`,
      );
    }

    const WeatherData = await weatherResponse.json();
    return WeatherData;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}
