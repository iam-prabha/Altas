# LLM Foundation Curriculum - File Structure

## 📂 Directory Organization

```
02-Areas/llm/
├── README.md                                 (Start here! Main index & guide)
├── STRUCTURE.md                              (This file - file organization)
│
├── Modules (Progressive Learning Path)
├── 01-what-is-an-llm.md                     (73 lines, 15 min)
├── 02-neural-network-fundamentals.md        (148 lines, 30 min)
├── 03-the-transformer-architecture.md       (196 lines, 45 min)
├── 04-training-fundamentals.md              (228 lines, 40 min)
├── 05-the-llm-inference-pipeline.md         (233 lines, 30 min)
├── 06-advanced-techniques-model-variants.md (211 lines, 35 min)
├── 07-evaluation-benchmarking.md            (48 lines, 25 min)
├── 08-practical-considerations.md           (264 lines, 35 min)
│
├── Reference Materials
├── glossary.md                               (Complete terminology reference)
├── code-examples.md                          (7 pedagogical Python examples)
├── summary.md                                (Key takeaways from all modules)
│
└── Original (Combined)
    └── llm.md                                (Full combined curriculum, 1910 lines)
```

## 📊 File Statistics

| File | Lines | Size | Purpose |
|------|-------|------|---------|
| **README.md** | 173 | 6.9K | Navigation guide & curriculum overview |
| **01-what-is-an-llm.md** | 73 | 4.3K | Definition, characteristics, history |
| **02-neural-network-fundamentals.md** | 148 | 6.0K | Neurons, layers, backprop |
| **03-the-transformer-architecture.md** | 196 | 6.2K | Tokenization, embeddings, attention |
| **04-training-fundamentals.md** | 228 | 6.7K | Pre-training, SFT, RLHF |
| **05-the-llm-inference-pipeline.md** | 233 | 5.8K | Forward pass, decoding, optimization |
| **06-advanced-techniques-model-variants.md** | 211 | 6.8K | MoE, base/instruct/reasoning models |
| **07-evaluation-benchmarking.md** | 48 | 4.2K | Evaluation strategies, benchmarks |
| **08-practical-considerations.md** | 264 | 7.7K | Hallucinations, costs, safety, latency |
| **glossary.md** | 163 | 5.6K | 50+ key terms with definitions |
| **code-examples.md** | 319 | 10K | 7 implementations of core algorithms |
| **summary.md** | 43 | 1.4K | Complete picture summary |
| **STRUCTURE.md** | This file | — | File organization guide |
| **llm.md** | 1910 | 66K | Original combined version (for reference) |

**Total Curriculum**: ~3,933 lines across all files

## 🎯 How to Navigate

### Start Here
👉 **[README.md](README.md)** - Main index with learning paths for different audiences

### Learning Modules (Read in Order)
1. **[01-what-is-an-llm.md](01-what-is-an-llm.md)** - Understand LLM basics
2. **[02-neural-network-fundamentals.md](02-neural-network-fundamentals.md)** - Learn ML foundation
3. **[03-the-transformer-architecture.md](03-the-transformer-architecture.md)** - Core architecture
4. **[04-training-fundamentals.md](04-training-fundamentals.md)** - How LLMs are trained
5. **[05-the-llm-inference-pipeline.md](05-the-llm-inference-pipeline.md)** - How text is generated
6. **[06-advanced-techniques-model-variants.md](06-advanced-techniques-model-variants.md)** - Advanced topics
7. **[07-evaluation-benchmarking.md](07-evaluation-benchmarking.md)** - Evaluation strategies
8. **[08-practical-considerations.md](08-practical-considerations.md)** - Real-world concerns

### Reference Materials
- **[glossary.md](glossary.md)** - Quick term lookups
- **[code-examples.md](code-examples.md)** - Implementation examples
- **[summary.md](summary.md)** - Key takeaways

### Original Combined Version
- **[llm.md](llm.md)** - Full curriculum in one file (for archival or offline reference)

## 🚀 Learning Paths

### Path 1: Complete Beginner (6 hours)
```
README.md → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 
         → glossary.md → code-examples.md → summary.md
```

### Path 2: ML Engineer (3 hours)
```
README.md → 03 → 04 → 05 → 06 → code-examples.md
```

### Path 3: Practitioner (2 hours)
```
README.md → 06 → 08 → glossary.md
```

### Path 4: Quick Reference (15 min)
```
README.md → summary.md → glossary.md
```

## ✨ Key Features

✅ **Modular Design** - Read modules independently or sequentially  
✅ **Clear Prerequisites** - Dependencies marked throughout  
✅ **Progressive Complexity** - Beginner → Intermediate → Advanced  
✅ **Code Examples** - Pedagogical Python implementations  
✅ **Comprehensive Glossary** - 50+ terms defined  
✅ **Cross-references** - Links between related concepts  
✅ **Key Takeaways** - Summary boxes in each module  

## 📝 File Naming Convention

Modules are numbered `0N-descriptor.md` where:
- `0N` = Zero-padded module number (01-08)
- `descriptor` = Kebab-case description of content

Example: `03-the-transformer-architecture.md` = Module 3

## 🔄 Updating the Curriculum

To maintain consistency across files:
1. Edit the individual module file (e.g., `03-the-transformer-architecture.md`)
2. If major changes, regenerate `llm.md` by concatenating all modules
3. Update `summary.md` with any new key points
4. Update `README.md` if structure changes

## 📖 Total Reading Time

| Component | Time |
|-----------|------|
| README.md | 5 min |
| All 8 Modules | ~4.5 hours |
| Glossary | 10 min (reference) |
| Code Examples | 30 min |
| Summary | 5 min |
| **Total** | **~5.5 hours** |

(Can be reduced to 2-3 hours by skipping non-core modules)

---

**Last Updated**: 2026-06-21  
**Version**: 1.0 (Split from monolithic llm.md)  
**Status**: Complete and ready to use
