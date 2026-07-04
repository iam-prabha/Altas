# Lesson 5 Complete: Type Manipulation

Built a type-safe event emitter using `keyof`, indexed access types (`T[K]`), and generic constraints (`K extends keyof T`).

## Demonstrated understanding
- `keyof T` extracts keys of a type as a union of string literals
- `T[K]` accesses the type of a specific property
- Mapped types (`{ [K in keyof T]: T[K] | null }`) transform objects type-level
- Conditional types with `infer` for unwrapping patterns
- Practical application: `EventEmitter<T>` enforces correct event-payload pairing at compile time

## Implications
- Ready for utility types (`Partial`, `Pick`, `Omit`, `Record`) — they're just mapped types built into the language
- Strong conceptual foundation for understanding any advanced type-level code
- Next step could be: utility types deep dive, or start a real mini-project applying everything
