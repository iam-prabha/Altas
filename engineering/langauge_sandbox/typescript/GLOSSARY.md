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
