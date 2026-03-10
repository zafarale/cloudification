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
