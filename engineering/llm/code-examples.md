# Code Examples: Building LLM Understanding

> **Note**: These are pedagogical pseudocode examples in TypeScript. Real implementations use optimized libraries (PyTorch, JAX, HuggingFace). These examples prioritize clarity over efficiency.

> **Shared helpers** used by multiple examples below.

```typescript
// Box-Muller transform for normal distribution
function randn(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function matMul(a: number[][], b: number[][]): number[][] {
  const result: number[][] = Array.from({ length: a.length }, () =>
    new Array(b[0].length).fill(0)
  );
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b[0].length; j++) {
      for (let k = 0; k < b.length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

function transpose(matrix: number[][]): number[][] {
  return matrix[0].map((_, j) => matrix.map(row => row[j]));
}
```

## Example 1: Tokenization

```typescript
// Simple character-level tokenizer (not realistic, but shows concept)
class SimpleTokenizer {
  charToId: Record<string, number> = {};
  idToChar: Record<number, string> = {};

  constructor(vocabSize: number = 256) {
    for (let i = 0; i < vocabSize; i++) {
      const char = String.fromCharCode(i);
      this.charToId[char] = i;
      this.idToChar[i] = char;
    }
  }

  tokenize(text: string): number[] {
    return text.split('').filter(c => c in this.charToId).map(c => this.charToId[c]);
  }

  detokenize(tokenIds: number[]): string {
    return tokenIds.map(id => this.idToChar[id]).join('');
  }
}

// Usage
const tokenizer = new SimpleTokenizer();
const text = "hello";
const tokens = tokenizer.tokenize(text);
console.log(tokens);  // [104, 101, 108, 108, 111]
console.log(tokenizer.detokenize(tokens));  // "hello"
```

Real tokenizers (BPE, SentencePiece) are more sophisticated but follow the same pattern.

## Example 2: Embeddings

```typescript
class Embedding {
  embeddingMatrix: number[][];

  constructor(vocabSize: number = 1000, embeddingDim: number = 768) {
    // Learn embeddings: vocabSize x embeddingDim
    this.embeddingMatrix = Array.from({ length: vocabSize }, () =>
      Array.from({ length: embeddingDim }, () => randn() * 0.01)
    );
  }

  embed(tokenIds: number[]): number[][] {
    // tokenIds: [5, 3, 2]
    // returns: [[embedding for token 5], [for token 3], [for token 2]]
    return tokenIds.map(id => this.embeddingMatrix[id]);
  }

  addPositionalEncoding(embeddings: number[][]): number[][] {
    // Positional encoding (simplified; real uses sin/cos)
    return embeddings.map((emb, pos) => {
      const posEnc = Array.from({ length: emb.length }, (_, i) => pos / (i + 1));
      return emb.map((val, i) => val + posEnc[i]);
    });
  }
}

// Usage
const embedder = new Embedding(50000, 768);
const tokenIds = [5, 3, 2];
const embeddings = embedder.embed(tokenIds);
console.log(embeddings.length, embeddings[0].length);  // 3 768

const embeddingsWithPos = embedder.addPositionalEncoding(embeddings);
// Now each embedding includes position info
```

## Example 3: Self-Attention (Simplified)

```typescript
function scaledDotProductAttention(
  query: number[][],
  key: number[][],
  value: number[][]
): { output: number[][]; attentionWeights: number[][] } {
  // query, key, value: (seqLen, dModel)

  // Step 1: Compare query to all keys
  const scores = matMul(query, transpose(key));  // (seqLen, seqLen)
  const dK = query[0].length;
  const scaledScores = scores.map(row => row.map(s => s / Math.sqrt(dK)));

  // Step 2: Convert to probabilities (softmax)
  const attentionWeights = scaledScores.map(row => {
    const max = Math.max(...row);
    const expRow = row.map(s => Math.exp(s - max));
    const sumExp = expRow.reduce((a, b) => a + b, 0);
    return expRow.map(s => s / sumExp);
  });

  // Step 3: Weighted sum of values
  const output = matMul(attentionWeights, value);  // (seqLen, dModel)

  return { output, attentionWeights };
}

// Example
const seqLen = 4;
const dModel = 64;

// Random embeddings (in reality, learned from input)
const query = Array.from({ length: seqLen }, () =>
  Array.from({ length: dModel }, () => randn())
);
const key = Array.from({ length: seqLen }, () =>
  Array.from({ length: dModel }, () => randn())
);
const value = Array.from({ length: seqLen }, () =>
  Array.from({ length: dModel }, () => randn())
);

const { output, attentionWeights } = scaledDotProductAttention(query, key, value);
console.log(output.length, output[0].length);  // 4 64 — same shape as input
console.log(attentionWeights);  // (4, 4) matrix of attention scores
// attentionWeights[i][j] = how much token i attends to token j
```

## Example 4: Simple Multi-Head Attention

```typescript
class MultiHeadAttention {
  dModel: number;
  numHeads: number;
  dHead: number;
  Wq: number[][][];
  Wk: number[][][];
  Wv: number[][][];
  Wo: number[][];

  constructor(dModel: number = 768, numHeads: number = 12) {
    this.dModel = dModel;
    this.numHeads = numHeads;
    this.dHead = dModel / numHeads;

    // Learnable weight matrices: one per head, each of shape (dModel, dHead)
    this.Wq = Array.from({ length: numHeads }, () =>
      Array.from({ length: dModel }, () =>
        Array.from({ length: this.dHead }, () => randn())
      )
    );
    this.Wk = Array.from({ length: numHeads }, () =>
      Array.from({ length: dModel }, () =>
        Array.from({ length: this.dHead }, () => randn())
      )
    );
    this.Wv = Array.from({ length: numHeads }, () =>
      Array.from({ length: dModel }, () =>
        Array.from({ length: this.dHead }, () => randn())
      )
    );
    // Output projection
    this.Wo = Array.from({ length: dModel }, () =>
      Array.from({ length: dModel }, () => randn())
    );
  }

  forward(x: number[][]): number[][] {
    // x: (seqLen, dModel)
    const headOutputs: number[][][] = [];

    for (let i = 0; i < this.numHeads; i++) {
      const query = matMul(x, this.Wq[i]);  // (seqLen, dHead)
      const key = matMul(x, this.Wk[i]);
      const value = matMul(x, this.Wv[i]);
      const { output } = scaledDotProductAttention(query, key, value);
      headOutputs.push(output);
    }

    // Concatenate all heads: (seqLen, dModel)
    const concatenated = headOutputs[0].map((_, rowIdx) =>
      headOutputs.flatMap(head => head[rowIdx])
    );

    // Final output projection
    return matMul(concatenated, this.Wo);
  }
}

// Usage
const mha = new MultiHeadAttention(768, 12);
const x = Array.from({ length: 10 }, () =>
  Array.from({ length: 768 }, () => randn())
);
const result = mha.forward(x);
console.log(result.length, result[0].length);  // 10 768
```

## Example 5: Softmax and Temperature Sampling

```typescript
function softmax(logits: number[], temperature: number = 1.0): number[] {
  // Lower temperature = sharper distribution
  const scaled = logits.map(l => l / temperature);
  const max = Math.max(...scaled);
  const expVals = scaled.map(l => Math.exp(l - max));  // Subtract max for numerical stability
  const sumExp = expVals.reduce((a, b) => a + b, 0);
  return expVals.map(l => l / sumExp);
}

function sampleFromDistribution(
  logits: number[],
  temperature: number = 1.0,
  topK?: number
): { tokenId: number; probs: number[] } {
  let probs = softmax(logits, temperature);

  if (topK !== undefined) {
    // Zero out all but top-k
    const topKIndices = probs
      .map((p, i) => ({ p, i }))
      .sort((a, b) => b.p - a.p)
      .slice(0, topK)
      .map(x => x.i);

    probs = probs.map((p, i) => (topKIndices.includes(i) ? p : 0));
    const sum = probs.reduce((a, b) => a + b, 0);
    probs = probs.map(p => p / sum);  // Renormalize
  }

  // Weighted random choice
  const r = Math.random();
  let cumulative = 0;
  let tokenId = probs.length - 1;
  for (let i = 0; i < probs.length; i++) {
    cumulative += probs[i];
    if (r < cumulative) {
      tokenId = i;
      break;
    }
  }

  return { tokenId, probs };
}

// Example: next token prediction
const logits = [0.1, 0.5, -0.2, 0.8, 0.3];  // Scores from language head

// Greedy (temperature ~ 0): always pick highest
const { tokenId: greedyToken } = sampleFromDistribution(logits, 0.0);
console.log(`Greedy: token ${greedyToken}`);

// Diverse (temperature = 2.0): more random
const { tokenId: diverseToken } = sampleFromDistribution(logits, 2.0);
console.log(`Diverse: token ${diverseToken}`);

// Top-k sampling: only consider top-3 tokens
const { tokenId: topKToken } = sampleFromDistribution(logits, 1.0, 3);
console.log(`Top-k: token ${topKToken}`);
```

## Example 6: Auto-regressive Text Generation

```typescript
interface Model {
  forward(tokenIds: number[]): number[];
}

interface Tokenizer extends SimpleTokenizer {
  eosTokenId: number;
}

function generateText(
  model: Model,
  tokenizer: Tokenizer,
  prompt: string,
  maxLength: number = 50,
  temperature: number = 1.0,
  topK: number = 40
): string {
  // Tokenize prompt
  const tokenIds = tokenizer.tokenize(prompt);

  // Generate tokens one-by-one
  for (let i = 0; i < maxLength; i++) {
    // Forward pass through model
    const logits = model.forward(tokenIds);

    // Sample next token
    const { tokenId: nextToken } = sampleFromDistribution(logits, temperature, topK);

    // Append to sequence
    tokenIds.push(nextToken);

    // Stop if we hit end-of-sequence token
    if (nextToken === tokenizer.eosTokenId) break;
  }

  // Detokenize back to text
  return tokenizer.detokenize(tokenIds);
}

// Usage (pseudocode — would need actual trained model)
// const output = generateText(
//   gptModel,
//   tokenizer,
//   "The future of AI is",
//   20,
//   0.7,
//   40
// );
// console.log(output);
// // "The future of AI is exciting and full of possibilities..."
```

## Example 7: Forward Pass Through Transformer Block

```typescript
function layerNorm(x: number[][], eps: number = 1e-5): number[][] {
  return x.map(row => {
    const mean = row.reduce((a, b) => a + b, 0) / row.length;
    const variance = row.reduce((a, b) => a + (b - mean) ** 2, 0) / row.length;
    return row.map(v => (v - mean) / Math.sqrt(variance + eps));
  });
}

function relu(x: number[][]): number[][] {
  return x.map(row => row.map(v => Math.max(0, v)));
}

class TransformerBlock {
  mha: MultiHeadAttention;
  W1: number[][];
  b1: number[];
  W2: number[][];
  b2: number[];

  constructor(dModel: number = 768, numHeads: number = 12, dFf: number = 3072) {
    this.mha = new MultiHeadAttention(dModel, numHeads);

    // Feed-forward network: Linear(dModel -> dFf) -> ReLU -> Linear(dFf -> dModel)
    this.W1 = Array.from({ length: dModel }, () =>
      Array.from({ length: dFf }, () => randn())
    );
    this.b1 = new Array(dFf).fill(0);
    this.W2 = Array.from({ length: dFf }, () =>
      Array.from({ length: dModel }, () => randn())
    );
    this.b2 = new Array(dModel).fill(0);
  }

  forward(x: number[][]): number[][] {
    // x: (seqLen, dModel)

    // Multi-head attention with residual connection
    const mhaOutput = this.mha.forward(x);
    x = layerNorm(x.map((row, i) => row.map((val, j) => val + mhaOutput[i][j])));

    // Feed-forward with residual connection
    const ffHidden = relu(
      matMul(x, this.W1).map((row, i) => row.map((val, j) => val + this.b1[j]))
    );
    const ffOutput = matMul(ffHidden, this.W2).map((row, i) =>
      row.map((val, j) => val + this.b2[j])
    );
    x = layerNorm(x.map((row, i) => row.map((val, j) => val + ffOutput[i][j])));

    return x;
  }
}

// Usage
const block = new TransformerBlock(768, 12, 3072);
const x = Array.from({ length: 10 }, () =>
  Array.from({ length: 768 }, () => randn())
);
const output = block.forward(x);
console.log(output.length, output[0].length);  // 10 768
```

These examples show the core computations. Real implementations use:
- **PyTorch/JAX**: For automatic differentiation and GPU acceleration
- **Optimized kernels**: CUDA, TensorRT for speed
- **Mixed precision**: float32 for stability, float16 for speed
- **Distributed training**: Multi-GPU for massive models
