# Agentic Architecture

## why we multi-Agent system

> Architecture: single vs multi-Agent team

![diagram](https://storage.googleapis.com/github-repo/kaggle-5days-ai/day1/multi-agent-team.png)

### The do-it-all Agent (problem)

- single agents can do a lot. when task get more complex, a single `monolithic` agent do all like research, write, edit, fact-check all at once became a problem.

- It's instruction prompts gets long and confusing.

- Hard to debug, maintain and often return unreliable results. 

### A team of specialists (solution)

- Build a `multi-agent system` for each specialized agents to collaborate like real-team to assign each agent has one clear job.

- This makes easier to build, test, more power , reliable when working together.

### Example: Research & Summarization System

```python
# Research Agent: Its job is to use the google_search tool and present findings.
research_agent = Agent(
    name="ResearchAgent",
    model="gemini-2.5-flash-lite",
    instruction="""You are a specialized research agent. Your only job is to use the
    google_search tool to find 2-3 pieces of relevant information on the given topic and present the findings with citations.""",
    tools=[google_search],
    output_key="research_findings", # The result of this agent will be stored in the session state with this key.
)
```

```python
# Summarizer Agent: Its job is to summarize the text it receives.
summarizer_agent = Agent(
    name="SummarizerAgent",
    model="gemini-2.5-flash-lite",
    # The instruction is modified to request a bulleted list for a clear output format.
    instruction="""Read the provided research findings: {research_findings}
Create a concise summary as a bulleted list with 3-5 key points.""",
    output_key="final_summary",
)
```

- Then we bring the agents together under a root agent, or coordinator:

```python
# Root Coordinator: Orchestrates the workflow by calling the sub-agents as tools.
root_agent = Agent(
    name="ResearchCoordinator",
    model="gemini-2.5-flash-lite",
    # This instruction tells the root agent HOW to use its tools (which are the other agents).
    instruction="""You are a research coordinator. Your goal is to answer the user's query by orchestrating a workflow.
1. First, you MUST call the `ResearchAgent` tool to find relevant information on the topic provided by the user.
2. Next, after receiving the research findings, you MUST call the `SummarizerAgent` tool to create a concise summary.
3. Finally, present the final summary clearly to the user as your response.""",
    # We wrap the sub-agents in `AgentTool` to make them callable tools for the root agent.
    tools=[
        AgentTool(research_agent),
        AgentTool(summarizer_agent)
    ],
)
```

- `AgentTool` to wrap the sub-agents to make them callable tools for the root agent.

## Sequential workflows

![sequential agents](https://storage.googleapis.com/github-repo/kaggle-5days-ai/day1/sequential-agent.png)

### unpredictable order (problem)

> `use sequential when`: your need a linear pipeline that useses previous step to build

- The realied on a detailed instruction prompt to force to run steps in order of multi-agent system.

- A complex llm might gets wrong decision to skip a step, run them in wrong order or get `stuck`, making the process unpredictable.

### A fixed pipeline (solution)

- when task need to happens in a graranted specific order, you can use a `sequentialAgent`.

- This agent acts and running sub-agents in the exact order you list them.

- The one agent becomes inputs for other agent, creating reliable workflow and more predictable.

> This is perfect for tasks that build on each other, but it's slow if the tasks are independent. 

## Parallel Workflows - Independent Researchers

![parallel agent](https://storage.googleapis.com/github-repo/kaggle-5days-ai/day1/parallel-agent.png)

### The bottleneck (problem)

- Each step must wait for the previous one to finish and if you several task that not dependent on each other?

- A sequence would be slow and inefficient, creating where each task waits unnecessarily.

### concurrent Execution (solution)

> `Use Parallel when`: Tasks are independent, speed matters, and you can execute concurrently.

- when yo have independent tasks, you run them all same time using `ParallelAgent`

- This executes all of its subagents concurrently, dramatically speeding up the workflow and parallel tasks are complete.

- you can then pass their combined results to a final 'aggregator' step.

> **But what if you need to review and improve an output multiple times?**

## Loop Workflows - The Refinement Cycle

![loop agent(human-feedback)](https://storage.googleapis.com/github-repo/kaggle-5days-ai/day1/loop-agent.png)

## one-shot quality (problem)

- All workflow we seen before run start to finish then stop.

- `SequentialAgent` and `parallelAgent` return a results and stop.

- one-shot isn't good tasks requires refinement quality control. we have no way to review it and ask for rewrite.

> `Use Loop when`: Iterative improvement is needed, quality refinement matters, or you need repeated cycles.

### Example: Iterative Story Refinement

- Let's build a system with two agents:

- Writer Agent - Writes a draft of a short story
- Critic Agent - Reviews and critiques the short story to suggest improvements

```python
# This agent runs ONCE at the beginning to create the first draft.
initial_writer_agent = Agent(
    name="InitialWriterAgent",
    model="gemini-2.5-flash-lite",
    instruction="""Based on the user's prompt, write the first draft of a short story (around 100-150 words).
    Output only the story text, with no introduction or explanation.""",
    output_key="current_story", # Stores the first draft in the state.
)

print("✅ initial_writer_agent created.")
```

```python
# This agent's only job is to provide feedback or the approval signal. It has no tools.
critic_agent = Agent(
    name="CriticAgent",
    model="gemini-2.5-flash-lite",
    instruction="""You are a constructive story critic. Review the story provided below.
    Story: {current_story}
    
    Evaluate the story's plot, characters, and pacing.
    - If the story is well-written and complete, you MUST respond with the exact phrase: "APPROVED"
    - Otherwise, provide 2-3 specific, actionable suggestions for improvement.""",
    output_key="critique", # Stores the feedback in the state.
)

print("✅ critic_agent created.")
```

- `LoopAgent` itself doesn't automatically know that "APPROVED" means "stop."

- We need an agent to give it an explicit signal to terminate the loop.

- We do this in two parts:

- A simple Python function that the LoopAgent understands as an "exit" signal.
- An agent that can call that function when the right condition is met.

```python
# This is the function that the RefinerAgent will call to exit the loop.
def exit_loop():
    """Call this function ONLY when the critique is 'APPROVED', indicating the story is finished and no more changes are needed."""
    return {"status": "approved", "message": "Story approved. Exiting refinement loop."}

print("✅ exit_loop function created.")
```

- agent call this Python function, we wrap it in a FunctionTool. Then, we create a RefinerAgent that has this tool.

- 👉 Notice its instructions: this agent is the "brain" of the loop. It reads the {critique} from the CriticAgent and decides whether to (1) call the exit_loop tool or (2) rewrite the story.

```python
# This agent refines the story based on critique OR calls the exit_loop function.
refiner_agent = Agent(
    name="RefinerAgent",
    model="gemini-2.5-flash-lite",
    instruction="""You are a story refiner. You have a story draft and critique.
    
    Story Draft: {current_story}
    Critique: {critique}
    
    Your task is to analyze the critique.
    - IF the critique is EXACTLY "APPROVED", you MUST call the `exit_loop` function and nothing else.
    - OTHERWISE, rewrite the story draft to fully incorporate the feedback from the critique.""",
    
    output_key="current_story", # It overwrites the story with the new, refined version.
    tools=[FunctionTool(exit_loop)], # The tool is now correctly initialized with the function reference.
)

print("✅ refiner_agent created.")
```

```python
# The LoopAgent contains the agents that will run repeatedly: Critic -> Refiner.
story_refinement_loop = LoopAgent(
    name="StoryRefinementLoop",
    sub_agents=[critic_agent, refiner_agent],
    max_iterations=2, # Prevents infinite loops
)

# The root agent is a SequentialAgent that defines the overall workflow: Initial Write -> Refinement Loop.
root_agent = SequentialAgent(
    name="StoryPipeline",
    sub_agents=[initial_writer_agent, story_refinement_loop],
)

print("✅ Loop and Sequential Agents created.")
```

## Summary - Choosing the Right Pattern

### Decision Tree: Which Workflow Pattern?

![Agent decision tree](https://storage.googleapis.com/github-repo/kaggle-5days-ai/day1/agent-decision-tree.png)

### Quick Reference Table

| Pattern | When to Use | Example | Key Feature |
|---------|-------------|---------|-------------|
| **LLM-based (sub_agents)** | Dynamic orchestration needed | Research + Summarize | LLM decides what to call |
| **Sequential** | Order matters, linear pipeline | Outline → Write → Edit | Deterministic order |
| **Parallel** | Independent tasks, speed matters | Multi-topic research | Concurrent execution |
| **Loop** | Iterative improvement needed | Writer + Critic refinement | Repeated cycles |