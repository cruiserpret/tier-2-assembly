<template>
  <div class="home">

    <section class="hero">
      <div class="hero-eyebrow fade-up mono">
        <span class="live-dot"></span>
        Predictive public opinion engine
      </div>

      <div class="hero-logo-wrap fade-up fade-up-1">
        <div class="hero-logo-bg">
          <div class="logo-grid-lines"></div>
        </div>
        <div class="hero-logo-inner">
          <div class="hero-bracket">[</div>
          <div class="display hero-wordmark">ASSEMBLY</div>
          <div class="hero-bracket">]</div>
        </div>
        <h1 class="hero-h1">
          Model where public opinion<br/>lands — before it does.
        </h1>
        <div class="hero-tagline display">REHEARSE REALITY.</div>
      </div>

      <p class="hero-sub fade-up fade-up-2">
        Spawn hundreds of AI agents grounded in real-world data. Watch them argue,
        shift, and converge — producing a God's Eye View of where consensus is actually headed.
      </p>

      <div class="stats-row fade-up fade-up-3">
        <div class="hero-stat-card">
          <div class="hsc-icon">◎</div>
          <div class="hsc-title mono">Simulate</div>
          <div class="hsc-desc">Real agents with distinct personas debate your topic across structured rounds</div>
        </div>
        <div class="hero-stat-card">
          <div class="hsc-icon">⟳</div>
          <div class="hsc-title mono">Evolve</div>
          <div class="hsc-desc">Agents shift opinions, challenge each other, and form emergent consensus</div>
        </div>
        <div class="hero-stat-card">
          <div class="hsc-icon">◈</div>
          <div class="hsc-title mono">Predict</div>
          <div class="hsc-desc">God's Eye View reveals who shifted, what argued mattered, and where opinion heads</div>
        </div>
      </div>
    </section>

    <section class="launch-section fade-up fade-up-4">
      <div class="launch-card">
        <div class="launch-header">
          <span class="mono" style="font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-muted)">
            New Simulation
          </span>
        </div>
        <div class="divider" style="margin:16px 0;"></div>

        <div class="form-group">
          <label class="form-label mono">Topic</label>
          <textarea
            v-model="form.topic"
            class="textarea"
            placeholder="Should AI be regulated by governments?"
            rows="3"
            :disabled="loading"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label mono">
              Agents
              <span class="accent mono">{{ form.num_agents }}</span>
            </label>
            <input v-model.number="form.num_agents" type="range" min="5" max="50" step="5" class="range" :disabled="loading"/>
            <div class="range-labels mono"><span>5</span><span>50</span></div>
          </div>
          <div class="form-group">
            <label class="form-label mono">
              Rounds
              <span class="accent mono">{{ form.num_rounds }}</span>
            </label>
            <input v-model.number="form.num_rounds" type="range" min="1" max="10" step="1" class="range" :disabled="loading"/>
            <div class="range-labels mono"><span>1</span><span>10</span></div>
          </div>
        </div>

        <p v-if="error" class="error-msg mono">⚠ {{ error }}</p>

        <button class="btn btn-primary launch-btn" :disabled="!form.topic.trim() || loading" @click="launch">
          <span v-if="loading" class="spinner"></span>
          <span v-else>▶</span>
          {{ loading ? 'Spawning agents...' : 'Launch Simulation' }}
        </button>

        <p class="launch-hint mono">
          Assembly will ingest real-world data, generate agents, and run a structured debate.
        </p>
      </div>

      <div class="feature-pills">
        <div class="pill" v-for="f in features" :key="f.label">
          <span class="pill-dot" :style="`background:${f.color}`"></span>
          <span>{{ f.label }}</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { assembly } from '../api/assembly.js'

const router  = useRouter()
const form    = ref({ topic: '', num_agents: 20, num_rounds: 3 })
const loading = ref(false)
const error   = ref('')

const features = [
  { label: 'Structured debate engine',  color: 'var(--accent)' },
  { label: 'Evolving agent personas',   color: 'var(--for)' },
  { label: "God's Eye View report",     color: '#A78BFA' },
  { label: 'Live event injection',      color: 'var(--against)' },
  { label: 'Sentiment trajectory',      color: '#60A5FA' },
  { label: 'Simulation branching',      color: '#FBBF24' },
]

async function launch() {
  if (!form.value.topic.trim()) return
  loading.value = true
  error.value = ''
  try {
    const res = await assembly.startSimulation(form.value)
    router.push(`/simulation/${res.simulation_id}`)
  } catch (e) {
    error.value = e.message || 'Failed to start simulation'
    loading.value = false
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px 60px;
}

/* ── Hero ── */
.hero {
  text-align: center;
  max-width: 720px;
  width: 100%;
  margin-bottom: 64px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.hero-logo-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}
.hero-logo-bg {
  position: absolute;
  inset: -20px -60px;
  border: 1px solid rgba(200,255,87,0.08);
  border-radius: 4px;
  overflow: hidden;
  pointer-events: none;
}
.logo-grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(200,255,87,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,255,87,0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}
.hero-logo-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.hero-bracket {
  font-family: var(--mono);
  font-size: clamp(24px, 5vw, 56px);
  color: var(--accent);
  opacity: 0.5;
  line-height: 1;
  font-weight: 300;
}
.hero-wordmark {
  font-size: clamp(48px, 10vw, 100px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  background: linear-gradient(180deg, #fff 0%, rgba(228,234,245,0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-h1 {
  font-family: var(--body);
  font-size: clamp(22px, 3.5vw, 36px);
  font-weight: 300;
  line-height: 1.3;
  color: var(--text);
  margin-top: 20px;
  margin-bottom: 0;
  letter-spacing: -0.01em;
}
.hero-tagline {
  font-family: var(--display);
  font-size: clamp(12px, 1.8vw, 18px);
  letter-spacing: 0.25em;
  color: var(--accent);
  margin-top: 12px;
  opacity: 0.6;
}
.hero-tagline::after {
  content: '';
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  margin-top: 6px;
  opacity: 0.4;
}

.hero-sub {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.7;
  font-weight: 300;
  margin-bottom: 36px;
}

/* Stat cards */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  margin-bottom: 0;
}
.hero-stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px 16px;
  text-align: left;
  transition: border-color var(--transition);
}
.hero-stat-card:hover { border-color: rgba(200,255,87,0.2); }
.hsc-icon { font-size: 18px; color: var(--accent); margin-bottom: 10px; display: block; }
.hsc-title { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; font-family: var(--mono); }
.hsc-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

/* Launch card */
.launch-section { width: 100%; max-width: 620px; }
.launch-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  margin-bottom: 20px;
}
.form-group { margin-bottom: 24px; }
.form-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.range {
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: var(--surface-2);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  margin-bottom: 6px;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(200,255,87,0.5);
  transition: transform var(--transition);
}
.range::-webkit-slider-thumb:hover { transform: scale(1.2); }
.range-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--text-dim); }

.error-msg {
  font-size: 12px;
  color: var(--against);
  margin-bottom: 16px;
  padding: 10px 14px;
  background: rgba(255,77,109,0.08);
  border: 1px solid rgba(255,77,109,0.2);
  border-radius: var(--radius);
}
.launch-btn {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 12px;
  margin-bottom: 12px;
}
.launch-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}
.launch-hint {
  text-align: center;
  font-size: 10px;
  color: var(--text-dim);
  letter-spacing: 0.03em;
}

/* Feature pills */
.feature-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.pill {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
  padding: 5px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 100px;
}
.pill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

/* Mobile */
@media (max-width: 640px) {
  .home { padding: 40px 16px 40px; }
  .hero { margin-bottom: 32px; }
  .hero-logo-bg { inset: -12px -16px; }
  .hero-h1 { font-size: 20px; }
  .hero-sub { font-size: 13px; }
  .stats-row { grid-template-columns: 1fr; gap: 8px; }
  .hero-stat-card { padding: 14px 12px; }
  .hsc-desc { font-size: 11px; }
  .launch-card { padding: 20px 16px; }
  .form-row { grid-template-columns: 1fr; gap: 16px; }
  .feature-pills { gap: 6px; }
  .pill { font-size: 10px; padding: 4px 10px; }
}
</style>