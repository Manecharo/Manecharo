# Push to GitHub - Step by Step Guide

## ✅ Current Status

Your code is ready to push:
- ✅ All features implemented and working
- ✅ .gitignore configured (protects .env file)
- ✅ Professional code quality
- ✅ Typewriter animations working
- ✅ Full-screen video background
- ✅ Translation system functional
- ✅ Mobile layout perfect

---

## 🚀 Push to GitHub (Manual Steps)

Since git operations require manual confirmation, here are the exact commands to run:

### Step 1: Initialize Git Repository

Open your terminal in the project folder and run:

```bash
cd "D:\Trabajos\MER - Consultant\Website"
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: Professional portfolio with typewriter animations, full-screen video, and multi-language support

Features:
- Typewriter animation system (sequential, character-by-character)
- Full-screen background video with overlay
- Multi-language support (EN/ES/IT)
- Professional mobile layout (logo left, menu right)
- Language switcher in mobile menu (horizontal bottom layout)
- All assets integrated (logo, video, portrait, OG image)
- Sanity CMS integration ready
- NextAuth authentication system
- Spatial navigation system
- Responsive design throughout

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 4: Add Remote Repository

**If repository doesn't exist yet:**

1. Go to https://github.com/Manecharo
2. Click "New repository"
3. Name: `Manecharo` (or `portfolio` or whatever you prefer)
4. **Don't** initialize with README (we already have code)
5. Click "Create repository"

**Then run:**
```bash
git remote add origin https://github.com/Manecharo/Manecharo.git
```

**If repository already exists:**
```bash
git remote add origin https://github.com/Manecharo/Manecharo.git
```

### Step 5: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

---

## 🔐 Security Check

### Protected Files (Won't Be Pushed):

✅ `.env` - Your environment variables (API keys, passwords)
✅ `node_modules/` - Dependencies
✅ `.next/` - Build files

### What WILL Be Pushed:

✅ All source code
✅ Documentation (markdown files)
✅ Public assets (logo, video, images)
✅ Configuration files (package.json, tailwind.config, etc.)

---

## 📝 Quick Commands (Copy-Paste Ready)

```bash
# Navigate to project
cd "D:\Trabajos\MER - Consultant\Website"

# Initialize git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Professional portfolio with typewriter animations, full-screen video, and multi-language support

Features:
- Typewriter animation system (sequential, character-by-character)
- Full-screen background video with overlay
- Multi-language support (EN/ES/IT)
- Professional mobile layout (logo left, menu right)
- Language switcher in mobile menu (horizontal bottom layout)
- All assets integrated (logo, video, portrait, OG image)
- Sanity CMS integration ready
- NextAuth authentication system
- Spatial navigation system
- Responsive design throughout

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Add remote (replace with your actual repo URL if different)
git remote add origin https://github.com/Manecharo/Manecharo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔄 After First Push

For future updates, you only need:

```bash
git add .
git commit -m "Your commit message here"
git push
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Manecharo/Manecharo.git
```

### Issue 2: "Repository not found"
- Make sure the repository exists on GitHub
- Check the URL is correct
- Verify you're logged in to GitHub

### Issue 3: "Authentication failed"
- GitHub no longer supports password authentication
- Use a Personal Access Token (PAT) instead
- Or use SSH keys

**To create a Personal Access Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Copy the token (you'll only see it once!)
5. Use it as your password when pushing

### Issue 4: "Warning: LF will be replaced by CRLF"
This is normal on Windows, you can ignore it or run:
```bash
git config core.autocrlf true
```

---

## 📊 What's Being Committed

### Files Summary:
- ~150+ source files
- ~15 documentation markdown files
- ~20 logo/asset files
- 1 video file (9MB)
- 1 portrait image
- 1 OG share image
- Configuration files

### Total Size: ~15-20 MB
(Well within GitHub's limits)

---

## 🎯 Commit Message Breakdown

Your initial commit message includes:

**Title:**
"Initial commit: Professional portfolio..."

**Body:**
- Feature list (what's included)
- Technologies used
- Key capabilities

**Footer:**
- Claude Code attribution
- Co-authored by tag

This follows professional commit message standards!

---

## 🌐 Deploy to Vercel (After Push)

Once pushed to GitHub, deploy to Vercel:

1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub: `Manecharo/Manecharo`
4. Configure:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=manecharo
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=(your token)
   NEXTAUTH_URL=https://manecharo.com
   NEXTAUTH_SECRET=(your secret)
   ADMIN_PASSWORD_HASH=(your hash)
   RESEND_API_KEY=(your key)
   RESEND_FROM_EMAIL=noreply@manecharo.com
   ```
6. Click "Deploy"

---

## ✅ Verification

After pushing, verify on GitHub:

1. Go to https://github.com/Manecharo/Manecharo
2. Check files are there
3. Check .env is NOT there (should be in .gitignore)
4. Check README displays properly
5. Check documentation files are readable

---

## 📞 Need Help?

If you encounter any issues:

1. **Check git status:**
   ```bash
   git status
   ```

2. **Check remote:**
   ```bash
   git remote -v
   ```

3. **Check branch:**
   ```bash
   git branch
   ```

4. **View last commit:**
   ```bash
   git log -1
   ```

---

## 🎉 Success Indicators

You'll know it worked when:

✅ Terminal shows: "Branch 'main' set up to track remote branch 'main'"
✅ GitHub repository shows all your files
✅ Commit count shows "1 commit"
✅ Green checkmark appears next to commit
✅ README.md displays on repository homepage

---

**Ready to push!** 🚀

Just run the commands above in your terminal.
