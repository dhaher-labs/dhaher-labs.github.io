export interface Article {
  id: string
  title: string
  summary: string
  content: string[]
  date: string
  category: 'AI' | 'Quant' | 'DevOps' | 'Tutorial' | 'Research'
  readTime: string
  featured: boolean
  tags: string[]
  aiGenerated: boolean
}

export const articles: Article[] = [
  {
    id: 'building-multi-llm-gateways-with-proxygatellm',
    title: 'Building Multi-LLM Gateways with ProxyGateLLM',
    summary: 'Learn how ProxyGateLLM provides a unified API gateway to 22 LLM providers with over 350 models, enabling seamless provider switching, load balancing, and cost optimization for AI applications.',
    content: [
      'The proliferation of large language model providers — from OpenAI and Anthropic to Cohere, Mistral, and Google — has created a significant challenge for developers: how do you integrate multiple LLM providers without writing and maintaining separate API clients for each one? ProxyGateLLM solves this by acting as a unified API gateway that normalizes requests and responses across 22 different providers.',
      'At its core, ProxyGateLLM implements a proxy architecture that accepts OpenAI-compatible API requests and translates them into the native format expected by each provider. This means your application code only needs to target a single API specification. Switching from GPT-4 to Claude or from Mistral to Gemini becomes a configuration change rather than a code rewrite.',
      'The gateway supports load balancing across providers, allowing you to distribute requests based on cost, latency, or availability. If one provider experiences downtime, ProxyGateLLM can automatically fail over to a backup provider, ensuring your AI-powered features remain operational. This is particularly valuable for production systems where reliability is non-negotiable.',
      'Cost optimization is another key feature. By tracking token usage across providers and models, ProxyGateLLM helps you identify the most cost-effective model for each type of task. A simple classification task might not need GPT-4 — a smaller, cheaper model could achieve equivalent results at a fraction of the cost.',
      'The project is built with Node.js and TypeScript, making it accessible to the large JavaScript/TypeScript developer community. It includes Docker support for easy deployment and a comprehensive configuration system that supports environment variables, JSON config files, and runtime API updates.',
      'For developers building AI applications that need provider flexibility, ProxyGateLLM offers a practical, production-ready solution. With 34 GitHub stars and 15 forks, it represents a growing community of developers who recognize the value of provider-agnostic AI infrastructure.',
    ],
    date: '2025-02-15',
    category: 'AI',
    readTime: '6 min read',
    featured: true,
    tags: ['LLM', 'API Gateway', 'ProxyGateLLM', 'Multi-Provider', 'Open Source'],
    aiGenerated: true,
  },
  {
    id: 'getting-started-with-ai-coding-agents-on-android',
    title: 'Getting Started with AI Coding Agents on Android',
    summary: 'OpenCode-Android brings AI-powered coding assistance natively to Android devices, enabling developers to write, review, and debug code on the go with full LLM integration.',
    content: [
      'Mobile development has traditionally meant consuming content, not creating it. OpenCode-Android challenges this assumption by bringing a full-featured AI coding agent to Android devices. Built as a native Android application, it integrates large language models directly into the mobile coding workflow.',
      'The app provides a code editor with AI-powered autocomplete, code generation, and refactoring suggestions. Unlike web-based alternatives, OpenCode-Android runs natively on Android, providing better performance, offline capabilities, and deeper integration with the Android file system. You can open local project files, edit them with AI assistance, and commit changes — all from your phone or tablet.',
      'One of the most practical features is the conversation-based coding interface. Instead of manually writing every line, you describe what you want in natural language, and the AI agent generates the corresponding code. This is particularly useful for boilerplate code, utility functions, and repetitive patterns that consume development time.',
      'OpenCode-Android supports multiple LLM providers through a configurable backend. You can connect it to OpenAI, Anthropic, or local models running through ProxyGateLLM. This flexibility means you are not locked into a single provider and can choose the model that best fits your task and budget.',
      'The project has gained significant traction with 27 GitHub stars and 2 forks, demonstrating real interest in mobile-first AI development tools. The codebase is written in Kotlin and follows Android best practices, including proper lifecycle management, Material Design components, and efficient background processing for AI requests.',
      'For developers who want to stay productive while away from their desk, OpenCode-Android offers a genuine mobile coding experience powered by AI. It is open source and actively maintained, welcoming contributions from the community.',
    ],
    date: '2025-01-28',
    category: 'Tutorial',
    readTime: '5 min read',
    featured: true,
    tags: ['Android', 'AI Coding', 'OpenCode-Android', 'Mobile Dev', 'LLM'],
    aiGenerated: true,
  },
  {
    id: 'trading-research-dashboards-practical-approach',
    title: 'Trading Research Dashboards: A Practical Approach',
    summary: 'Quant-Nanggroe-AI demonstrates how to build a trading research dashboard using React 19, TypeScript, and real-time market data — focused on research rather than automated trading.',
    content: [
      'Building a trading research dashboard is fundamentally different from building a trading bot. While a trading bot makes automated buy and sell decisions, a research dashboard provides the tools and visualizations that help a human trader make informed decisions. Quant-Nanggroe-AI is built on this philosophy: it assists research, it does not replace judgment.',
      'The dashboard is built with React 19 and TypeScript, leveraging the latest features of the React ecosystem including concurrent rendering and improved server components. The UI is styled with Tailwind CSS, providing a clean, responsive interface that works across desktop and tablet devices — essential for traders who monitor markets across multiple screens.',
      'Key features include real-time market data visualization with interactive charts, customizable watchlists, and technical indicator overlays. The dashboard supports multiple asset classes and markets, allowing traders to monitor equities, forex, and cryptocurrencies from a single interface. Data is fetched through configurable API endpoints, making it provider-agnostic.',
      'The research component includes a screening engine (powered by Misi-Screener) that filters securities based on user-defined criteria. Instead of manually scanning hundreds of stocks, traders can define their screening parameters and let the system surface relevant candidates. This is particularly valuable for momentum and mean-reversion strategies.',
      'Risk management tools are integrated directly into the dashboard. Position sizing calculators, drawdown tracking, and correlation analysis help traders understand their portfolio risk exposure. These are not automated risk controls — they are research tools that present information clearly so the trader can make informed decisions.',
      'Quant-Nanggroe-AI is open source and designed to be self-hosted. This is intentional: serious traders often prefer to run their research tools locally to avoid sending their strategies and positions to third-party servers. The project is actively developed and welcomes contributions from the quantitative finance community.',
    ],
    date: '2025-02-08',
    category: 'Quant',
    readTime: '7 min read',
    featured: true,
    tags: ['Trading', 'Dashboard', 'React 19', 'Quantitative', 'Research'],
    aiGenerated: true,
  },
  {
    id: 'memory-systems-for-ai-agents-mnemosyne',
    title: 'Memory Systems for AI Agents: The Mnemosyne Approach',
    summary: 'Mnemosyne provides a structured memory and context management system for AI agents, enabling persistent conversations, knowledge retention, and cross-session context awareness.',
    content: [
      'One of the fundamental limitations of current AI agents is their lack of persistent memory. Every new conversation starts from scratch, forcing users to repeat context and preferences. Mnemosyne addresses this by providing a structured memory system that allows AI agents to store, retrieve, and reason over accumulated knowledge.',
      'The system implements a layered memory architecture inspired by human cognitive models. Short-term memory holds the current conversation context, working memory maintains task-relevant information, and long-term memory stores persistent knowledge and user preferences. Each layer has different retention policies and retrieval mechanisms.',
      'Mnemosyne uses semantic embeddings to organize and retrieve memories. When an agent encounters new information, it generates an embedding vector and stores it alongside metadata like timestamps, source, and relevance scores. When the agent needs to recall information, it performs a similarity search against the embedding store, retrieving the most relevant memories for the current context.',
      'The project also implements a forgetting mechanism — a concept often overlooked in agent memory systems. Not all information is equally important, and retaining everything leads to noise and degraded retrieval quality. Mnemosyne applies decay functions based on access frequency and relevance, gradually deprioritizing stale or rarely-used memories.',
      'Built with Python, Mnemosyne integrates with popular LLM frameworks and can be used as a standalone memory service. The API is simple: store a memory, query relevant memories, and manage memory lifecycle. This simplicity makes it easy to integrate into existing agent architectures without major refactoring.',
      'For developers building AI agents that need to maintain context across sessions, Mnemosyne provides a practical, well-structured solution. It is open source, documented, and designed to be composable with other agent tools and frameworks.',
    ],
    date: '2025-01-20',
    category: 'Research',
    readTime: '8 min read',
    featured: false,
    tags: ['AI Memory', 'Context Management', 'Mnemosyne', 'Embeddings', 'Python'],
    aiGenerated: true,
  },
  {
    id: 'multi-agent-orchestration-patterns',
    title: 'Multi-Agent Orchestration Patterns',
    summary: 'AI-MultiColony-Ecosystem explores practical patterns for orchestrating multiple AI agents, from sequential pipelines to collaborative swarms, with real-world implementation examples.',
    content: [
      'Single-agent AI systems are limited by the breadth and depth of any one model. Multi-agent architectures address this by decomposing complex tasks into specialized roles, with each agent optimized for its specific function. AI-MultiColony-Ecosystem provides a framework for implementing these patterns in practice.',
      'The framework supports several orchestration patterns. The simplest is the sequential pipeline, where agents are arranged in a chain — each agent processes the output of the previous one. This is effective for tasks with clear stages, such as research (agent 1) followed by analysis (agent 2) followed by reporting (agent 3).',
      'More complex is the collaborative swarm pattern, where multiple agents work on different aspects of a task simultaneously and then merge their outputs. This is useful for tasks that benefit from diverse perspectives, such as brainstorming, multi-criteria evaluation, or parallel code review.',
      'AI-MultiColony-Ecosystem also implements a supervisor pattern, where a coordinator agent manages a pool of worker agents. The supervisor breaks down the task, assigns subtasks to appropriate workers, monitors progress, and synthesizes results. This pattern is particularly effective for large, open-ended tasks that require dynamic task allocation.',
      'The framework is built with Python and uses a message-passing architecture for inter-agent communication. Agents communicate through a shared message bus, with support for both synchronous and asynchronous patterns. The system includes built-in tools for monitoring agent activity, debugging communication flows, and visualizing orchestration graphs.',
      'While multi-agent systems are still an active area of research, AI-MultiColony-Ecosystem provides practical, tested patterns that developers can use today. The project includes example implementations for common use cases, documentation for each pattern, and a testing framework for validating agent behavior.',
    ],
    date: '2025-02-01',
    category: 'AI',
    readTime: '7 min read',
    featured: false,
    tags: ['Multi-Agent', 'Orchestration', 'AI-MultiColony-Ecosystem', 'Python', 'Swarm Intelligence'],
    aiGenerated: true,
  },
  {
    id: 'iot-infrastructure-for-industrial-monitoring',
    title: 'IoT Infrastructure for Industrial Monitoring',
    summary: 'Nanggroe-IoT provides a practical framework for building industrial IoT monitoring systems, from sensor data collection to real-time dashboards and alerting pipelines.',
    content: [
      'Industrial environments generate enormous amounts of sensor data — temperature, pressure, vibration, humidity, and more. Nanggroe-IoT provides a framework for collecting, processing, and visualizing this data in real time, enabling predictive maintenance and operational monitoring.',
      'The architecture follows an edge-to-cloud pattern. Sensor data is first collected at the edge by lightweight Python agents running on embedded devices or industrial PCs. These agents perform initial data validation, normalization, and local buffering before transmitting data to the central processing pipeline.',
      'Data transmission uses MQTT, a lightweight messaging protocol designed for IoT environments with limited bandwidth and intermittent connectivity. Nanggroe-IoT includes an MQTT broker configuration, message schema definitions, and automatic reconnection handling for unreliable network conditions common in industrial settings.',
      'The central processing pipeline handles data aggregation, anomaly detection, and storage. Time-series data is stored in an efficient format optimized for the query patterns common in monitoring applications — recent data points are queried frequently, while historical data is accessed less often. Anomaly detection uses configurable threshold rules and optional statistical models.',
      'Visualization is handled through a web-based dashboard that displays real-time sensor readings, historical trends, and alert status. The dashboard is designed for the operators who monitor equipment daily, with clear visual indicators for normal, warning, and critical states. Alert notifications can be routed through multiple channels including email, SMS, and messaging platforms.',
      'Nanggroe-IoT is designed with practicality in mind. It does not require expensive hardware or proprietary protocols. The system works with common industrial sensors, standard networking equipment, and open-source software. This makes it accessible to small and medium industrial operations that cannot justify enterprise IoT platform costs.',
    ],
    date: '2025-01-15',
    category: 'DevOps',
    readTime: '6 min read',
    featured: false,
    tags: ['IoT', 'Industrial', 'Monitoring', 'Nanggroe-IoT', 'MQTT', 'Python'],
    aiGenerated: true,
  },
  {
    id: 'autonomous-workflow-design-patterns',
    title: 'Autonomous Workflow Design Patterns',
    summary: 'K.A.L.E.N demonstrates practical design patterns for building autonomous workflow orchestration systems, from DAG-based task scheduling to intelligent retry and recovery strategies.',
    content: [
      'Autonomous workflows are sequences of tasks that execute with minimal human intervention, adapting to conditions and recovering from failures automatically. K.A.L.E.N (Kernel for Autonomous Logical Execution Networks) provides a framework for defining, executing, and monitoring such workflows.',
      'The core abstraction in K.A.L.E.N is the workflow graph — a directed acyclic graph (DAG) where nodes represent tasks and edges represent dependencies. Tasks execute only when all their upstream dependencies have completed successfully. This DAG-based approach naturally handles parallelism: independent tasks run concurrently while dependent tasks wait for their prerequisites.',
      'K.A.L.E.N implements several execution strategies. The simplest is the static DAG, where the workflow structure is defined upfront and does not change during execution. More advanced is the dynamic DAG, where the workflow structure can be modified at runtime based on task outputs — for example, a data validation task might add additional processing steps if it detects anomalies.',
      'Error handling is a critical concern in autonomous workflows. K.A.L.E.N provides configurable retry policies with exponential backoff, circuit breakers for external service calls, and dead letter queues for tasks that cannot be completed. When a task fails, the system can either retry it, skip it with a default value, or fail the entire workflow — depending on the task criticality configuration.',
      'The framework is built with TypeScript and Node.js, making it suitable for integration with modern web and API services. Workflows are defined using a declarative YAML or JSON syntax, with optional TypeScript functions for custom logic. This separation of workflow definition from implementation logic makes workflows easy to read, modify, and version control.',
      'Monitoring and observability are built into the framework. Every workflow execution generates structured logs, metrics, and trace data. A web dashboard shows real-time workflow status, execution history, and performance analytics. Alerting rules can be configured for stuck workflows, frequent failures, or performance degradation.',
    ],
    date: '2025-02-10',
    category: 'DevOps',
    readTime: '7 min read',
    featured: false,
    tags: ['Workflows', 'Autonomous', 'K.A.L.E.N', 'DAG', 'TypeScript', 'Orchestration'],
    aiGenerated: true,
  },
  {
    id: 'open-source-ai-tools-for-developers-2025',
    title: 'Open Source AI Tools for Developers in 2025',
    summary: 'A curated overview of the most practical open-source AI tools available to developers in 2025, covering LLM gateways, coding agents, memory systems, and workflow orchestration.',
    content: [
      'The open-source AI tooling ecosystem has matured significantly in 2025. Developers no longer need to build everything from scratch or rely solely on proprietary APIs. A growing collection of well-maintained, open-source tools now covers the full AI development lifecycle — from model access and agent memory to workflow orchestration and monitoring.',
      'LLM access has been democratized by gateway projects that provide unified APIs across multiple providers. Instead of writing separate integration code for each LLM provider, developers can use a single API endpoint that routes to their preferred provider. This approach also enables cost optimization through provider switching and fallback strategies. ProxyGateLLM is one such gateway, supporting 22 providers and over 350 models.',
      'AI coding agents have moved beyond simple code completion. Modern agents like OpenCode-Android demonstrate that AI-assisted development can happen on any device, not just desktop computers. These agents understand project context, generate multi-file changes, and can explain their reasoning — transforming how developers interact with code.',
      'Memory systems for AI agents are addressing the context window limitation that has constrained long-running agent tasks. Projects like Mnemosyne implement structured memory with semantic retrieval, allowing agents to maintain context across sessions without consuming their entire context window. This is a foundational capability for building agents that improve over time.',
      'Multi-agent orchestration frameworks are enabling complex AI systems where specialized agents collaborate on tasks. AI-MultiColony-Ecosystem provides patterns for sequential pipelines, parallel swarms, and supervised agent pools. These patterns are increasingly relevant as AI applications grow beyond single-model interactions.',
      'The common thread across these tools is practicality. They are not research prototypes — they are production-ready systems with documentation, tests, and active communities. For developers looking to incorporate AI into their workflows without vendor lock-in, the open-source ecosystem in 2025 offers genuine, viable alternatives to proprietary solutions.',
    ],
    date: '2025-02-20',
    category: 'Research',
    readTime: '6 min read',
    featured: true,
    tags: ['Open Source', 'AI Tools', '2025', 'Developers', 'Overview'],
    aiGenerated: true,
  },
]

export const categories = ['All', 'AI', 'Quant', 'DevOps', 'Tutorial', 'Research'] as const
export type Category = typeof categories[number]
