export const ADMIN_STORAGE_KEYS = {
  hero: 'prashant-portfolio-admin-hero',
  about: 'prashant-portfolio-admin-about',
  profiles: 'prashant-portfolio-admin-profiles',
};

export const defaultHeroData = {
  name: 'Prashant Patel',
  title: 'Computer Science Student',
  subtitle: '&',
  intro: 'Passionate about Java, Python, web development and Generative AI. I enjoy building practical solutions and exploring new technologies.',
  roles: ['Problem Solver', 'AI Enthusiast', 'Frontend Developer', 'Software Developer'],
};

export const defaultAboutData = {
  bio: 'Passionate Computer Science student with good foundation in Java, Python, web development, and Generative AI. I enjoy building practical solutions and exploring new technologies.',
  education: 'Galgotias University',
  focus: 'Software Development • AI • Web Development',
  learning: 'MySQL • MongoDB • AWS',
};

export const defaultProfiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    href: 'https://leetcode.com/u/Prasssaahahnat/',
    icon: 'leetcode',
  },
  {
    id: 'codolio',
    name: 'Codolio',
    href: 'https://codolio.com/profile/Prasssaahahnat/card',
    icon: 'codolio',
  },
  {
    id: 'gfg',
    name: 'GeeksforGeeks',
    href: 'https://www.geeksforgeeks.org/user/YOUR_GFG_HANDLE/',
    icon: 'gfg',
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    href: 'https://www.hackerrank.com/profile/Praxntpatel',
    icon: 'hackerrank',
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    href: 'https://codeforces.com/profile/YOUR_CF_HANDLE',
    icon: 'codeforces',
  },
];

export const readStorageJSON = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorageJSON = (key, value) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};
