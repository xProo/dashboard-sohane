export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/18").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};


