const OWNER = 'Art-abg';
const REPO = 'devops-playground';
const BASE = 'https://api.github.com';

const headers = {
  'Accept': 'application/vnd.github.v3+json',
};

// Cache to avoid hitting rate limits (60 req/hr unauthenticated)
const cache = new Map();
const CACHE_TTL = 60_000; // 1 minute

async function fetchCached(url) {
  const now = Date.now();
  const cached = cache.get(url);
  if (cached && now - cached.time < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    cache.set(url, { data, time: now });
    return data;
  } catch (err) {
    console.warn('GitHub API error:', err.message);
    // Return cached data even if stale, or null
    return cached?.data ?? null;
  }
}

export async function getRepoInfo() {
  const data = await fetchCached(`${BASE}/repos/${OWNER}/${REPO}`);
  if (!data) return null;
  return {
    name: data.full_name,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    watchers: data.watchers_count,
    language: data.language,
    defaultBranch: data.default_branch,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    pushedAt: data.pushed_at,
    size: data.size,
    visibility: data.visibility,
  };
}

export async function getWorkflowRuns(perPage = 5) {
  const data = await fetchCached(
    `${BASE}/repos/${OWNER}/${REPO}/actions/runs?per_page=${perPage}`
  );
  if (!data?.workflow_runs) return [];
  return data.workflow_runs.map(run => ({
    id: run.id,
    name: run.name,
    status: run.status,           // queued, in_progress, completed
    conclusion: run.conclusion,   // success, failure, cancelled, etc.
    branch: run.head_branch,
    commitMsg: run.head_commit?.message ?? '',
    commitSha: run.head_commit?.id?.slice(0, 7) ?? '',
    createdAt: run.created_at,
    updatedAt: run.updated_at,
    url: run.html_url,
    runNumber: run.run_number,
  }));
}

export async function getCommits(perPage = 10) {
  const data = await fetchCached(
    `${BASE}/repos/${OWNER}/${REPO}/commits?per_page=${perPage}`
  );
  if (!data) return [];
  return data.map(c => ({
    sha: c.sha.slice(0, 7),
    message: c.commit.message.split('\n')[0], // first line only
    author: c.commit.author.name,
    date: c.commit.author.date,
    url: c.html_url,
  }));
}

export async function getLanguages() {
  const data = await fetchCached(`${BASE}/repos/${OWNER}/${REPO}/languages`);
  if (!data) return [];
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  return Object.entries(data).map(([name, bytes]) => ({
    name,
    bytes,
    percentage: ((bytes / total) * 100).toFixed(1),
  }));
}

export async function getContributors() {
  const data = await fetchCached(
    `${BASE}/repos/${OWNER}/${REPO}/contributors?per_page=10`
  );
  if (!data) return [];
  return data.map(c => ({
    login: c.login,
    avatar: c.avatar_url,
    contributions: c.contributions,
    url: c.html_url,
  }));
}
