# Glossary: Key Terms

## A
- **Attention**: Mechanism allowing each token to weigh the importance of other tokens
- **Activation Function**: Non-linear function (ReLU, Tanh) applied in neural networks to introduce complexity

## B
- **Base Model**: Pre-trained model before fine-tuning; follows patterns without instruction-following
- **Backpropagation**: Algorithm computing gradients by flowing error backward through network
- **Batch**: Group of examples trained together (faster and more stable than one-at-a-time)
- **Beam Search**: Decoding strategy keeping top-K best hypotheses in parallel

## C
- **Chain-of-Thought (CoT)**: Prompting technique encouraging step-by-step reasoning before final answer
- **Context Window**: Maximum number of tokens a model can process simultaneously
- **Cross-entropy Loss**: Common loss function for classification tasks

## D
- **Decoding**: Process of generating tokens from probability distributions; includes greedy, beam search, sampling
- **Embedding**: Vector representation of a token capturing semantic meaning

## E
- **Epoch**: One complete pass through all training data
- **Embedding Layer**: Neural network layer converting token IDs to high-dimensional vectors

## F
- **Fine-tuning**: Training a pre-trained model on new, specific data (SFT or RLHF)
- **Feedforward Network**: Simple two-layer network (Linear → ReLU → Linear) applied position-wise
- **Frozen Weights**: Model parameters that don't change during inference

## G
- **Gradient**: Derivative showing how each weight affects the loss; used to update weights
- **GPT**: "Generative Pre-trained Transformer"; architecture used by OpenAI models
- **Greedy Decoding**: Sampling strategy always picking the highest probability token

## H
- **Hallucination**: False, made-up information generated confidently by the model
- **Hidden State**: Intermediate representation of data flowing through neural network layers
- **Head** (in attention): One of multiple attention mechanisms running in parallel

## I
- **Inference**: Forward pass with frozen weights; generating predictions
- **Instruct Model**: Base model fine-tuned with SFT + RLHF to follow instructions

## J
- **Just-In-Time Compilation**: Not directly LLM-related; see optimization

## K
- **KV-Cache**: Storing key-value attention outputs to speed up inference (~5x faster)
- **Key** (in attention): Vector representing how relevant a token is to others

## L
- **Layer**: Group of neurons processing the same input in parallel
- **Layer Normalization**: Normalization technique stabilizing training
- **Learning Rate**: Hyperparameter controlling how big a step to take when updating weights
- **Loss Function**: Measure of how wrong model predictions are; lower is better
- **LLM**: Large Language Model; billion+ parameter neural network for text

## M
- **MoE (Mixture of Experts)**: Architecture with many expert networks; router selects which to use
- **Multi-Head Attention**: Multiple attention mechanisms running in parallel, learning different relationships
- **Multi-turn Dialogue**: Conversation with multiple back-and-forth exchanges

## N
- **Neural Network**: Computational system inspired by biology; composed of interconnected neurons
- **Neuron**: Basic unit computing weighted sum + bias + activation function
- **Next-Token Prediction**: Training objective: predict the word/token that comes next
- **NLTK**: Natural Language Toolkit (Python library)

## O
- **Outcome Supervision**: Reward models based on final result (vs process)

## P
- **Positional Encoding**: Information added to embeddings telling model word order
- **Pre-training**: Initial large-scale training on unlabeled data (expensive, months)
- **Process Reward Model**: Rewards intermediate reasoning steps (vs final outcome)
- **Prompt**: Input text given to model

## Q
- **Query** (in attention): Vector asking "what am I looking for in other tokens"
- **Quantization**: Reducing model precision (float32 → int8) to make smaller and faster

## R
- **RAG (Retrieval-Augmented Generation)**: Grounding model outputs in retrieved documents
- **Reasoning Model**: Model trained to show step-by-step thinking (System 2)
- **RLHF (Reinforcement Learning from Human Feedback)**: Alignment technique using preference feedback
- **RNN (Recurrent Neural Network)**: Sequential architecture (pre-Transformer); processes tokens one-at-a-time

## S
- **Sampling**: Randomly choosing tokens according to probability distribution
- **Self-Attention**: Mechanism where token attends to all positions in sequence
- **Softmax**: Function normalizing scores to probability distribution summing to 1
- **Sparse Routing**: Only activating selected parts of network (MoE uses this)
- **Specification Supervision**: Exact specification of correct answer
- **SFT (Supervised Fine-Tuning)**: Fine-tuning on curated (input, output) pairs

## T
- **Temperature**: Hyperparameter controlling randomness in sampling (0=greedy, higher=more random)
- **Token**: Piece of text (usually word or subword); basic unit of LLMs
- **Tokenizer**: Algorithm breaking text into tokens
- **Top-K Sampling**: Only sampling from top-K highest probability tokens
- **Transformer**: Architecture using self-attention; foundation of modern LLMs
- **Training Data**: Examples used to update model weights

## V
- **Value** (in attention): Vector containing actual information to pass to other tokens
- **Vocabulary**: Set of all unique tokens a model can represent

## W
- **Weights**: Parameters of neural network; learned during training
- **Weighted Sum**: Sum of inputs multiplied by their weights (fundamental operation in neurons)

---