# Module 4: Training Fundamentals

> **Prerequisite**: Modules 2 & 3 (Neural Networks and Transformers)

## The Three Stages of LLM Training

Modern LLM training has three distinct phases, each with different data and objectives:

```
[Stage 1] Pre-training: 50%
Raw Internet Data
↓
[Stage 2] Supervised Fine-Tuning: 45%
High-Quality Examples
↓
[Stage 3] Alignment (RLHF): 5%
Preference Data
↓
Production-Ready LLM
```

Let's dive into each stage.

## Stage 1: Pre-training (Next Token Prediction)

### The Objective

Pre-training teaches the model to predict the next token given previous tokens. This is **self-supervised learning**—the data provides its own labels.

```
Training Example:
Input:    "The cat sat on"
Target:   "the"

Model trains to predict: given "The cat sat on", output should be "the"
```

This objective, replicated over billions of examples, teaches the model language patterns: grammar, facts, reasoning, coding, etc.

### Why This Works

By predicting the next word billions of times on diverse text:
- The model learns grammar and syntax naturally
- It absorbs factual knowledge from text (countries, people, concepts)
- It learns coding patterns from code repositories
- It learns reasoning patterns from mathematical and scientific texts
- All without explicit supervision

### Scale Matters

Key insight: **larger models trained on more data perform better**. This is the Scaling Law:

```
Performance ∝ Model Size × Data Size
```

Empirically:
- Doubling parameters: ~3-5% improvement
- Doubling data: ~3-5% improvement
- GPT-3 (175B params) trained on 300B tokens
- GPT-4 (unknown size) trained on ~2T tokens

### The Compute

Pre-training is expensive:
- GPT-3: ~3,640 petaFLOP days (years of computation on one GPU)
- Modern models: trillions of FLOPs (floating point operations)
- Cost: millions of dollars in hardware

This creates a **moat**—only well-funded organizations can train from scratch.

## Stage 2: Supervised Fine-Tuning (SFT)

### The Problem with Base Models

After pre-training, the model can predict the next token well, but:
- It doesn't follow instructions: "What is 2+2?" → might continue the pattern instead of answering
- It doesn't refuse harmful requests
- It rambles and doesn't maintain coherent responses
- It's a "completion engine", not a "chat assistant"

Example:
```
Prompt: "What is the capital of France?"
Base model output: "What is the capital of France? Paris is a major
European city with a rich history..."
```

Not ideal. We want direct answers.

### The Solution: SFT

**Supervised Fine-Tuning** trains the model on high-quality (prompt, response) pairs:

```
Training Examples:
Prompt: "What is the capital of France?"
Target: "The capital of France is Paris."

Prompt: "Summarize this text: [long text]"
Target: "[concise summary]"

Prompt: "Write a Python function to..."
Target: "[working code]"
```

The model learns to:
- Answer questions directly
- Follow instructions
- Maintain conversation context
- Refuse unsafe requests

### The Data

SFT data is **curated and expensive**:
- Humans write or label hundreds of thousands of examples
- High quality needed (unlike pre-training's diverse internet text)
- Typical scale: 50K-500K examples

### Training Mechanics

SFT uses the same backpropagation as pre-training, but:
- Much smaller learning rate (don't overwrite pre-training)
- Much less data (prevents overfitting)
- Only takes hours to days (vs. months for pre-training)

## Stage 3: Alignment with RLHF

### The Gap

Even after SFT, problems remain:
- Model generates plausible-sounding but false information (hallucinations)
- Hard to specify every desired behavior with examples
- Trade-offs: precise vs. creative, concise vs. detailed
- Subtle safety issues: the model might sound helpful while being harmful

### The Solution: RLHF (Reinforcement Learning from Human Feedback)

**RLHF** trains the model using human preference feedback instead of binary right/wrong labels.

Process:

1. **Collect Preferences**: Humans rate multiple model outputs for the same prompt
   ```
   Prompt: "Write a poem about nature"
   Output A: "Trees and rivers flow..."  → Score: 8/10
   Output B: "Nature is green..."        → Score: 5/10
   
   Model learns Output A is preferred
   ```

2. **Train Reward Model**: A neural network learns to predict human preferences
   - Inputs: (prompt, response)
   - Output: score (0-1) of how good the response is
   - Trained on preference pairs

3. **RL Training**: Update the LLM to maximize the reward model's scores
   - Policy: the LLM (what we're training)
   - Reward: the reward model (scores responses)
   - Algorithm: typically PPO (Proximal Policy Optimization)
   
   ```
   for iteration:
       Generate response from LLM
       Get reward from reward model
       Update LLM to increase rewards
       (with constraints to not drift too far from original)
   ```

### Why This is Powerful

RLHF captures nuanced preferences that can't be expressed as "right/wrong":
- Helpfulness, harmlessness, honesty trade-offs
- Stylistic preferences
- Domain-specific requirements
- Real user feedback improves the model

### The Frontier: Process Reward Models

Standard RLHF rewards the final answer. **Process Reward Models** (used in reasoning models like o1, Gemini 2.0) reward the *thinking process*:

```
Standard RLHF:
Prompt → [Model thinks] → Answer
                          ↓
                    Reward model scores answer

Process Rewards:
Prompt → [Model thinks step 1] → Reward
               ↓
         [Model thinks step 2] → Reward
               ↓
         [Model thinks step 3] → Reward
               ↓
         Final Answer → Reward
```

This incentivizes correct reasoning, not just correct answers.

## The Training Timeline

```
Month 1-3:   Pre-train on 2T tokens     (~weeks-months of compute)
Month 4:     Supervised Fine-Tuning    (hours)
Month 5-6:   RLHF alignment           (days)
Month 7:     Evaluation & safety testing
Month 8:     Release
```

Pre-training dominates compute; RLHF refines behavior.

## Key Insights

- **Pre-training** teaches language; scale (size + data) is king
- **SFT** makes it follow instructions; requires curated data
- **RLHF** aligns to human values; iterative improvement
- Each stage is necessary; skipping any produces worse models
- The quality of SFT and RLHF data directly impacts model quality

## Key Takeaways

- LLM training has three distinct stages with different purposes and scales
- Pre-training uses next-token prediction on massive unlabeled data
- SFT teaches instruction-following with curated high-quality examples
- RLHF uses human preferences to align behavior with values
- Each stage builds on the previous one; all are necessary
- The compute cost makes pre-training the main bottleneck

---