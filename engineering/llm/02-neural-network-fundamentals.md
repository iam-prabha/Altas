# Module 2: Neural Network Fundamentals

> **Prerequisite**: Comfortable with basic linear algebra (vectors, matrices) and calculus (derivatives). No prior ML experience needed.

## What is a Neural Network?

A **neural network** is a computational system inspired by how biological brains work. It's built from simple building blocks called **neurons** that are connected together. When you feed data into one end, it flows through the network and produces a prediction at the other end.

The key insight: a neural network is a **function approximator**. Given enough neurons, it can learn to approximate almost any function from input to output.

## The Neuron (Perceptron)

The basic unit is a single **neuron**:

```
Input Vector: [x₁, x₂, x₃, ...]
                ↓
        Weighted Sum: Σ(wᵢ × xᵢ) + b
                ↓
        Activation Function: σ(weighted_sum)
                ↓
        Output: y
```

A neuron performs these steps:

1. **Weighted Sum**: Multiply each input by a weight (w), add them up, plus a bias (b)
   - `z = w₁×x₁ + w₂×x₂ + w₃×x₃ + ... + b`

2. **Activation Function**: Apply a non-linear function to introduce complexity
   - Without activation, multiple layers would just collapse into one linear function
   - Common activations: ReLU (max(0,z)), Tanh, Sigmoid

3. **Output**: Pass the result to the next layer or as final output

Example with ReLU activation:
```typescript
function neuron(inputs: number[], weights: number[], bias: number): number {
  const z = inputs.reduce((sum, x, i) => sum + x * weights[i], 0) + bias;
  return Math.max(0, z);  // ReLU activation
}

## Layers and Networks

A **layer** is a group of neurons processing the same input. A **neural network** stacks multiple layers:

```
Input Layer      Hidden Layer 1    Hidden Layer 2    Output Layer
     [x₁]              [n₁]               [n₃]           [ŷ]
     [x₂]    →         [n₂]      →       [n₄]      →    [prob]
     [x₃]              [n₅]               [n₆]
```

- **Input Layer**: Raw data (e.g., token embeddings)
- **Hidden Layers**: Transform the input step by step, learning increasingly abstract patterns
- **Output Layer**: Final prediction (e.g., probability of next word)

The more layers, the more abstraction. Early layers might learn simple patterns (frequent words), while later layers learn complex relationships (semantic meaning).

## Training: Learning the Weights

When a neural network is initialized, its weights are random—it knows nothing. **Training** is the process of adjusting weights so the network makes better predictions.

### Forward Pass

1. Feed training data through the network
2. Get a prediction
3. Compare to the correct answer (loss)

```
Input Data → [Network with random weights] → Prediction
                                                    ↓
                                            Compare to Truth
                                                    ↓
                                                  Loss
```

### Backpropagation

The key algorithm for training: **backpropagation** (backprop).

1. Calculate how wrong the prediction was (loss function)
2. **Backpropagate** the error through the network
3. For each weight, calculate how much it contributed to the error (gradient)
4. Update weights in the direction that reduces error

This is like tuning a complex machine: you measure how broken it is, figure out which parts caused the problem, and adjust them slightly.

```typescript
// Pseudocode for training loop
for (let epoch = 0; epoch < numEpochs; epoch++) {
  for (const batch of trainingData) {
    // Forward pass
    const prediction = network(batch);
    const loss = calculateLoss(prediction, batch.truth);

    // Backward pass (backpropagation)
    const gradients = backpropagate(loss, network);

    // Update weights
    for (const weight of network.weights) {
      weight -= learningRate * gradients[weight];
    }
  }
}

### Key Training Concepts

- **Loss Function**: Measures how wrong predictions are. Lower is better. Examples: cross-entropy for classification, MSE for regression.
- **Learning Rate**: How big a step to take when updating weights. Too big = unstable, too small = slow training.
- **Epoch**: One pass through all training data
- **Batch**: A small group of examples trained together (faster, stabler than one at a time)
- **Overfitting**: Memorizing training data instead of learning generalizable patterns (bad!)

## Deep Learning: Why Depth Matters

A network with one hidden layer can theoretically learn any function. So why do we use deep networks with many layers?

**Expressivity**: Deep networks can learn complex patterns with fewer total neurons. A deep network with 1000 neurons can be vastly more powerful than a shallow one with 1000 neurons.

Example:
- Shallow network: needs exponentially many neurons to learn complex functions
- Deep network: can learn the same function with far fewer parameters

This is why **scaling matters**—bigger models (more parameters) with more depth can learn more sophisticated patterns.

## Vectors and Embeddings

In neural networks, everything is vectors:

- Inputs are vectors
- Weights are vectors (or matrices)
- Activations are vectors
- Outputs are vectors

An **embedding** is a vector representation of something. For example:
- The word "cat" might be represented as: `[0.2, -0.5, 0.1, 0.8, ...]` (a 768-dimensional vector)
- This vector encodes semantic meaning: words with similar meanings have similar vectors

LLMs work entirely in the embedding space—raw text is converted to vectors, processed through neural networks, and converted back to text.

## Key Takeaways

- Neural networks are function approximators made of neurons arranged in layers
- Each neuron computes a weighted sum + bias, passes through an activation function
- **Training** adjusts weights to minimize prediction error using backpropagation
- **Depth** (multiple layers) enables learning complex patterns efficiently
- Everything in LLMs is represented as vectors/embeddings
- Understanding backprop and gradients is crucial for understanding why deep learning works

---