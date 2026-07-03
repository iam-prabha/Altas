/**
 * Lesson 3 — Exercise: Generic Result<T, E> with map
 *
 * 1. Implement succeed, fail, isOk, and map
 * 2. Run: npx tsx src/0003-generics.ts
 */

type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function succeed<T>(value: T): Result<T> {
  return { ok: true, value };
}

function fail<E = Error>(error: E): Result<never, E> {
  return { ok: false, error };
}

function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
  return result.ok;
}

function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  if (result.ok) {
    return { ok: true, value: fn(result.value) } as Result<U, E>;
  }
  return result;
}

// Bonus: unwrapOr
function unwrapOr<T>(result: Result<T>, fallback: T): T {
  if (result.ok) {
    return result.value;
  }
  return fallback;
}

// Bonus: mapError
function mapError<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> {
  if (result.ok) {
    return result;
  }
  return fail(fn(result.error));
}

// Test the functions

const ok = succeed(42);
const err = fail("something went wrong");

console.log("=== succeed / fail / isOk ===");
console.log("ok result:", ok);
console.log("err result:", err);
console.log("isOk(ok):", isOk(ok));
console.log("isOk(err):", isOk(err));

console.log("\n=== map ===");
const doubled = map(ok, (n) => n * 2);
console.log("map(ok, n => n * 2):", doubled);

const mappedErr = map(err, (n: number) => n * 2);
console.log("map(err, n => n * 2):", mappedErr);

console.log("\n=== unwrapOr (bonus) ===");
console.log("unwrapOr(ok, 0):", unwrapOr(ok, 0));
console.log("unwrapOr(err, 0):", unwrapOr(err, 0));

console.log("\n=== mapError (bonus) ===");
const withMappedError = mapError(err, (e) => `Caught: ${e}`);
console.log("mapError(err, ...):", withMappedError);

// When ok is true TS narrows the value — no assertion needed
if (isOk(ok)) {
  console.log("\nNarrowed value:", ok.value);
}
