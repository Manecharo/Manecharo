# Sanity CMS Setup - Create Production Dataset

## Current Issue

```
Error: Dataset "production" not found for project ID "manecharo"
```

Your Sanity project exists, but it doesn't have a "production" dataset yet. This is a one-time setup that must be done in the Sanity dashboard.

---

## Solution: Create the Dataset

### Option 1: Via Sanity Dashboard (Recommended)

1. **Go to Sanity Management Console:**
   - Visit: https://www.sanity.io/manage
   - Or direct project link: https://www.sanity.io/manage/project/manecharo

2. **Login** with your Sanity account

3. **Select your project** "manecharo"

4. **Navigate to Datasets:**
   - Look for "Datasets" in the left sidebar
   - Or go to: https://www.sanity.io/manage/project/manecharo/datasets

5. **Create New Dataset:**
   - Click "Add dataset" or "Create dataset"
   - **Name:** `production` (EXACTLY this - it's case sensitive)
   - **Visibility:** Public (or Private if you prefer)
   - Click "Create"

6. **Verify Creation:**
   - You should see "production" in your list of datasets
   - It will be empty initially - that's fine!

### Option 2: Via Sanity CLI (Alternative)

If you have Sanity CLI installed:

```bash
# Install Sanity CLI globally (if not installed)
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Navigate to your project (if you have sanity.cli.js)
cd "D:\Trabajos\MER - Consultant\Website"

# Create dataset
sanity dataset create production
```

---

## After Creating Dataset

### 1. Configure CORS (Important!)

Your site needs permission to access Sanity:

1. Go to: https://www.sanity.io/manage/project/manecharo/api
2. Scroll to **"CORS Origins"**
3. Click **"Add CORS origin"**
4. Add these origins:

   **For Development:**
   ```
   http://localhost:3001
   ```
   - Credentials: ✅ Include

   **For Development (backup):**
   ```
   http://localhost:3000
   ```
   - Credentials: ✅ Include

   **For Production:**
   ```
   https://manecharo.com
   ```
   - Credentials: ✅ Include

   ```
   https://www.manecharo.com
   ```
   - Credentials: ✅ Include

5. **Save** the CORS settings

### 2. Verify Your API Token

Your current token in `.env`:
```
SANITY_API_TOKEN=skiVWrEBZHCqpiWT8RQP8SmsPWpwM51mJ15LafmMyodoTVOEso7zyb9SAiYhw9VPZNWdhEF4LTbJ6vpO2tBBCbwUub0QvFXzGRBLcrWipbstUqQtCL1Fyi5Vo2cIb9ycDibgdYW62vtVtaMzrlBTpuZC39Nk6Lw3vbdSzxEWjuR0yMDjDIT7
```

**Check token permissions:**
1. Go to: https://www.sanity.io/manage/project/manecharo/api
2. Scroll to **"Tokens"**
3. Verify your token has:
   - **Permissions:** Editor or Admin
   - **Dataset:** All datasets (or specifically "production")

### 3. Restart Your Dev Server

After creating the dataset and configuring CORS:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

The errors should disappear!

---

## Understanding the Sanity Setup

### What is a Dataset?

Think of datasets like **separate databases**:
- **production** - Your live, published content
- **staging** - For testing (optional)
- **development** - For local development (optional)

Your site is configured to use the **"production"** dataset.

### Current Configuration

Your `.env` file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=manecharo
NEXT_PUBLIC_SANITY_DATASET=production  ← Looking for this dataset
SANITY_API_TOKEN=ski...
```

### Why the Error Occurs

The Sanity client tries to query:
```
https://manecharo.apicdn.sanity.io/v2024-01-01/data/query/production?query=...
                                                                    ^^^^^^^^^^
```

If "production" dataset doesn't exist → 404 error

---

## Setting Up Sanity Content

Once the dataset exists, you'll want to add your content schemas and data.

### Option A: Use Sanity Studio (Full CMS)

If you want a full admin interface:

1. **Create Sanity Studio folder:**
   ```bash
   cd "D:\Trabajos\MER - Consultant"
   mkdir sanity-studio
   cd sanity-studio
   ```

2. **Initialize Sanity Studio:**
   ```bash
   npm create sanity@latest
   ```

3. **Follow prompts:**
   - Project: Select existing "manecharo"
   - Dataset: production
   - Template: Choose "Clean project" or "Blog"

4. **Run Studio:**
   ```bash
   npm run dev
   ```
   Studio will run on http://localhost:3333

5. **Deploy Studio:**
   ```bash
   sanity deploy
   ```
   Access at: https://manecharo.sanity.studio

### Option B: Use Your Admin Panel (Already Built)

Your site has a built-in admin at:
- http://localhost:3001/update/login
- Password: `Letmeupdateyou2005`

This admin panel can create content directly.

---

## Content Schemas Needed

Your site expects these Sanity document types:

### 1. Projects
```typescript
{
  _type: "project",
  title: string,
  slug: { current: string },
  year: number,
  tags: string[],
  images: image[],
  featured: boolean,
  order: number
}
```

### 2. Blog Posts
```typescript
{
  _type: "post",
  title: string,
  slug: { current: string },
  postType: "insight" | "case-study" | "update",
  featuredImage: image,
  publishedAt: datetime,
  published: boolean,
  content: array (portable text)
}
```

---

## Quick Start Guide

### Step-by-Step Right Now:

**Step 1:** Create Dataset (5 minutes)
1. Go to https://www.sanity.io/manage/project/manecharo/datasets
2. Click "Add dataset"
3. Name: `production`
4. Click "Create"

**Step 2:** Configure CORS (2 minutes)
1. Go to https://www.sanity.io/manage/project/manecharo/api
2. Add CORS origin: `http://localhost:3001` with credentials ✅
3. Add CORS origin: `https://manecharo.com` with credentials ✅

**Step 3:** Verify Token (1 minute)
1. Same API page
2. Check "Tokens" section
3. Verify token has "Editor" or "Admin" permissions

**Step 4:** Restart Dev Server
```bash
# In your terminal
# Press Ctrl+C to stop
npm run dev
```

**Total Time:** ~8 minutes

---

## Expected Results

### Before:
```
❌ Error fetching featured projects: ClientError: Dataset not found
❌ Error fetching posts: ClientError: Dataset not found
```

### After:
```
✅ Successfully connected to Sanity
✅ Projects: [] (empty array - no projects yet)
✅ Posts: [] (empty array - no posts yet)
```

The errors will disappear! Your site will work with empty arrays until you add content.

---

## Troubleshooting

### Still getting errors after creating dataset?

1. **Clear browser cache:**
   - Chrome: Ctrl+Shift+R
   - Firefox: Ctrl+F5

2. **Check dataset name is EXACTLY:**
   ```
   production
   ```
   (lowercase, no spaces)

3. **Verify in .env:**
   ```env
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Hard restart server:**
   ```bash
   # Kill any running Node processes
   # Then restart:
   npm run dev
   ```

### CORS errors persisting?

1. Double-check CORS origins in Sanity dashboard
2. Ensure "Include credentials" is checked
3. Wait 1-2 minutes for CORS changes to propagate
4. Hard refresh browser

### API token issues?

1. Generate new token:
   - Go to https://www.sanity.io/manage/project/manecharo/api
   - Scroll to "Tokens"
   - Click "Add API token"
   - Name: "Website Production"
   - Permissions: **Editor**
   - Click "Create"
   - **Copy the token** (shown once!)

2. Update `.env`:
   ```env
   SANITY_API_TOKEN=sk_your_new_token_here
   ```

3. Restart server

---

## Next Steps After Setup

Once errors are gone:

1. **Add your first project** via Sanity Studio or admin panel
2. **Add your first blog post**
3. **Upload project images** through Sanity
4. **Test the work page** to see projects display
5. **Test the thoughts page** to see blog posts

---

## Support Resources

- **Sanity Documentation:** https://www.sanity.io/docs
- **Sanity Management Console:** https://www.sanity.io/manage
- **Your Project Dashboard:** https://www.sanity.io/manage/project/manecharo
- **Sanity Community:** https://slack.sanity.io/

---

**Current Status:**
- ✅ Sanity project exists (`manecharo`)
- ❌ Dataset "production" needs to be created
- ✅ API token exists in `.env`
- ⚠️ CORS origins need to be configured

**Action Required:**
👉 **Create the "production" dataset now** following Step 1 above!

This is the ONLY blocker preventing your Sanity integration from working perfectly.
