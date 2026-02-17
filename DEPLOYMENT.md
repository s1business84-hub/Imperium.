# Vercel Deployment Checklist

## Pre-Deployment

- [x] Production build passes (`npm run build`)
- [x] Lint passes with no errors (`npm run lint`)
- [x] TypeScript compilation successful
- [x] Environment variables documented in `.env.example`
- [x] API route marked as serverless (ƒ) in build output
- [x] `.gitignore` includes `.env.local`, `.vercel`, and sensitive files
- [x] `README.md` includes deployment instructions
- [x] `vercel.json` configured for Next.js 14

## Vercel Setup

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `s1business84-hub/Imperium.`
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave default)
   - Build Command: `next build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
5. Add Environment Variable:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-...` (your OpenAI API key)
   - Environment: **Production**, **Preview**, **Development**
6. Click "Deploy"

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? imperium-medical-tool
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add OPENAI_API_KEY production
# (paste your OpenAI API key when prompted)

vercel env add OPENAI_API_KEY preview
vercel env add OPENAI_API_KEY development

# Deploy to production
vercel --prod
```

## Post-Deployment Verification

- [ ] Visit your production URL (e.g., `imperium-medical-tool.vercel.app`)
- [ ] Verify disclaimer displays correctly
- [ ] Test form submission with sample symptoms
- [ ] Confirm structured JSON output renders
- [ ] Check that API returns 429 on excessive requests (rate limiting)
- [ ] Verify no 500/502 errors in Vercel logs
- [ ] Test on mobile and desktop browsers

## Expected Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    16.4 kB         104 kB
├ ○ /_not-found                          871 B            88 kB
└ ƒ /api/analyze                         0 B                0 B
```

- `/` is static (○) — fast initial load
- `/api/analyze` is serverless (ƒ) — scales automatically

## Troubleshooting

### Issue: 500 Error on API Route

**Solution:** Check Vercel logs for error details:
```bash
vercel logs [deployment-url]
```

Common causes:
- Missing `OPENAI_API_KEY` environment variable
- API key doesn't have `gpt-4o` model access
- Rate limit exceeded on OpenAI account

### Issue: Build Fails

**Solution:** 
```bash
# Run local build to debug
npm run build

# Check for TypeScript errors
npm run lint
```

### Issue: Environment Variables Not Working

**Solution:**
1. Verify env vars are set in Vercel dashboard under Project Settings → Environment Variables
2. Ensure they're enabled for correct environments (Production/Preview/Development)
3. Redeploy after adding/changing env vars

## Security Notes

- ✅ `.env.local` is gitignored (API key never committed)
- ✅ API key only accessible server-side via `process.env`
- ✅ Rate limiting prevents abuse (10 req/min per IP)
- ✅ PII sanitization strips sensitive data
- ✅ No request logging or data persistence

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning (~5 minutes)

## Monitoring

- **Function Logs:** Vercel Dashboard → Deployments → [select deployment] → Functions
- **Analytics:** Vercel Dashboard → Analytics (requires Pro plan)
- **Error Tracking:** Consider integrating Sentry for production error monitoring

---

**Your app is now production-ready for Vercel! 🚀**
