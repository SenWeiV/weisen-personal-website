import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SenWei | AI-Native PM Resume",
  description: "4 years AI product experience, practicing AI Native product methodology.",
};

export default function AgentNativeResume() {
  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-24">
      <div className="mb-16">
        <a href="/" className="font-[var(--font-sans)] text-[13px] text-[#555] hover:text-[#C8C8C8] transition-colors duration-300">
          ← Back
        </a>
      </div>

      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-[#E0E0E0]">Wei Sen</h1>
        <p className="mt-4 text-2xl md:text-3xl text-[#C8C8C8] font-medium tracking-[-0.01em]">
          AI-Native 数据策略产品经理
        </p>
        <div className="mt-6 flex gap-6 font-[var(--font-sans)] text-[14px] text-[#6A6A6A]">
          <span>Baidu</span>
          <span>m13230016773@163.com</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-20">
        <h2 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555] mb-6">— Summary</h2>
        <p className="text-[17px] text-[#8A8A8A] font-normal leading-[1.75] tracking-[0.005em] max-w-4xl">
          4年AI产品经验，沉淀并实践一套完整的AI Native产品方法论——Agent为一等公民、API/CLI First、Specification-Driven、Workflow + Agent混合架构、Evaluation-First、Vibe Coding自主研发。在百度以此方法论指导，从0到1主导Agent数据生产平台、覆盖医疗问诊与虚拟人设陪伴对话多场景的Agent评测体系。
        </p>
      </section>

      {/* Core Capabilities */}
      <section className="mb-20">
        <h2 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555] mb-8">— Core Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-5xl">
          {[
            { title: 'AI Native产品方法论', desc: 'Agent为一等公民（API/CLI First、GUI为辅）、Specification-Driven、Workflow + Agent混合架构、评测先行驱动迭代、Bad Case闭环纠错' },
            { title: 'AI重塑路径判断', desc: '区分AI Enhance与AI Native；用错误容忍度、延迟敏感度、可解释要求等多维红灯指标识别不适合AI重构的场景' },
            { title: 'Multi-Agent编排', desc: '抢注式任务分发 + Slot算法分配、Pre-Qualification Gate资格门控、异构角色协作、质量回流闭环 + Human-in-the-Loop' },
            { title: 'Agent评测体系', desc: 'Analytic Rubric分解式评测、Binary/Likert多评分制按场景适配、Wiki-RAG Rubric生成、Propose-Evaluate-Revise自迭代、LLM-as-a-Judge' },
            { title: 'Agent训练数据策略', desc: 'SFT/DPO/偏好数据分层策略、Bad Case闭环、Trajectory数据沉淀' },
            { title: 'Vibe Coding自主研发', desc: '基于Cursor/Claude Code等AI Coding工具完成产品0-1自主设计与MVP开发，无后端开发资源依赖' },
          ].map((item) => (
            <div key={item.title} className="border-l border-[#252525] pl-4">
              <h3 className="text-[18px] font-medium text-[#E0E0E0]">{item.title}</h3>
              <p className="mt-1 text-[15px] text-[#6A6A6A] font-normal leading-[1.75]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-20">
        <h2 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555] mb-8">— Experience</h2>
        <div className="space-y-16 max-w-4xl">
          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[24px] font-medium text-[#E0E0E0] tracking-[-0.01em]">百度 | Agent 数据策略产品经理</h3>
              <span className="font-[var(--font-sans)] text-[13px] text-[#555]">2025.6 - Present</span>
            </div>
            <p className="mt-4 text-[15px] text-[#6A6A6A] leading-[1.75]">
              践行AI Native产品方法论，负责面向15+业务线的Agent平台、Agent评测、Agent训练数据三大方向0-1建设。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Multi-Agent数据生产平台：</strong>Agent通过抢注式任务分发 + 资格门控 + 异构角色协作，日均Agent自主处理任务10w+条，覆盖10+业务线
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">多场景Agent评测体系：</strong>医疗问诊Agent评测（Plan-Act范式，50+临床病种，κ=0.78）+ 392虚拟人设陪伴对话评测（11维Rubric，21+批数据，一致率97%）
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Agent训练数据策略：</strong>为15+业务线Agent交付SFT/DPO/偏好数据，日处理10w+条，正确率97%+
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[24px] font-medium text-[#E0E0E0] tracking-[-0.01em]">Gaiamesh 思拟科技 | AI 产品经理</h3>
              <span className="font-[var(--font-sans)] text-[13px] text-[#555]">2023.6 - 2025.5</span>
            </div>
            <p className="mt-4 text-[15px] text-[#6A6A6A] leading-[1.75]">
              主导企业级AI大模型平台从0到1架构设计，创新性提出"AI Agent + SaaS融合"模式，年营收1200万元中AI业务占比40%。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">主动学习数据标注闭环：</strong>标注数据F1由0.82→0.93，迭代效率提升3倍
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">AI业务客服：</strong>RAG增强，5次问答解决率由40%→85%
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">指令体系与意图识别：</strong>用户指令解析准确率由78%→95%
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[24px] font-medium text-[#E0E0E0] tracking-[-0.01em]">Adeas 凯达环球咨询 | AI 产品经理</h3>
              <span className="font-[var(--font-sans)] text-[13px] text-[#555]">2021.11 - 2023.6</span>
            </div>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                负责AIGC产品方案设计与落地，设计50+需求方案
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                探索LLM在国际咨询场景应用，需求响应时效由48小时缩短至2小时
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-20">
        <h2 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555] mb-8">— Projects</h2>
        <div className="space-y-16 max-w-4xl">
          <div className="border-t border-[#2A2A2A] pt-8">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">Multi-Agent数据生产平台（Agent-Native 0-1设计）</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <p className="mt-3 text-[15px] text-[#6A6A6A] leading-[1.75]">
              AI Native产品方法论的旗舰实证——全面API/CLI First设计；Agent通过统一接口自主完成任务领取、执行、提交全流程。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Multi-Agent协作范式：</strong>抢注式任务分发 + Slot算法 + Pre-Qualification Gate资格门控 + 异构角色协作 + 质量回流闭环 + Human-in-the-Loop
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Plan-Act推理范式：</strong>Agent领取任务后完成"任务理解→标注策略规划→执行→提交"全链路；Reflection模式——执行后自评估、不达标自修正
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Workflow + Agent混合架构：</strong>确定性规则环节使用Workflow节点，开放式生产环节使用Agent节点，按场景灵活组合
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Vibe Coding自主研发：</strong>Streamlit + Python + Agent工具链完成平台MVP独立交付
              </li>
            </ul>
          </div>

          <div className="border-t border-[#2A2A2A] pt-8">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">医疗问诊Agent自动化评测Pipeline</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <p className="mt-3 text-[15px] text-[#6A6A6A] leading-[1.75]">
              Evaluation-First方法论实践，基于"概率性输出 + Specification-Driven" AI Native原则，五阶段解耦评测Pipeline。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Plan-Act范式Agent评测：</strong>覆盖Agent多轮规划合理性、症状收集完整性、诊断准确性等多维度
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">评测资产自动生产Pipeline：</strong>Wiki-RAG检索增强自动生成case-specific Rubric，新case接入成本降至&lt;30min
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Propose-Evaluate-Revise自迭代：</strong>"对比→诊断→修复→重评→收敛检查"闭环，少量人工数据即可完成阈值校准
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Analytic Rubric评测框架：</strong>Binary二元评测，A/B/C三级标签体系，68个标准化评测标签
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">结果：</strong>50 case端到端验证，Cohen&apos;s κ = 0.78，整体一致率78.7%
              </li>
            </ul>
          </div>

          <div className="border-t border-[#2A2A2A] pt-8">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">虚拟人设陪伴对话Agent评测体系（392评测）</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <p className="mt-3 text-[15px] text-[#6A6A6A] leading-[1.75]">
              AI Native评测方法论的多业务线规模化落地——典型的"从if-else业务规则到Specification-Driven评测"范式转换。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">C端Agent业务规则到Rubric翻译：</strong>11个评测维度（人设一致性、上下文重复性、幻觉、准确性等），将主观判断转译为可量化Analytic Rubric
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">-1/0/1三档Likert评分制：</strong>核心维度一票否决、次要维度累计扣分
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">动态策略库与规则版本化：</strong>覆盖历史全部错误点 + 业务对齐结论，规则可追溯、可回滚
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">跨业务线复用：</strong>文小言/手百/车载三条业务线落地，一致率97%、可托管评测题占比60%
              </li>
            </ul>
          </div>

          <div className="border-t border-[#2A2A2A] pt-8">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">多业务线Agent训练数据生产体系</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <p className="mt-3 text-[15px] text-[#6A6A6A] leading-[1.75]">
              AI Native能力涌现的底层数据支撑——把Bad Case闭环作为概率性Agent产品的标准纠错机制。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Agent训练数据策略：</strong>拆解SFT/DPO分层数据需求，定义数据配比、领域分布与采样策略
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">数据生产Pipeline：</strong>六环节自动化流水线，日处理10w+条，正确率97%+
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Bad Case闭环：</strong>线上Agent Bad Case回流→归因→数据补充，生产周期由周级压缩至天级
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-20">
        <h2 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555] mb-8">— Education</h2>
        <div className="space-y-8 max-w-4xl">
          <div className="flex justify-between items-baseline flex-wrap gap-2">
            <div>
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">伦敦大学学院（UCL）</h3>
              <p className="text-[15px] text-[#6A6A6A]">建筑设计 | 硕士 · QS世界排名第9</p>
            </div>
            <span className="font-[var(--font-sans)] text-[13px] text-[#555]">2020 - 2021</span>
          </div>
          <div className="flex justify-between items-baseline flex-wrap gap-2">
            <div>
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">河北工程大学</h3>
              <p className="text-[15px] text-[#6A6A6A]">建筑学 | 学士</p>
            </div>
            <span className="font-[var(--font-sans)] text-[13px] text-[#555]">2015 - 2020</span>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-20">
        <h2 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555] mb-8">— Certifications</h2>
        <div className="flex flex-wrap gap-3">
          {['阿里云 ACA 大模型助理工程师', '阿里云 Apsara Clouder 云计算', '腾讯云 TCCA 从业者认证', '微软/LinkedIn 生成式AI专业认证'].map((cert) => (
            <span key={cert} className="px-4 py-2 border border-[#252525] rounded-full font-[var(--font-sans)] text-[13px] font-medium text-[#6A6A6A]">
              {cert}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#2A2A2A] pt-8">
        <a href="/" className="font-[var(--font-sans)] text-[13px] text-[#555] hover:text-[#C8C8C8] transition-colors duration-300">
          ← Back to Home
        </a>
      </footer>
    </main>
  );
}
