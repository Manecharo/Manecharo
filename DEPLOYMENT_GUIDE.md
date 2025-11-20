# Bot Protection Deployment Guide

## Required Environment Variables for Production

Your contact form now has enhanced bot protection that **requires** these environment variables to be set in your **Vercel production environment**:

### reCAPTCHA v3 (Required)

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeUQxAsAAAAANjBdRmgZ2R187PmujnaVxjpWXXD
RECAPTCHA_SECRET_KEY=6LeUQxAsAAAAAFgoE8KROio-iJEx1Ie4o72xkW1k
```

### Email Service (Already configured)

```bash
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@manecharo.com
```

---

## How to Deploy to Vercel

### Option 1: Using Vercel CLI (Fastest)

```bash
# Set the environment variables
npx vercel env add NEXT_PUBLIC_RECAPTCHA_SITE_KEY
# When prompted, paste: 6LeUQxAsAAAAANjBdRmgZ2R187PmujnaVxjpWXXD
# Select: Production, Preview, Development

npx vercel env add RECAPTCHA_SECRET_KEY
# When prompted, paste: 6LeUQxAsAAAAAFgoE8KROio-iJEx1Ie4o72xkW1k
# Select: Production, Preview, Development

# Redeploy to pick up the new environment variables
npx vercel --prod
```

### Option 2: Using Vercel Dashboard (Manual)

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (manecharo-portfolio)
3. Go to **Settings** > **Environment Variables**
4. Add each variable:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - Value: `6LeUQxAsAAAAANjBdRmgZ2R187PmujnaVxjpWXXD`
   - Environments: ✓ Production ✓ Preview ✓ Development

   **Variable 2:**
   - Key: `RECAPTCHA_SECRET_KEY`
   - Value: `6LeUQxAsAAAAAFgoE8KROio-iJEx1Ie4o72xkW1k`
   - Environments: ✓ Production ✓ Preview ✓ Development

5. **Redeploy** your application:
   - Go to **Deployments** tab
   - Click the three dots (...) on the latest deployment
   - Click **Redeploy** > **Redeploy with existing build cache**

---

## Verification

After deployment, verify everything works:

1. **Check reCAPTCHA Integration:**
   - Go to: https://www.google.com/recaptcha/admin/site/YOUR_SITE_KEY
   - You should see successful verifications appearing

2. **Test Contact Form:**
   - Visit your contact page: https://manecharo.com/contact
   - Fill out and submit the form
   - Check your email for the notification

3. **Monitor Logs:**
   - In Vercel dashboard, go to **Logs** or **Runtime Logs**
   - Look for successful submissions with reCAPTCHA scores
   - Example: `Form submission passed all checks - IP: xxx.xxx.xxx.xxx, reCAPTCHA score: 0.9`

4. **Test Bot Protection:**
   - Try submitting the form very quickly (< 3 seconds) - should be blocked
   - Try submitting multiple times rapidly - should hit rate limit after 3 attempts

---

## Security Features Now Active

Once deployed, these protections will be active:

✅ **reCAPTCHA v3** - Score-based bot detection (threshold: 0.7)
✅ **Rate Limiting** - Max 3 submissions per IP per 15 minutes
✅ **Honeypot Field** - Catches auto-fill bots
✅ **Timing Validation** - Blocks forms filled in < 3 seconds
✅ **Email Validation** - Regex-based email verification
✅ **IP Logging** - All security events logged with IP addresses

---

## Troubleshooting

### If users report "Security verification failed"

**Possible causes:**
1. reCAPTCHA score too low (< 0.7) - might be a bot or VPN user
2. Rate limit exceeded - user submitted too many times
3. Form filled too quickly - legitimate user was very fast

**Solutions:**
- Ask user to try again from a different network
- Temporarily lower reCAPTCHA threshold from 0.7 to 0.6 in `src/app/api/contact/route.ts`
- Check Vercel logs for the specific error

### If no emails are being sent

1. Check Vercel logs for errors
2. Verify `RESEND_API_KEY` is set correctly
3. Check Resend dashboard for email delivery status
4. Verify reCAPTCHA environment variables are set

### If reCAPTCHA shows "unprotected events" warning

- This means tokens are being generated but not verified
- **Solution:** Ensure `RECAPTCHA_SECRET_KEY` is set in Vercel environment
- Redeploy after setting the variable

---

## Quick Deploy Command

Run this to deploy immediately with environment check:

```bash
# Pull environment variables from Vercel (if already set)
npx vercel env pull

# Deploy to production
npx vercel --prod
```

---

## Support

If you encounter issues, check:
- Vercel deployment logs
- Browser console for client-side errors
- reCAPTCHA admin console for verification stats
- Email sent to: manuelerfreelance@gmail.com
