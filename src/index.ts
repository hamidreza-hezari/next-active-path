"use client";

import {usePathname} from 'next/navigation';

/**
 * Options configuration for the isActive check.
 */
export interface IsActiveOptions {
    /**
     * If true, the path must be an exact match.
     * If false (default), it also matches nested child routes.
     * @example
     * isActive('/blog', { exact: true })  // true for '/blog', false for '/blog/post'
     */
    exact?: boolean;
}

/**
 * A hook for Next.js App Router to determine if a navigation path is currently active.
 * * @returns A function `isActive(path, options)` that returns a boolean.
 * * @example
 * ```tsx
 * const isActive = useActivePath();
 * const active = isActive('/dashboard');
 * ```
 */
export function useActivePath() {
    const pathname = usePathname();

    /**
     * Checks if the provided path matches the current browser pathname.
     * @param path - The target URL path to check (e.g., '/dashboard' or '/settings')
     * @param options - Configuration for the match (exact vs nested)
     * @returns {boolean} True if the path is active, false otherwise.
     */
    const isActive = (
        path: string,
        options: IsActiveOptions = {exact: false}
    ): boolean => {
        if (!pathname || !path) return false;

        // Sanitize: remove whitespace, trailing brackets, and trailing slashes
        const cleanPath = path.trim().replace(/\}$/, "").replace(/\/$/, "") || "/";
        const cleanPathname = pathname.trim().replace(/\/$/, "") || "/";

        if (options.exact) {
            return cleanPathname === cleanPath;
        }

        // Logical Check:
        // 1. Exact match (e.g., /about === /about)
        // 2. Child match (e.g., /about/team starts with /about/)
        return (
            cleanPathname === cleanPath ||
            cleanPathname.startsWith(`${cleanPath}/`)
        );
    };

    return isActive;
}
