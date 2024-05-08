export function getSearchParam(paramName: string): string | null {
  // Get the search query string from the current URL
  const searchParams = new URLSearchParams(window.location.search);

  // Retrieve and return the value of the parameter or `null` if not present
  return searchParams.get(paramName);
}


export function setSearchParam(paramName: string, paramValue: string, pushState: boolean = false): void {
  // Create a URL object using the current window location
  const currentUrl = new URL(window.location.href);

  // Get the search parameters from the current URL
  const searchParams = currentUrl.searchParams;

  // Update or set the new parameter
  searchParams.set(paramName, paramValue);

  // Update the current URL search parameters
  const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;

  // Update browser history with the new URL
  if (pushState) {
    window.history.pushState(null, "", newUrl);
  } else {
    window.history.replaceState(null, "", newUrl);
  }
}