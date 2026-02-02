# How to Publish Your Valentine Website

I have already configured your project for automatic deployment to GitHub Pages! 
Since I cannot access `git` in your terminal, check the steps below.

## Option 1: If you have Git installed (Recommended)
1. Open a terminal where `git` works.
2. Run these commands to push your code:

   ```bash
   cd d:\valentine
   git init
   git add .
   git commit -m "My Valentine Project"
   git branch -M main
   git remote add origin https://github.com/AEmad99/important-project
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo: [https://github.com/AEmad99/important-project](https://github.com/AEmad99/important-project)
   - Click **Settings** > **Pages** (sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - The deployment will trigger automatically!

## Option 2: Upload Manually (No Git)
1. Go to your repo: [https://github.com/AEmad99/important-project](https://github.com/AEmad99/important-project)
2. Click **Add file** > **Upload files**.
3. Drag and drop **ALL** the files from your `d:\valentine` folder into the browser.
4. Commit the changes.
5. **Note:** Verify that `.github/workflows/deploy.yml` is uploaded correctly. 
   - If manual upload skips hidden folders (like `.github`), you might need to create the file manually on GitHub:
     - Click **Add file** > **Create new file**.
     - Name it `.github/workflows/deploy.yml`.
     - Paste the content from the file on your disk.

## Final Step
Once deployed, your website will be live at:  
**https://aemad99.github.io/important-project/**

Send this link to your girlfriend! 💖
