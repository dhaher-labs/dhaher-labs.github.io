// Article Template System for generating structured articles from a topic
// Used by the article generator component to create realistic articles

export type ArticleCategory =
  | 'Technology'
  | 'Quant/Trading'
  | 'Development'
  | 'Security'
  | 'IoT'
  | 'Research'

export interface GeneratedArticle {
  id: string
  title: string
  summary: string
  content: string[]
  date: string
  category: ArticleCategory
  readTime: string
  tags: string[]
  aiGenerated: boolean
  slug: string
  jsonLd: Record<string, unknown>
}

const CATEGORY_CONFIG: Record<ArticleCategory, {
  color: string
  iconKeyword: string
  tagPool: string[]
  introTemplates: string[]
  keyPointTemplates: string[]
  analysisTemplates: string[]
  conclusionTemplates: string[]
}> = {
  Technology: {
    color: '#D9A441',
    iconKeyword: 'tech',
    tagPool: ['AI', 'Machine Learning', 'Cloud', 'API', 'Automation', 'LLM', 'Innovation', 'Scalability', 'Open Source', 'Infrastructure'],
    introTemplates: [
      'The landscape of {topic} has evolved dramatically in recent years, driven by advances in computing power, data availability, and algorithmic innovation. What was once a niche area of research is now becoming a critical component of modern technology infrastructure.',
      'As organizations increasingly rely on digital solutions, {topic} has emerged as a fundamental pillar of the technology stack. The convergence of cloud computing, artificial intelligence, and distributed systems has created new opportunities and challenges in this space.',
      'The rapid pace of innovation in {topic} is reshaping how businesses operate and how developers build software. From startups to enterprises, the implications of these advancements are far-reaching and transformative.',
    ],
    keyPointTemplates: [
      'One of the most significant developments in {topic} is the shift toward modular, composable architectures. Rather than building monolithic systems, organizations are adopting microservice-based approaches that allow individual components to be developed, deployed, and scaled independently. This modularity enables faster iteration cycles and reduces the risk of system-wide failures.',
      'Security and privacy considerations are becoming central to {topic}. With increasing regulatory requirements and growing awareness of data protection, developers must build security into their systems from the ground up rather than treating it as an afterthought. Zero-trust architectures and encryption-by-default are becoming standard practice.',
      'The integration of AI and machine learning into {topic} workflows is accelerating. Automated monitoring, predictive analytics, and intelligent routing are no longer experimental features — they are expected capabilities that reduce operational overhead and improve system reliability.',
      'Open-source tools and frameworks continue to democratize access to {topic}. Projects that were once limited to well-funded research labs are now available to individual developers and small teams, lowering the barrier to entry and fostering innovation across the ecosystem.',
      'Scalability remains a critical concern in {topic}. As data volumes and user demands grow exponentially, systems must be designed to handle load gracefully. Horizontal scaling, caching strategies, and efficient data structures are essential tools for managing growth without sacrificing performance.',
    ],
    analysisTemplates: [
      'The current state of {topic} reflects a broader trend in the technology industry: the move from specialized, siloed tools toward integrated, platform-based solutions. Organizations that adopt these integrated approaches gain significant advantages in terms of operational efficiency and developer productivity. However, this consolidation also raises concerns about vendor lock-in and the loss of flexibility that comes with tightly coupled systems.',
      'Looking at the data, adoption of modern {topic} practices has grown significantly over the past two years. Survey data indicates that over 60% of engineering teams have incorporated at least one new tool or framework in this domain, with cloud-native approaches leading the way. The trend is clear: teams that invest in modern tooling see measurable improvements in deployment frequency, system reliability, and time-to-market.',
    ],
    conclusionTemplates: [
      'The future of {topic} lies at the intersection of automation, intelligence, and accessibility. As tools become more powerful and easier to use, the gap between what is possible and what is practical will continue to narrow. Developers and organizations that stay current with these trends will be well-positioned to build systems that are not only functional but resilient, scalable, and secure. The key is to approach {topic} with a mindset of continuous learning and pragmatic adoption — choosing the right tools for the right problems, and always keeping the end user in mind.',
    ],
  },
  'Quant/Trading': {
    color: '#00D1C7',
    iconKeyword: 'quant',
    tagPool: ['Trading', 'Quantitative Analysis', 'Risk Management', 'Algorithmic', 'Market Data', 'Backtesting', 'Portfolio', 'Derivatives', 'Statistical', 'Alpha'],
    introTemplates: [
      'In the world of quantitative finance, {topic} represents both an opportunity and a challenge. The ability to extract signals from noise — to find patterns where others see randomness — is what separates successful quantitative strategies from the rest.',
      'The intersection of technology and finance has made {topic} more accessible than ever before. Open-source tools, affordable computing resources, and real-time data feeds have democratized capabilities that were once the exclusive domain of large financial institutions.',
      'Understanding {topic} requires a blend of mathematical rigor, programming skill, and market intuition. While the theoretical foundations are well-established, practical implementation introduces complexities that textbooks rarely address.',
    ],
    keyPointTemplates: [
      'Effective risk management is the foundation of any approach to {topic}. Position sizing, stop-loss mechanisms, and portfolio-level risk controls are not optional — they are essential for long-term viability. The most sophisticated strategy is worthless if a single adverse event can wipe out months of gains.',
      'Backtesting remains the primary method for validating {topic} strategies, but it comes with significant caveats. Overfitting, look-ahead bias, and survivorship bias can produce misleadingly optimistic results. Robust backtesting requires out-of-sample validation, walk-forward analysis, and a healthy skepticism toward impressive-looking equity curves.',
      'The role of machine learning in {topic} is growing, but it should be viewed as a tool rather than a silver bullet. Feature engineering, domain knowledge, and careful model selection are more important than choosing the most complex algorithm. Simple models with well-understood behavior often outperform black-box approaches in production environments.',
      'Market microstructure and execution quality have a direct impact on {topic} performance. Transaction costs, slippage, and latency can erode theoretical returns significantly. Strategies that look profitable on paper may become unviable once real-world execution costs are factored in.',
      'Regulatory considerations are increasingly important in {topic}. Compliance requirements, reporting obligations, and market manipulation safeguards must be built into the strategy development process from the beginning, not bolted on as an afterthought.',
    ],
    analysisTemplates: [
      'The quantitative landscape for {topic} is undergoing a structural shift. Traditional factor-based approaches are facing crowding issues — when too many participants pursue the same signal, the alpha decays. This has led to a search for alternative data sources, higher-frequency signals, and more sophisticated combination strategies. The firms that succeed in this environment are those that combine deep domain expertise with cutting-edge technology infrastructure.',
      'Empirical analysis of {topic} strategies reveals an interesting pattern: the strategies that perform best over long horizons tend to have the most uncomfortable drawdowns. This creates a behavioral challenge for practitioners — the discipline to stick with a strategy during periods of underperformance is often the hardest part of quantitative trading. Proper expectation-setting and robust risk frameworks help bridge the gap between theoretical and realized returns.',
    ],
    conclusionTemplates: [
      'The discipline of {topic} continues to evolve as technology advances and markets change. The most successful practitioners combine mathematical precision with practical engineering, always aware that markets are adaptive systems where yesterday\'s edge can become tomorrow\'s liability. For those willing to invest in the rigorous development and testing of their ideas, {topic} offers a structured framework for navigating financial markets with discipline and data-driven confidence. The key principles remain constant: manage risk first, validate thoroughly, and never stop questioning your assumptions.',
    ],
  },
  Development: {
    color: '#34D399',
    iconKeyword: 'dev',
    tagPool: ['TypeScript', 'Python', 'Rust', 'Next.js', 'API Design', 'DevOps', 'CI/CD', 'Testing', 'Architecture', 'Performance'],
    introTemplates: [
      'Software development is constantly evolving, and {topic} sits at the forefront of this evolution. As codebases grow larger and teams become more distributed, the tools and practices we use to build software must adapt accordingly.',
      'The developer experience around {topic} has improved dramatically in recent years. Better tooling, richer ecosystems, and more accessible documentation have lowered the barrier to entry while raising the ceiling of what is possible.',
      'Building robust software requires more than just writing code — it requires understanding {topic} at a deep level. From design patterns to deployment strategies, the decisions made early in a project have lasting consequences for maintainability, performance, and team productivity.',
    ],
    keyPointTemplates: [
      'Type safety and compile-time checks are increasingly important in {topic}. Languages like TypeScript and Rust have demonstrated that catching errors before runtime not only reduces bugs but also improves developer confidence and refactoring speed. The upfront cost of stricter type systems pays dividends throughout the project lifecycle.',
      'The shift toward API-first development in {topic} is changing how teams collaborate. By defining interfaces and contracts before implementation, frontend and backend teams can work in parallel, reducing bottlenecks and improving time-to-delivery. OpenAPI specifications, GraphQL schemas, and protocol buffer definitions serve as living documentation that stays in sync with the codebase.',
      'Testing strategies for {topic} have matured beyond simple unit tests. Property-based testing, mutation testing, and contract testing provide deeper coverage and catch classes of bugs that traditional approaches miss. The investment in a comprehensive testing strategy is justified by the reduction in production incidents and the confidence it provides during refactoring.',
      'Developer productivity in {topic} is heavily influenced by toolchain quality. Fast build times, intelligent code completion, and automated code formatting reduce friction and allow developers to focus on solving problems rather than fighting their tools. Modern development environments that integrate these capabilities see measurable improvements in output quality.',
      'Observability and debugging tools for {topic} have become essential for maintaining production systems. Structured logging, distributed tracing, and real-time metrics provide the visibility needed to diagnose issues quickly and understand system behavior under load. The cost of adding observability early is far lower than the cost of debugging without it.',
    ],
    analysisTemplates: [
      'The development ecosystem around {topic} is experiencing a convergence of paradigms. Server-side rendering, edge computing, and progressive enhancement are no longer competing approaches — they are complementary tools in a well-rounded developer\'s toolkit. The most effective teams are those that can choose the right approach for each specific use case, rather than forcing every problem into a single architectural pattern.',
      'Adoption metrics for {topic} tools and frameworks show a clear trend toward developer-friendly abstractions that don\'t sacrifice performance. The "easy things should be easy, hard things should be possible" philosophy is winning out over approaches that optimize for one extreme or the other. This balance is reflected in the growing popularity of frameworks that provide sensible defaults while allowing escape hatches for advanced customization.',
    ],
    conclusionTemplates: [
      'The art and science of {topic} will continue to evolve as new tools, languages, and methodologies emerge. The developers who thrive will be those who embrace continuous learning while maintaining a pragmatic focus on solving real problems. The fundamentals — clean code, good architecture, thorough testing, and thoughtful deployment — remain constant even as the specific tools change. Invest in understanding the principles behind {topic}, and you will be equipped to adapt to whatever comes next.',
    ],
  },
  Security: {
    color: '#FB7185',
    iconKeyword: 'security',
    tagPool: ['Cybersecurity', 'Encryption', 'Zero Trust', 'Vulnerability', 'Penetration Testing', 'Compliance', 'Network Security', 'Authentication', 'Threat Detection', 'Incident Response'],
    introTemplates: [
      'In an era of increasing cyber threats, {topic} has become a critical concern for organizations of all sizes. The cost of security breaches continues to rise, making proactive security measures not just a best practice but a business necessity.',
      'The threat landscape around {topic} is evolving faster than ever. Nation-state actors, organized crime groups, and opportunistic attackers are all leveraging increasingly sophisticated techniques, requiring defenders to continuously adapt their strategies and tools.',
      'Security is no longer an afterthought in {topic} — it is a fundamental design requirement. The shift-left security movement has demonstrated that integrating security considerations early in the development lifecycle is both more effective and more cost-efficient than trying to bolt security on after the fact.',
    ],
    keyPointTemplates: [
      'Zero-trust architecture is reshaping how organizations approach {topic}. The traditional perimeter-based security model assumes that everything inside the network can be trusted — an assumption that has been repeatedly violated. Zero-trust principles require verification of every request, regardless of its origin, significantly reducing the attack surface.',
      'Supply chain security has emerged as a critical dimension of {topic}. The increasing reliance on third-party packages and open-source dependencies creates vectors for attack that are difficult to detect and mitigate. Software bills of materials (SBOMs), dependency scanning, and provenance verification are becoming essential practices.',
      'Identity and access management is foundational to {topic}. Multi-factor authentication, role-based access control, and least-privilege principles are not new concepts, but their implementation continues to evolve. Modern identity systems must balance security with usability — overly restrictive controls often lead to workarounds that weaken security.',
      'Automated security testing for {topic} is no longer optional. Static analysis, dynamic analysis, and fuzz testing should be integrated into CI/CD pipelines to catch vulnerabilities before they reach production. The speed of modern development requires security validation to keep pace with deployment velocity.',
      'Incident response planning for {topic} must be practiced, not just documented. Tabletop exercises, red team assessments, and post-incident reviews build the muscle memory needed to respond effectively when a real incident occurs. Organizations that invest in preparedness recover faster and minimize damage.',
    ],
    analysisTemplates: [
      'The security challenges surrounding {topic} reflect a fundamental tension: the need for speed versus the need for safety. Organizations that treat security as a blocker to innovation will find their developers circumventing security controls, while those that ignore security will face increasingly severe consequences. The solution lies in making security easy and automatic — embedding it into tools, workflows, and culture so that the secure path is also the path of least resistance.',
      'Data from recent security incidents related to {topic} reveals a consistent pattern: the majority of breaches exploit known vulnerabilities rather than novel attack techniques. This suggests that the most impactful investment is not in cutting-edge threat detection, but in fundamental security hygiene — patching, configuration management, and access control. Organizations that master the basics are significantly more resilient than those that chase the latest security trends without solid fundamentals.',
    ],
    conclusionTemplates: [
      'Securing {topic} is an ongoing process, not a destination. As systems evolve and threats adapt, security practices must evolve as well. The most resilient organizations are those that build security into their culture, empower their teams with the right tools and training, and maintain a posture of continuous improvement. In the domain of {topic}, as in all areas of cybersecurity, the cost of prevention is always less than the cost of remediation. Invest wisely, stay vigilant, and never assume that today\'s security measures will be sufficient for tomorrow\'s threats.',
    ],
  },
  IoT: {
    color: '#A78BFA',
    iconKeyword: 'iot',
    tagPool: ['IoT', 'Sensors', 'Edge Computing', 'MQTT', 'Embedded', 'Industrial IoT', 'Smart Devices', 'Telemetry', 'Firmware', 'Real-time'],
    introTemplates: [
      'The Internet of Things continues to expand, and {topic} represents a critical area of innovation in this space. With billions of connected devices generating massive streams of data, the challenges and opportunities are equally enormous.',
      'Building reliable IoT systems requires careful attention to {topic}. The constraints of embedded hardware — limited memory, processing power, and network bandwidth — demand solutions that are both efficient and robust. What works in a data center does not always translate to the edge.',
      'The convergence of physical and digital systems through {topic} is creating new categories of applications that were previously impossible. From industrial monitoring to smart agriculture, the ability to sense, process, and act on real-world data in real time is transforming industries.',
    ],
    keyPointTemplates: [
      'Edge computing is fundamentally changing the architecture of {topic}. By processing data closer to its source, edge systems reduce latency, conserve bandwidth, and improve resilience. Critical decisions can be made locally without depending on cloud connectivity — essential for applications where seconds matter.',
      'Protocol selection is a foundational decision in {topic}. MQTT, CoAP, and AMQP each have distinct strengths and trade-offs. MQTT\'s lightweight publish-subscribe model is well-suited for constrained devices and unreliable networks, while CoAP\'s RESTful approach provides familiar semantics for web developers. The right choice depends on the specific requirements of the deployment.',
      'Power management in {topic} is a multi-dimensional challenge. Battery-powered devices must balance sampling frequency, transmission intervals, and processing workload against energy constraints. Sleep modes, adaptive sampling, and energy harvesting techniques extend operational lifetime, but each introduces design trade-offs.',
      'Data quality and sensor calibration are often underestimated in {topic} implementations. Sensor drift, environmental interference, and manufacturing variations can produce data that looks plausible but is fundamentally incorrect. Automated calibration routines, cross-sensor validation, and anomaly detection are essential for maintaining data integrity over time.',
      'Security in {topic} deployments presents unique challenges. Many IoT devices cannot be easily patched, operate in physically accessible locations, and have limited computational resources for cryptographic operations. Security-by-design, secure boot mechanisms, and hardware-backed key storage are essential for building trustworthy IoT systems.',
    ],
    analysisTemplates: [
      'The IoT ecosystem around {topic} is maturing from experimental pilots to production deployments. This transition brings new requirements for reliability, scalability, and maintainability that early prototypes often ignore. Organizations that have invested in robust architectures — with proper error handling, graceful degradation, and remote management capabilities — are seeing significantly better outcomes than those that treat IoT as a simple sensor-to-cloud pipeline.',
      'Industrial adoption of {topic} is being driven by measurable ROI. Predictive maintenance alone can reduce downtime by 30-50% and maintenance costs by 20-40%, according to industry analyses. However, achieving these gains requires more than deploying sensors — it requires integrating IoT data with existing operational systems, building analytical models that produce actionable insights, and creating workflows that translate insights into actions.',
    ],
    conclusionTemplates: [
      'The future of {topic} in the IoT space is one of increasing sophistication and integration. As edge devices become more capable and connectivity becomes more ubiquitous, the line between IoT systems and traditional IT systems will continue to blur. The engineers who succeed in this space will be those who understand both the physical constraints of embedded systems and the architectural patterns of modern distributed computing. Start simple, validate with real hardware, and iterate based on field data — the most reliable IoT systems are built incrementally, with each iteration informed by real-world experience.',
    ],
  },
  Research: {
    color: '#F59E0B',
    iconKeyword: 'research',
    tagPool: ['Research', 'Academic', 'Data Analysis', 'Methodology', 'Peer Review', 'Experimentation', 'Hypothesis', 'Statistical', 'Publication', 'Innovation'],
    introTemplates: [
      'Research in {topic} is advancing rapidly, with new findings and methodologies emerging at an unprecedented pace. Understanding the current state of the art is essential for both practitioners and researchers seeking to build on existing work.',
      'The academic and industrial research landscape around {topic} has shifted significantly in recent years. Cross-disciplinary collaboration, open science practices, and reproducibility initiatives are reshaping how research is conducted and validated.',
      'At the intersection of theory and practice, {topic} presents unique challenges that require both rigorous methodology and creative problem-solving. The gap between what is possible in controlled settings and what works in real-world conditions remains a central concern.',
    ],
    keyPointTemplates: [
      'Reproducibility in {topic} research has become a major focus of the scientific community. The replication crisis has highlighted the importance of transparent methodologies, open data, and pre-registration of studies. Journals and funding agencies are increasingly requiring these practices, driving a cultural shift toward more rigorous research standards.',
      'Cross-disciplinary approaches to {topic} are producing some of the most impactful results. By combining insights from computer science, statistics, domain expertise, and design thinking, researchers are solving problems that single-discipline approaches cannot address. The most innovative work often happens at these disciplinary boundaries.',
      'The role of computational methods in {topic} research continues to grow. Simulation, numerical optimization, and machine learning are no longer supplementary tools — they are central to the research process itself. Researchers who combine deep domain knowledge with strong computational skills have a significant advantage in producing impactful work.',
      'Open science practices in {topic} are gaining momentum. Preprint servers, open-access journals, and shared computational infrastructure are democratizing access to research outputs. This openness accelerates the pace of discovery by allowing more researchers to build on existing work without barriers.',
      'Ethical considerations in {topic} research are becoming increasingly important. Issues of bias, fairness, privacy, and societal impact must be addressed proactively. Responsible research practices require not only technical competence but also awareness of the broader implications of research outcomes.',
    ],
    analysisTemplates: [
      'The trajectory of {topic} research suggests we are entering a phase of consolidation and refinement. After a period of rapid expansion and exploration, the field is beginning to converge on core principles and methodologies that have stood up to rigorous testing. This maturation is healthy — it provides a stable foundation for the next wave of innovation while filtering out approaches that do not survive careful scrutiny.',
      'An analysis of publication trends in {topic} reveals both encouraging and concerning patterns. On the positive side, the volume of high-quality research is increasing, and collaborative networks are expanding. However, the pressure to publish — often measured by quantity rather than impact — continues to incentivize incremental work over ambitious, potentially transformative research. Addressing this systemic issue requires changes in how research is evaluated, funded, and rewarded.',
    ],
    conclusionTemplates: [
      'Research in {topic} stands at an inflection point. The tools and methodologies available today are more powerful than ever, but the challenges we face are also more complex. The researchers who will make the most significant contributions are those who combine technical excellence with intellectual honesty, collaborative spirit, and a commitment to producing work that stands the test of time. As the field continues to evolve, the principles of rigorous methodology, transparent communication, and ethical responsibility will remain the bedrock of meaningful research in {topic}.',
    ],
  },
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function fillTemplate(template: string, topic: string): string {
  return template.replace(/\{topic\}/g, topic)
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function estimateReadTime(content: string[]): string {
  const totalWords = content.join(' ').split(/\s+/).length
  const minutes = Math.max(3, Math.ceil(totalWords / 200))
  return `${minutes} min read`
}

function generateId(): string {
  return `gen-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
}

export function generateArticle(topic: string, category: ArticleCategory): GeneratedArticle {
  const config = CATEGORY_CONFIG[category]
  const id = generateId()
  const now = new Date()
  const date = now.toISOString().split('T')[0]

  // Generate title
  const titleTemplates = [
    `${topic}: A Comprehensive Analysis`,
    `Understanding ${topic} in the Modern Era`,
    `The Future of ${topic}: Trends and Insights`,
    `${topic} — What You Need to Know`,
    `Deep Dive: ${topic} and Its Impact`,
    `${topic}: Principles, Patterns, and Practice`,
  ]
  const title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)]

  // Generate summary
  const summaryTemplates = [
    `An in-depth exploration of ${topic}, covering key concepts, current trends, and practical implications for practitioners and decision-makers.`,
    `This article examines the state of ${topic}, analyzing its significance, challenges, and the direction it's heading in the current landscape.`,
    `A detailed look at ${topic} — from foundational principles to advanced applications, with insights for both newcomers and experienced professionals.`,
  ]
  const summary = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)]

  // Generate content sections
  const intro = fillTemplate(
    config.introTemplates[Math.floor(Math.random() * config.introTemplates.length)],
    topic
  )

  const keyPointCount = 3 + Math.floor(Math.random() * 3) // 3-5 key points
  const selectedKeyPoints = pickRandom(config.keyPointTemplates, keyPointCount)
  const keyPoints = selectedKeyPoints.map((t) => fillTemplate(t, topic))

  const analysisParagraphs = config.analysisTemplates.map((t) => fillTemplate(t, topic))

  const conclusion = fillTemplate(
    config.conclusionTemplates[Math.floor(Math.random() * config.conclusionTemplates.length)],
    topic
  )

  // Assemble content with section headers embedded
  const content: string[] = [
    intro,
    ...keyPoints,
    ...analysisParagraphs,
    conclusion,
  ]

  // Generate tags
  const baseTags = [topic.split(' ')[0], category === 'Quant/Trading' ? 'Quantitative' : category]
  const extraTags = pickRandom(config.tagPool, 3 + Math.floor(Math.random() * 3))
  const tags = [...new Set([...baseTags, ...extraTags])].slice(0, 7)

  const readTime = estimateReadTime(content)
  const slug = generateSlug(title)

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Organization',
      name: 'Dhaher Labs',
      url: 'https://dhaher-labs.github.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dhaher Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dhaher-labs.github.io/dhaherlabs-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dhaher-labs.github.io/articles/${slug}`,
    },
    keywords: tags.join(', '),
    wordCount: content.join(' ').split(/\s+/).length,
    articleSection: category,
  }

  return {
    id,
    title,
    summary,
    content,
    date,
    category,
    readTime,
    tags,
    aiGenerated: true,
    slug,
    jsonLd,
  }
}

// Streaming text simulation — returns the full text and a function to get chunks progressively
export function createStreamingText(fullText: string): {
  getChunk: (position: number, chunkSize?: number) => string
  totalLength: number
} {
  return {
    getChunk: (position: number, chunkSize = 1) => {
      return fullText.slice(0, position + chunkSize)
    },
    totalLength: fullText.length,
  }
}

// localStorage helpers
const STORAGE_KEY_PREFIX = 'dhaherlabs-gen-articles'

export function saveArticleToStorage(article: GeneratedArticle, storageKey?: string): void {
  if (typeof window === 'undefined') return
  const key = storageKey || STORAGE_KEY_PREFIX
  const existing = getArticlesFromStorage(key)
  const updated = [article, ...existing]
  localStorage.setItem(key, JSON.stringify(updated))
}

export function getArticlesFromStorage(storageKey?: string): GeneratedArticle[] {
  if (typeof window === 'undefined') return []
  const key = storageKey || STORAGE_KEY_PREFIX
  try {
    const data = localStorage.getItem(key)
    if (!data) return []
    return JSON.parse(data) as GeneratedArticle[]
  } catch {
    return []
  }
}

export function deleteArticleFromStorage(articleId: string, storageKey?: string): void {
  if (typeof window === 'undefined') return
  const key = storageKey || STORAGE_KEY_PREFIX
  const existing = getArticlesFromStorage(key)
  const updated = existing.filter((a) => a.id !== articleId)
  localStorage.setItem(key, JSON.stringify(updated))
}

export function clearAllArticlesFromStorage(storageKey?: string): void {
  if (typeof window === 'undefined') return
  const key = storageKey || STORAGE_KEY_PREFIX
  localStorage.removeItem(key)
}
