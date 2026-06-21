# Module 5: The LLM Inference Pipeline

> **Prerequisite**: Modules 1-4 (all previous modules)

## From Training to Inference

During training, we update model weights using backpropagation. During **inference**, weights are frozen and we only do forward passes:

```
Training: Input → [Forward] → Loss → [Backward] → Update Weights
Inference: Input → [Forward] → Output (weights don't change)
```

Inference is much faster but still complex. Let's trace through how an LLM generates text step-by-step.

## Complete Inference Pipeline

Input: `"The future of AI is"`

### Step 1: Tokenization

```
Input: "The future of AI is"
         ↓
Tokenizer converts to IDs: [1, 2030, 286, 4378, 318]
```

### Step 2: Initial Embedding

Convert token IDs to vectors + positional encoding:

```
Token IDs: [1, 2030, 286, 4378, 318]
            ↓
Embeddings:
[
  [0.2, -0.5, 0.1, ...],  (position 0)
  [0.7, 0.3, -0.2, ...],  (position 1)
  [0.1, -0.8, 0.3, ...],  (position 2)
  [0.5, 0.2, 0.1, ...],   (position 3)
  [0.3, -0.1, 0.5, ...],  (position 4)
]
```

Shape: (5, 768) for a 768-dimensional model.

### Step 3: Forward Through Transformer Blocks

Each block applies:
- Multi-head self-attention (learns relationships)
- Feed-forward network (refines representations)

```
Input: [embedding_1, embedding_2, ..., embedding_5]
  ↓
[Transformer Block 1]
  ↓
[Hidden representations after block 1]
  ↓
[Transformer Block 2]
  ↓
...
  ↓
[Transformer Block 96]
  ↓
Output: [hidden_1, hidden_2, hidden_3, hidden_4, hidden_5]
```

At the end, we only care about the **last hidden state** (position 5):

```
We want: [hidden_5]  (vector for position 5, representing all context)
```

This vector summarizes the entire input.

### Step 4: Language Modeling Head

The final layer projects hidden states to vocabulary logits:

```
hidden_state_5 (768-dim) 
   ↓
[Linear layer: 768 → vocab_size]  (e.g., 50,000)
   ↓
logits: [0.2, -0.5, 0.8, ..., 0.1]  (score for each token)
```

Logits are raw scores; they'll be converted to probabilities.

### Step 5: Softmax to Probabilities

Convert logits to probability distribution:

```
logits: [0.2, -0.5, 0.8, ..., 0.1]
         ↓
softmax (exponential normalization)
         ↓
probabilities: [0.001, 0.0001, 0.15, ..., 0.005]
               (all sum to 1.0)
```

The token with highest probability is the most likely next word.

### Step 6: Sampling

Choose the next token. Two common strategies:

**Greedy**: Pick the highest probability token
```
Probabilities: [0.001, 0.0001, 0.15, 0.05, ..., 0.005]
               Pick token 2 (probability 0.15)
Next token: "exciting"
```

**Sampling**: Randomly sample according to probabilities
```
Roll a weighted die: 15% chance token 2, 5% chance token 3, etc.
Next token: might be token 2, or token 3, or others (with probabilities)

Effect: more diverse, creative outputs
```

### Step 7: Auto-regressive Loop

Feed the new token back into the model to predict the next:

```
Round 1:
  Input: "The future of AI is"
  Output: "exciting"

Round 2:
  Input: "The future of AI is exciting"
  Output: "and"

Round 3:
  Input: "The future of AI is exciting and"
  Output: "full"

... repeat until [END] token or max length
```

Final output: "The future of AI is exciting and full of..."

## Decoding Strategies

Different ways to generate sequences affect quality and speed:

### Greedy Decoding
- **Method**: Always pick highest probability token
- **Speed**: Fastest (one sample per step)
- **Quality**: Often suboptimal (gets stuck in local maxima)
- **Use**: Fast responses, when quality OK

### Beam Search
- **Method**: Keep top-K best hypotheses; expand each in parallel
- **Speed**: K times slower than greedy
- **Quality**: Better (explores multiple paths)
- **Use**: Machine translation, when quality matters more than speed

```
Round 1:
  "The future..." → candidates: (exciting=0.15), (promising=0.12), (bright=0.08)
Round 2:
  "The future exciting" → (and=0.2), (times=0.1)
  "The future promising" → (future=0.15), (career=0.12)
Round 3:
  Keep top-2 highest overall scores
```

### Temperature & Top-K Sampling
- **Temperature**: Controls randomness (0=greedy, 1+=more random)
- **Top-K**: Only sample from top-K probability tokens
- **Effect**: Balance between quality and diversity

```
Temperature: 0.7
  Lower temp → more likely words dominate
  Higher temp → more uniform distribution

Top-K: 40
  Only consider top-40 probable tokens
  Prevents sampling weird low-probability tokens
```

## Caching for Speed

During inference, we can cache previous computations:

```
Round 1:
  Input: [token_1, token_2, token_3, token_4, token_5]
  Compute: attention for all 5 tokens
  
Round 2:
  Input: [token_1, ..., token_5, token_6]
  We already know outputs for token_1-5 (cached)
  Only compute attention for token_6
  Speed: ~5x faster
```

This **KV-caching** is critical for efficient inference. Cache is typically:
- (num_layers, batch_size, num_heads, seq_len, head_dim)
- For GPT-3: ~500GB per full sequence (huge!)

This is why **long context windows are memory-intensive**.

## Streaming / Streaming Responses

In practice, LLMs stream output (return tokens as they're generated):

```
Server → "The"
Server → " future"
Server → " of"
Server → " AI"
...
```

User sees words appear incrementally, making it feel faster.

## Key Takeaways

- Inference is a forward pass with frozen weights, repeated autoregressively
- Tokenization converts text to IDs; embeddings convert IDs to vectors
- Transformer blocks process tokens in parallel, learning context
- Language head converts hidden states to probability distributions
- Decoding strategies (greedy, beam, sampling) trade speed for quality
- KV-caching speeds up inference by ~5x, reducing computation
- Streaming provides responsive UX by returning tokens incrementally

---