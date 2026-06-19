# Large Language Model

- An large language model is an advanced artificial intelligence system designed to process, understand, and generate our language text. These system are like highly pattern recognition tools for language.

## How they work

- At their foundational level, LLM are implemented as deep neural networks.
- In modern architecture, we use **transformers architecture** to processes text sequence in parallel.
- when text given to model that calculate and assigns probability by predicting the probability of a sequence of words.
- They're trained on massive volume of unlabeled text data, so the model learn from structural pattern of human language.

## What they can do

- They have ability to solve these problem like:
  - machine translation,
  - creative text and content generation,
  - question-answering and conversation dialogue,
  - text-generation and classification,
  - complex logical reasoning and code generation.

# How an LLM thinks

> [!important] Note
> LLM doesn't think the way a human does with conscious awareness, its internal reasoning and generation flow distinct structural stages, specialized architectures, and prompt-guided strategies.

## Converting text into math (Embeddings)

before processing anything happens, human words must be translated into a language the computer understands:

- **Tokenization**: The model breaks input sentences down into words/subwords and converts them into numeric IDs.
- **Embeddings & Positional Encoding**: each token IDs is converted into a high-dimensional vector that captures its language meaning, so inject positional data to model to understanding the exact orderof the words.

## Core engine:self-attention

An LLM **Thinking process** is a **self-attention mechanism** within the Transformer architecture that map out relationships between words.

- **Queries, keys, values**:the model generates three vectors: **query** (asking what other words are relevant to it), a **key** (a label shows its own relevance to other words), and a **values** (the actual content of the word).
- **Calculating scores**: to multiplying these vectors together, the model calculates mathematical scores to see how strongly words connects.
- **multi-head attention**: this runs across multiple **heads** in parallel allowing the model to continuously consider different contextual interpretations of the text.

## Routing via specialized (MoE)

In many modern, compute-efficient LLMs like(gemini or mixtral), the model uses a **mixture of experts (MoE)** architecture. Instead of activating the entire network for every single word, a **Gating network(router)** analyzes the incoming token and intelligently routes it to the specific, specialzed sub-models (expects) best suited for that piece of data.

## Advanced Reasoning (Thinking Out Loud)

while standard models predict the next word immediately, specialized **Large Reasoning Models** (like gemini 2.0 flash thinking) use architecture trained specifically to slow down and deliberate:

- **Chain-of-thought (CoT)**: Through reinforcement learning, these model learn to generate an internal, step-by-step reasoning process before arriving at final answer.
- **Deliberation and Backtracking**: they break complex problems into measurable sub-problems, explore multiple reasoning paths, and can even correct their own errors during internal deliberation before outputting text to the user.

## Predicting the next word (inference)

The entire pipeline culminates in a probability distribution. the model does not generates full sentences all at once; it calculates which token has highest mathematical probability of coming next, outputs it, and feeds that token into itself to predict the following word autoregressively.

# Reasoning vs Base models

To understanding how models differ from another into three category based on user's focus:
**Base (Pre-trained) models**, **Instruct/chat models** and newer Reasoning models (like OpenAI or Deepseek-R1) across architecture, training, and execution:

## Base Models: The Intuitive 'system 1' backbones

A **Base model** is the raw output of initial large-scale pre-training.

- **The goal**: Next token prediction.it takes a prefix of text and uses basic pattern recognition learned from terabytes of internet data to predict what word mathematically comes next.
- **The behavior**: It acts on pure intuition or style matching. if you prompt it with a question, it might not answer it; instead it just autocomplete the text by generating more questions, because it is simply completing a pattern.
- Note on Instruct models: when a base model undergoes supervised Fine-Tuning (SFT) and RLHF, it becomes an **Instruct/chat model**. These models are trained to be helpful assistants that answer immediately, but they still rely on the same fundamental instant-predication mechanism.

## Reasoning models: The Deliberate 'system 2' Thinkers

A **reasoning model** is a specialized of the language model. instead of immediate answer out of the next word, it is engineering to slow down, deliberate, and formulate an internal plan before presenting an answer.

- **The core training twist**: while base/instruct models are rewarded simply for matching a high-quality human response (outcome supervision), reasoning models are trained using **large-scale Reinforcement Learning (RL) focused on the process of thinking**. Through algorithms like group policy optimization (GRPO) or process reward models, they are explicitly rewarded for generating logical, step-by-step intermediate structures.
- **Behavior at runtime (Inference scaling)**: when you ask a reasoning model a question, it generates hidden "thinking tokens". It breaks complex problem into manageable sub-problems, maps out multiple paths, critiques its own logic, and backtracks to correct its own errors before outputting its final text.
