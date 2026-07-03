/**
 * Lesson 1 — Exercise: Cart Total Calculator
 *
 * 1. Implement calculateTotal
 * 2. Run: npx tsx src/0001-cart-total.ts
 */

type CartItem = {
  name: string;
  price: number;
};

function calculateTotal(items: CartItem[]): number {
  // Sum all item prices using .reduce()
  const total_price = items.reduce((sum, item) => sum + item.price, 0);
  return total_price;
}

const cart: CartItem[] = [
  { name: "Laptop", price: 1200 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 80 },
];

console.log(calculateTotal(cart));