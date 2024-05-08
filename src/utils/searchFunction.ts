interface Coffee {
  rating: number;
  name: string;
  roast: string;
  filename: string;
  notes: string[];
  origin: string;
  price: number;
  weight: number;
}

interface CoffeeQuery {
  filters?: Partial<Omit<Coffee, "price" | "weight" | "rating">>;
  sort?: Array<{ key: keyof Coffee; order: "asc" | "desc" }>;
  // Any other filters or parameters can be added here
}

export function sortCoffees(coffees: Coffee[], query: CoffeeQuery): Coffee[] {
  let coffeeArray = Object.values(coffees);
  if (Object.keys(query).length === 0) return coffees;

  // Filter based on query parameters
  if (query.filters) {
    coffeeArray = coffeeArray.filter((coffee) => {
      return Object.entries(query.filters!).every(([key, value]) => {
        const coffeeValue = coffee[key as keyof Coffee];

        // Check for array value
        if (Array.isArray(coffeeValue) && Array.isArray(value)) {
          return value.every((v) => coffeeValue.includes(v));
        }

        // Check for string value
        if (typeof coffeeValue === "string" && typeof value === "string") {
          return coffeeValue.includes(value);
        }

        // Check for number value
        if (typeof coffeeValue === "number" && typeof value === "number") {
          return coffeeValue === value;
        }

        // Handle other cases appropriately
        return false;
      });
    });
  }

  // Sort by specified attributes if provided
  if (query.sort) {
    coffeeArray.sort((a, b) => {
      for (const sortCriteria of query.sort!) {
        const { key, order } = sortCriteria;
        const aValue = a[key];
        const bValue = b[key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          const comparison = order === "asc" ? aValue - bValue : bValue - aValue;
          if (comparison !== 0) {
            return comparison;
          }
        }
      }
      return 0;
    });
  }

  return coffeeArray;
}

export function paginateArray<T>(array: T[], itemsPerPage: number, currentPage: number): T[] {
  // Calculate starting index based on the page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Calculate the ending index
  const endIndex = startIndex + itemsPerPage;

  // Slice the array from the start index to the end index
  return array.slice(startIndex, endIndex);
}

// Function to convert array to CoffeeQuery
export function arrayToSearchQuery(array: [string, string][]): any {
  const query: any = { filters: {}, sort: [] };

  array
    .filter(([key, value]) => value !== "")
    .forEach(([key, value]) => {
      // Assuming all keys should be placed in the filters object
      if (key !== "price" && key !== "weight" && key !== "rating") {
        query.filters![key] = value.replaceAll("+", " ");
      } else {
        //Make low to highs and high to lows into asc desc and save as a sort arr
        const formatted_value = value.toLowerCase().replaceAll("+", "");

        query.sort?.push({ key: key, order: formatted_value === "lowtohigh" ? "asc" : "desc" });
      }
    });
  return query;
}

export function searchCoffees(array: Coffee[], searchTerm: string): Coffee[] {
  return array
    .map((item) => ({
      ...item,
      rank: item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) : -1,
    }))
    .filter((item) => item.rank !== -1)
    .sort((a, b) => a.rank - b.rank);
}
