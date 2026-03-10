/**
 * lesson-layout.ts
 *
 * Inspects the physical content structure of a sub-track and automatically
 * determines whether to build a flat sidebar (direct lessons) or a grouped
 * tree sidebar (lessons nested inside sub-folders).
 *
 * Usage in a sub-track [..slug].astro:
 *
 *   export async function getStaticPaths() {
 *     const all = await getCollection('networking');
 *     const entries = all.filter(({ id }) => id.startsWith('protocols/'));
 *     return buildSubTrackPaths(entries, 'protocols/', '/networking/protocols');
 *   }
 */

import type { CollectionEntry, CollectionKey } from 'astro:content';

// ---------------------------------------------------------------------------
// Sidebar data shapes (consumed by LessonSidebar)
// ---------------------------------------------------------------------------

export interface SidebarLesson {
  title: string;
  href: string;
  order: number;
  icon?: string;
}

export interface SidebarGroup {
  label: string;
  href?: string;
  /** True for folders named 'common' — shown pinned at top, no group-index page emitted. */
  isShared?: boolean;
  lessons: SidebarLesson[];
}

export type SidebarData =
  | { mode: 'flat'; lessons: SidebarLesson[] }
  | { mode: 'grouped'; groups: SidebarGroup[] };

// ---------------------------------------------------------------------------
// Page prop shapes (emitted from getStaticPaths, consumed by [...slug].astro)
// ---------------------------------------------------------------------------

export interface LessonPageProps {
  type: 'lesson';
  entry: CollectionEntry<CollectionKey>;
  prevLesson: { title: string; href: string } | null;
  nextLesson: { title: string; href: string } | null;
  breadcrumbExtra?: { label: string; href: string };
  sidebarData: SidebarData;
}

export interface GroupIndexProps {
  type: 'group-index';
  groupSlug: string;
  groupLabel: string;
  groupLessons: {
    title: string;
    description: string;
    href: string;
    order: number;
    duration?: number;
    tags?: string[];
    icon?: string;
  }[];
  totalDuration: number;
  sidebarData: SidebarData;
}

export type SubTrackPageProps = LessonPageProps | GroupIndexProps;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function stripPrefix(id: string, prefix: string): string {
  return id.startsWith(prefix) ? id.slice(prefix.length) : id;
}

function toSlug(id: string, prefix: string): string {
  return stripPrefix(id, prefix).replace(/\.mdx?$/, '');
}

/** Returns true if any entry is nested inside a sub-folder under the prefix. */
function hasSubFolders<T extends CollectionKey>(entries: CollectionEntry<T>[], prefix: string): boolean {
  return entries.some(e => stripPrefix(e.id, prefix).includes('/'));
}

function groupEntries<T extends CollectionKey>(
  entries: CollectionEntry<T>[],
  prefix: string
): Record<string, CollectionEntry<T>[]> {
  const map: Record<string, CollectionEntry<T>[]> = {};
  for (const entry of entries) {
    const rel = stripPrefix(entry.id, prefix);
    const group = rel.split('/')[0];
    if (!map[group]) map[group] = [];
    map[group].push(entry);
  }
  return map;
}

function buildSidebarData<T extends CollectionKey>(
  entries: CollectionEntry<T>[],
  prefix: string,
  baseHref: string
): SidebarData {
  if (!hasSubFolders(entries, prefix)) {
    const sorted = [...entries].sort((a, b) => a.data.order - b.data.order);
    return {
      mode: 'flat',
      lessons: sorted.map(e => ({
        title: e.data.title,
        href: `${baseHref}/${toSlug(e.id, prefix)}`,
        order: e.data.order,
        icon: e.data.icon,
      })),
    };
  }

  const SHARED_FOLDER = 'common';
  const groupMap = groupEntries(entries, prefix);
  const groups: SidebarGroup[] = Object.entries(groupMap).map(([groupSlug, groupEntries]) => {
    const sorted = [...groupEntries].sort((a, b) => a.data.order - b.data.order);
    const isShared = groupSlug === SHARED_FOLDER;
    return {
      label: isShared ? 'Common' : groupSlug.replace(/-/g, ' '),
      href: isShared ? undefined : `${baseHref}/${groupSlug}`,
      isShared,
      lessons: sorted.map(e => ({
        title: e.data.title,
        href: `${baseHref}/${toSlug(e.id, prefix)}`,
        order: e.data.order,
        icon: e.data.icon,
      })),
    };
  });
  // Shared groups always appear first in the sidebar
  groups.sort((a, b) => (a.isShared ? -1 : b.isShared ? 1 : 0));
  return { mode: 'grouped', groups };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Builds the complete `getStaticPaths` return value for a sub-track.
 *
 * - Flat structure   → emits one path per lesson.
 * - Grouped structure → emits one path per group index + one per lesson.
 *
 * @param entries  Collection entries already filtered to this sub-track.
 * @param prefix   The id prefix including trailing slash, e.g. 'protocols/'.
 * @param baseHref The URL base for this sub-track, e.g. '/networking/protocols'.
 */
export function buildSubTrackPaths<T extends CollectionKey>(
  entries: CollectionEntry<T>[],
  prefix: string,
  baseHref: string
): { params: { slug: string }; props: SubTrackPageProps }[] {
  const sidebarData = buildSidebarData(entries, prefix, baseHref);
  const paths: { params: { slug: string }; props: SubTrackPageProps }[] = [];

  if (sidebarData.mode === 'flat') {
    const sorted = [...entries].sort((a, b) => a.data.order - b.data.order);
    sorted.forEach((entry, i) => {
      const slug = toSlug(entry.id, prefix);
      const prev = sorted[i - 1];
      const next = sorted[i + 1];
      paths.push({
        params: { slug },
        props: {
          type: 'lesson',
          entry,
          prevLesson: prev
            ? { title: prev.data.title, href: `${baseHref}/${toSlug(prev.id, prefix)}` }
            : null,
          nextLesson: next
            ? { title: next.data.title, href: `${baseHref}/${toSlug(next.id, prefix)}` }
            : null,
          sidebarData,
        },
      });
    });
  } else {
    const SHARED_FOLDER = 'common';
    const groupMap = groupEntries(entries, prefix);

    for (const [groupSlug, groupEntries] of Object.entries(groupMap)) {
      const sorted = [...groupEntries].sort((a, b) => a.data.order - b.data.order);
      const totalDuration = sorted.reduce((acc, e) => acc + (e.data.duration ?? 0), 0);
      const groupLabel = groupSlug === SHARED_FOLDER ? 'Common' : groupSlug.replace(/-/g, ' ');
      const isShared = groupSlug === SHARED_FOLDER;

      // Group index path — skipped for shared folders
      if (!isShared) {
        paths.push({
          params: { slug: groupSlug },
          props: {
            type: 'group-index',
            groupSlug,
            groupLabel,
            groupLessons: sorted.map(e => ({
              title: e.data.title,
              description: e.data.description,
              href: `${baseHref}/${toSlug(e.id, prefix)}`,
              order: e.data.order,
              duration: e.data.duration,
              tags: e.data.tags,
              icon: e.data.icon,
            })),
            totalDuration,
            sidebarData,
          },
        });
      }

      // Lesson paths within this group
      sorted.forEach((entry, i) => {
        const slug = toSlug(entry.id, prefix);
        const prev = sorted[i - 1];
        const next = sorted[i + 1];
        paths.push({
          params: { slug },
          props: {
            type: 'lesson',
            entry,
            prevLesson: prev
              ? { title: prev.data.title, href: `${baseHref}/${toSlug(prev.id, prefix)}` }
              : null,
            nextLesson: next
              ? { title: next.data.title, href: `${baseHref}/${toSlug(next.id, prefix)}` }
              : null,
            // No group breadcrumb for shared-folder lessons
            breadcrumbExtra: isShared ? undefined : { label: groupLabel, href: `${baseHref}/${groupSlug}` },
            sidebarData,
          },
        });
      });
    }
  }

  return paths;
}
