# Module 8: Practical Considerations

> **Prerequisite**: All previous modules

## Hallucinations: When Models Lie

LLMs can generate plausible-sounding but completely false information with high confidence.

### Why Hallucinations Happen

LLMs have no grounding in reality. They:
- Don't verify facts against a knowledge base
- Don't know they don't know
- Generate based on patterns (frequently co-occurring words), not actual truth

**Example:**
```
User: "What novel did author Jane Smith write?"
Model: "Jane Smith is best known for her novel 'The Crystal Gardens' 
        published in 1987." 
(Completely made up; Jane Smith doesn't exist)
```

### Types of Hallucinations

1. **Factual hallucinations**: False facts (wrong dates, made-up names)
2. **Logical hallucinations**: Correct premises, wrong reasoning
3. **Source hallucinations**: Citing non-existent papers/books

### Mitigation Strategies

- **Retrieval-Augmented Generation (RAG)**: Ground responses in real documents
- **Reasoning models**: Process-based training reduces confident false claims
- **Prompting**: "If you're unsure, say so" reduces overconfidence
- **External verification**: Always verify critical claims
- **Uncertainty quantification**: Ask model for confidence scores

## Context Window and Memory Limitations

### Context Window

The **context window** is the maximum number of tokens a model can process at once.

```
Context Window: 4096 tokens
                ↓
            [Input: ~3000 tokens] [to fill: 1096 tokens]
                ↓
            Model can only see recent 4096 tokens
```

**Implications:**
- Can't process entire books (most are >4000 tokens)
- Forgets early parts of long conversations
- Limits RAG document size

**Recent advances:**
- GPT-4: 8K or 32K tokens
- Claude: 100K tokens (can handle entire books!)
- Gemini 1.5: 1M tokens (crazy long!)

### Memory Across Conversations

LLMs have **no persistent memory** between conversations:

```
Conversation 1:
  User: "My name is Alice"
  Model: "Nice to meet you, Alice!"

Conversation 2:
  User: "Who am I?"
  Model: "I don't know; could you tell me?"
  (Forgets Conversation 1)
```

**Solutions:**
- Store user info in a database (retriever)
- Include relevant history in prompt (summarize old conversations)
- Use function calls to access memory systems

## Latency and Throughput

### Latency (per-token speed)

How long it takes to generate one token.

```
Greedy decoding: ~100ms per token (typical on GPU)
                = 10 tokens/second
                = ~50 words/second
```

**Bottlenecks:**
- Model size (larger = slower)
- Batch size (larger batches are faster per-token but add latency)
- Hardware (GPU >> CPU)

### Throughput (total output speed)

How many tokens the system can generate per second across all users.

```
1 GPU, greedy: 100 tokens/second max
Batch 10 users: 10 tokens/user/second = slightly slower per-user but higher throughput
```

**Scaling strategies:**
- Batch requests (fill GPU)
- Quantization (smaller model = faster)
- Speculative decoding (predict multiple tokens in parallel)
- Hardware acceleration (GPUs, TPUs, custom silicon)

### Real-World Numbers

```
GPT-4 API:
  First token: ~500ms
  Subsequent tokens: ~40ms/token
  For 100-token response: 0.5s + 4s = 4.5s

Local 7B Model on RTX 4090:
  ~20ms/token = 50 tokens/second
  
Streaming helps: user sees words appear while waiting
```

## Costs and Scaling

### Training Costs

Pre-training dominates:
```
7B model:  $50K - $100K (single GPU, weeks)
70B model: $1M - $2M (GPU cluster, weeks)
Large frontier models: $10M+ (estimated, from leaked reports)
```

This is why fine-tuning is practical but pre-training is only for big labs.

### Inference Costs

Pay per token (cloud providers):

```
GPT-4: $0.03 per 1K input tokens, $0.06 per 1K output tokens
Claude 3 Opus: $0.015 per 1K input, $0.075 per 1K output
Llama 3 (local): $0 (just hardware cost)
```

**Cost drivers:**
- Model size (bigger = more expensive)
- Token volume (more usage = higher bill)
- Real-time vs batch (real-time faster but pricier)

### Example Costs

```
Customer service chatbot: 10K requests/day, 200 tokens/request
  = 2M tokens/day * 365 = 730M tokens/year
  = 730K * $0.002 (cheap model) = $1,460/year = $3.99/day

Large enterprise: 1M requests/day
  = 0.2B tokens/day = $400K+/year
```

Solutions for cost:
- Use smaller models (7B vs 70B)
- Cache repeated queries
- Quantize (run locally)
- Batch requests (cheaper)

## Safety, Bias, and Alignment

### Inherent Biases

LLMs absorb biases from training data:

```
Data: mostly white male tech leaders
       ↓
Model learns: technical authority = male
       ↓
Generates: "The best programmer is a man"
```

**Types of bias:**
- Demographic (gender, race, age)
- Occupational (CEO = male)
- Linguistic (pronouns defaulting to "he")
- Systemic (repeating historical inequalities)

### Mitigation

- **Debiasing data**: Remove or balance biased examples
- **Constitutional AI**: Train model with values-based constitution
- **RLHF**: Human feedback helps steer away from harmful outputs
- **Monitoring**: Track model outputs for bias
- **Transparency**: Communicate limitations to users

### Safety Concerns

**Misuse risks:**
- Generating harmful content (misinformation, malware, abuse)
- Impersonation (pretending to be authoritative)
- Privacy violations (memorizing training data)

**Mitigations:**
- Refusal mechanisms ("I can't help with that")
- Rate limiting and usage monitoring
- Red-teaming (security researchers find exploits)
- User authentication and logging

## The Limitations You Should Know

### LLMs Cannot

1. **Perform arithmetic precisely**: `GPT-3: 234 * 456 = ?` → "106,704" (close but often wrong)
   - Solution: Use calculator tool

2. **Know what they don't know**: Confidently generates false information
   - Solution: Reasoning models, external verification

3. **Update knowledge after training**: Frozen weights means no new information
   - Solution: RAG, fine-tuning

4. **Explain their reasoning reliably**: May explain but not how it really decided
   - Solution: Reasoning models, but imperfect

5. **Truly understand meaning**: Manipulating patterns, not comprehending
   - Solution: Accept this limitation; don't assume understanding

6. **Scale to unlimited context**: Attention is O(n²) in sequence length
   - Solution: Efficient attention (sparse, linear), vector databases

### What They're Actually Good At

- Pattern completion and next-token prediction
- Recalling patterns from training data
- Following instructions on tasks similar to training examples
- Generating diverse plausible text
- Multi-step reasoning (especially reasoning models)

## Future Directions

**Emerging trends:**
- **Longer contexts**: 1M+ token windows enabling entire codebase context
- **Multimodal**: Text + image + video + audio integration
- **Efficient inference**: Quantization, distillation, hardware-specific optimization
- **Reasoning scaling**: Process-based training beats outcome-based training
- **Tool use**: LLMs calling APIs, calculators, databases seamlessly
- **Agents**: Multi-step planning and execution

## Key Takeaways

- **Hallucinations are fundamental**: No ground truth checking; mitigate with RAG and reasoning
- **Context is limited**: Can't process entire large documents; recent advances help
- **Latency matters**: 100ms per token; batch requests for throughput
- **Costs scale quickly**: GPT-4 can be expensive; smaller models cheaper
- **Biases are inherited**: From training data; require active mitigation
- **Accept limitations**: LLMs are pattern-matching engines with real constraints
- **Reasoning models are emerging**: Training on process (not just outcome) is powerful
- **The future is tool-use**: LLMs will be components of larger systems, not standalone

---