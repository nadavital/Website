# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website built with Next.js 14. Static site generation with markdown-based blog content, deployed on Vercel.

## Commands

```bash
npm run dev       # Start development server at localhost:3000
npm run build     # Build for production (auto-generates sitemap)
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

**Routing:** Next.js file-based routing in `pages/`
- `pages/index.jsx` - Homepage (minimal centered layout)
- `pages/blog/index.jsx` - Blog listing
- `pages/blog/[slug].jsx` - Dynamic blog post pages
- `pages/playcount.jsx`, `pages/cauldron.jsx` - App showcase pages

**Blog System:**
- Posts are markdown files in `posts/` directory
- Front matter parsed with gray-matter (title, date, description, ogImage, app)
- Custom TLDR block syntax: `:::tldr content here :::`
- Custom markdown parser in `[slug].jsx` handles bold, links, and tip blocks
- Static generation via `getStaticPaths` and `getStaticProps`

**Styling:**
- Single global CSS file: `src/index.css`
- CSS variables for light/dark mode (respects system preference)
- Layout classes: `.page` (640px max-width), `.minimal-page` (centered flex)

**SEO:**
- Global config in `next-seo.config.js`
- Per-page `<NextSeo>` components
- Sitemap auto-generated via next-sitemap

## Key Configuration

- `next.config.js` - Trailing slashes enabled, redirect rules
- `vercel.json` - Deployment config with SPA-style rewrites
- All external links should use `target="_blank" rel="noopener noreferrer"`

## Adding Content

**New blog post:** Create `posts/slug-name.md` with front matter:
```markdown
---
title: "Post Title"
date: "2024-01-15"
description: "Short description"
ogImage: "/path/to/image.jpg"  # optional
---
```

**New page:** Create `pages/page-name.jsx`, export React component with NextSeo
