# Imperium — Clinical Reasoning Educational Tool

A Next.js 14 web application that provides educational clinical reasoning support by exploring differential diagnoses and highlighting conditions associated with delayed recognition.

⚠️ **For educational purposes only. Not a medical device. Does not provide medical advice, diagnosis, or treatment recommendations.**

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key with `gpt-4o` access

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/s1business84-hub/Imperium..git
   cd Imperium.
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-proj-...
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

---

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fs1business84-hub%2FImperium.&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20key%20with%20gpt-4o%20access&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=imperium-medical-tool&repository-name=imperium-medical-tool)

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add environment variable in Vercel dashboard**
   - Go to your project settings
   - Navigate to Environment Variables
   - Add `OPENAI_API_KEY` with your OpenAI API key
   - Redeploy

### Environment Variables (Vercel)

| Variable | Description | Required |
|---|---|---|
| `OPENAI_API_KEY` | OpenAI API key with `gpt-4o` model access | ✅ Yes |

---

## 🏗️ Architecture

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main UI page
│   ├── globals.css         # Global styles
│   └── api/
│       └── analyze/
│           └── route.ts    # POST endpoint for LLM analysis
├── components/
│   ├── Disclaimer.tsx      # Regulatory-safe disclaimer
│   ├── InputForm.tsx       # Age, sex, symptoms, labs input
│   └── ResultsPanel.tsx    # Structured output display
├── lib/
│   ├── schemas.ts          # Zod validation + PII sanitization
│   └── systemPrompt.ts     # Regulatory-safe system prompt
├── .env.local              # Local environment variables (gitignored)
├── .env.example            # Environment variable template
└── vercel.json             # Vercel deployment config
```

---

## 🛡️ Regulatory Safety

### Design Constraints
- ✅ **No diagnosis** — uses hedged, educational language only
- ✅ **No treatment recommendations** — avoids medication/procedure guidance
- ✅ **No triage/urgency** — does not assign clinical priority
- ✅ **No outcome claims** — does not claim to improve clinical outcomes
- ✅ **Stateless** — no database, no user accounts, no data persistence
- ✅ **PII sanitization** — strips names, emails, phone numbers, dates, IDs
- ✅ **Schema validation** — Zod enforces structured JSON output
- ✅ **Rate limiting** — basic per-IP rate limiting (10 req/min)

### Key Safety Features
- Prominent disclaimer on every page
- "Educational purposes only" framing throughout
- No individualized clinical recommendations
- Transparent reasoning for all considerations
- Cognitive checkpoint to reduce premature closure

---

## 🔒 Security

- API key stored in environment variables only (never in frontend)
- Input length limits to prevent abuse
- Basic rate limiting (10 requests per minute per IP)
- PII detection and redaction
- No request logging or data persistence
- Schema validation on all LLM outputs

---

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Validation:** Zod
- **LLM:** OpenAI GPT-4o
- **Deployment:** Vercel

---

## 🧪 Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## 📄 License

This project is for educational purposes only. See LICENSE file for details.

---

## ⚠️ Legal Disclaimer

**THIS SOFTWARE IS PROVIDED FOR EDUCATIONAL PURPOSES ONLY.**

This tool does not constitute medical advice, diagnosis, or treatment recommendations. It is not a medical device and is not intended to inform clinical decisions of any kind. 

All medical information should be verified with qualified healthcare professionals. In case of medical emergency, contact emergency services immediately.

The developers and contributors assume no liability for any use of this software or the information it provides.

---

## 🤝 Contributing

Contributions are welcome, but all changes must maintain regulatory safety constraints:
- No diagnostic language
- No treatment recommendations  
- No triage/urgency assignments
- Educational framing only

---

## 📞 Support

For issues or questions, please open a GitHub issue at:
https://github.com/s1business84-hub/Imperium./issues

---

**Built with safety-first design principles for educational clinical reasoning exploration.**
