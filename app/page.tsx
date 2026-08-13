"use client";

import { useEffect, useState } from "react";

const metrics = [
  { value: "100,000", label: "Generated de novo", note: "PepMLM sequence universe" },
  { value: "39,125", label: "Sequence-QC passed", note: "39.13% retained" },
  { value: "9,305", label: "PPL evaluated", note: "Length-aware quality ranking" },
  { value: "4,016", label: "Structure jobs", note: "Diversity-controlled core" },
];

const funnel = [
  { value: "100,000", label: "Generate", status: "measured", width: 100, rate: "100%" },
  { value: "39,125", label: "QC pass", status: "measured", width: 67, rate: "39.13%" },
  { value: "9,305", label: "PPL evaluated", status: "measured", width: 48, rate: "9.31%" },
  { value: "5,584", label: "PPL pool", status: "measured", width: 38, rate: "5.58%" },
  { value: "4,016", label: "Structural core", status: "running", width: 31, rate: "4.02%" },
  { value: "~100–200", label: "Structure shortlist", status: "projected", width: 18, rate: "projected" },
  { value: "~100", label: "Final panel", status: "projected", width: 13, rate: "projected" },
  { value: "3", label: "Expert pick", status: "projected", width: 8, rate: "projected" },
];

const pipeline = [
  ["01", "Target preparation", "O88319 · 424 aa", "done"],
  ["02", "De novo generation", "100,000 peptides", "done"],
  ["03", "Sequence QC + PPL", "39,125 → 9,305", "done"],
  ["04", "Diversity clustering", "4,016 representatives", "done"],
  ["05", "Complex prediction", "Boltz · MSA-enhanced", "running"],
  ["06", "Interface screening", "PAE · ipTM · contacts", "next"],
  ["07", "Feedback optimization", "Mutate · re-score · select", "next"],
];

const profiles = [
  { name: "Diverse", value: 1563, pct: 38.9, color: "var(--cyan)" },
  { name: "Balanced", value: 1522, pct: 37.9, color: "var(--blue)" },
  { name: "Exploratory", value: 710, pct: 17.7, color: "var(--violet)" },
  { name: "Focused", value: 221, pct: 5.5, color: "var(--coral)" },
];

function Status({ type }: { type: string }) {
  return <span className={`status status-${type}`}>{type === "done" || type === "measured" ? "MEASURED" : type === "running" ? "RUNNING" : "PROJECTED"}</span>;
}

function MoleculeVisual({ closeup = false }: { closeup?: boolean }) {
  return (
    <div className={`molecule molecular-image ${closeup ? "molecular-closeup" : ""}`} aria-label="Conceptual seven-transmembrane NTSR1 and de novo peptide molecular rendering">
      <img src="/ntsr1-peptide-concept.png" alt="Conceptual molecular rendering of a seven-transmembrane receptor in a lipid bilayer with an approaching peptide" />
      <div className="image-veil" />
      <div className="structure-topline"><span>{closeup ? "INTERFACE DETAIL" : "NTSR1 · MOLECULAR VIEW"}</span><b>CONCEPTUAL ILLUSTRATION</b></div>
      <div className="image-callout callout-peptide"><i /> de novo peptide</div>
      <div className="image-callout callout-interface"><i /> extracellular contact hypothesis</div>
      <div className="image-foot"><span>7TM GPCR · lipid bilayer</span><b>not a predicted candidate structure</b></div>
    </div>
  );
}

function SequenceManifold() {
  const amino = "ACDEFGHIKLMNPQRSTVWY";
  return <div className="sequence-manifold" aria-label="Stylized sequence embedding manifold">
    <div className="manifold-head"><span>SEQUENCE EMBEDDING</span><b>n = 100,000</b></div>
    <div className="manifold-cloud">{Array.from({length: 54}, (_, i) => <i key={i} style={{left:`${7 + (i * 37) % 88}%`,top:`${12 + (i * 53) % 74}%`,opacity:.24 + (i % 5) * .13}}>{amino[i % amino.length]}</i>)}</div>
    <div className="manifold-axis axis-x">latent dimension 01</div><div className="manifold-axis axis-y">latent dimension 02</div>
    <div className="density-legend"><span>sampling density</span><i /><i /><i /></div>
  </div>;
}

function ConfidenceMatrix() {
  return <div className="confidence-matrix" aria-label="Stylized cross-chain predicted alignment error matrix">
    <div className="matrix-head"><span>CROSS-CHAIN PAE</span><b>receptor × peptide</b></div>
    <div className="matrix-body">{Array.from({length: 100}, (_, i) => <i key={i} style={{opacity:.16 + (((i * 7 + Math.floor(i / 10) * 3) % 10) / 13)}} />)}<div className="matrix-interface" /></div>
    <div className="matrix-axis matrix-x">peptide residues</div><div className="matrix-axis matrix-y">NTSR1 residues</div>
    <div className="matrix-legend"><span>low error</span><i /><span>high error</span></div>
  </div>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <nav className={scrolled ? "nav nav-solid" : "nav"}>
        <a href="#top" className="brand"><span className="brand-mark">P</span><span>PepStruct<span>Loop</span></span></a>
        <div className="nav-links">
          <a href="#pipeline">Pipeline</a><a href="#structure">Structure</a><a href="#evidence">Evidence</a>
        </div>
        <a className="nav-cta" href="#workflow">View workflow ↗</a>
      </nav>

      <section className="hero" id="top">
        <div className="grid-field" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> SEQUENCE–STRUCTURE CLOSED LOOP</div>
          <h1><span className="product-title">PepStructLoop</span><small>From sequence universe<br />to <em>molecular interface.</em></small></h1>
          <p>蛋白质大语言模型探索十万级多肽序列空间，复合物结构预测进入三维界面，结构反馈驱动下一轮优化。</p>
          <div className="hero-actions">
            <a href="#funnel" className="button button-primary">Explore the pipeline <b>→</b></a>
            <a href="#evidence" className="button button-ghost">Scientific boundaries</a>
          </div>
          <div className="hero-tags">
            <span>TARGET <b>NTSR1 / O88319</b></span>
            <span>STATUS <b className="live">STRUCTURAL SCREENING</b></span>
            <span>CORE <b>4,016</b></span>
          </div>
        </div>
        <MoleculeVisual />
        <div className="scroll-cue"><span /> SCROLL TO ENTER THE PIPELINE</div>
      </section>

      <section className="metric-strip">
        {metrics.map((m) => <article key={m.label}><Status type="measured" /><strong>{m.value}</strong><h3>{m.label}</h3><p>{m.note}</p></article>)}
      </section>

      <section className="section funnel-section" id="funnel">
        <header className="section-heading">
          <div><span className="section-index">01 / EVIDENCE FUNNEL</span><h2>One hundred thousand ideas.<br /><em>One increasingly precise decision.</em></h2></div>
          <p>Every transition is traceable. Completed stages use measured values; future stages are explicitly marked as projections.</p>
        </header>
        <div className="legend"><span><i className="measured-dot" /> Measured</span><span><i className="running-dot" /> Running</span><span><i className="projected-dot" /> Projected</span></div>
        <div className="funnel-track">
          {funnel.map((stage, i) => (
            <div className={`funnel-row ${stage.status}`} key={stage.label}>
              <div className="funnel-meta"><span>{String(i + 1).padStart(2, "0")}</span><p>{stage.label}</p><Status type={stage.status} /></div>
              <div className="funnel-scale"><i style={{width:`${stage.width}%`}}><strong>{stage.value}</strong></i><b>{stage.rate}</b></div>
            </div>
          ))}
        </div>
        <p className="funnel-caption"><b>4.016%</b> of the generated sequence universe entered structure space.</p>
      </section>

      <section className="section spaces-section" id="workflow">
        <header className="section-heading compact"><div><span className="section-index">02 / TWO INTELLIGENCE SPACES</span><h2>Explore broadly.<br /><em>Decide structurally.</em></h2></div></header>
        <div className="space-grid">
          <article className="space-card sequence-card">
            <SequenceManifold />
            <Status type="measured" /><h3>Sequence space</h3><p className="space-question">What can exist?</p>
            <ul><li>PepMLM-650M conditional generation</li><li>22 peptide lengths · 12–33 aa</li><li>Four sampling regimes</li><li>PPL-guided plausibility</li><li>Physicochemical developability</li></ul>
          </article>
          <div className="space-bridge"><span>LANGUAGE</span><i>→</i><span>GEOMETRY</span></div>
          <article className="space-card structure-card" id="structure">
            <ConfidenceMatrix />
            <Status type="running" /><h3>Structure space</h3><p className="space-question">How may it interact?</p>
            <ul><li>Full-length 424 aa NTSR1</li><li>Shared receptor MSA · depth 512</li><li>Boltz complex prediction</li><li>Cross-chain PAE and interface confidence</li><li>Extracellular pose plausibility</li></ul>
          </article>
        </div>
      </section>

      <section className="section pipeline-section" id="pipeline">
        <header className="section-heading"><div><span className="section-index">03 / REPRODUCIBLE PIPELINE</span><h2>Seven stages.<br /><em>Every decision accounted for.</em></h2></div><p>Configuration fingerprints, deterministic ordering and stage-level manifests turn a generative experiment into a reproducible design system.</p></header>
        <div className="pipeline-list">
          {pipeline.map(([num, title, note, state]) => <article key={num} className={state}><span className="pipeline-num">{num}</span><div><h3>{title}</h3><p>{note}</p></div><Status type={state} /><span className="pipeline-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="section intelligence-section">
        <div className="intelligence-copy"><span className="section-index">04 / STRUCTURE INTELLIGENCE</span><h2>Not a score.<br /><em>An interface hypothesis.</em></h2><p>Structure prediction is used as an evidence layer: candidates are assessed through receptor–peptide confidence, uncertainty, contact coverage and extracellular accessibility.</p><div className="metric-chips"><span>pair-chain ipTM</span><span>cross-chain PAE</span><span>interface pLDDT</span><span>contact coverage</span><span>pose flags</span></div></div>
        <div className="analysis-panel">
          <div className="panel-head"><span>CANDIDATE INTERFACE</span><Status type="running" /></div>
          <div className="analysis-visual"><MoleculeVisual closeup /></div>
          <div className="pending-metrics"><span>Metrics will populate from Stage 06</span><i /></div>
        </div>
      </section>

      <section className="section loop-section">
        <header className="section-heading compact"><div><span className="section-index">05 / FEEDBACK OPTIMIZATION</span><h2>Predict. Inspect. Mutate.<br /><em>Return smarter.</em></h2></div></header>
        <div className="loop-layout">
          <div className="loop-diagram">
            {['Generate','Predict','Inspect','Mutate','Re-score','Select'].map((x,i)=><div key={x} className={`loop-node loop-${i}`}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}
            <div className="loop-center">STRUCTURE<br/><b>FEEDBACK</b></div>
          </div>
          <div className="loop-copy"><Status type="projected" /><h3>A controlled optimization loop</h3><p>Structural signals identify interface opportunities. Controlled mutations are proposed, filtered again by sequence plausibility, and re-evaluated in structure space.</p><div className="projection-grid"><div><strong>~100–200</strong><span>enter refinement</span></div><div><strong>5×</strong><span>conformations</span></div><div><strong>2–3</strong><span>optimization rounds</span></div><div><strong>~100</strong><span>final candidates</span></div></div></div>
        </div>
      </section>

      <section className="section diversity-section">
        <header className="section-heading"><div><span className="section-index">06 / DIVERSITY ATLAS</span><h2>Quality without<br /><em>collapsing diversity.</em></h2></div><p>The core library preserves multiple sampling regimes and all 22 designed peptide lengths.</p></header>
        <div className="diversity-grid">
          <div className="profile-chart"><div className="chart-head"><div><span>SAMPLING PROFILE</span><h3>Core library composition</h3></div><b>n = 4,016</b></div>{profiles.map(p=><div className="bar-row" key={p.name}><span>{p.name}</span><div><i style={{width:`${p.pct}%`,background:p.color}} /></div><strong>{p.value.toLocaleString()}<small>{p.pct}%</small></strong></div>)}<p><i /> Measured after diversity-aware selection</p></div>
          <div className="length-visual"><h3>Designed peptide length coverage</h3><div className="coverage-head"><span>LENGTH (aa)</span><b>22 / 22 covered</b></div><div className="length-axis">{Array.from({length:22},(_,i)=>12+i).map((x)=><i key={x}><span>{x}</span></i>)}</div><div className="coverage-note"><i /> Every discrete length from 12 to 33 aa is represented in the structural core. Bar height is intentionally not used because per-length counts are not reported here.</div></div>
        </div>
      </section>

      <section className="section evidence-section" id="evidence">
        <div className="evidence-title"><span className="section-index">07 / EVIDENCE BOUNDARY</span><h2>We know what the models can reveal.<br /><em>And what they cannot prove.</em></h2></div>
        <div className="boundary-grid">
          <article><span>01</span><h3>Confidence ≠ affinity</h3><p>Computational structure confidence is not experimental binding strength.</p></article>
          <article><span>02</span><h3>Peptides are single-sequence</h3><p>De novo peptide chains have no defensible evolutionary alignment.</p></article>
          <article><span>03</span><h3>Membrane context matters</h3><p>Extracellular accessibility and missing receptor regions remain explicit checks.</p></article>
          <article><span>04</span><h3>Experiment is the endpoint</h3><p>The final three peptides are hypotheses selected for biological validation.</p></article>
        </div>
      </section>

      <footer><div className="brand"><span className="brand-mark">P</span><span>PepStruct<span>Loop</span></span></div><p>De novo NTSR1-targeting peptide design · sequence to structure to evidence.</p><div><span>Target O88319</span><span>Core 4,016</span><span>2026</span></div></footer>
    </main>
  );
}
