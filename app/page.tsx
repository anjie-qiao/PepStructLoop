"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "zh";

const metrics = [
  { value: "100", label: "Final candidates", labelZh: "最终候选肽", note: "All computational stages complete", noteZh: "全部计算阶段完成" },
  { value: "0.9046", label: "Mean pair ipTM", labelZh: "平均 pair ipTM", note: "Final candidate panel", noteZh: "最终候选集合" },
  { value: "6.37 Å", label: "Mean interface PAE", labelZh: "平均界面 PAE", note: "Lower indicates less uncertainty", noteZh: "数值越低表示不确定性越小" },
  { value: "93.5%", label: "Mean peptide contact", labelZh: "平均多肽接触比例", note: "Zero severe clashes", noteZh: "严重原子碰撞为 0" },
];

const funnel = [
  { value: "100,000", label: "Generate", labelZh: "生成", status: "measured", width: 100, rate: "100%", rateZh: "100%" },
  { value: "39,125", label: "QC pass", labelZh: "质控通过", status: "measured", width: 67, rate: "39.13%", rateZh: "39.13%" },
  { value: "9,305", label: "PPL evaluated", labelZh: "PPL 评估", status: "measured", width: 48, rate: "9.31%", rateZh: "9.31%" },
  { value: "4,016", label: "Non-redundant core", labelZh: "非冗余核心库", status: "measured", width: 38, rate: "4.02%", rateZh: "4.02%" },
  { value: "244", label: "Structural parents", labelZh: "结构筛选母本", status: "measured", width: 25, rate: "6.08% of core", rateZh: "核心库的 6.08%" },
  { value: "732", label: "Gradient-designed variants", labelZh: "梯度优化变体", status: "measured", width: 34, rate: "1–3 substitutions", rateZh: "1–3 位替换" },
  { value: "690", label: "Independent re-predictions", labelZh: "独立结构复验", status: "measured", width: 32, rate: "94.26% sequence pass", rateZh: "序列通过率 94.26%" },
  { value: "14", label: "Replacement-eligible", labelZh: "达到替换标准", status: "measured", width: 15, rate: "13 parent families", rateZh: "覆盖 13 个母本家族" },
  { value: "100", label: "Final candidate panel", labelZh: "最终候选集合", status: "measured", width: 19, rate: "89 parent + 11 optimized", rateZh: "89 条母本 + 11 条优化肽" },
];

const pipeline = [
  ["01", "Target preparation", "靶点准备", "O88319 · 424 aa", "O88319 · 424 aa", "done"],
  ["02", "De novo generation", "从头生成", "100,000 peptides", "100,000 条多肽", "done"],
  ["03", "Sequence QC + PPL", "序列质控与 PPL", "39,125 → 9,305", "39,125 → 9,305", "done"],
  ["04", "Diversity clustering", "多样性聚类", "4,016 representatives", "4,016 条代表序列", "done"],
  ["05", "Complex prediction", "复合物结构预测", "4,016 / 4,016 completed", "4,016 / 4,016 全部完成", "done"],
  ["06", "Interface screening", "界面筛选", "244 structural parents", "244 条结构母本", "done"],
  ["07", "Gradient optimization", "梯度引导优化", "732 AfDesign variants", "732 条 AfDesign 变体", "done"],
  ["08", "Independent validation", "独立结构复验", "690 Boltz re-predictions", "690 条 Boltz 复验", "done"],
  ["09", "Paired family selection", "母本配对与家族遴选", "14 eligible · 13 families", "14 条达标 · 13 个家族", "done"],
  ["10", "Final panel", "最终候选集合", "100 candidates", "100 条候选肽", "done"],
];

const finalComposition = [
  { name: "Parent peptides", nameZh: "原始母本肽", value: 89, pct: 89, color: "var(--cyan)" },
  { name: "Optimized peptides", nameZh: "结构优化肽", value: 11, pct: 11, color: "var(--coral)" },
];

function Status({ type, lang }: { type: string; lang: Lang }) {
  const text = type === "done" ? (lang === "zh" ? "已完成" : "COMPLETE") : type === "measured" ? (lang === "zh" ? "已测量" : "MEASURED") : type === "running" ? (lang === "zh" ? "进行中" : "RUNNING") : (lang === "zh" ? "预计" : "PROJECTED");
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
    document.title = isZh ? "PepStructLoop｜NTSR1 多肽闭环设计结果" : "PepStructLoop | Closed-loop NTSR1 peptide design results";
    document.querySelector('meta[name="description"]')?.setAttribute("content", isZh
      ? "从 10 万条从头生成序列到 100 条最终候选的 NTSR1 多肽序列—结构—梯度优化闭环。"
      : "A completed sequence–structure–gradient optimization loop that narrowed 100,000 de novo sequences to 100 NTSR1 candidates.");
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
          <p>{zh ? "蛋白质大语言模型探索十万级序列空间，复合物结构预测完成界面筛选，结构梯度优化与独立复验最终收敛为 100 条 NTSR1 候选肽。" : "A protein language model explored 100,000 sequences; complex prediction screened molecular interfaces, and gradient optimization with independent validation converged on 100 NTSR1 candidates."}</p>
          <div className="hero-actions">
            <a href="#funnel" className="button button-primary">{zh ? "探索设计流程" : "Explore the pipeline"} <b>→</b></a>
            <a href="#evidence" className="button button-ghost">{zh ? "科学边界" : "Scientific boundaries"}</a>
          </div>
          <div className="hero-tags">
            <span>{zh ? "靶点" : "TARGET"} <b>NTSR1 / O88319</b></span>
            <span>{zh ? "状态" : "STATUS"} <b className="complete">{zh ? "计算流程完成" : "COMPUTATION COMPLETE"}</b></span>
            <span>{zh ? "最终候选" : "FINAL PANEL"} <b>100</b></span>
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
          <p>{zh ? "每一次收缩、扩增和复验都有迹可循。这里展示的是从序列生成到最终候选集合的完整实测结果。" : "Every contraction, expansion and re-evaluation is traceable. The complete measured path from sequence generation to the final panel is shown here."}</p>
        </header>
        <div className="legend"><span><i className="measured-dot" /> {zh ? "全部为实测结果" : "All values measured"}</span></div>
        <div className="funnel-track">
          {funnel.map((stage, i) => (
            <div className={`funnel-row ${stage.status}`} key={stage.label}>
              <div className="funnel-meta"><span>{String(i + 1).padStart(2, "0")}</span><p>{zh ? stage.labelZh : stage.label}</p><Status type={stage.status} lang={lang} /></div>
              <div className="funnel-scale"><i style={{width:`${stage.width}%`}}><strong>{stage.value}</strong></i><b>{zh && stage.rateZh ? stage.rateZh : stage.rate}</b></div>
            </div>
          ))}
        </div>
        <p className="funnel-caption">{zh ? <>流程从 <b>100,000</b> 条从头序列收敛至 <b>100</b> 条计算候选；其中 11 条由梯度优化后通过独立结构复验。</> : <>The workflow converged from <b>100,000</b> de novo sequences to <b>100</b> computational candidates; 11 are gradient-optimized peptides that passed independent structural validation.</>}</p>
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
            <Status type="measured" lang={lang} /><h3>{zh ? "结构空间" : "Structure space"}</h3><p className="space-question">{zh ? "它可能如何相互作用？" : "How may it interact?"}</p>
            <ul>{(zh ? ["全长 424 aa NTSR1","4,016 / 4,016 复合物预测完成","244 条高可信结构母本","690 条优化肽独立复验","PAE、ipTM、接触与碰撞联合评估"] : ["Full-length 424 aa NTSR1","4,016 / 4,016 complexes predicted","244 high-confidence structural parents","690 optimized peptides independently re-predicted","PAE, ipTM, contacts and clashes assessed jointly"]).map(x=><li key={x}>{x}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="section pipeline-section" id="pipeline">
        <header className="section-heading"><div><span className="section-index">03 / {zh ? "可复现流程" : "REPRODUCIBLE PIPELINE"}</span><h2>{zh ? <>十个阶段全部完成。<br /><em>每项决策均可追溯。</em></> : <>Ten stages completed.<br /><em>Every decision accounted for.</em></>}</h2></div><p>{zh ? "配置指纹、确定性排序、亲子关系与阶段清单，将一次生成实验转化为可复核的设计系统。" : "Configuration fingerprints, deterministic ordering, parent–variant lineage and stage manifests turn a generative experiment into an auditable design system."}</p></header>
        <div className="pipeline-list">
          {pipeline.map(([num, title, titleZh, note, noteZh, state]) => <article key={num} className={state}><span className="pipeline-num">{num}</span><div><h3>{zh ? titleZh : title}</h3><p>{zh ? noteZh : note}</p></div><Status type={state} lang={lang} /><span className="pipeline-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="section intelligence-section">
        <div className="intelligence-copy"><span className="section-index">04 / {zh ? "结构智能" : "STRUCTURE INTELLIGENCE"}</span><h2>{zh ? <>不只是一个分数。<br /><em>而是界面作用假设。</em></> : <>Not a score.<br /><em>An interface hypothesis.</em></>}</h2><p>{zh ? "结构预测作为证据层：通过受体—多肽置信度、不确定性、接触覆盖度和胞外可及性评估候选。" : "Structure prediction is used as an evidence layer: candidates are assessed through receptor–peptide confidence, uncertainty, contact coverage and extracellular accessibility."}</p><div className="metric-chips"><span>pair-chain ipTM</span><span>cross-chain PAE</span><span>interface pLDDT</span><span>{zh ? "接触覆盖度" : "contact coverage"}</span><span>{zh ? "姿态标志" : "pose flags"}</span></div></div>
        <div className="analysis-panel">
          <div className="panel-head"><span>{zh ? "最终候选界面" : "FINAL CANDIDATE INTERFACES"}</span><Status type="measured" lang={lang} /></div>
          <div className="analysis-visual"><MoleculeVisual closeup lang={lang} /></div>
          <div className="result-metrics"><div><strong>0.9046</strong><span>{zh ? "平均 pair ipTM" : "mean pair ipTM"}</span></div><div><strong>6.37 Å</strong><span>{zh ? "平均界面 PAE" : "mean interface PAE"}</span></div><div><strong>93.5%</strong><span>{zh ? "平均接触比例" : "mean contact fraction"}</span></div></div>
        </div>
      </section>

      <section className="section loop-section">
        <header className="section-heading compact"><div><span className="section-index">05 / {zh ? "反馈优化" : "FEEDBACK OPTIMIZATION"}</span><h2>{zh ? <>预测、检查、突变。<br /><em>让下一轮更加聪明。</em></> : <>Predict. Inspect. Mutate.<br /><em>Return smarter.</em></>}</h2></div></header>
        <div className="loop-layout">
          <div className="loop-diagram">
            {(zh ? ['生成','预测','检查','突变','重评分','遴选'] : ['Generate','Predict','Inspect','Mutate','Re-score','Select']).map((x,i)=><div key={x} className={`loop-node loop-${i}`}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}
            <div className="loop-center">{zh ? "结构" : "STRUCTURE"}<br/><b>{zh ? "反馈" : "FEEDBACK"}</b></div>
          </div>
          <div className="loop-copy"><Status type="measured" lang={lang} /><h3>{zh ? "已完成的受控优化闭环" : "A completed, controlled optimization loop"}</h3><p>{zh ? "AfDesign 对 244 条结构母本提出一至三位梯度替换；变体先通过序列过滤，再由 Boltz 独立复验并与各自母本配对比较。只有真正改善且不触发护栏的变体才能替换母本。" : "AfDesign proposed one-to-three-residue substitutions for 244 structural parents. Variants passed sequence filters, were independently re-predicted by Boltz, and competed only against their own parent under explicit guardrails."}</p><div className="projection-grid"><div><strong>244</strong><span>{zh ? "结构母本" : "structural parents"}</span></div><div><strong>732</strong><span>{zh ? "梯度变体" : "gradient variants"}</span></div><div><strong>690</strong><span>{zh ? "独立复验" : "re-predicted"}</span></div><div><strong>14 / 13</strong><span>{zh ? "达标变体 / 家族" : "eligible / families"}</span></div></div></div>
        </div>
      </section>

      <section className="section diversity-section">
        <header className="section-heading"><div><span className="section-index">06 / {zh ? "最终候选图谱" : "FINAL CANDIDATE ATLAS"}</span><h2>{zh ? <>一百条候选。<br /><em>保留母本，也接受真实改进。</em></> : <>One hundred candidates.<br /><em>Preserve parents. Accept real improvements.</em></>}</h2></div><p>{zh ? "每个母本家族只保留一个代表；优化肽必须通过独立结构复验，最终集合兼顾结构优先级与序列多样性。" : "One representative is retained per parent family. Optimized peptides must pass independent structural validation, while the final panel balances structural priority and sequence diversity."}</p></header>
        <div className="diversity-grid">
          <div className="profile-chart"><div className="chart-head"><div><span>{zh ? "候选来源" : "CANDIDATE ORIGIN"}</span><h3>{zh ? "最终集合组成" : "Final panel composition"}</h3></div><b>n = 100</b></div>{finalComposition.map(p=><div className="bar-row" key={p.name}><span>{zh ? p.nameZh : p.name}</span><div><i style={{width:`${p.pct}%`,background:p.color}} /></div><strong>{p.value.toLocaleString()}<small>{p.pct}%</small></strong></div>)}<div className="mutation-breakdown"><span>{zh ? "优化肽突变层级" : "Optimized mutation depth"}</span><b>1-aa&nbsp; 4</b><b>2-aa&nbsp; 4</b><b>3-aa&nbsp; 3</b></div><p><i /> {zh ? "11 条优化肽均通过 Boltz 独立结构复验" : "All 11 optimized peptides passed independent Boltz validation"}</p></div>
          <div className="length-visual"><h3>{zh ? "最终候选长度覆盖" : "Final peptide length coverage"}</h3><div className="coverage-head"><span>{zh ? "长度（aa）" : "LENGTH (aa)"}</span><b>{zh ? "19 个长度层" : "19 length strata"}</b></div><div className="length-axis final-lengths">{Array.from({length:20},(_,i)=>12+i).map((x)=><i key={x} className={x===23 ? "absent" : ""}><span>{x}</span></i>)}</div><div className="coverage-note"><i /> {zh ? "最终 100 条覆盖 12–31 aa；除 23 aa 外，其余 19 个长度层均有代表。所有序列唯一，严重碰撞数均为 0。" : "The final 100 span 12–31 aa, with representatives in 19 strata except 23 aa. Every sequence is unique and has zero severe clashes."}</div></div>
        </div>
      </section>

      <section className="section evidence-section" id="evidence">
        <div className="evidence-title"><span className="section-index">07 / {zh ? "证据边界" : "EVIDENCE BOUNDARY"}</span><h2>{zh ? <>我们清楚模型能够揭示什么。<br /><em>也清楚它无法证明什么。</em></> : <>We know what the models can reveal.<br /><em>And what they cannot prove.</em></>}</h2></div>
        <div className="boundary-grid">
          <article><span>01</span><h3>{zh ? "置信度 ≠ 亲和力" : "Confidence ≠ affinity"}</h3><p>{zh ? "计算结构置信度不等同于实验结合强度。" : "Computational structure confidence is not experimental binding strength."}</p></article>
          <article><span>02</span><h3>{zh ? "多肽为单序列输入" : "Peptides are single-sequence"}</h3><p>{zh ? "从头生成的多肽链不存在具有充分依据的进化比对。" : "De novo peptide chains have no defensible evolutionary alignment."}</p></article>
          <article><span>03</span><h3>{zh ? "膜环境不可忽略" : "Membrane context matters"}</h3><p>{zh ? "胞外可及性和受体缺失区域仍需作为显式检查项。" : "Extracellular accessibility and missing receptor regions remain explicit checks."}</p></article>
          <article><span>04</span><h3>{zh ? "实验验证才是终点" : "Experiment is the endpoint"}</h3><p>{zh ? "最终 100 条是实验优先级候选，真实结合能力、选择性及功能仍需验证。" : "The final 100 are prioritized experimental candidates; binding, selectivity and function remain to be validated."}</p></article>
        </div>
      </section>

      <footer><div className="brand"><span className="brand-mark">P</span><span>PepStruct<span>Loop</span></span></div><p>{zh ? "从序列空间到结构空间：梯度驱动的 NTSR1 靶向多肽设计。" : "From sequence space to structure space: gradient-driven NTSR1 peptide design."}</p><div><span>{zh ? "靶点" : "Target"} O88319</span><span>{zh ? "最终候选" : "Final panel"} 100</span><span>2026</span></div></footer>
    </main>
  );
}
