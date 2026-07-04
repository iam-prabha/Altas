# Lesson 4 Complete: Async TypeScript

Implemented a typed weather API client using `async/await`, `Promise<T>`, and the `Result` pattern. Exercise uses `Promise.allSettled` for parallel requests and `wttr.in` API for real weather data.

## Demonstrated understanding
- `async` function return types (`Promise<Result<Weather>>`)
- `await` unwraps `Promise<T>` to `T`
- Error handling: try/catch with `Result` pattern
- `Promise.allSettled` for parallel requests with partial success
- Optional chaining (`?.`) and nullish coalescing (`??`) for safe API response access
- Real-world pattern: typed API client with error boundaries

## Corrected misconceptions
- `succeed()`/`fail()` helpers need to be defined or imported — can't use them from another file without importing
- `Promise.all` fails fast (one rejection fails all); use `Promise.allSettled` when you want partial results
- API responses need null-safety (weather data fields may be missing)
- `fetch` can throw on network errors — always wrap in try/catch
