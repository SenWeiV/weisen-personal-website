export interface Project {
  id: string;
  title: string;
  descEn: string;
  descZh: string;
  year: string;
  tags: string[];
  category: 'Work' | 'Personal';
  link?: string;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Multi-Agent Data Production Platform',
    descEn: 'Agent-Native platform with claim-based task dispatching, pre-qualification gating, and heterogeneous role collaboration (annotator / QA agents). Plan-Act + Reflection reasoning paradigm, Workflow + Agent hybrid architecture. 100k+ tasks processed autonomously per day across 10+ business lines.',
    descZh: 'Agent-Native数据生产平台——抢注式任务分发 + 资格门控 + 异构角色协作（标注/质检Agent），Plan-Act + Reflection推理范式，Workflow + Agent混合架构。日均自主处理10万+任务，覆盖10+业务线。',
    year: '2026',
    tags: ['Multi-Agent', 'Agent-Native'],
    category: 'Work',
  },
  {
    id: '02',
    title: 'Medical Agent Evaluation Pipeline',
    descEn: 'Five-stage decoupled evaluation pipeline (wiki / generation / refine / eval / analyse) for Plan-Act medical consultation agents. Wiki-RAG enhanced Rubric generation, Propose-Evaluate-Revise self-iteration. 50+ clinical cases, Cohen\'s κ = 0.78.',
    descZh: '医疗问诊Agent五阶段解耦评测Pipeline，基于Wiki-RAG检索增强自动生成Rubric，Propose-Evaluate-Revise自迭代精磨。覆盖50+临床病种，Cohen\'s κ = 0.78。',
    year: '2026',
    tags: ['LLM-as-Judge', 'Rubric'],
    category: 'Work',
  },
  {
    id: '03',
    title: 'Virtual Persona Agent Evaluation',
    descEn: 'Specification-Driven evaluation for virtual companion dialogue agents across WenXiaoYan / Shoubai / In-car products. -1/0/1 Likert scoring + 11-dimension Analytic Rubric, 21+ batch runs, label consistency 97%.',
    descZh: '虚拟人设陪伴对话Agent评测体系——覆盖文小言/手百/车载多业务线，-1/0/1三档Likert评分 + 11维Analytic Rubric，21+批数据黑盒批跑，标签一致率97%。',
    year: '2026',
    tags: ['Evaluation', '392'],
    category: 'Work',
  },
  {
    id: '04',
    title: 'Agent Training Data Strategy',
    descEn: 'End-to-end automated pipeline for SFT / DPO / preference data across 15+ business lines. Bad Case feedback loop as standard correction mechanism for probabilistic Agent products. Daily throughput 100k+, correctness 97%+.',
    descZh: '面向15+业务线Agent训练的全链路自动化数据Pipeline，Bad Case闭环作为概率性Agent产品的标准纠错机制。日处理10万+条，正确率97%+。',
    year: '2026',
    tags: ['SFT / DPO', 'Data Flywheel'],
    category: 'Work',
  },
  {
    id: '05',
    title: 'OPC — Multi-Agent Company',
    descEn: 'A multi-agent system modeling real companies — AI agents communicate peer-to-peer through Feishu/Lark with LLM-planned discussion phases.',
    descZh: '多智能体公司系统——AI智能体通过飞书进行点对点通信，采用LLM规划的讨论阶段进行协作。',
    year: '2026',
    tags: ['OPC', 'Multi-Agent', 'Feishu'],
    category: 'Personal',
    link: 'https://github.com/SenWeiV/multi-agent-company',
  },
  {
    id: '06',
    title: 'LLM Evaluation Wiki',
    descEn: 'A knowledge base for LLM evaluation: methodologies, benchmarks, model comparisons, industry trends and hands-on experience.',
    descZh: '面向大模型评测工作的知识库：评测方法论、基准测试、模型对比、行业动态和评测实践经验。',
    year: '2026',
    tags: ['LLM', 'Evaluation'],
    category: 'Personal',
    link: 'https://github.com/SenWeiV/LLM-Evaluation-Wiki',
  },
  {
    id: '07',
    title: 'Daily AI Digest',
    descEn: 'Daily AI intelligence digest — automatically fetches trending AI projects from GitHub, performs deep analysis via LLMs, and delivers daily digest emails.',
    descZh: '每日AI情报摘要系统——自动从GitHub获取AI领域热点项目，通过大模型深度分析后发送每日情报邮件。',
    year: '2026',
    tags: ['AI', 'Automation'],
    category: 'Personal',
    link: 'https://github.com/SenWeiV/daily_ai_digest',
  },
];
