// All editable site content lives here.
// Update this file to change text on the site — no component changes needed.

export const profile = {
  name: "Mounica",
  fullName: "Mounica Uddagiri",
  greeting: "Hi, I'm Mounica.",
  headline: "I build the interfaces where people and AI work together.",
  github: "https://github.com/mounicauddagiri",
  intro:
    "I'm a full-stack developer who loves creating clean, scalable and responsive web applications. " +
    "I aim to provide solutions that offer both exceptional performance and delightful user experience.",
  about:
    "Passionate developer with expertise in building scalable and responsive web applications. Expertise in both frontend and backend servers.",
};

export const skills = {
  frontend: ["React", "Vue", "TypeScript", "TailwindCSS", "Angular", "MaterialUI", "PrimeNg"],
  backend: ["Node.js", "Java", "MySQL", "MongoDB", "Python", "AWS"],
  ai: ["LLM APIs", "Prompt engineering", "RAG", "Vector databases", "AI agents", "MCP"],
};

export const education = [
  {
    degree: "M.S. in Computer Science",
    school: "University of Maryland Baltimore County",
    years: "2021-23",
    coursework: "Data Structures, Distributed Systems, Cloud Computing, Computer Architecture",
  },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Barclays",
    period: "Apr 2025 - Present",
    description: "Design and develop CCAR GMS regulatory reporting system for the stock market data",
  },
  {
    role: "Software Engineer",
    company: "MyStudio",
    period: "Jan 2024 - Jan 2025",
    description: "Develop and maintain B2B membership management software for fitness studios.",
  },
  {
    role: "Software Engineer Intern",
    company: "RocketMortgage",
    period: "May 2022 - Dec 2022",
    description: "Assisted in building frontend components for the loan rate pricing models",
  },
  {
    role: "Software Engineer",
    company: "Infor",
    period: "June 2018 - Aug 2021",
    description: "Developed and maintained the Web page widgets for the Infor Home Pages.",
  },
];

export const projects = [
  {
    title: "MarketRAG",
    description:
      "A local RAG system that answers questions about SEC 10-K and 10-Q filings with cited sources. Hybrid search, a query router and table-aware chunking raised retrieval hit@5 from 0.60 to 0.93 on a hard evaluation set.",
    tech: ["Python", "FastAPI", "Ollama", "Llama 3.1", "pgvector", "BM25", "RAG evals"],
    link: "", // add the GitHub URL once it's pushed
  },
  {
    title: "Finance Application (MERN)",
    description: "Built a finance application with dashboard and predictions page using linear regression.",
    tech: ["MongoDB", "Node.js", "React.js", "Express.js", "ML"],
    link: "https://github.com/mounicauddagiri/FinanceApp",
  },
  {
    title: "Distributed File Storage System",
    description: "Designed a secure, high-performance distributed file system supporting all CRUD operations.",
    tech: ["Java", "OOPS", "AES Encryption", "RMI", "multithreading"],
    link: "https://github.com/mounicauddagiri/Secure-Distributed-File-System-using-Java",
  },
  {
    title: "Banking Service",
    description: "A realtime backend banking transaction service.",
    tech: ["Java", "Docker", "OpenAPI", "REST"],
    link: "https://github.com/mounicauddagiri/Banking_Service",
  },
  {
    title: "Expense Tracker",
    description: "A simple expense tracker tool to add, modify and delete transactions.",
    tech: ["React.js", "CSS", "JavaScript"],
    link: "https://github.com/mounicauddagiri/expense-tracker",
  },
];

// Heading and point of view for the AI section.
export const aiIntro = {
  title: "AI is only as good as its interface",
  body:
    "A model can be brilliant and still fail the person using it. Responses that stream, answers that show their sources, agent steps you can follow, and honest messages when the model doesn't know: that's frontend work, and it's where AI earns trust. I build the whole pipeline, with the interface as the part I care about most.",
};

// The AI section on the site. Shown in this order, as a pipeline.
// Set highlight: true on the step you want to stand out.
// Edit the tools to match exactly what you've used.
export const aiSkills = [
  {
    title: "LLMs and prompting",
    description:
      "Wiring language models into real products: prompts that hold up, structured outputs, and checks that catch bad answers.",
    tools: ["OpenAI API", "Claude API", "Prompt engineering", "Structured outputs", "Evals"],
  },
  {
    title: "RAG and vector search",
    description:
      "Giving models the right context by chunking and embedding documents, then retrieving what matters for each question.",
    tools: ["LangChain", "LlamaIndex", "Embeddings", "Pinecone", "Chroma", "pgvector"],
  },
  {
    title: "AI agents",
    description:
      "Agents that plan, call tools and APIs, and finish multi-step tasks, connected to real systems through MCP.",
    tools: ["Tool calling", "MCP", "LangGraph", "Multi-step workflows"],
  },
  {
    title: "AI interfaces",
    description:
      "Frontends that make AI usable: streaming responses, clickable citations, visible agent steps, and clear states for loading, errors and \"I don't know\".",
    tools: ["React", "Angular", "Streaming UI", "Citations", "Agent step views"],
    highlight: true,
  },
];
