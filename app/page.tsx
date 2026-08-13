"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "zh";

const metrics = [
  { value: "100,000", label: "Generated de novo", labelZh: "从头生成", note: "PepMLM sequence universe", noteZh: "PepMLM 序列空间" },
  { value: "39,125", label: "Sequence-QC passed", labelZh: "序列质控通过", note: "39.13% retained", noteZh: "保留率 39.13%" },
  { value: "9,305", label: "PPL evaluated", labelZh: "完成 PPL 评估", note: "Length-aware quality ranking", noteZh: "长度分层质量排序" },
  { value: "4,016", label: "Structure jobs", labelZh: "结构预测任务", note: "Diversity-controlled core", noteZh: "多样性约束核心库" },
];

const funnel = [
  { value: "100,000", label: "Generate", labelZh: "生成", status: "measured", width: 100, rate: "100%", rateZh: "100%" },
  { value: "39,125", label: "QC pass", labelZh: "质控通过", status: "measured", width: 67, rate: "39.13%", rateZh: "39.13%" },
  { value: "9,305", label: "PPL evaluated", labelZh: "PPL 评估", status: "measured", width: 48, rate: "9.31%", rateZh: "9.31%" },
  { value: "5,584", label: "PPL pool", labelZh: "PPL 候选池", status: "measured", width: 38, rate: "5.58%", rateZh: "5.58%" },
  { value: "4,016", label: "Structural core", labelZh: "结构核心库", status: "running", width: 31, rate: "4.02%", rateZh: "4.02%" },
  { value: "~100–200", label: "Structure shortlist", labelZh: "结构短名单", status: "projected", width: 18, rate: "projected", rateZh: "预计" },
  { value: "~100", label: "Final panel", labelZh: "最终计算候选", status: "projected", width: 13, rate: "projected", rateZh: "预计" },
  { value: "3", label: "Expert pick", labelZh: "专家遴选", status: "projected", width: 8, rate: "projected", rateZh: "预计" },
];

const pipeline = [
  ["01", "Target preparation", "靶点准备", "O88319 · 424 aa", "O88319 · 424 aa", "done"],
  ["02", "De novo generation", "从头生成", "100,000 peptides", "100,000 条多肽", "done"],
  ["03", "Sequence QC + PPL", "序列质控与 PPL", "39,125 → 9,305", "39,125 → 9,305", "done"],
  ["04", "Diversity clustering", "多样性聚类", "4,016 representatives", "4,016 条代表序列", "done"],
  ["05", "Complex prediction", "复合物结构预测", "Boltz · MSA-enhanced", "Boltz · MSA 增强", "running"],
  ["06", "Interface screening", "界面筛选", "PAE · ipTM · contacts", "PAE · ipTM · 接触", "next"],
  ["07", "Feedback optimization", "反馈优化", "Mutate · re-score · select", "突变 · 重评分 · 遴选", "next"],
];

const profiles = [
  { name: "Diverse", nameZh: "多样", value: 1563, pct: 38.9, color: "var(--cyan)" },
  { name: "Balanced", nameZh: "均衡", value: 1522, pct: 37.9, color: "var(--blue)" },
  { name: "Exploratory", nameZh: "探索", value: 710, pct: 17.7, color: "var(--violet)" },
  { name: "Focused", nameZh: "聚焦", value: 221, pct: 5.5, color: "var(--coral)" },
];

function Status({ type, lang }: { type: string; lang: Lang }) {
  const text = type === "done" || type === "measured" ? (lang === "zh" ? "已测量" : "MEASURED") : type === "running" ? (lang === "zh" ? "进行中" : "RUNNING") : (lang === "zh" ? "预计" : "PROJECTED");
  return <span className={`status status-${type}`}>{text}</span>;
}

function MoleculeVisual({ closeup = false, lang }: { closeup?: boolean; lang: Lang }) {
  return (
    <div className={`molecule molecular-image ${closeup ? "molecular-closeup" : ""}`} aria-label="Conceptual seven-transmembrane NTSR1 and de novo peptide molecular rendering">
      <img src="/ntsr1-peptide-concept.png" alt={lang === "zh" ? "脂质双层中的七跨膜受体与接近受体的多肽概念渲染图" : "Conceptual molecular rendering of a seven-transmembrane receptor in a lipid bilayer with an approaching peptide"} />
      <div className="image-veil" />
      <div className="structure-topline"><span>{closeup ? (lang === "zh" ? "界面细节" : "INTERFACE DETAIL") : (lang === "zh" ? "NTSR1 · 分子视图" : "NTSR1 · MOLECULAR VIEW")}</span><b>{lang === "zh" ? "概念示意图" : "CONCEPTUAL ILLUSTRATION"}</b></div>
      <div className="image-callout callout-peptide"><i /> {lang === "zh" ? "从头生成多肽" : "de novo peptide"}</div>
      <div className="image-callout callout-interface"><i /> {lang === "zh" ? "胞外接触假设" : "extracellular contact hypothesis"}</div>
      <div className="image-foot"><span>{lang === "zh" ? "七跨膜 GPCR · 脂质双层" : "7TM GPCR · lipid bilayer"}</span><b>{lang === "zh" ? "非候选结构预测结果" : "not a predicted candidate structure"}</b></div>
    </div>
  );
}

function SequenceManifold({ lang }: { lang: Lang }) {
  const amino = "ACDEFGHIKLMNPQRSTVWY";
  return <div className="sequence-manifold" aria-label="Stylized sequence embedding manifold">
    <div className="manifold-head"><span>{lang === "zh" ? "序列嵌入" : "SEQUENCE EMBEDDING"}</span><b>n = 100,000</b></div>
    <div className="manifold-cloud">{Array.from({length: 54}, (_, i) => <i key={i} style={{left:`${7 + (i * 37) % 88}%`,top:`${12 + (i * 53) % 74}%`,opacity:.24 + (i % 5) * .13}}>{amino[i % amino.length]}</i>)}</div>
    <div className="manifold-axis axis-x">{lang === "zh" ? "潜在维度 01" : "latent dimension 01"}</div><div className="manifold-axis axis-y">{lang === "zh" ? "潜在维度 02" : "latent dimension 02"}</div>
    <div className="density-legend"><span>{lang === "zh" ? "采样密度" : "sampling density"}</span><i /><i /><i /></div>
  </div>;
}

function ConfidenceMatrix({ lang }: { lang: Lang }) {
  return <div className="confidence-matrix" aria-label="Stylized cross-chain predicted alignment error matrix">
    <div className="matrix-head"><span>{lang === "zh" ? "跨链 PAE" : "CROSS-CHAIN PAE"}</span><b>{lang === "zh" ? "受体 × 多肽" : "receptor × peptide"}</b></div>
    <div className="matrix-body">{Array.from({length: 100}, (_, i) => <i key={i} style={{opacity:.16 + (((i * 7 + Math.floor(i / 10) * 3) % 10) / 13)}} />)}<div className="matrix-interface" /></div>
    <div className="matrix-axis matrix-x">{lang === "zh" ? "多肽残基" : "peptide residues"}</div><div className="matrix-axis matrix-y">{lang === "zh" ? "NTSR1 残基" : "NTSR1 residues"}</div>
    <div className="matrix-legend"><span>{lang === "zh" ? "低误差" : "low error"}</span><i /><span>{lang === "zh" ? "高误差" : "high error"}</span></div>
  </div>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const saved = window.localStorage.getItem("pepstructloop-language") as Lang | null;
    const initial: Lang = saved === "zh" || saved === "en" ? saved : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    const timer = window.setTimeout(() => setLang(initial), 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const isZh = lang === "zh";
    document.documentElement.lang = isZh ? "zh-CN" : "en";
    document.title = isZh ? "PepStructLoop｜NTSR1 从头多肽设计" : "PepStructLoop | De novo peptide design for NTSR1";
    document.querySelector('meta[name="description"]')?.setAttribute("content", isZh
      ? "从蛋白质语言模型序列生成，到结构筛选与反馈优化的 NTSR1 从头多肽设计流程。"
      : "A sequence-to-structure closed loop for de novo NTSR1 peptide design, screening, and feedback optimization.");
  }, [lang]);
  const chooseLanguage = (next: Lang) => { setLang(next); window.localStorage.setItem("pepstructloop-language", next); };
  const zh = lang === "zh";

  return (
    <main>
      <nav className={scrolled ? "nav nav-solid" : "nav"}>
        <a href="#top" className="brand"><span className="brand-mark">P</span><span>PepStruct<span>Loop</span></span></a>
        <div className="nav-links">
          <a href="#pipeline">{zh ? "流程" : "Pipeline"}</a><a href="#structure">{zh ? "结构" : "Structure"}</a><a href="#evidence">{zh ? "证据边界" : "Evidence"}</a>
        </div>
        <div className="nav-tools"><div className="language-switch" role="group" aria-label={zh ? "语言选择" : "Language selection"}><button className={zh ? "active" : ""} onClick={() => chooseLanguage("zh")} aria-pressed={zh}>中文</button><button className={!zh ? "active" : ""} onClick={() => chooseLanguage("en")} aria-pressed={!zh}>EN</button></div><a className="nav-cta" href="#workflow">{zh ? "查看流程" : "View workflow"} ↗</a></div>
      </nav>

      <section className="hero" id="top">
        <div className="grid-field" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> {zh ? "序列—结构闭环设计" : "SEQUENCE–STRUCTURE CLOSED LOOP"}</div>
          <h1><span className="product-title">PepStructLoop</span><small>{zh ? <>从序列空间<br />走向<em>分子界面</em></> : <>From sequence universe<br />to <em>molecular interface.</em></>}</small></h1>
          <p>{zh ? "蛋白质大语言模型探索十万级多肽序列空间，复合物结构预测进入三维界面，结构反馈驱动下一轮优化。" : "A protein language model explores a 100,000-peptide sequence universe; complex prediction moves into three-dimensional interfaces, and structural evidence guides the next optimization cycle."}</p>
          <div className="hero-actions">
            <a href="#funnel" className="button button-primary">{zh ? "探索设计流程" : "Explore the pipeline"} <b>→</b></a>
            <a href="#evidence" className="button button-ghost">{zh ? "科学边界" : "Scientific boundaries"}</a>
          </div>
          <div className="hero-tags">
            <span>{zh ? "靶点" : "TARGET"} <b>NTSR1 / O88319</b></span>
            <span>{zh ? "状态" : "STATUS"} <b className="live">{zh ? "结构筛选中" : "STRUCTURAL SCREENING"}</b></span>
            <span>{zh ? "核心库" : "CORE"} <b>4,016</b></span>
          </div>
        </div>
        <MoleculeVisual lang={lang} />
        <div className="scroll-cue"><span /> {zh ? "向下滚动进入流程" : "SCROLL TO ENTER THE PIPELINE"}</div>
      </section>

      <section className="metric-strip">
        {metrics.map((m) => <article key={m.label}><Status type="measured" lang={lang} /><strong>{m.value}</strong><h3>{zh ? m.labelZh : m.label}</h3><p>{zh ? m.noteZh : m.note}</p></article>)}
      </section>

      <section className="section funnel-section" id="funnel">
        <header className="section-heading">
          <div><span className="section-index">01 / {zh ? "证据漏斗" : "EVIDENCE FUNNEL"}</span><h2>{zh ? <>十万个设计构想。<br /><em>一步步收敛为精准决策。</em></> : <>One hundred thousand ideas.<br /><em>One increasingly precise decision.</em></>}</h2></div>
          <p>{zh ? "每一次筛选都有迹可循：已完成阶段采用实测数量，尚未完成的阶段均明确标记为预计值。" : "Every transition is traceable. Completed stages use measured values; future stages are explicitly marked as projections."}</p>
        </header>
        <div className="legend"><span><i className="measured-dot" /> {zh ? "已测量" : "Measured"}</span><span><i className="running-dot" /> {zh ? "进行中" : "Running"}</span><span><i className="projected-dot" /> {zh ? "预计" : "Projected"}</span></div>
        <div className="funnel-track">
          {funnel.map((stage, i) => (
            <div className={`funnel-row ${stage.status}`} key={stage.label}>
              <div className="funnel-meta"><span>{String(i + 1).padStart(2, "0")}</span><p>{zh ? stage.labelZh : stage.label}</p><Status type={stage.status} lang={lang} /></div>
              <div className="funnel-scale"><i style={{width:`${stage.width}%`}}><strong>{stage.value}</strong></i><b>{zh && stage.rateZh ? stage.rateZh : stage.rate}</b></div>
            </div>
          ))}
        </div>
        <p className="funnel-caption">{zh ? <>生成序列空间中的 <b>4.016%</b> 进入结构空间。</> : <><b>4.016%</b> of the generated sequence universe entered structure space.</>}</p>
      </section>

      <section className="section spaces-section" id="workflow">
        <header className="section-heading compact"><div><span className="section-index">02 / {zh ? "双重智能空间" : "TWO INTELLIGENCE SPACES"}</span><h2>{zh ? <>广泛探索。<br /><em>以结构作出决策。</em></> : <>Explore broadly.<br /><em>Decide structurally.</em></>}</h2></div></header>
        <div className="space-grid">
          <article className="space-card sequence-card">
            <SequenceManifold lang={lang} />
            <Status type="measured" lang={lang} /><h3>{zh ? "序列空间" : "Sequence space"}</h3><p className="space-question">{zh ? "哪些序列可能存在？" : "What can exist?"}</p>
            <ul>{(zh ? ["PepMLM-650M 条件生成","22 种多肽长度 · 12–33 aa","四种采样策略","PPL 引导的序列合理性","理化性质与可开发性"] : ["PepMLM-650M conditional generation","22 peptide lengths · 12–33 aa","Four sampling regimes","PPL-guided plausibility","Physicochemical developability"]).map(x=><li key={x}>{x}</li>)}</ul>
          </article>
          <div className="space-bridge"><span>{zh ? "语言" : "LANGUAGE"}</span><i>→</i><span>{zh ? "几何" : "GEOMETRY"}</span></div>
          <article className="space-card structure-card" id="structure">
            <ConfidenceMatrix lang={lang} />
            <Status type="running" lang={lang} /><h3>{zh ? "结构空间" : "Structure space"}</h3><p className="space-question">{zh ? "它可能如何相互作用？" : "How may it interact?"}</p>
            <ul>{(zh ? ["全长 424 aa NTSR1","共享受体 MSA · 深度 512","Boltz 复合物结构预测","跨链 PAE 与界面置信度","胞外姿态合理性"] : ["Full-length 424 aa NTSR1","Shared receptor MSA · depth 512","Boltz complex prediction","Cross-chain PAE and interface confidence","Extracellular pose plausibility"]).map(x=><li key={x}>{x}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="section pipeline-section" id="pipeline">
        <header className="section-heading"><div><span className="section-index">03 / {zh ? "可复现流程" : "REPRODUCIBLE PIPELINE"}</span><h2>{zh ? <>七个阶段。<br /><em>每项决策均可追溯。</em></> : <>Seven stages.<br /><em>Every decision accounted for.</em></>}</h2></div><p>{zh ? "配置指纹、确定性排序与阶段清单，将生成实验转化为可复现的设计系统。" : "Configuration fingerprints, deterministic ordering and stage-level manifests turn a generative experiment into a reproducible design system."}</p></header>
        <div className="pipeline-list">
          {pipeline.map(([num, title, titleZh, note, noteZh, state]) => <article key={num} className={state}><span className="pipeline-num">{num}</span><div><h3>{zh ? titleZh : title}</h3><p>{zh ? noteZh : note}</p></div><Status type={state} lang={lang} /><span className="pipeline-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="section intelligence-section">
        <div className="intelligence-copy"><span className="section-index">04 / {zh ? "结构智能" : "STRUCTURE INTELLIGENCE"}</span><h2>{zh ? <>不只是一个分数。<br /><em>而是界面作用假设。</em></> : <>Not a score.<br /><em>An interface hypothesis.</em></>}</h2><p>{zh ? "结构预测作为证据层：通过受体—多肽置信度、不确定性、接触覆盖度和胞外可及性评估候选。" : "Structure prediction is used as an evidence layer: candidates are assessed through receptor–peptide confidence, uncertainty, contact coverage and extracellular accessibility."}</p><div className="metric-chips"><span>pair-chain ipTM</span><span>cross-chain PAE</span><span>interface pLDDT</span><span>{zh ? "接触覆盖度" : "contact coverage"}</span><span>{zh ? "姿态标志" : "pose flags"}</span></div></div>
        <div className="analysis-panel">
          <div className="panel-head"><span>{zh ? "候选界面" : "CANDIDATE INTERFACE"}</span><Status type="running" lang={lang} /></div>
          <div className="analysis-visual"><MoleculeVisual closeup lang={lang} /></div>
          <div className="pending-metrics"><span>{zh ? "指标将在阶段 06 完成后填充" : "Metrics will populate from Stage 06"}</span><i /></div>
        </div>
      </section>

      <section className="section loop-section">
        <header className="section-heading compact"><div><span className="section-index">05 / {zh ? "反馈优化" : "FEEDBACK OPTIMIZATION"}</span><h2>{zh ? <>预测、检查、突变。<br /><em>让下一轮更加聪明。</em></> : <>Predict. Inspect. Mutate.<br /><em>Return smarter.</em></>}</h2></div></header>
        <div className="loop-layout">
          <div className="loop-diagram">
            {(zh ? ['生成','预测','检查','突变','重评分','遴选'] : ['Generate','Predict','Inspect','Mutate','Re-score','Select']).map((x,i)=><div key={x} className={`loop-node loop-${i}`}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}
            <div className="loop-center">{zh ? "结构" : "STRUCTURE"}<br/><b>{zh ? "反馈" : "FEEDBACK"}</b></div>
          </div>
          <div className="loop-copy"><Status type="projected" lang={lang} /><h3>{zh ? "受控的优化闭环" : "A controlled optimization loop"}</h3><p>{zh ? "结构信号用于识别潜在界面机会；提出受控突变，经序列合理性重新过滤后，再回到结构空间评估。" : "Structural signals identify interface opportunities. Controlled mutations are proposed, filtered again by sequence plausibility, and re-evaluated in structure space."}</p><div className="projection-grid"><div><strong>~100–200</strong><span>{zh ? "进入优化" : "enter refinement"}</span></div><div><strong>5×</strong><span>{zh ? "构象" : "conformations"}</span></div><div><strong>2–3</strong><span>{zh ? "轮优化" : "optimization rounds"}</span></div><div><strong>~100</strong><span>{zh ? "最终候选" : "final candidates"}</span></div></div></div>
        </div>
      </section>

      <section className="section diversity-section">
        <header className="section-heading"><div><span className="section-index">06 / {zh ? "多样性图谱" : "DIVERSITY ATLAS"}</span><h2>{zh ? <>质量提升，<br /><em>而不牺牲多样性。</em></> : <>Quality without<br /><em>collapsing diversity.</em></>}</h2></div><p>{zh ? "核心库保留多种采样策略，并覆盖全部 22 种设计多肽长度。" : "The core library preserves multiple sampling regimes and all 22 designed peptide lengths."}</p></header>
        <div className="diversity-grid">
          <div className="profile-chart"><div className="chart-head"><div><span>{zh ? "采样策略" : "SAMPLING PROFILE"}</span><h3>{zh ? "核心库组成" : "Core library composition"}</h3></div><b>n = 4,016</b></div>{profiles.map(p=><div className="bar-row" key={p.name}><span>{zh ? p.nameZh : p.name}</span><div><i style={{width:`${p.pct}%`,background:p.color}} /></div><strong>{p.value.toLocaleString()}<small>{p.pct}%</small></strong></div>)}<p><i /> {zh ? "多样性约束遴选后的实测结果" : "Measured after diversity-aware selection"}</p></div>
          <div className="length-visual"><h3>{zh ? "设计多肽长度覆盖" : "Designed peptide length coverage"}</h3><div className="coverage-head"><span>{zh ? "长度（aa）" : "LENGTH (aa)"}</span><b>{zh ? "覆盖 22 / 22" : "22 / 22 covered"}</b></div><div className="length-axis">{Array.from({length:22},(_,i)=>12+i).map((x)=><i key={x}><span>{x}</span></i>)}</div><div className="coverage-note"><i /> {zh ? "结构核心库覆盖 12–33 aa 的每个离散长度。由于此处未报告逐长度数量，图中不使用柱高暗示频数。" : "Every discrete length from 12 to 33 aa is represented in the structural core. Bar height is intentionally not used because per-length counts are not reported here."}</div></div>
        </div>
      </section>

      <section className="section evidence-section" id="evidence">
        <div className="evidence-title"><span className="section-index">07 / {zh ? "证据边界" : "EVIDENCE BOUNDARY"}</span><h2>{zh ? <>我们清楚模型能够揭示什么。<br /><em>也清楚它无法证明什么。</em></> : <>We know what the models can reveal.<br /><em>And what they cannot prove.</em></>}</h2></div>
        <div className="boundary-grid">
          <article><span>01</span><h3>{zh ? "置信度 ≠ 亲和力" : "Confidence ≠ affinity"}</h3><p>{zh ? "计算结构置信度不等同于实验结合强度。" : "Computational structure confidence is not experimental binding strength."}</p></article>
          <article><span>02</span><h3>{zh ? "多肽为单序列输入" : "Peptides are single-sequence"}</h3><p>{zh ? "从头生成的多肽链不存在具有充分依据的进化比对。" : "De novo peptide chains have no defensible evolutionary alignment."}</p></article>
          <article><span>03</span><h3>{zh ? "膜环境不可忽略" : "Membrane context matters"}</h3><p>{zh ? "胞外可及性和受体缺失区域仍需作为显式检查项。" : "Extracellular accessibility and missing receptor regions remain explicit checks."}</p></article>
          <article><span>04</span><h3>{zh ? "实验验证才是终点" : "Experiment is the endpoint"}</h3><p>{zh ? "最终三条多肽仍是待生物学验证的研究假设。" : "The final three peptides are hypotheses selected for biological validation."}</p></article>
        </div>
      </section>

      <footer><div className="brand"><span className="brand-mark">P</span><span>PepStruct<span>Loop</span></span></div><p>{zh ? "NTSR1 靶向多肽从头设计 · 从序列到结构，再到证据。" : "De novo NTSR1-targeting peptide design · sequence to structure to evidence."}</p><div><span>{zh ? "靶点" : "Target"} O88319</span><span>{zh ? "核心库" : "Core"} 4,016</span><span>2026</span></div></footer>
    </main>
  );
}
