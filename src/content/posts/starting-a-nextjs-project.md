---
title: Starting a Next.js Project
date: "2025-09-30"
description: "A beginner-friendly, step-by-step tutorial on installing and configuring a new Next.js project, from setup to development-ready."
---

![starting-a-nextjs-project-main-image.webp](/images/blog/starting-a-nextjs-project/starting-a-nextjs-project-main-image.webp)

#### Prerequisites

- `npm`
- `node.js`
- `git`

#### Install Next.js

1. open `terminal`
2. navigate to `project` folder
3. install `next.js` using the following command:

   ```bash
   npx create-next-app@latest app-name-here
   ```

You will be prompted with a series of choices:

- ✅ TypeScript
- ✅ ESLint
- ✅ TailwindCSS
- ✅ `src/`directory
- ✅ App Router
- ✅ Turbopack
- ❌ Customize import alias

#### Removing boilerplate code and unused files

1. Navigate into the app root folder
2. Remove boilerplate code from the following 2 files:

   ```jsx
   // src/app/page.tsx
   export default function Home() {
     return (
       <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
         <h1 className="text-6xl text-center">Under Construction</h1>
       </div>
     );
   }
   ```

   ```css
   /* src/app/globals.css */
   @import "tailwindcss";
   ```

3. Delete `.svg` and `.ico` files:
   ![git-status-showing-changes.png](/images/blog/starting-a-nextjs-project/git-status-showing-changes.png)
4. commit changes to git

   ```bash
   git commit -am "removed boilerplat code and unused icon files"
   ```

#### Link existing local to a new remote github repository

1. go to https://github.com
2. Create a new repository:

   ![new-repository-link.png](/images/blog/starting-a-nextjs-project/new-repository-link.png)

Follow instructions on the next screen:

- select owner
- choose repository name
- choose visibility
- click create repository

On the next screen choose:

![existing-repository-option.png](/images/blog/starting-a-nextjs-project/existing-repository-option.png)

Then paste the copied command on the terminal and hit enter

#### Start the development server

From application root folder run:

```bash
npm run dev
```

You should see:
![landing-page.png](/images/blog/starting-a-nextjs-project/landing-page.png)

With this starting point, we are ready to build!

See you on the next one.
