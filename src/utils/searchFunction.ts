interface Coffee {
  id: string;
  rating: number;
  name: string;
  roast: string;
  filename: string;
  notes: string[];
  price: number;
  weight: number;
}

interface CoffeeQuery {
  filters?: Partial<Omit<Coffee, "price" | "weight" | "rating">>;
  sort?: Array<{ key: keyof Coffee; order: "asc" | "desc" }>;
  // Any other filters or parameters can be added here
}

export function searchCoffees(coffees: Record<string, Coffee>, query: CoffeeQuery): Coffee[] {
  let coffeeArray = Object.values(coffees);

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

// const result = searchCoffees(Coffees, {
//   filters: { roast: "dark" },
//   sort: [
//     { key: "price", order: "asc" },
//     { key: "weight", order: "desc" },
//   ],
// });
