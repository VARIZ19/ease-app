export const BRAND = `BRAND: ease∞ | easeautomation.vercel.app | hello@getease.io | Chandigarh, India
TAGLINE: "Stop doing manually what machines can do for you."
COLORS: Background #000, Accent #00FF88 (neon green), Secondary #00E5FF (cyan), Cards #111/#1a1a1a, Text white/#888
FONT: Inter or Geist — clean sans-serif, no decorative fonts
STYLE: Premium dark SaaS · Minimal brutalist · Dev-cool · NOT flashy, just sharp
UI: Dark rounded cards, glowing green borders, subtle grid background, terminal-style text
STACK: n8n, OpenAI, Claude AI, Chrome Extensions, Make, HubSpot, Notion, Airtable, Gmail API
LOGO: Always show "ease∞" — never on light background`;

export const startupData = {
  saas: { name: 'SaaS Startup', pain: 'manually managing trials, onboarding, and churn — ops team drowning in repetitive tasks', hook: 'SaaS companies lose 30% of trials to slow onboarding. We automate it.', value: 'Trial signup → welcome email → onboarding drip → CRM tag → churn alert', save: '40 hrs/week', price: '₹40k–1.5L' },
  ecom: { name: 'E-commerce Brand', pain: 'order confirmations, inventory updates, and review requests done manually every day', hook: 'E-commerce ops killing your time? We automate orders, inventory, and reviews.', value: 'Order placed → inventory sync → confirmation send → warehouse alert → review request', save: '30 hrs/week', price: '₹20k–60k' },
  agency: { name: 'Marketing Agency', pain: 'spending hours on client reporting, lead handoffs, and proposal sends every week', hook: 'Agencies waste 10+ hrs/week on reports. We automate them.', value: 'Client report auto-pulled → formatted PDF → sent to client → next month scheduled', save: '35 hrs/week', price: '₹25k–80k' },
  realestate: { name: 'Real Estate Business', pain: 'leads coming in and not getting followed up fast enough — deals lost to slow response', hook: 'Real estate leads go cold in 5 minutes. We automate instant follow-up.', value: 'Lead form → instant SMS/WhatsApp → CRM entry → site visit scheduler → drip follow-up', save: '25 hrs/week', price: '₹15k–40k' },
  hr: { name: 'HR / Recruitment Firm', pain: 'interview scheduling, offer letters, and onboarding done manually — 50% of HR time wasted', hook: 'HR teams waste 50% of time on admin. We give it back.', value: 'Candidate applies → screened → interview scheduled → offer letter sent → onboarding triggered', save: '30 hrs/week', price: '₹20k–60k' },
  fintech: { name: 'Fintech Startup', pain: 'KYC collection, invoice generation, and payment reminders handled manually by the ops team', hook: 'Manual KYC and invoices killing your ops? We automate them end-to-end.', value: 'User onboards → KYC docs requested → verified → invoice generated → payment reminder drip', save: '35 hrs/week', price: '₹50k–1.5L' },
  edtech: { name: 'EdTech / Course Creator', pain: 'enrollment confirmations, content drips, certificates, and upsells done one by one manually', hook: 'EdTech operators burn hours on manual emails. We automate the entire student journey.', value: 'Enrolled → welcome sequence → weekly content drip → quiz trigger → certificate send → upsell', save: '20 hrs/week', price: '₹15k–50k' },
  solo: { name: 'Solopreneur / Consultant', pain: 'spending half the day on emails, invoices, proposals, and follow-ups instead of client work', hook: "Solopreneurs doing ₹50k/hr work shouldn't spend time on ₹500/hr tasks.", value: 'Lead fills form → proposal sent → invoice generated → follow-up automated → onboarding starts', save: '15 hrs/week', price: '₹8k–25k' }
};

export function generatePostPrompt({ platform, theme, auto, audience, tone }) {
  const sizes = { 'Instagram': '1080x1080px square', 'LinkedIn': '1200x627px horizontal', 'Twitter / X': '1600x900px horizontal', 'All 3 platforms': 'all three sizes: 1080x1080 + 1200x627 + 1600x900' };
  const sz = sizes[platform] || '1080x1080px';
  return `CREATE A SOCIAL MEDIA POST GRAPHIC FOR ease∞

${BRAND}

TASK: Design a ${platform} post graphic (${sz})
THEME: ${theme}
AUTOMATION FEATURED: ${auto}
TARGET AUDIENCE: ${audience}
TONE: ${tone}

VISUAL LAYOUT:
- Background: Pure black #000000
- TOP: Bold white headline (max 8 words) — make it hit hard
- MIDDLE: Visual showing workflow/automation nodes or dark card UI mockup
- BOTTOM: ease∞ logo left + "easeautomation.vercel.app" right
- CTA button: "Book free audit →" in neon green #00FF88

HEADLINE IDEAS (pick strongest):
• "You're still doing [task] manually. In 2025."
• "Your [business process] can run itself."
• "[Number] hours saved. Every single week."

COPY RULES:
- NO stock photos, NO humans smiling at laptops
- NO light backgrounds, NO colorful gradients
- NO decorative fonts, NO crowding — whitespace is power
- Neon green ONLY for CTA, accent lines, and logo
- All other text: white (primary) or #888 (secondary)

CAPTION FOR POST (write separately):
- Hook line (first sentence grabs attention in 3 seconds)
- 3-4 lines of value
- CTA: "DM 'AUTOMATE' to get started"
- Hashtags: #automation #n8n #aiautomation #startupindia #nocode #workflow #easeautomation`;
}

export function generateStartupPitchPrompt({ type, platform }) {
  const d = startupData[type];
  return `WRITE A COLD PITCH FOR ease∞ TARGETING: ${d.name.toUpperCase()}

${BRAND}
PRICING: Simple ₹8k–15k | Medium ₹20k–40k | Full System ₹60k–1.5L | Retainer ₹5-10k/mo

TARGET: ${d.name}
PLATFORM: ${platform}
THEIR PAIN: ${d.pain}
HOOK: "${d.hook}"
AUTOMATION VALUE: ${d.value}
TIME SAVED: ${d.save}
PRICE RANGE: ${d.price}

DELIVERABLE: Write a complete ${platform} pitch for ease∞ to send to a ${d.name}.

PITCH MUST INCLUDE:
1. OPENER: Name their exact pain in first line. No fluff.
2. HOOK: One stat or question that stops them
3. SOLUTION: "We build: [${d.value}]"
4. PROOF: "10+ businesses automated, 5-7 day delivery, 99.6% success rate"
5. RESULT: "You save ${d.save} every week"
6. CTA: Soft ask — "Worth a 15-min call?" or "Want to see how it works for ${d.name}?"
7. SIGN OFF: ease∞ | easeautomation.vercel.app

ALSO WRITE:
- Subject line (if email)
- 2 follow-up messages (day 3 and day 7)
- One objection handler: "We don't have budget right now"

TONE: Confident. Minimal. No fluff. Founder speaking to founder.`;
}

export function generateFullBrandPrompt() {
  return `EASE∞ MASTER BRAND PROMPT
===========================
Brand Name: ease∞ (lowercase ease + infinity symbol)
Website: easeautomation.vercel.app
Contact: hello@getease.io
Location: Chandigarh, India
Tagline: "Stop doing manually what machines can do for you."
Sub-tagline: "Save 40+ hours a week. Scale without hiring."

VISUAL IDENTITY:
• Background: #000000 (pure black) or #0a0a0a
• Primary Accent: #00FF88 (neon green) — CTA, highlights, logo glow
• Secondary: #00E5FF (cyan) — secondary highlights
• Cards: #111111 / #1a1a1a
• Border: #222222
• Text Primary: #FFFFFF
• Text Secondary: #888888
• Font: Inter or Geist — clean modern sans-serif. Never decorative.
• UI Elements: Rounded dark cards, glowing borders, dot/grid bg, terminal text
• Vibe: Premium dark SaaS · Developer-cool · Minimal brutalist

LOGO: ease∞ — always lowercase, never on light bg, can glow behind ∞

STACK: n8n · OpenAI · Claude AI · Chrome Extensions · Make · HubSpot · Notion · Airtable · Gmail API

SERVICES:
• n8n Automation Workflows
• Chrome Extensions
• AI Integrations (OpenAI + Claude)
• CRM Automation
• Cold Outreach Machines
• Full Business Automation Systems

TOP AUTOMATIONS (use in content):
1. Lead Capture → CRM (saves 40 hrs/mo)
2. Cold Outreach Machine (saves 50 hrs/mo)
3. Meeting → Task via AI (saves 20 hrs/mo)
4. Invoice Auto-Generator (saves 25 hrs/mo)
5. Social Media Scheduler (saves 30 hrs/mo)
6. Support Ticket Router (saves 35 hrs/mo)

STATS TO USE:
• 40+ hours saved per week
• 5–7 day delivery
• 99.6% success rate
• 10+ businesses automated
• Save ₹3L/year on ops costs

PRICING:
• Simple (1 tool): ₹8k–15k
• Medium (3 tools): ₹20k–40k
• Full System (5+ tools): ₹60k–1.5L
• Monthly Retainer: ₹5k–10k/month

TONE OF VOICE:
• Sharp. Minimal. No fluff.
• Speaks to: startup founders, agency owners, ops heads, solopreneurs
• Avoids: corporate jargon, "excited to announce", buzzwords
• Voice: Confident builder who ships fast

CTAs TO ROTATE:
• "Book your free audit →"
• "Get 40 hrs back →"
• "Let machines do it →"
• "DM 'AUTOMATE' to start"
• "easeautomation.vercel.app"

NEVER:
• Light/white backgrounds
• Stock photos of people smiling at laptops
• Colorful gradients
• Comic Sans or decorative fonts
• Overcrowding — whitespace is power
• "We are excited to announce" energy`;
}
