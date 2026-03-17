const drNewsURL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23";

export async function fetchDRNews() {
  try {
    const response = await fetch(drNewsURL);
    if (!response.ok)
      throw new Error(
        `Fetching failed: ${response.status} ${response.statusText}`,
      );

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error(
        `DR News API returned non-JSON content (${contentType || "unknown"})`,
      );
    }

    const DRNewsData = await response.json();
    return DRNewsData;
  } catch (error) {
    console.error("Error fetching DR News:", error);
    throw error;
  }
}
