# Code Examples: Building LLM Understanding

> **Note**: These are pedagogical pseudocode examples in Python. Real implementations use optimized libraries (PyTorch, JAX, HuggingFace). These examples prioritize clarity over efficiency.

## Example 1: Tokenization

```python
# Simple character-level tokenizer (not realistic, but shows concept)
class SimpleTokenizer:
    def __init__(self, vocab_size=256):
        # Vocab: each character is a token
        self.char_to_id = {chr(i): i for i in range(vocab_size)}
        self.id_to_char = {i: chr(i) for i in range(vocab_size)}
    
    def tokenize(self, text):
        """Convert text to token IDs"""
        return [self.char_to_id[c] for c in text if c in self.char_to_id]
    
    def detokenize(self, token_ids):
        """Convert token IDs back to text"""
        return ''.join([self.id_to_char[id] for id in token_ids])

# Usage
tokenizer = SimpleTokenizer()
text = "hello"
tokens = tokenizer.tokenize(text)
print(tokens)  # [104, 101, 108, 108, 111]
print(tokenizer.detokenize(tokens))  # "hello"
```

Real tokenizers (BPE, SentencePiece) are more sophisticated but follow the same pattern.

## Example 2: Embeddings

```python
import numpy as np

class Embedding:
    def __init__(self, vocab_size=1000, embedding_dim=768):
        # Learn embeddings: vocab_size x embedding_dim
        self.embedding_matrix = np.random.randn(vocab_size, embedding_dim) * 0.01
    
    def embed(self, token_ids):
        """Convert token IDs to embeddings"""
        # token_ids: [5, 3, 2]
        # output: [[embedding for token 5], [for token 3], [for token 2]]
        return self.embedding_matrix[token_ids]
    
    def add_positional_encoding(self, embeddings, max_seq_len=512):
        """Add position information (simplified version)"""
        seq_len = embeddings.shape[0]
        dim = embeddings.shape[1]
        
        # Positional encoding (simplified; real uses sin/cos)
        position = np.arange(seq_len).reshape(-1, 1)
        position_encoding = position / np.arange(1, dim + 1)
        
        return embeddings + position_encoding

# Usage
embedder = Embedding(vocab_size=50000, embedding_dim=768)
token_ids = np.array([5, 3, 2])
embeddings = embedder.embed(token_ids)
print(embeddings.shape)  # (3, 768) - 3 tokens, 768-dim each

embeddings_with_pos = embedder.add_positional_encoding(embeddings)
# Now each embedding includes position info
```

## Example 3: Self-Attention (Simplified)

```python
import numpy as np

def scaled_dot_product_attention(query, key, value):
    """
    Single head attention.
    
    Args:
        query: (seq_len, d_model)
        key: (seq_len, d_model)
        value: (seq_len, d_model)
    
    Returns:
        output: (seq_len, d_model) - weighted sum of values
        attention_weights: (seq_len, seq_len) - importance scores
    """
    # Step 1: Compare query to all keys
    scores = np.matmul(query, key.T)  # (seq_len, seq_len)
    scores = scores / np.sqrt(query.shape[-1])  # Scale by sqrt(d_model)
    
    # Step 2: Convert to probabilities (softmax)
    attention_weights = np.exp(scores) / np.exp(scores).sum(axis=-1, keepdims=True)
    
    # Step 3: Weighted sum of values
    output = np.matmul(attention_weights, value)
    
    return output, attention_weights

# Example
seq_len = 4
d_model = 64

# Random embeddings (in reality, learned from input)
query = np.random.randn(seq_len, d_model)
key = np.random.randn(seq_len, d_model)
value = np.random.randn(seq_len, d_model)

output, weights = scaled_dot_product_attention(query, key, value)
print(output.shape)  # (4, 64) - same shape as input
print(weights)  # (4, 4) matrix of attention scores
# weights[i, j] = how much token i attends to token j
```

## Example 4: Simple Multi-Head Attention

```python
class MultiHeadAttention:
    def __init__(self, d_model=768, num_heads=12):
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_head = d_model // num_heads
        
        # Learnable weight matrices for each head
        self.W_q = [np.random.randn(d_model, self.d_head) for _ in range(num_heads)]
        self.W_k = [np.random.randn(d_model, self.d_head) for _ in range(num_heads)]
        self.W_v = [np.random.randn(d_model, self.d_head) for _ in range(num_heads)]
        self.W_o = np.random.randn(d_model, d_model)  # Output projection
    
    def forward(self, x):
        """
        x: (seq_len, d_model)
        """
        head_outputs = []
        
        # For each head
        for i in range(self.num_heads):
            # Project to query, key, value
            query = np.matmul(x, self.W_q[i])  # (seq_len, d_head)
            key = np.matmul(x, self.W_k[i])
            value = np.matmul(x, self.W_v[i])
            
            # Attention
            output, _ = scaled_dot_product_attention(query, key, value)
            head_outputs.append(output)
        
        # Concatenate all heads
        concatenated = np.concatenate(head_outputs, axis=-1)  # (seq_len, d_model)
        
        # Final output projection
        output = np.matmul(concatenated, self.W_o)
        
        return output

# Usage
mha = MultiHeadAttention(d_model=768, num_heads=12)
x = np.random.randn(10, 768)  # 10 tokens, 768-dimensional
output = mha.forward(x)
print(output.shape)  # (10, 768)
```

## Example 5: Softmax and Temperature Sampling

```python
def softmax(logits, temperature=1.0):
    """Convert logits to probabilities with temperature control"""
    logits = logits / temperature  # Lower temp = sharper distribution
    exp_logits = np.exp(logits - logits.max())  # Subtract max for numerical stability
    return exp_logits / exp_logits.sum()

def sample_from_distribution(logits, temperature=1.0, top_k=None):
    """Sample next token from probability distribution"""
    probs = softmax(logits, temperature)
    
    if top_k is not None:
        # Zero out all but top-k
        top_k_indices = np.argsort(probs)[-top_k:]
        probs[~np.isin(np.arange(len(probs)), top_k_indices)] = 0
        probs = probs / probs.sum()  # Renormalize
    
    # Sample according to probabilities
    token_id = np.random.choice(len(probs), p=probs)
    return token_id, probs

# Example: next token prediction
logits = np.array([0.1, 0.5, -0.2, 0.8, 0.3])  # Scores from language head

# Greedy (temperature=0): always pick highest
token, probs = sample_from_distribution(logits, temperature=0.0)
print(f"Greedy: token {token}")  # Token with highest probability

# Diverse (temperature=2.0): more random
token, probs = sample_from_distribution(logits, temperature=2.0)
print(f"Diverse: token {token}")  # More likely to pick low-probability tokens

# Top-k sampling: only consider top-3 tokens
token, probs = sample_from_distribution(logits, top_k=3)
print(f"Top-k: token {token}")  # Only from top 3 tokens
```

## Example 6: Auto-regressive Text Generation

```python
def generate_text(model, tokenizer, prompt, max_length=50, temperature=1.0, top_k=40):
    """
    Generate text auto-regressively.
    
    Args:
        model: Trained LLM (has forward() method)
        tokenizer: Tokenizer with tokenize() and detokenize()
        prompt: Initial text
        max_length: Max tokens to generate
        temperature: Sampling temperature (controls randomness)
        top_k: Only sample from top-k tokens
    """
    # Tokenize prompt
    token_ids = tokenizer.tokenize(prompt)
    
    # Generate tokens one-by-one
    for _ in range(max_length):
        # Forward pass through model
        logits = model.forward(token_ids)  # Shape: (vocab_size,)
        
        # Sample next token
        next_token, _ = sample_from_distribution(logits, temperature, top_k)
        
        # Append to sequence
        token_ids.append(next_token)
        
        # Stop if we hit end-of-sequence token
        if next_token == tokenizer.eos_token_id:
            break
    
    # Detokenize back to text
    generated_text = tokenizer.detokenize(token_ids)
    return generated_text

# Usage (pseudocode—would need actual trained model)
# output = generate_text(
#     model=gpt_model,
#     tokenizer=tokenizer,
#     prompt="The future of AI is",
#     max_length=20,
#     temperature=0.7,
#     top_k=40
# )
# print(output)
# # "The future of AI is exciting and full of possibilities..."
```

## Example 7: Forward Pass Through Transformer Block

```python
class TransformerBlock:
    def __init__(self, d_model=768, num_heads=12, d_ff=3072):
        self.mha = MultiHeadAttention(d_model, num_heads)
        
        # Feed-forward network: Linear(d_model -> d_ff) -> ReLU -> Linear(d_ff -> d_model)
        self.W1 = np.random.randn(d_model, d_ff)
        self.b1 = np.zeros(d_ff)
        self.W2 = np.random.randn(d_ff, d_model)
        self.b2 = np.zeros(d_model)
        
        self.layer_norm1 = LayerNorm(d_model)
        self.layer_norm2 = LayerNorm(d_model)
    
    def forward(self, x):
        """
        x: (seq_len, d_model)
        """
        # Multi-head attention with residual connection
        mha_output = self.mha.forward(x)
        x = self.layer_norm1(x + mha_output)  # Add + norm
        
        # Feed-forward with residual connection
        ff_output = np.maximum(0, np.matmul(x, self.W1) + self.b1)  # ReLU
        ff_output = np.matmul(ff_output, self.W2) + self.b2
        x = self.layer_norm2(x + ff_output)  # Add + norm
        
        return x

class LayerNorm:
    """Simplified layer normalization"""
    def __call__(self, x, eps=1e-5):
        mean = x.mean(axis=-1, keepdims=True)
        std = x.std(axis=-1, keepdims=True)
        return (x - mean) / (std + eps)

# Usage
block = TransformerBlock(d_model=768, num_heads=12, d_ff=3072)
x = np.random.randn(10, 768)  # 10 tokens
output = block.forward(x)
print(output.shape)  # (10, 768)
```

These examples show the core computations. Real implementations use:
- **PyTorch/JAX**: For automatic differentiation and GPU acceleration
- **Optimized kernels**: CUDA, TensorRT for speed
- **Mixed precision**: float32 for stability, float16 for speed
- **Distributed training**: Multi-GPU for massive models

---