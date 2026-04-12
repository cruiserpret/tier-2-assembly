const BASE = import.meta.env.VITE_API_URL
  ? `${ import.meta.env.VITE_API_URL }/api`
  : '/api'

async function request(url, options = {}) {
  const res = await fetch(`${ BASE }${ url }`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...options.headers
    },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || `HTTP ${ res.status }`)
  }
  return res.json()
}

export const assembly = {
  startSimulation({ topic, num_agents = 20, num_rounds = 3, uploads = [] }) {
    return request('/simulation/start', {
      method: 'POST',
      body: JSON.stringify({ topic, num_agents, num_rounds, uploads }),
    })
  },
  getDebate(simulationId) {
    return request(`/simulation/${ simulationId }/debate`)
  },
  getReport(simulationId) {
    return request(`/report/${ simulationId }`)
  },
  getSentimentHistory(simulationId) {
    return request(`/sentiment/history/${ simulationId }`)
  },
  injectEvent({ simulation_id, event }) {
    return request('/inject', {
      method: 'POST',
      body: JSON.stringify({ simulation_id, event }),
    })
  },
  branchSimulation({ simulation_id, from_tick }) {
    return request('/branch', {
      method: 'POST',
      body: JSON.stringify({ simulation_id, from_tick }),
    })
  },
  getAgentMemory(agentId) {
    return request(`/agent/${ agentId }/memory`)
  },
}