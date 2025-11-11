export const formatPrice = (price: number, max: number, isMax = false) => {
  return isMax && price >= max ? 'Max' : `$${price}`;
};
