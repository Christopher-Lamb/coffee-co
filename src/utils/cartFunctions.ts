interface Item {
  name: string;
  quantity: number;
  price: number;
}

export const getStoredCart = () => {
  if (sessionStorage.getItem("cart")) {
    return JSON.parse(sessionStorage.getItem("cart") || "");
  } else {
    sessionStorage.setItem("cart", "[]");
    return [];
  }
};

const saveCart = (array: Item[]) => {
  const stringifiedArray = JSON.stringify(array);
  sessionStorage.setItem("cart", stringifiedArray);
};

export const addToCart = (item: Item) => {
  //If item exists parse it otherwise create it
  let cart: Item[] = getStoredCart();
  cart.push(item);
  saveCart(cart);
};

export const deleteFromCart = (index: number) => {
  let cart: Item[] = getStoredCart();
  cart.splice(index, 1);
  saveCart(cart);
};
