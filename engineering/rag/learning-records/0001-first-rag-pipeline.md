# 0001: First RAG Pipeline

## Date
2026-06-30

## What I learned
- The three-step mental model of RAG: Index → Retrieve → Generate
- How to chunk a document into overlapping pieces
- How to convert text chunks into vector embeddings using `sentence-transformers`
- How to build a vector search index with FAISS and retrieve relevant chunks
- How to feed retrieved context into an LLM (Ollama or OpenAI) for grounded generation

## Key insights
- The prompt instruction "answer using ONLY the provided context" is critical — without it, the LLM can fall back on its training data and hallucinate
- Chunk size directly affects retrieval quality: too small loses context, too large loses precision
- FAISS `IndexFlatL2` is the simplest index, fine for small datasets; production systems use more sophisticated indexes (IVF, HNSW)

## Non-obvious gotchas
- The embedding model and the LLM are separate models with different purposes. The embedding model converts text to vectors (semantic understanding); the LLM generates the final answer. They don't need to be from the same provider.
- L2 distance (used in this lesson) and cosine similarity often give different rankings for the same search — worth understanding which works better for your data.
- FAISS returns indices sorted by distance (closest first), but the raw distances are less interpretable than cosine similarity scores.

## Next steps
- Move to Lesson 2: Chunking strategies — experiment with different chunk sizes and methods
- Read the original RAG paper to deepen interview-level understanding
- Evaluate retrieval quality on my own documents

## Questions for the next session
- What chunk size is optimal for different types of documents?
- How do I know if my retrieval is working well?
- What's the difference between L2 and cosine similarity, and when should I use each?
