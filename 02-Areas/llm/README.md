# LLM Foundation: A Progressive Learning Guide

> A comprehensive curriculum teaching how large language models work, from foundational concepts to advanced techniques. Each section builds on previous ones—start at the beginning if you're new, or jump to advanced topics if you're familiar with basics.

## 📚 Curriculum Structure

| # | Module | Time | Topics |
|----|--------|------|--------|
| 1 | [What is an LLM?](01-what-is-an-llm.md) | 15 min | Definition, characteristics, capabilities, limitations, history |
| 2 | [Neural Network Fundamentals](02-neural-network-fundamentals.md) | 30 min | Neurons, layers, training, backpropagation, embeddings |
| 3 | [The Transformer Architecture](03-transformer-architecture.md) | 45 min | Tokenization, embeddings, self-attention, multi-head attention, stacking |
| 4 | [Training Fundamentals](04-training-fundamentals.md) | 40 min | Pre-training, supervised fine-tuning, RLHF alignment |
| 5 | [The LLM Inference Pipeline](05-inference-pipeline.md) | 30 min | Forward pass, decoding strategies, optimization |
| 6 | [Advanced Techniques](06-advanced-techniques.md) | 35 min | Mixture of Experts, base vs instruct vs reasoning models |
| 7 | [Evaluation & Benchmarking](07-evaluation-benchmarking.md) | 25 min | Evaluation strategies, benchmarks, LLM-as-judge |
| 8 | [Practical Considerations](08-practical-considerations.md) | 35 min | Hallucinations, context, latency, costs, safety |

**Reference Materials:**
- [Glossary](glossary.md) — 50+ key terms with definitions
- [Code Examples](code-examples.md) — Pedagogical Python pseudocode
- [Summary & Key Takeaways](summary.md) — Quick reference

**Total Time**: ~4-6 hours for complete read with examples

---

## 🎯 How to Use This Curriculum

### For Complete Beginners
1. Start with [Module 1](01-what-is-an-llm.md) to understand what LLMs are
2. Work through [Module 2](02-neural-network-fundamentals.md) to learn foundational ML concepts
3. Read [Module 3](03-transformer-architecture.md) to understand the core architecture
4. Continue sequentially through all modules
5. Refer to [Glossary](glossary.md) whenever you encounter unfamiliar terms
6. Review [Code Examples](code-examples.md) to see algorithms in action

### For ML Engineers
1. Skim [Module 1](01-what-is-an-llm.md) for context
2. Review [Module 2](02-neural-network-fundamentals.md) if needed
3. Deep dive into [Module 3](03-transformer-architecture.md) (most important)
4. Read [Module 4](04-training-fundamentals.md) and [Module 5](05-inference-pipeline.md)
5. Study [Module 6](06-advanced-techniques.md) for cutting-edge techniques
6. Reference [Code Examples](code-examples.md) for implementation details

### For Practitioners
1. Read [Module 6](06-advanced-techniques.md) for model variants (base vs instruct vs reasoning)
2. Study [Module 8](08-practical-considerations.md) for production concerns
3. Check [Module 7](07-evaluation-benchmarking.md) for evaluation strategies
4. Use [Glossary](glossary.md) for quick terminology lookups

### For Reference
- Use the table of contents above to jump to any module
- [Glossary](glossary.md) for quick term definitions
- [Summary](summary.md) for key takeaways from each module
- [Code Examples](code-examples.md) for algorithm implementations

---

## 🎓 Learning Progression

```
Beginner              Intermediate           Advanced
    ↓                     ↓                     ↓
Module 1-2         Module 3-4              Module 5-8
(Foundation)       (Architecture)          (Advanced)
                  
Module 2: What is NN?    →  Understand backprop
Module 3: Transformers   →  How self-attention works
Module 4: Training       →  Pre-training, RLHF
Module 5: Inference      →  How text is generated
Module 6: Advanced       →  MoE, reasoning models
Module 7: Evaluation     →  Benchmarking strategies
Module 8: Practical      →  Real-world tradeoffs
```

---

## ✨ Key Features

### Pedagogical Design
- **Progressive complexity**: Each module builds on previous ones
- **Intuition first**: Explanations before equations; visual descriptions
- **Real examples**: Model examples (GPT-3, Claude, Gemini), scaling laws
- **Code alongside theory**: 7 pedagogical Python pseudocode examples

### Comprehensive Coverage
- **1,900+ lines** of carefully written content
- **50+ key terms** with clear definitions
- **Deep explanations** with ASCII diagrams and visual descriptions
- **Practical tradeoffs**: Cost, latency, hallucinations, safety

### Multiple Entry Points
- **Beginners**: Start at Module 1, read sequentially
- **ML engineers**: Jump to Module 3 (Transformers)
- **Practitioners**: Start at Module 6 (model variants)
- **Reference**: Use TOC and glossary for quick lookups

---

## 📖 What You'll Learn

By the end of this curriculum, you'll understand:

✅ What LLMs actually are (and aren't)  
✅ How neural networks learn from data  
✅ How transformers process text in parallel  
✅ How LLMs are trained (pre-training, fine-tuning, alignment)  
✅ How text generation works (tokenization, inference, sampling)  
✅ Advanced techniques (MoE, reasoning models, process rewards)  
✅ How to evaluate and benchmark LLMs  
✅ Real-world constraints (cost, latency, hallucinations, safety)  

---

## 🚀 Quick Start

**5-minute overview**: Read [Module 1](01-what-is-an-llm.md)

**30-minute foundation**: Read Modules [1](01-what-is-an-llm.md), [2](02-neural-network-fundamentals.md), [3](03-transformer-architecture.md)

**2-hour deep dive**: Read Modules 1-5

**6-hour complete**: Read all modules + code examples

---

## 📋 File Structure

```
llm/
├── README.md (this file - start here!)
├── 01-what-is-an-llm.md
├── 02-neural-network-fundamentals.md
├── 03-transformer-architecture.md
├── 04-training-fundamentals.md
├── 05-inference-pipeline.md
├── 06-advanced-techniques.md
├── 07-evaluation-benchmarking.md
├── 08-practical-considerations.md
├── glossary.md
├── code-examples.md
└── summary.md
```

Each file is self-contained but references other modules when needed. Prerequisites are clearly marked.

---

## 🔗 Additional Resources

**Papers** (mentioned in modules):
- Vaswani et al. (2017): "Attention Is All You Need" — Transformer architecture
- Devlin et al. (2018): BERT — Pre-training + fine-tuning
- Brown et al. (2020): GPT-3 — Scaling laws and few-shot learning

**Tools & Frameworks** (for implementation):
- PyTorch/TensorFlow — Building models
- Hugging Face Transformers — Pre-trained models
- OpenAI API, Anthropic Claude, Google Gemini — Use in production

**Community:**
- Papers with Code — Benchmark leaderboards
- GitHub — Open-source implementations
- Hugging Face Hub — Pre-trained models and datasets

---

**Last Updated**: 2026-06-21  
**Difficulty Progression**: Beginner → Intermediate → Advanced  
**Total Time**: ~4-6 hours for complete read with examples

**Start with [Module 1: What is an LLM?](01-what-is-an-llm.md) →**
