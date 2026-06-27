# Module 3: The Transformer Architecture

> **Prerequisite**: Module 2 (Neural Network Fundamentals)

## Why Transformers?

Before Transformers (pre-2017), LLMs used **RNNs** (Recurrent Neural Networks) that processed text sequentially—one word at a time. This was slow and struggled with long-range dependencies (words far apart in text).

The Transformer solved this with **self-attention**: every word can directly look at every other word in parallel, understanding relationships across the entire sequence instantly.

## From Tokens to Embeddings

The first step in processing text is converting it to numbers:

### 1. Tokenization

Text is broken into **tokens** (usually words or subwords):

```
"The cat sat on the mat"
        ↓
["The", "cat", "sat", "on", "the", "mat"]
        ↓
[1, 4923, 2840, 20, 1, 9582]  # Token IDs from vocabulary
```

Why subwords? Because a fixed vocabulary can't cover every word. Subword tokenizers (like BPE) break rare words into frequent pieces:
- "unbelievable" → ["un", "believ", "able"]

### 2. Embeddings & Positional Encoding

Each token ID is converted to an embedding—a dense vector capturing semantic meaning:

```
Token ID: [1, 4923, 2840, 20, 1, 9582]
            ↓
Embeddings: 
[
  [0.2, -0.5, 0.1, ...],     # "The"
  [0.7, 0.3, -0.2, ...],     # "cat"
  [0.1, -0.8, 0.3, ...],     # "sat"
  ...
]
```

These embeddings are **learned during training**—the model figures out which vectors best represent words.

**Positional Encoding** adds information about word order (since self-attention doesn't inherently know sequence order):

```
Word Embedding + Position Embedding = Final Input Embedding
[0.2, -0.5, 0.1, ...]  +  [0.1, 0.2, 0.3, ...]  =  [0.3, -0.3, 0.4, ...]
```

Without position encoding, "the cat bit the dog" and "the dog bit the cat" would be processed identically.

## Self-Attention: The Core Mechanism

**Self-attention** is how the Transformer lets each token understand the context around it by comparing itself to all other tokens.

### The Intuition

Imagine you're reading: "The bank executive walked into the *river* bank."

Your brain instantly understands "bank" means something different in these two contexts because you're attending to the nearby words differently. Self-attention does this automatically:

- For the first "bank" → attends to "executive", "walked"
- For the second "bank" → attends to "river"

### The Mechanism: Q, K, V

For each token, the model generates three vectors:

1. **Query (Q)**: "What am I looking for? What context matters for me?"
2. **Key (K)**: "What is my relevance to other tokens? What role do I play?"
3. **Value (V)**: "What information should I pass on if someone asks about me?"

```
Token: "dog"
  ↓
Query: [0.5, 0.2, -0.1, ...]  (asking what nearby words are relevant)
Key:   [0.3, 0.1, 0.2, ...]   (broadcasting what this token represents)
Value: [0.7, -0.4, 0.6, ...]  (the actual content to share)
```

### Attention Scores

The model compares the Query of one token to the Keys of all tokens:

```
"dog" Query: [0.5, 0.2, -0.1]
              ↓
Compare with all Keys:
  "The":      [0.1, 0.3, 0.2]  → score = -0.1  (low relevance)
  "fluffy":   [0.6, 0.1, 0.0]  → score = 0.52  (high relevance)
  "cat":      [0.4, 0.2, 0.1]  → score = 0.31  (medium relevance)
  "ate":      [0.5, 0.2, -0.2] → score = 0.51  (high relevance)
```

These scores are normalized (softmax) to produce attention weights:

```
Attention Weights:
  "The":     0.05   (5%)
  "fluffy":  0.35   (35%)
  "cat":     0.25   (25%)
  "ate":     0.35   (35%)
```

### Weighted Aggregation

The output for "dog" is a weighted sum of all Values:

```
Output = 0.05 * Value["The"] + 0.35 * Value["fluffy"] + 
         0.25 * Value["cat"] + 0.35 * Value["ate"]
```

The model learns to attend most strongly to semantically relevant words ("fluffy", "ate") and ignore less relevant ones ("The").

### Multi-Head Attention

One attention mechanism isn't enough—different "heads" learn different types of relationships:

- Head 1: "Which adjectives modify this noun?"
- Head 2: "What verbs does this noun perform?"
- Head 3: "What possessives relate to this noun?"
- ...more heads...

```
Input → [Head 1] → Output 1
     → [Head 2] → Output 2
     → [Head 3] → Output 3
     ...
Output = Concatenate all head outputs
```

This is why Transformers are so powerful—they learn multiple types of relationships in parallel.

## The Full Transformer Block

A single Transformer block has two main components:

1. **Multi-Head Self-Attention**: Learn relationships between tokens
2. **Feed-Forward Network**: Refine the representation

```
Input: [token1_embedding, token2_embedding, ...]
  ↓
[Multi-Head Self-Attention] ← learns relationships
  ↓
[Layer Norm] ← normalize (stabilizes training)
  ↓
[Feed-Forward Network] ← position-wise transformations (two dense layers)
  ↓
[Layer Norm]
  ↓
Output: [enriched_embedding_1, enriched_embedding_2, ...]
```

The feed-forward is just: `Linear(ReLU(Linear(x)))`—two layers with ReLU in between. It's applied to each position independently.

## Stacking for Depth

A full LLM stacks many Transformer blocks (GPT-3 has 96 layers!):

```
Token Embeddings
  ↓
[Transformer Block 1]   ← learns basic patterns (words, grammar)
  ↓
[Transformer Block 2]   ← learns higher-level semantics
  ↓
[Transformer Block 3]   ← learns abstract relationships
  ↓
... (many more blocks)
  ↓
[Transformer Block 96]  ← learns highest-level reasoning
  ↓
Language Head: Predict next token probabilities
  ↓
Output: "The word most likely to come next is..."
```

Early layers learn local patterns, later layers learn global structure and semantics.

## Key Takeaways

- Transformers use **self-attention** to process entire sequences in parallel
- **Tokenization** breaks text into pieces; **embeddings** convert tokens to vectors
- **Positional encoding** adds sequence order information
- **Self-attention** (Q, K, V) lets tokens understand which other tokens are relevant
- **Multi-head attention** learns different types of relationships simultaneously
- Stacking blocks creates depth for learning hierarchical patterns
- The Transformer architecture is the engine powering all modern LLMs

---