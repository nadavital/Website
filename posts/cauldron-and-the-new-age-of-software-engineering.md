---
title: Cauldron & The New Age of Software Engineering
date: 2025-01-13
description: Building my recipe app with AI-assisted development and lessons learned about the future of software engineering.
ogImage: /assets/cauldron/cauldronicon.jpg
app:
  name: Cauldron
  tagline: Your AI-powered recipe book
  icon: /assets/cauldron/cauldronicon.jpg
  page: /cauldron
  download: https://apps.apple.com/us/app/cauldron-magical-recipes/id6754004943
---

After publishing my first app PlayCount last year, my dad came to me with a problem: he had no way to organize our family recipes. We'd always talked about creating a family cookbook, but I felt like there could be something better.

Looking at apps on the App Store, every option had a limit, a subscription, or an outdated design. I wanted a modern app that showcases your recipes, lets you categorize and share them, and generates new ones when you don't know what to make. That's how Cauldron came to be.

Cauldron lets you import recipes from anywhere — URLs, YouTube videos, Instagram posts, TikTok — with intelligent parsing that extracts ingredients and steps automatically. It has a cook mode with built-in timers and Live Activities for your lock screen, a smart grocery list that organizes items by category, and on-device AI recipe generation powered by Apple Intelligence. You can connect with friends, share recipes, and browse what others are cooking. It's everything I wished existed in one place.

I built Cauldron almost entirely with Claude Code, and it fundamentally changed how I work. Instead of implementation-first, I went product-first. Prototyping was a prompt away. I could test different UI options side by side instead of building something and hoping it sticks.

But let's be clear: anyone who says they "built an app in 5 minutes" is either lying or built a terrible app. It takes more than five minutes just to write a decent prompt to get 10% of your vision. LLMs make assumptions and decisions without asking. If I'd just said "make a recipe app with sharing and image support," I'd have gotten something that runs — but doesn't match what I imagined.

Models like Claude Opus 4.5 and GPT 5.2-xhigh may already be better engineers than I am, and they're improving faster than any human ever could. But they still can't read your mind. Creating good code with AI has gone from impossible to common — but you have to prompt correctly.

Here's what I've learned:

**Be explicit.** Coding agents rarely ask clarifying questions — they fill in the blanks, leading to redundant code that has to be undone once you realize the app doesn't match your vision.

**Be purposeful.** Research platforms, tools, APIs, and frameworks that could improve your app. You can use the coding agent itself like a chat app to brainstorm and develop a shared vision. Always use plan mode and maintain a roadmap.md file so you and the agent stay aligned.

**Build big, then chip away.** Test everything. Keep a running note of what's broken or not quite right, and feed it back to the agent as you encounter issues.

**Enforce modularity.** AI agents tend to write long files (1000+ lines). Periodically check file lengths and specify in your CLAUDE.md or AGENTS.md that files must remain short. Otherwise, the agent only reads the first few hundred lines, leading to bugs that slip past the compiler and linger unless thoroughly tested.

**Manage context with intention.** Maintain a detailed but concise instructions file that tells the agent what it's working on and where to find specific guidance — style guidelines, framework documentation for things released after its training cutoff, roadmaps. Another rising concept is continuity ledgers: telling the agent to track its changes so you can start new sessions exactly where you left off. This saves money on input tokens and improves output quality.

Building with AI is the next frontier of software engineering — turning you into a 100x engineer, product manager, and decision maker in any codebase. Apps will increase in functionality exponentially, becoming personalized for every user with features we've barely begun to explore. Software creation will only accelerate from here, and the skills engineers have built in traditional development will make them the leaders in the agentic future ahead.

I'm already applying these lessons to my next app. If you want to see what building this way looks like, [download Cauldron on the App Store](https://apps.apple.com/us/app/cauldron-magical-recipes/id6754004943), [add me](https://cauldron-f900a.web.app/u/nadav), and check out [my challah recipe](https://nadavavital.com/challah).
