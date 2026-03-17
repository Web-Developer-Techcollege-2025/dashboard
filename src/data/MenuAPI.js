const kantineURL = "/kantineapi/umbraco/api/content/getcanteenmenu/?type=json";

export async function fetchMenu() {
  try {
    const menuResponse = await fetch(kantineURL);
    if (!menuResponse.ok) {
      return null;
    }

    const contentType = menuResponse.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return null;
    }

    const MenuData = await menuResponse.json();
    return MenuData;
  } catch {
    return null;
  }
}
