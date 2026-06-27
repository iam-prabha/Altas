# Basic Linear Algebra & Calculus

## Linear Algebra

### Vectors

A **vector** is an ordered list of numbers. Think of it as an arrow in space with a direction and magnitude.

**Representation:**
```
v = [v₁, v₂, v₃]      (row vector)

    [v₁]
v = [v₂]               (column vector)
    [v₃]
```

**Key operations:**

| Operation | Formula | Example |
|---|---|---|
| **Addition** | `v + w = [v₁+w₁, v₂+w₂]` | `[1,2] + [3,4] = [4,6]` |
| **Scalar multiply** | `a·v = [a·v₁, a·v₂]` | `3·[2,1] = [6,3]` |
| **Dot product** | `v · w = v₁·w₁ + v₂·w₂` | `[1,2] · [3,4] = 1·3+2·4 = 11` |
| **Magnitude** | `‖v‖ = √(v₁² + v₂²)` | `‖[3,4]‖ = 5` |

The **dot product** is especially important — it tells you how much two vectors point in the same direction. If `v·w = 0`, the vectors are **orthogonal** (perpendicular).

---

### Matrices

A **matrix** is a rectangular grid of numbers:

```
A = [a₁₁  a₁₂]    2×2 matrix
    [a₂₁  a₂₂]
```

**Key operations:**

**Addition** — element-wise (same size only):
```
[1 2] + [5 6] = [6  8]
[3 4]   [7 8]   [10 12]
```

**Multiplication** — `A·B` requires `A`'s columns = `B`'s rows:
```
         [2×2] · [2×1] = [2×1]
A = [a b]    v = [x]    Av = [ax + by]
    [c d]        [y]         [cx + dy]
```

This is how neural networks compute — each layer is a matrix multiplication followed by a nonlinearity.

**Identity matrix** `I` — 1's on diagonal, 0's elsewhere. Acts like "1" for matrices: `I·A = A`.

**Transpose** `Aᵀ` — swap rows and columns.

---

## Calculus — Derivatives

### What is a derivative?

A **derivative** measures the **rate of change** of a function — how much the output changes when you nudge the input a tiny amount. It's the slope at a single point.

```
f'(x) = lim_{h→0} (f(x+h) - f(x)) / h
```

### Common derivative rules

| Function | Derivative | Intuition |
|---|---|---|
| `c` (constant) | `0` | Constants don't change |
| `xⁿ` | `n·xⁿ⁻¹` | Power rule |
| `sin(x)` | `cos(x)` | |
| `cos(x)` | `-sin(x)` | |
| `eˣ` | `eˣ` | Grows at its own value |
| `ln(x)` | `1/x` | |
| `c·f(x)` | `c·f'(x)` | Constant multiple |
| `f(x) + g(x)` | `f'(x) + g'(x)` | Sum rule |

**Chain rule** — the most important for ML: `(f ∘ g)'(x) = f'(g(x)) · g'(x)`

Example: `h(x) = e^(x²)`
- Outer: `e^(u)` → derivative is `e^(u)`
- Inner: `u = x²` → derivative is `2x`
- Chain: `h'(x) = e^(x²) · 2x`

### Why this matters for ML/AI

- **Gradient descent** uses derivatives to find the minimum of a loss function
- A **gradient** is just a vector of partial derivatives — one per parameter
- **Backpropagation** is the chain rule applied through a neural network (matrix multiplications + activation functions)
