# Sanity CORS Setup - Complete Guide

## ✅ React Hooks Error - FIXED!

The `/thoughts` page error is now fixed. The issue was the Footer component had hooks in the wrong order.

---

## 🔧 Sanity Setup Required

You're seeing these errors because your Sanity project needs to be configured:

### Error 1: Dataset not found
```
Dataset "production" not found for project ID "manecharo"
```

### Error 2: CORS (if you see it)
```
Access-Control-Allow-Origin header is missing
```

---

## 📋 Complete Sanity Setup (5 Minutes)

### Step 1: Create Production Dataset

1. Go to: https://www.sanity.io/manage
2. Click on your **"manecharo"** project
3. In the left sidebar, click **"Datasets"**
4. Click **"Create new dataset"**
5. Name: `production`
6. Visibility: **Public**
7. Click **"Create"**

### Step 2: Add CORS Origins

1. Still in Sanity manage (https://www.sanity.io/manage)
2. Select **"manecharo"** project
3. In left sidebar, click **"API"**
4. Click **"CORS Origins"** tab
5. Click **"Add CORS origin"** button

**Add TWO origins:**

#### Origin 1 (Development):
```
http://localhost:3001
```
- Check ✓ "Allow credentials"
- Click "Save"

#### Origin 2 (Backup for port 3000):
```
http://localhost:3000
```
- Check ✓ "Allow credentials"
- Click "Save"

#### Origin 3 (Production):
```
https://manecharo.com
```
- Check ✓ "Allow credentials"
- Click "Save"

---

## 🎯 Why Port 3001?

Your server is running on **port 3001** because:
- Port 3000 is already in use by another process
- Next.js automatically uses 3001 as fallback

**You see this in the console:**
```
⚠ Port 3000 is in use, trying 3001 instead.
- Local: http://localhost:3001
```

---

## ✅ After Setup - Test These

### Homepage (http://localhost:3001)
- Should load without errors
- Shows placeholder content

### Work Page (http://localhost:3001/work)
- Should load without errors
- Once you add projects to Sanity, they'll appear here

### Thoughts (http://localhost:3001/thoughts)
- Should load without React errors
- Once you add blog posts to Sanity, they'll appear here

---

## 🚀 Next Steps After Sanity Setup

### 1. Install Sanity Studio Locally

```bash
npm install -g @sanity/cli
cd "D:\Trabajos\MER - Consultant\Website"
npx sanity init
```

When prompted:
- Project: Select "manecharo"
- Dataset: "production"
- Output path: "./studio"

### 2. Start Sanity Studio

```bash
cd studio
npm install
npm run dev
```

Studio will run at: http://localhost:3333

### 3. Add Your Content

In Sanity Studio (http://localhost:3333):

**Add Projects:**
1. Click "Project" in left menu
2. Click "Create new Project"
3. Fill in:
   - Title
   - Slug
   - Year
   - Tags
   - Upload images
   - Add description
4. Click "Publish"

**Add Blog Posts:**
1. Click "Post" in left menu
2. Click "Create new Post"
3. Fill in:
   - Title
   - Type (writing/video/audio)
   - Content
   - Featured image
   - Published date
   - Check "Published"
4. Click "Publish"

---

## 🔍 Verify CORS Setup

After adding CORS origins, test with:

```bash
curl -I http://localhost:3001
```

You should see no CORS errors in browser console when visiting:
- http://localhost:3001
- http://localhost:3001/work
- http://localhost:3001/thoughts

---

## 📝 Summary

**What's Fixed:**
- ✅ React hooks error on /thoughts
- ✅ Server compiles without errors
- ✅ Site loads with placeholder content

**What You Need to Do:**
1. Create "production" dataset in Sanity
2. Add CORS origins:
   - `http://localhost:3001`
   - `http://localhost:3000`
   - `https://manecharo.com`
3. (Optional) Install Sanity Studio to add content

**Current Status:**
- Site works perfectly with placeholder content
- Once you add CORS origins, you can fetch real content from Sanity
- Once you add content to Sanity, it will appear on the site

---

## 💡 Quick Test

After adding CORS origins, refresh your browser at:
http://localhost:3001

You should see:
- No CORS errors in console
- No dataset errors in console
- Clean, working site

The dataset error will persist until you create the "production" dataset, but the site will still work with placeholders.
