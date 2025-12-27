# @hamidhezari/next-active-path

A lightweight, TypeScript-first React hook for **Next.js (App Router)** to determine if a route is currently active. It supports both **exact matching** and **nested/child route detection**.

## Features

- ⚡ **Lightweight**: Zero dependencies (other than Next.js).
- 🌲 **Nested Support**: Automatically detects sub-routes (e.g., `/dashboard/settings` is a child of `/dashboard`).
- 🛠 **TypeScript Ready**: Full type definitions and IDE autocompletion.
- 🧹 **Robust**: Automatically handles trailing slashes and whitespace.


## Installation

```bash
npm install @hezari/next-active-path
```

## How it works
The hook uses usePathname() from next/navigation to monitor the current URL.

Exact Match: pathname === targetPath
Nested Match: pathname.startsWith(targetPath + '/')

This prevents false positives. For example, if your path is /blog, it will match /blog/my-post but it will not match /blog-posts.
