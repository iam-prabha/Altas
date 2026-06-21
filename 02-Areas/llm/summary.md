# Summary: The Complete Picture

An LLM is a probability distribution over text learned from data.

**How it works:**
1. **Tokenize** text into pieces
2. **Embed** tokens into vectors
3. **Apply transformer blocks** with self-attention (learning relationships)
4. **Project to vocabulary** (language head)
5. **Sample tokens** (next word from probability distribution)
6. **Repeat** to generate sequences

**How we train it:**
1. **Pre-train** on billions of tokens (learns language)
2. **Fine-tune (SFT)** on curated examples (learns instructions)
3. **Align (RLHF)** with human preferences (learns values)

**Key constraints:**
- No persistent memory between conversations
- Hallucinate confidently (no ground truth checking)
- Limited context window (can't see entire documents)
- Computationally expensive (training and inference)
- Carry biases from training data

**Where they excel:**
- Pattern completion and language generation
- Following instructions on familiar tasks
- Reasoning (especially newer models)
- Code generation and debugging
- Creative writing and brainstorming

The future: LLMs + tools + agents = powerful AI systems that can plan, execute, and learn.

---

**Last Updated**: 2026-06-21
**Difficulty Progression**: Beginner → Intermediate → Advanced
**Time to Complete**: ~4-6 hours for full read with examples