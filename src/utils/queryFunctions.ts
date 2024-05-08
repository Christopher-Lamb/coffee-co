export function clearSpecificSearchParameters(...keys: string[]) {
  const params = new URLSearchParams(window.location.search);

  // Remove specified parameters
  keys.forEach((key) => params.delete(key));

  // Update the browser's URL without reloading the page
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
}

interface Coffee {
  rating: number;
  name: string;
  roast: string;
  filename: string;
  origin: string;
  notes: string[];
  price: number;
  weight: number;
}

// Create a lookup object using the keyof OmitCoffee type
const omitCoffeeKeys: { [key in keyof OmitCoffee]: true } = {
  rating: true,
  name: true,
  roast: true,
  origin: true,
  filename: true,
  price: true,
  weight: true,
};

type OmitCoffee = Omit<Coffee, "notes">;

// Function to parse the query string into an array
export function parseQueryStringToArray(search: string): [string, string][] {
  // Remove the leading '?' if present
  if (search.startsWith("?")) {
    search = search.substring(1);
  }

  // Split the query string into individual parameters
  const queries = search.split("&");

  // Map each parameter into an array of key-value pairs
  const result: [keyof OmitCoffee, string][] = [];

  // Iterate through queries and check for valid keys
  queries.forEach((query) => {
    const [key, value] = query.split("=");
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value || "");

    // Check if the decodedKey is in omitCoffeeKeys
    if (decodedKey in omitCoffeeKeys) {
    }
    result.push([decodedKey as keyof OmitCoffee, decodedValue]);
  });

  return result;
}
