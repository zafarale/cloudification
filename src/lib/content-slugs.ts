export const stripContentExtension = (value: string) =>
  value.replace(/\.mdx?$/, '');

export const toTrackSlug = (id: string, track: 'aws' | 'azure' | 'gcp') =>
  stripContentExtension(id.replace(`${track}/`, ''));

export const toCommonSlug = (id: string) =>
  stripContentExtension(id.replace(/^_?common\//, '')).replace(/^_+/, '');

export const toCommonIdCandidates = (concept: string) => {
  const normalized = concept.replace(/^_+/, '');
  return [
    `common/${normalized}.mdx`,
    `common/${normalized}.md`,
    `_common/${normalized}.mdx`,
    `_common/${normalized}.md`,
  ];
};

/** Generic icons for the lesson list pages (track-agnostic). */
export const lessonListIconMap: Record<string, string> = {
  '01-intro':                          'mdi:cloud-outline',
  '02-regions-and-availability-zones': 'mdi:earth',
  '03-intro-vms':                      'mdi:server',
  '04-securing-your-system':           'mdi:shield-lock-outline',
  '05-block-storage':                  'mdi:harddisk',
  '06-object-storage':                 'mdi:bucket-outline',
};

/** Prefix a path with the Astro base URL (handles both '/' and '/cloudification'). */
export const href = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
};
