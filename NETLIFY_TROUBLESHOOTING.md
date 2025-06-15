# Netlify White Screen Troubleshooting Guide

## Quick Diagnosis Checklist

Before diving deep, run through this quick checklist:

- [ ] Check if the build completed successfully
- [ ] Verify environment variables are set correctly
- [ ] Confirm the correct build directory is being deployed
- [ ] Check browser console for JavaScript errors
- [ ] Test if direct file access works (e.g., `/index.html`)

## 1. Build Logs and Deployment Settings

### Check Build Logs
1. **Access Build Logs:**
   - Go to your Netlify dashboard
   - Click on your site
   - Navigate to "Deploys" tab
   - Click on the latest deploy
   - Check the "Deploy log" section

2. **Look for These Common Issues:**
   ```
   ❌ Build failed with exit code 1
   ❌ Command failed with exit code 127
   ❌ Module not found errors
   ❌ TypeScript compilation errors
   ❌ Environment variable not found
   ```

### Verify Deployment Settings
1. **Build Settings Location:**
   - Site Settings → Build & Deploy → Build Settings

2. **Essential Settings to Verify:**
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18.x (check .nvmrc file)
   Package manager: npm
   ```

3. **Check netlify.toml Configuration:**
   ```toml
   [build]
     publish = "dist"
     command = "npm install && npm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## 2. Common Causes and Solutions

### A. Routing Issues (Most Common for SPAs)

**Symptoms:**
- Home page loads but other routes show 404
- Refreshing any route except `/` shows white screen
- Direct URL access fails

**Diagnosis:**
```bash
# Test these URLs directly:
https://yoursite.netlify.app/         # Should work
https://yoursite.netlify.app/about    # Might fail without proper redirects
```

**Solutions:**

1. **Add Redirects Rule in `netlify.toml`:**
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
     force = true
   ```

2. **Alternative: Create `_redirects` file in public folder:**
   ```
   /*    /index.html   200
   ```

3. **Verify React Router Configuration:**
   ```jsx
   // Use BrowserRouter, not HashRouter for clean URLs
   import { BrowserRouter as Router } from 'react-router-dom';
   ```

### B. Build Configuration Issues

**Symptoms:**
- Build succeeds but site doesn't load
- Missing files in deployment
- JavaScript/CSS files not found

**Diagnosis Steps:**

1. **Check Build Output Locally:**
   ```bash
   npm run build
   ls -la dist/  # Should contain index.html, assets/, etc.
   ```

2. **Verify Build Command:**
   ```json
   // package.json
   {
     "scripts": {
       "build": "npx tsc && vite build"  // Make sure this works locally
     }
   }
   ```

**Solutions:**

1. **Fix TypeScript Issues:**
   ```bash
   # If TypeScript compilation fails
   npm run build  # Check for TS errors locally first
   ```

2. **Update Build Configuration:**
   ```javascript
   // vite.config.ts
   export default defineConfig({
     base: '/',  // Important for Netlify
     build: {
       outDir: 'dist',
       sourcemap: true
     }
   })
   ```

### C. Environment Variables

**Symptoms:**
- Build succeeds but app doesn't function
- API calls fail
- Configuration-dependent features broken

**Diagnosis:**
1. **Check if environment variables are used:**
   ```bash
   grep -r "import.meta.env" src/
   grep -r "process.env" src/
   ```

2. **Verify in Netlify Dashboard:**
   - Site Settings → Environment Variables
   - Check all required variables are set

**Solutions:**

1. **Set Environment Variables in Netlify:**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   NODE_ENV=production
   ```

2. **Update Build Command to Include Env Vars:**
   ```toml
   [build]
     command = "npm install && npm run build"
   
   [build.environment]
     NODE_VERSION = "18"
     VITE_SUPABASE_URL = "your-url"
   ```

### D. File Structure and Path Issues

**Required File Structure for SPAs:**
```
dist/
├── index.html          # Entry point (REQUIRED)
├── assets/
│   ├── index.js       # Main JavaScript bundle
│   └── index.css      # Main CSS bundle
└── vite.svg           # Favicon
```

**Common Issues:**

1. **Missing index.html:**
   ```bash
   # Check if index.html exists in build output
   ls dist/index.html
   ```

2. **Incorrect Asset Paths:**
   ```html
   <!-- index.html should have relative paths -->
   <script type="module" src="/assets/index.js"></script>
   <link rel="stylesheet" href="/assets/index.css">
   ```

## 3. Diagnostic Steps

### Step 1: Build Process Diagnosis

```bash
# 1. Clean install and build locally
rm -rf node_modules package-lock.json
npm install
npm run build

# 2. Serve build locally to test
npm run preview
# Visit http://localhost:4173 and test all routes

# 3. Check build output
ls -la dist/
du -sh dist/  # Check size
```

### Step 2: Runtime Diagnosis

1. **Browser Developer Tools:**
   ```
   F12 → Console Tab
   Look for:
   - JavaScript errors
   - Failed network requests
   - 404 errors for assets
   ```

2. **Network Tab Analysis:**
   ```
   - Check if index.html loads (200 status)
   - Verify all assets load successfully
   - Look for CORS errors
   - Check API call responses
   ```

3. **Application Tab:**
   ```
   - Check localStorage/sessionStorage
   - Verify service workers (if any)
   - Check for quota exceeded errors
   ```

### Step 3: Netlify-Specific Diagnosis

1. **Functions Log (if using Netlify Functions):**
   ```bash
   # Check function logs in Netlify dashboard
   Site → Functions → View logs
   ```

2. **Deploy Summary:**
   ```
   - Check deploy time
   - Verify file count and size
   - Look for skipped files
   - Check processing time
   ```

## 4. File Verification Steps

### Verify Correct Files Are Being Served

1. **Direct File Access Test:**
   ```bash
   # Test these URLs directly:
   https://yoursite.netlify.app/index.html
   https://yoursite.netlify.app/assets/index.js
   https://yoursite.netlify.app/assets/index.css
   ```

2. **Download and Inspect Build:**
   ```bash
   # Download the deployed files
   curl -o deployed-index.html https://yoursite.netlify.app/index.html
   
   # Compare with local build
   diff dist/index.html deployed-index.html
   ```

3. **Check File Sizes:**
   ```bash
   # Large differences might indicate missing content
   curl -I https://yoursite.netlify.app/assets/index.js
   # Look for Content-Length header
   ```

## 5. Common Solutions

### Solution 1: Basic SPA Fix
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Solution 2: Environment Variables Fix
```bash
# In Netlify Dashboard → Environment Variables
VITE_SUPABASE_URL=your-actual-url
VITE_SUPABASE_ANON_KEY=your-actual-key
NODE_ENV=production
```

### Solution 3: Build Command Fix
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Solution 4: Vite Config Fix
```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
```

## 6. Emergency Debugging

If all else fails, try this emergency debugging approach:

1. **Deploy a Minimal Test:**
   ```html
   <!-- Create a simple index.html in dist/ -->
   <!DOCTYPE html>
   <html>
   <head><title>Test</title></head>
   <body><h1>Test Deploy</h1></body>
   </html>
   ```

2. **Check Raw HTML Source:**
   ```bash
   curl https://yoursite.netlify.app/ | head -20
   ```

3. **Test with Different Build Tools:**
   ```bash
   # Try building with different tools if Vite fails
   npx create-react-app test-app
   cd test-app
   npm run build
   # Copy your source files and test
   ```

## 7. Prevention Checklist

- [ ] Always test `npm run build` locally before deploying
- [ ] Use `npm run preview` to test built app locally
- [ ] Set up proper redirects for SPA routing
- [ ] Configure environment variables before first deploy
- [ ] Use absolute paths for assets when possible
- [ ] Add error boundaries to catch runtime errors
- [ ] Set up monitoring for production errors

## Quick Fix Commands

```bash
# If you suspect dependency issues
rm -rf node_modules package-lock.json && npm install

# If TypeScript is causing issues
npx tsc --noEmit  # Check for TS errors without building

# If build output looks wrong
rm -rf dist && npm run build

# Test production build locally
npm run preview
```

Remember: The most common cause is missing SPA redirects. Start there!