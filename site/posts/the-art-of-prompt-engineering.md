---
title: 'The Art of Prompt Engineering'
description: 'Unlock the secrets of prompt engineering with this practical guide inspired by Lee Boonstra’s book. Learn how crafting clear, targeted prompts can dramatically improve your interactions with AI—whether you’re summarizing text, generating code, or extracting information. This post explores essential techniques, configuration tips, real-world examples, and best practices to help you communicate with large language models more effectively and creatively. Perfect for anyone looking to master the language of AI and get the most out of today’s generative tools'
date: '2025-04-19'
author: Sony Mathew
readingTime: 8
categories: ['Technology']
tags:  [ 'Prompt Engineering', 'AI', 'LLM', 'Prompts', 'Generative AI', 'AI Best Practices', 'AI Prompt Design', 'AI Examples', 'AI assisted writing', 'Large Language Models']
toc: false
---

Prompt engineering is quickly becoming the new digital literacy. If you’ve ever tried to get a language model to do something “just right” and found yourself tweaking your words over and over, you’ve already dipped your toes into this fascinating craft. After reading [Lee Boonstra’s book](https://drive.google.com/file/d/1AbaBYbEa_EbPelsT40-vj64L-2IwUJHy/view) on the subject, I realized that learning to prompt is much like learning a new language: you have to master its nuances, idioms, and even its quirks to get the best results.

At its core, prompt engineering is about talking to AI in a way it understands and responds to effectively. Whether you’re summarizing text, extracting information, answering questions, translating languages or code, or even generating documentation, your prompt is your instruction manual. The clearer and more intentional you are, the better the AI performs.

But it’s not just what you say—it’s how you configure the model’s output. There are a few essential dials to know:

- **Output length:** Be specific. Too short, and you miss details; too long, and the model might ramble or fill with fluff. Example: “Summarize this article in 100 words.” or "Explain quantum physics in a tweet-length message"
- **Sampling controls:** These include temperature, top-K, and top-P. Temperature controls randomness in the LLM's responses. At temperature 0, responses are deterministic and predictable – great for factual queries. Higher temperatures introduce creativity and variation – better for brainstorming or creative writing. Top-K and top-P further shape how “adventurous” the model is in picking the next word. For most tasks, a temperature of 0.2, top-P of 0.95, and top-K of 30 is a sweet spot for coherence with a dash of creativity.
- **Watch for repetition loops:** If you notice the model repeating itself, try tweaking these settings—especially temperature and top-K.

When it comes to crafting prompts, there’s a whole toolkit of techniques:

- **Zero-shot prompting** is the simplest: just ask your question or give a command. "Write a short poem about autumn."
- **One-shot and few-shot prompting** involve giving one or more examples. This is especially helpful for classification or when you want a specific output structure. For example:

```
Review: "This movie was hilarious and heartwarming."
Sentiment: Positive

Review: "The plot was confusing and dull."
Sentiment:
```
- **System, contextual, and role prompting** add another layer of sophistication:
    - **System prompts** set the “big picture” context—like telling the model to always return results in JSON, or to answer respectfully. Example: "You are an expert Python programmer helping debug code."
    - **Contextual prompts** give task-specific instructions or information for the current task: "Here's a function that's throwing an IndexError."
    - **Role prompts** let you assign a persona or style, like “You are a motivational speaker. Explain blockchain to a beginner.”

Some advanced techniques can boost performance on tricky tasks:

- **Step-back prompting:** First ask the model a general question, then feed its answer into a more specific prompt.
- **Chain of Thought (CoT):** Encourage the model to “think aloud” by breaking down its reasoning step by step.
- **Self-consistency:** Run the same prompt multiple times with higher randomness, then pick the most common answer for reliability.
- **Tree of Thoughts (ToT):** Explore multiple reasoning paths at once, not just one.
- **ReAct (Reason \& Act):** Combine reasoning with actions, like calling APIs or searching the web, for agent-like behavior.
- **Automatic Prompt Engineering:** Use the model itself to generate and refine new prompts—a kind of meta-prompting.



For more complex reasoning tasks, techniques like **Chain of Thought** (CoT) and **Tree of Thoughts** (ToT) can dramatically improve results. Chain of Thought encourages the model to "think aloud" by showing its reasoning step by step:

```
Question: If John has 5 apples and gives 2 to Mary, then buys 3 more and eats 1, how many apples does John have?
Thinking: John starts with 5 apples. He gives 2 to Mary, so now he has 5-2=3 apples. Then he buys 3 more, so now he has 3+3=6 apples. Finally, he eats 1, so he has 6-1=5 apples.
Answer: 5 apples
```

Prompt engineering isn’t just for text. While it’s invaluable for code - writing, translating, explaining, analysis and reasoning all benefit from well-crafted prompts.

So, what makes a good prompt? Here’s what I’ve found works best:

- **Provide examples**—they’re the best way to “teach” the model.
- **Keep it simple and clear.** If it confuses you, it’ll confuse the AI.
- **Use action verbs:** Analyze, Summarize, Generate, List, etc.
- **Be specific about the output.** “Return the answer as a JSON object with keys ‘city’ and ‘population’.”
- **Prefer instructions over constraints:** “Write in a formal tone” is clearer than “Don’t be informal.”
- **Control token length:** “Explain quantum physics in a tweet.”
- **Use variables when you use repetitive prompts with small differences:** “Variables: {city}=Amsterdam 
Prompt: You are a travel guide. Tell me a fact about the city: {city}.”
- **Experiment with styles and formats.** Try different prompt types, output formats (like JSON/XML), and even mix up your examples.
- **Document your attempts.** Prompt engineering is iterative—track what works and what doesn’t.

For more complex tasks, a structured prompt format can be a game-changer. Here’s a sample template you can adapt:

```
<OBJECTIVE_AND_PERSONA>
You are a [insert a persona, such as a "math teacher" or "automotive expert"]. Your task is to...
</OBJECTIVE_AND_PERSONA>

<INSTRUCTIONS>
To complete the task, you need to follow these steps:
1.
2.
...
</INSTRUCTIONS>

------------- Optional Components ------------

<CONSTRAINTS>
Dos and don'ts for the following aspects
1. Dos
2. Don'ts
</CONSTRAINTS>

<CONTEXT>
The provided context
</CONTEXT>

<OUTPUT_FORMAT>
The output format must be
1.
2.
...
</OUTPUT_FORMAT>

<FEW_SHOT_EXAMPLES>
Here we provide some examples:
1. Example #1
    Input:
    Thoughts:
    Output:
...
</FEW_SHOT_EXAMPLES>

<RECAP>
Re-emphasize the key aspects of the prompt, especially the constraints, output format, etc.
</RECAP>
```

Let's see this in action with a simple example:
```
<OBJECTIVE_AND_PERSONA>
You are a travel blogger known for concise, vivid descriptions. Your task is to create engaging city descriptions.
</OBJECTIVE_AND_PERSONA>

<INSTRUCTIONS>
Create a 100-word description that captures the essence of the city I name.
</INSTRUCTIONS>

<OUTPUT_FORMAT>
A single paragraph of exactly 100 words that includes:
1. A striking opening line
2. Mention of one famous landmark
3. Reference to local cuisine
4. A sensory detail (sound, smell, etc.)
</OUTPUT_FORMAT>

<FEW_SHOT_EXAMPLES>
City: Paris
Output: Paris whispers romance in every cobblestone alley and tree-lined boulevard. The Eiffel Tower stands as an iron sentinel, watching over centuries of love stories unfolding beneath its gaze. In quaint cafés, the aroma of fresh croissants mingles with rich espresso, tempting passersby to pause and indulge. Street musicians fill the air with accordion melodies that dance between historic buildings. Whether bathed in golden morning light or twinkling with evening stars, the City of Light captivates with a timeless charm that transforms visitors into lifelong admirers.
</FEW_SHOT_EXAMPLES>

City: Tokyo
```

Prompt engineering is both an art and a science, requiring practice, experimentation, and a good understanding of how LLMs work. As these models continue to evolve, so too will the techniques we use to communicate with them. But mastering these fundamentals will give you a solid foundation for getting the most out of AI tools, whether for personal projects, creative endeavors, or professional applications.

The journey of learning to speak AI's language is just the beginning. If you're interested in diving deeper into this fascinating field, I highly recommend checking out [Lee Boonstra's book](https://drive.google.com/file/d/1AbaBYbEa_EbPelsT40-vj64L-2IwUJHy/view) on Prompt Engineering, which provided the insights for this blog post. Even the [Google's learning center material](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies) around prompt engineering is a good starting point.

What prompt engineering techniques have you found most effective? I'd love to hear about your experiences.
