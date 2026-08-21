"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "zh";

const chapters = [
  { index: "01", title: "Explore sequence space", titleZh: "探索序列空间", eyebrow: "PepMLM · conditional generation", eyebrowZh: "PepMLM · 条件生成", body: "Starting only from the full-length NTSR1 sequence, PepMLM sampled 100,000 unique peptides across 22 lengths and four sampling regimes.", bodyZh: "仅以 NTSR1 全长序列为条件，PepMLM 在 22 个长度层和四种采样策略下生成 100,000 条唯一多肽。", figure: "100,000", label: "de novo sequences", labelZh: "条从头生成序列" },
  { index: "02", title: "Interrogate structure space", titleZh: "筛选结构空间", eyebrow: "Boltz · complex prediction", eyebrowZh: "Boltz · 复合物预测", body: "Sequence quality and diversity filters produced 4,016 non-redundant candidates. Boltz then evaluated NTSR1–peptide interfaces through confidence, PAE, contacts and clashes.", bodyZh: "序列质量与多样性筛选得到 4,016 条非冗余候选；Boltz 随后从置信度、PAE、接触与碰撞等维度评估 NTSR1–多肽界面。", figure: "4,016", label: "complexes predicted", labelZh: "个复合物完成预测" },
  { index: "03", title: "Optimize with gradients", titleZh: "利用梯度定向优化", eyebrow: "AfDesign × independent validation", eyebrowZh: "AfDesign × 独立结构复验", body: "AfDesign proposed one-to-three-residue variants for 244 structural parents. Every accepted improvement had to survive sequence filters and an independent Boltz re-prediction.", bodyZh: "AfDesign 围绕 244 条结构母本提出一至三位替换；每条被接受的优化肽都必须通过序列过滤与独立 Boltz 复验。", figure: "732 → 690", label: "designed → re-predicted", labelZh: "条优化变体 → 独立复验" },
];

const evidence = [
  { value: "0.9046", label: "Mean pair ipTM", labelZh: "平均 pair ipTM" },
  { value: "6.37 Å", label: "Mean interface PAE", labelZh: "平均界面 PAE" },
  { value: "93.5%", label: "Mean peptide contact", labelZh: "平均多肽接触比例" },
  { value: "0", label: "Severe clashes", labelZh: "严重原子碰撞" },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const zh = lang === "zh";

  useEffect(() => {
    const saved = window.localStorage.getItem("pepstructloop-language") as Lang | null;
    const preferred: Lang = saved === "zh" || saved === "en" ? saved : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    const timer = window.setTimeout(() => setLang(preferred), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = zh ? "zh-CN" : "en";
    document.title = zh ? "PepStructLoop｜梯度驱动的 NTSR1 多肽设计" : "PepStructLoop | Gradient-driven NTSR1 peptide design";
  }, [zh]);

  const chooseLanguage = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem("pepstructloop-language", next);
  };

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="PepStructLoop home"><span className="brand-symbol">P</span><span>PepStruct<em>Loop</em></span></a>
        <div className="nav-links"><a href="#idea">{zh ? "设计理念" : "Concept"}</a><a href="#method">{zh ? "方法" : "Method"}</a><a href="#results">{zh ? "结果" : "Results"}</a></div>
        <div className="language-switch" role="group" aria-label={zh ? "语言选择" : "Language selection"}><button className={zh ? "active" : ""} onClick={() => chooseLanguage("zh")} aria-pressed={zh}>中文</button><button className={!zh ? "active" : ""} onClick={() => chooseLanguage("en")} aria-pressed={!zh}>EN</button></div>
      </nav>

      <section className="hero" id="top">
        <img className="hero-image" src="/pepstructloop-hero-v2.png" alt={zh ? "NTSR1 七跨膜受体、脂质双层与接近界面的多肽科学渲染图" : "Scientific rendering of an NTSR1 seven-transmembrane receptor, lipid bilayer and an approaching peptide"} />
        <div className="hero-shade" />
        <div className="hero-copy"><p className="kicker">PEPSTRUCTLOOP · NTSR1</p><h1>{zh ? <>从序列空间<br />走向<em>分子假设</em></> : <>From sequence space<br />to a <em>molecular hypothesis.</em></>}</h1><p className="hero-intro">{zh ? "一个连接蛋白质语言模型、复合物结构预测与梯度优化的多肽从头设计框架。" : "A de novo peptide design framework connecting protein language modeling, complex structure prediction and gradient-guided optimization."}</p><a className="primary-link" href="#idea">{zh ? "阅读项目故事" : "Read the project story"}<span>↘</span></a></div>
        <div className="hero-facts"><div><span>{zh ? "靶点" : "Target"}</span><strong>NTSR1</strong></div><div><span>{zh ? "探索空间" : "Explored"}</span><strong>100,000</strong></div><div><span>{zh ? "实验候选" : "Candidates"}</span><strong>100</strong></div></div>
      </section>

      <section className="manifesto" id="idea"><p className="section-label">{zh ? "设计理念" : "THE IDEA"}</p><h2>{zh ? <>序列模型负责想象。<br />结构模型负责质疑。<br /><em>梯度负责让答案更好。</em></> : <>Sequence models imagine.<br />Structure models interrogate.<br /><em>Gradients make the answer better.</em></>}</h2><p>{zh ? "我们没有围绕已知阳性肽做局部搜索，而是从 NTSR1 序列出发，在更广阔的多肽空间中寻找可能，再把候选带入三维结构空间，最后通过可验证的局部突变寻求改进。" : "Rather than searching around a known positive peptide, we began with the NTSR1 sequence, explored a broad peptide universe, brought candidates into three-dimensional structure space, and sought local improvements through verifiable mutations."}</p></section>

      <section className="story-visual" aria-label={zh ? "序列空间、结构空间与梯度优化的三阶段视觉" : "Three-stage visual of sequence space, structure space and gradient optimization"}><img src="/sequence-structure-gradient-v2.png" alt="" /><div className="visual-caption visual-caption-one"><span>01</span><b>{zh ? "序列空间" : "Sequence space"}</b><small>100,000</small></div><div className="visual-caption visual-caption-two"><span>02</span><b>{zh ? "结构空间" : "Structure space"}</b><small>4,016 → 244</small></div><div className="visual-caption visual-caption-three"><span>03</span><b>{zh ? "梯度优化" : "Gradient optimization"}</b><small>732 → 690</small></div></section>

      <section className="method" id="method"><header className="section-header"><p className="section-label">{zh ? "方法" : "THE METHOD"}</p><h2>{zh ? "三个空间，一条设计主线。" : "Three spaces. One design logic."}</h2></header><div className="chapter-list">{chapters.map((chapter) => <article key={chapter.index}><div className="chapter-index">{chapter.index}</div><div className="chapter-copy"><p>{zh ? chapter.eyebrowZh : chapter.eyebrow}</p><h3>{zh ? chapter.titleZh : chapter.title}</h3><div>{zh ? chapter.bodyZh : chapter.body}</div></div><div className="chapter-figure"><strong>{chapter.figure}</strong><span>{zh ? chapter.labelZh : chapter.label}</span></div></article>)}</div></section>

      <section className="result-hero" id="results"><div className="result-number"><span>{zh ? "最终候选集合" : "FINAL CANDIDATE PANEL"}</span><strong>100</strong><p>{zh ? "条结构优先级候选肽" : "structurally prioritized peptides"}</p></div><div className="result-story"><p className="section-label">{zh ? "结果" : "THE RESULT"}</p><h2>{zh ? <>保留可靠的母本，<br /><em>只接受真实的改进。</em></> : <>Preserve reliable parents.<br /><em>Accept only real improvements.</em></>}</h2><p>{zh ? "最终集合由 89 条原始母本肽和 11 条通过独立结构复验的优化肽组成。优化肽包括 4 条一位、4 条二位和 3 条三位突变体。" : "The final panel contains 89 original parent peptides and 11 optimized peptides that passed independent structural validation: four single-, four double-, and three triple-substitution variants."}</p><div className="composition"><div><strong>89</strong><span>{zh ? "母本肽" : "parent peptides"}</span></div><div><strong>11</strong><span>{zh ? "优化肽" : "optimized peptides"}</span></div></div></div></section>

      <section className="evidence"><header><p className="section-label">{zh ? "结构证据" : "STRUCTURAL EVIDENCE"}</p><p>{zh ? "最终 100 条候选的集合统计" : "Panel-level statistics for the final 100 candidates"}</p></header><div className="evidence-grid">{evidence.map((item) => <article key={item.label}><strong>{item.value}</strong><span>{zh ? item.labelZh : item.label}</span></article>)}</div><p className="evidence-note">{zh ? "这些指标衡量的是模型中的结构可信度与界面合理性，不等同于实验亲和力、选择性或激动/抑制功能。" : "These metrics describe modeled structural confidence and interface plausibility; they are not experimental affinity, selectivity, agonism or inhibition."}</p></section>

      <section className="boundary"><p className="section-label">{zh ? "科学边界" : "SCIENTIFIC BOUNDARY"}</p><blockquote>{zh ? "计算的终点，是实验的起点。" : "The endpoint of computation is the starting point of experiment."}</blockquote><p>{zh ? "这 100 条序列是用于人工复核与湿实验验证的优先候选。真实结合能力、受体选择性以及功能方向仍需通过实验确认。" : "These 100 sequences are prioritized candidates for expert review and wet-lab validation. Their binding, receptor selectivity and functional direction remain experimental questions."}</p></section>

      <footer><div className="brand"><span className="brand-symbol">P</span><span>PepStruct<em>Loop</em></span></div><p>{zh ? "序列空间 × 结构空间 × 梯度优化" : "Sequence space × structure space × gradient optimization"}</p><span>NTSR1 · O88319 · 2026</span></footer>
    </main>
  );
}
