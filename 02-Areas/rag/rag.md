# Retrieval Augmented Generation

# Reason why we need RAG

- large language model are very powerful, but they have a major limitation.
- They sometimes make things up as known as `hallucinations` or give outdated answers because they rely strictly on the data were originally trained on.

# RAG solve the problem

- **Retrieval-Augmented Generation** solves this problem by allowing the AI to look up
reliable information from an external database before it answer you.
- you can think of RAG as giving AI a tailored textbook to lookup answers for an open-book test, rather than forcing it to answer from memory alone.

- At its core, a standard RAG system operates in three simple steps:

1. **Indexing (organizing the knowledge)**
    - before you even ask a question, the system takes large documents (like PDF, word files or web pages) and breaks them down into smaller digestible pieces called `chucks`.
    - These chunks converted into mathematical format (vector) and stored in a database so they can be searched incredibly fast.

2. **Retrieval (finding the facts)**
    - when you ask a question, the RAG system searches through that database to find the specific chunks of text that are most relevant to what you are asking.

3. **Generation (writing the answer)**
    - finally, the system takes your original question and pairs it with the relevant factual chucks, it just found.
    - It feeds all of this context to the language model, which then uses the provided facts to write a highly accurate, reliable, and well-informed answer.

# Type of RAG systems

1. **Naive RAG(The Basic framework)**
    - This is the earliest and simple methodology as knows as "Retrieve-Read" framework that follows the straightforward, three-step process we discussed earlier:indexing the documents, retrieval the most relevant chunks based on the user's query and passing them to the language model to generate an answer.

    - **Limitations**:
        - while cost-effective, Naive rag often struggles with precision, meaning it might retrieve irrelevant information or miss cruical facts.
        - Because it just gathers data and feeds it to the AI directly, it can also leads to hallucination, disjointed outputs, or the AI simply echoing the retrieved content without adding insightful synthesized information.

2. **Advanced RAG (The optimized pipeline)**
    - Developed to overcomes the specific shortcomings of naive rag, Advanced rag adds highly optimized `pre-retrieval` and `post-retrieval` stages to ensure the AI gets much higher-quality information.

    - **pre-retrieval**
        - Before searching, it focuses on optimizing the user's query (such as rewriting or expanding the query to make it clearer) and improving how the data is indexed (like using a sliding window approach for document chunks)
    
    - **post-retrieval**
        - After finding the information, but before giving it to the language model, Advanced rag compresses the context to remove noise and reranks the rerieved chunks so the most crucial information is prioritized at the edges of the prompt.

3. **Modular RAG (The flexible Architecture)**
    - while naive and advanced rag both follow a strict sequential chain retrieving and the reading, modular rag is highly adaptable and versatile.
    - It breaks the pipeline down into independent components (modules) that can be swapped, customized or rearraned to handle specific tasks.

    - **New modules**
        - It introduces specialized components, such as a `search` module for querying external search engine or databases, a `memory` module to guide retrieval using AI's memory and `Routing` module to dynamically choose the best data source for a given question.

    - **New pattern**
        - Modular RAG is not limited to simple sequential process.
        - It can retrieve information itertively, sure the language model to generate its own context, or run adaptive loops where the system autonomously decides whether it even needs to retrieve external knowledge in the first place.

> To put simply: Naive RAG is a straight line, Advanced RAg is a highly filtered line, and Modular RAG is a customizable toolkit.