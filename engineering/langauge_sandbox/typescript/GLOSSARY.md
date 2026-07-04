# TypeScript Glossary

Terms will be added here as they are learned and demonstrated in practice.

## Terms

**Type annotation**:
An explicit declaration of a variable's type, written after a colon (`: type`).

**Type inference**:
The compiler's ability to deduce a variable's type from its value without an explicit annotation.

**Any**:
The escape hatch type that opts out of type checking. Use is a sign the type system has been defeated.

**Union type**:
A type formed from two or more types, written `A | B`, meaning the value can be either A or B.

**Type narrowing**:
The process of refining a union type to a more specific type through control flow (typeof checks, property checks, etc.).

**Interface**:
A named contract describing the shape of an object. Prefer interfaces for object shapes in application code.

**Type alias**:
A name for any type, created with the `type` keyword. Use for unions, primitives, and tuple types.

**Discriminated union**:
A union type where each member has a shared literal field (the "discriminant") that can be switched on to narrow. E.g., `{ status: "pending"; ... } | { status: "shipped"; ... }` with discriminant `status`.

**Exhaustiveness check**:
A pattern using `never` in a `default` case to ensure all variants of a union are handled — if a new variant is added and missed, TypeScript errors.

**Type guard**:
A function whose return type includes a type predicate (`param is Type`) that tells TypeScript to narrow the parameter's type when the function returns `true`.

**Generic**:
A type parameter, written `<T>`, that serves as a placeholder for a real type supplied at the call site. Enables reusable, type-safe functions and types.

**Constrain (generic constraint)**:
Restricting a type parameter to a subset of types using `extends`, e.g., `<T extends HasId>`. The parameter must satisfy the constraint.
