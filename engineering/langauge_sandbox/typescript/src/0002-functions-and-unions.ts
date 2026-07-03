/**
 * Lesson 2 — Exercise: Order Status Formatter
 *
 * 1. Implement formatOrderStatus
 * 2. Run: npx tsx src/0002-functions-and-unions.ts
 */

type Pending = { status: "pending"; estimatedDays: number };
type Shipped = { status: "shipped"; trackingId: string };
type Delivered = { status: "delivered"; deliveredAt: Date };
type OrderStatus = Pending | Shipped | Delivered;

function formatOrderStatus(status: OrderStatus): string {
  switch (status.status) {
    case "pending":
      return `Order pending — estimated ${status.estimatedDays} days`;
    case "shipped":
      return `Order shipped — tracking ID: ${status.trackingId}`;
    case "delivered":
      return `Order delivered on ${status.deliveredAt.toDateString()}`;
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}

// Bonus: typeof narrowing
function parseInput(input: string | number): string {
  if (typeof input === "string") {
    return `String: ${input}`;
  }
  return `Number: ${input}`;
}

// Test the functions

console.log("=== Order Status Formatter ===");

const pendingOrder: OrderStatus = { status: "pending", estimatedDays: 5 };
const shippedOrder: OrderStatus = { status: "shipped", trackingId: "1Z999AA10123456784" };
const deliveredOrder: OrderStatus = { status: "delivered", deliveredAt: new Date("2026-07-01") };

console.log(formatOrderStatus(pendingOrder));
console.log(formatOrderStatus(shippedOrder));
console.log(formatOrderStatus(deliveredOrder));

console.log("\n=== parseInput ===");

console.log(parseInput(42));
console.log(parseInput("hello"));
