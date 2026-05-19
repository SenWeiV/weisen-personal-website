import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SenWei | Data Strategy PM Resume",
  description: "4 years AI product experience, focusing on LLM data strategy and data production/evaluation.",
};

export default function DataStrategyResume() {
  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-24">
      <div className="mb-16">
        <Link href="/" className="font-[var(--font-sans)] text-[13px] text-[#555] hover:text-[#C8C8C8] transition-colors duration-300">
          ← Back
        </Link>
      </div>

      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-[#E0E0E0]">Wei Sen</h1>
        <p className="mt-4 text-2xl md:text-3xl text-[#C8C8C8] font-medium tracking-[-0.01em]">
          大模型数据策略产品经理
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
          4年AI产品经验，聚焦大模型数据策略与数据生产/评测全链路。负责百度15+业务线的SFT/DPO/偏好数据生产，以及覆盖医疗问诊、虚拟人设陪伴对话（文小言App/手百/车载等多业务线）的自动化评测体系建设。主导从0到1落地Agent-Native数据标注平台、自动化数据生产Pipeline、垂域Rubric评测体系；日均数据吞吐10w+条，数据正确率97%+，自动化评测与人工一致性Cohen&apos;s κ = 0.78 / 一致率97%。
        </p>
      </section>

      {/* Core Capabilities */}
      <section className="mb-20">
        <h2 className="font-[var(--font-sans)] text-[12px] font-medium tracking-[0.22em] uppercase text-[#555] mb-8">— Core Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-5xl">
          {[
            { title: '数据策略', desc: '面向15+业务线的SFT/DPO/偏好数据需求拆解与配比、SFT–Alignment分层数据策略、数据飞轮与Bad Case闭环' },
            { title: '数据生产', desc: '全链路（采集→清洗→合成→标注→质检→交付）自动化Pipeline，T+3交付、日处理10w+条' },
            { title: '数据评测', desc: 'Analytic Rubric原子化评测、Binary/Likert多评分制、Wiki-RAG检索增强Rubric生成、Propose-Evaluate-Revise自迭代、LLM-as-a-Judge' },
            { title: '数据平台', desc: 'Agent-Native数据标注平台、自动化评测Pipeline、跨项目数据生产工具生态' },
            { title: 'AI-Native产品设计', desc: 'Agent为一等公民的平台设计原则、API/CLI全流程化、多Agent并行编排、Skills化能力沉淀' },
            { title: 'Vibe Coding自主研发', desc: '基于AI Coding工具完成产品原型自主设计与MVP开发，从概念到落地全程独立交付' },
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
              <h3 className="text-[24px] font-medium text-[#E0E0E0] tracking-[-0.01em]">百度 | 大模型数据策略产品经理</h3>
              <span className="font-[var(--font-sans)] text-[13px] text-[#555]">2025.6 - Present</span>
            </div>
            <p className="mt-4 text-[15px] text-[#6A6A6A] leading-[1.75]">
              负责面向15+业务线的大模型数据策略，覆盖数据生产/数据评测/数据生产工具平台三大方向。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">数据生产体系：</strong>为15+业务线交付SFT/DPO/偏好数据，T+1完成需求接入；自动化Pipeline将日处理数据从百级提升至10w+条，正确率97%+
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">多场景自动化评测体系：</strong>医疗问诊Agent（50+临床病种，κ=0.78）+ 392虚拟人设陪伴对话（11维Rubric，覆盖文小言/手百/车载，一致率97%）
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">数据标注平台与工具生态：</strong>Agent-Native数据标注平台0-1设计，标注Skills市场与CLI工具生态，沉淀110+数据生产工具
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[24px] font-medium text-[#E0E0E0] tracking-[-0.01em]">Gaiamesh 思拟科技 | AI 产品经理</h3>
              <span className="font-[var(--font-sans)] text-[13px] text-[#555]">2023.6 - 2025.5</span>
            </div>
            <p className="mt-4 text-[15px] text-[#6A6A6A] leading-[1.75]">
              主导企业级AI大模型平台从0到1架构设计，创新性提出"AI Agent + SaaS融合"模式。
            </p>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">主动学习数据标注闭环：</strong>标注数据F1由0.82→0.93，迭代效率提升3倍
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">AI业务客服：</strong>RAG增强，5次问答解决率由40%→85%，人均月工单处理量由600→100
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
                负责AIGC产品方案设计与落地，主导多个数据分析项目，设计50+需求方案
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
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">多业务线大模型数据生产Pipeline与自动化质检体系</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">数据策略与需求拆解：</strong>对接业务方训练目标，拆解为SFT/DPO分层数据需求，定义数据配比、领域分布与采样策略；维护各业务线数据需求矩阵
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">生产Pipeline设计：</strong>六环节自动化流水线；自动化质检矩阵覆盖格式、去重、敏感、领域分布等多维校验，日处理10w+条，正确率97%+
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Bad Case闭环与数据飞轮：</strong>线上Bad Case回流→归因→数据补充，针对性SFT数据生产周期由周级压缩至天级
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">跨团队协同：</strong>与算法、标注、业务三方建立周度对齐机制，沉淀《标注流程规范》《质检SOP》等组织资产
              </li>
            </ul>
          </div>

          <div className="border-t border-[#2A2A2A] pt-8">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">Agent-Native数据标注平台与标注Skills生态（0-1）</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Agent-Native架构设计：</strong>全流程通过标准HTTP API + CLI完成，天然支持多Agent并行作业；新数据项目接入TTFV由天级压缩至小时级
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">标注Skills市场：</strong>通用标注能力沉淀为可版本管理的Skills，跨项目按需安装调用；建立"版本管理 + 质量评级 + 使用统计"三层治理机制
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">CLI工具与数据生产民主化：</strong>部门成员通过CLI自主上传50+个数据处理/质检/合成工具，形成内源协作生态
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Vibe Coding自主研发：</strong>以Streamlit + Python + Agent工具链完成平台MVP独立交付（无后端开发资源投入）
              </li>
            </ul>
          </div>

          <div className="border-t border-[#2A2A2A] pt-8">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">医疗Agent自动化数据评测Pipeline</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">五阶段解耦评测Pipeline：</strong>wiki / generation / refine / eval / analyse严格解耦，可量化、可迭代、可迁移
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">评测资产自动生产（wiki + gen）：</strong>Wiki-RAG检索增强自动生成case-specific Rubric，新case接入成本由人工~6h降至自动&lt;30min
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">Propose-Evaluate-Revise自迭代：</strong>"对比→诊断→修复→重评→收敛检查"闭环，少量人工数据即可完成阈值校准
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">结果：</strong>50 case端到端验证，整体binary一致率78.7%，其中服务调度97%、表达风格85%
              </li>
            </ul>
          </div>

          <div className="border-t border-[#2A2A2A] pt-8">
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h3 className="text-[20px] font-medium text-[#E0E0E0]">虚拟人设陪伴对话场景大模型Response自动化评测体系</h3>
              <span className="font-[var(--font-sans)] text-[12px] text-[#555]">2025.6 - Present</span>
            </div>
            <ul className="mt-4 space-y-3">
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">业务规则到Rubric翻译：</strong>沉淀11个评测维度（人设一致性、上下文重复性、幻觉、准确性等），将主观"好坏"判断转译为可量化Analytic Rubric
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">-1/0/1三档Likert评分制：</strong>维度级差异化聚合——核心维度一票否决、次要维度累计扣分
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">动态策略库与规则版本化：</strong>覆盖历史全部错误点 + PM对齐结论，规则版本化、可追溯、可回滚
              </li>
              <li className="pl-4 border-l border-[#252525] text-[15px] text-[#7A7A7A] leading-[1.75]">
                <strong className="text-[#B0B0B0] font-medium">跨业务线复用：</strong>文小言/手百/车载三条业务线落地，一致率97%、自动化评测托管占比60%
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
        <Link href="/" className="font-[var(--font-sans)] text-[13px] text-[#555] hover:text-[#C8C8C8] transition-colors duration-300">
          ← Back to Home
        </Link>
      </footer>
    </main>
  );
}
