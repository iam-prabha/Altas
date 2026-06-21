# Module 6: Advanced Techniques and Model Variants

> **Prerequisite**: All previous modules

## Mixture of Experts (MoE): Computing Efficiently

### The Problem: Dense Models Are Expensive

In a standard Transformer, every token passes through every neuron in the feed-forward network:

```
Token → [Dense Layer 1: 4x hidden size] → [Dense Layer 2: hidden size] → Output
        (activate ALL neurons)
```

For a 70B parameter model, every token activates 70B parameters—expensive!

### The Solution: Sparse Routing

**Mixture of Experts** trains many small "expert" networks, then routes each token to only the most relevant ones:

```
Token 1 → [Router] → Expert 2, Expert 5       (activate 2 experts)
Token 2 → [Router] → Expert 1, Expert 8, Expert 3  (activate 3 experts)
Token 3 → [Router] → Expert 5, Expert 7       (activate 2 experts)
```

The router is a small network that learns which experts to use.

### Benefits

- **Conditional Computation**: Only activate needed experts (sparse)
- **Scaling**: Can add experts without proportional compute increase
- **Specialization**: Experts naturally specialize in different types of content
  - One expert: code
  - One expert: math
  - One expert: dialogue
  - etc.

### Trade-offs

- **Complexity**: Harder to train (load balancing—making sure all experts used)
- **Memory**: Need to load all expert weights (more parameters doesn't mean less inference cost)
- **Quality**: Sometimes underperforms dense models on small scale

### Modern Examples

- **Mixtral 8x7B**: 8 experts, each 7B params (56B total), but uses 2 per token
- **Gemini Pro 1.5**: Uses MoE for efficiency
- **gpt-4**: Rumored to have MoE structure (unconfirmed)

## Base vs Instruct vs Reasoning Models

LLMs come in three main variants, each with different training and behavior:

### Base Models: System 1 (Intuitive)

A **Base model** is the direct output of pre-training. It predicts the next token well but doesn't follow instructions.

**Characteristics:**
- **Training**: Next-token prediction on web text only
- **Behavior**: Completes text in any direction; doesn't answer questions
- **Example Input/Output**:
  ```
  Input: "What is the capital of France?"
  Output: "What is the capital of France? Paris is located on the 
           Seine river and is the largest city in France..."
           (continues the thought, doesn't answer directly)
  ```

**When to use**: Research, analyzing model capabilities, studying learned knowledge

**Examples**: GPT-3 (base), Llama 2 (base), Mistral 7B (base)

### Instruct/Chat Models: Following Instructions

An **Instruct model** is a base model fine-tuned to follow instructions using SFT + RLHF.

**Training Process:**
```
Base Model
   ↓
[SFT: 50K high-quality (instruction, response) pairs]
   ↓
Instruction-following model
   ↓
[RLHF: Human preference feedback]
   ↓
Aligned Chat Model
```

**Characteristics:**
- **Training**: SFT on curated instruction data + RLHF alignment
- **Behavior**: Follows instructions, answers questions, maintains dialogue
- **Example Input/Output**:
  ```
  Input: "What is the capital of France?"
  Output: "The capital of France is Paris."
  (direct, helpful answer)
  ```

**Alignment Categories:**
- **Helpful**: Answers questions completely
- **Harmless**: Refuses unsafe requests
- **Honest**: Admits uncertainty, doesn't hallucinate confidently

**When to use**: Most applications (chatbots, assistants, APIs)

**Examples**: GPT-4, Claude, ChatGPT, Llama 2-Chat, Mistral-Instruct

### Reasoning Models: System 2 (Deliberate)

A **Reasoning model** is trained to slow down and show its thinking before answering.

**The Core Innovation:**

Standard models predict fast:
```
Input → [Quick forward pass] → Output
```

Reasoning models think step-by-step:
```
Input → [Generate thinking tokens (hidden)] → [Use thinking to inform answer] → Output
```

**Training with Process Rewards:**

Instead of rewarding correct answers (outcome), reward correct reasoning (process):

```
Solution Path A:
  Step 1: "Let me identify..." → reward +0.2
  Step 2: "This suggests..."   → reward +0.3
  Step 3: "Therefore..."       → reward +0.5
  Answer: Correct              → reward +1.0

Solution Path B:
  Step 1: "Assume answer is X..." → reward -0.1 (bad reasoning)
  Step 2: "Then Y must be..."     → reward -0.2 (compounded error)
  Answer: Wrong                   → reward -1.0
```

Model learns correct reasoning, not lucky guesses.

**Characteristics:**
- **Training**: Large-scale RL with process reward models (GRPO)
- **Behavior**: Shows reasoning before answering; slower but more reliable on hard problems
- **Inference Cost**: Higher (generating thinking tokens takes compute)
- **Example**:
  ```
  User: "A group of friends want to divide 17 apples equally among 5 people.
         How many apples does each person get and how many are left over?"
  
  [Internal Thinking (hidden from user):
   "Let me think step-by-step. I need to divide 17 by 5.
    5 * 3 = 15, so each person gets 3 apples.
    17 - 15 = 2, so 2 apples remain."
  ]
  
  Output: "Each person gets 3 apples, and 2 apples are left over."
  ```

**When to use**: Hard problems needing reliability (math, logic, code debugging)

**Examples**: OpenAI o1, Gemini 2.0 Flash Thinking, DeepSeek-R1

**Trade-off Table:**
```
              | Base  | Instruct | Reasoning
--------------|-------|----------|----------
Speed         | Fast  | Fast     | Slow
Reasoning     | Poor  | OK       | Excellent
Instruction   | Bad   | Excellent| Excellent
Cost          | Low   | Low      | Medium-High
Training      | Easiest| Medium  | Hardest
```

## Chain-of-Thought and Explicit Reasoning

Even without reasoning models, you can prompt models to think step-by-step:

**Without CoT:**
```
Q: "If Sally has 5 apples and gives 2 to Tom, how many does she have?"
A: "3" (might be wrong by accident)
```

**With CoT Prompting:**
```
Q: "If Sally has 5 apples and gives 2 to Tom, how many does she have?
    Let me think step-by-step:
    1. Sally starts with 5 apples
    2. She gives 2 to Tom
    3. So she has 5 - 2 = 3 apples
    Sally has 3 apples."
    
A: "3" (more likely to be correct; shows reasoning)
```

This simple prompting technique improves accuracy significantly.

## Key Takeaways

- **MoE**: Routes tokens to specialized experts instead of activating all parameters; sparse computation
- **Base models**: Pure next-token prediction; don't follow instructions
- **Instruct models**: Fine-tuned to follow instructions; practical for most applications
- **Reasoning models**: Trained to show thinking; much better on hard problems
- **Process over outcome**: Rewarding correct reasoning (not just correct answers) teaches deeper understanding
- **Chain-of-thought prompting**: Simple technique to improve accuracy even without reasoning models

---