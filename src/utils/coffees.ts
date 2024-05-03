interface Coffee {
  id: string;
  rating: number;
  name: string;
  roast: string;
  filename: string;
  notes: string[];
  price: string;
  weight: string;
}

export const Coffees: Record<string, Coffee> = {
  coffee1: {
    id: "coffee1",
    rating: 2,
    name: "hologram",
    roast: "light",
    notes: ["fruity", "milk chocolate", "syrupy"],
    filename: "counterculturehologram.png",
    price: "$11.95",
    weight: "11 oz",
  },
  coffee2: {
    id: "coffee2",
    rating: 5,
    name: "Death Wish",
    roast: "espresso",
    notes: ["caramelized sugar"],
    filename: "deathwishespressoroast.png",
    price: "$19.89",
    weight: "1 lb",
  },
  coffee3: {
    id: "coffee3",
    rating: 5,
    name: "Jubilant",
    roast: "medium",
    notes: ["toasted pecan", "creamy nougat", "honey"],
    price: "$15.47",
    filename: "peets.png",
    weight: "14 oz",
  },
};
