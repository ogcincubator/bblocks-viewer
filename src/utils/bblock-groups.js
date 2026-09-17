// Fallback label for blocks with no `group` set — shared so the list view and the
// sidebar agree on what an unlabelled bucket is called.
export const OTHER_GROUP = 'Other';

// Splits an (already name/identifier-sorted) list of bblocks into per-`group` buckets,
// each further split into `highlighted` and `other`, so a view can show the highlighted
// ones up front and the rest behind a "more…" toggle. Shared between the Building Blocks
// list view and the drawer's featured-blocks sidebar so both apply the same grouping and
// default-expansion rules.
export function groupBBlocks(bblocks, ungroupedLabel) {
  const groups = new Map();
  for (const bblock of bblocks) {
    const label = bblock.group || ungroupedLabel;
    if (!groups.has(label)) {
      groups.set(label, { label, highlighted: [], other: [], isUngrouped: label === ungroupedLabel });
    }
    const group = groups.get(label);
    (bblock.highlighted ? group.highlighted : group.other).push(bblock);
  }
  // Named groups are ordered alphabetically for determinism; the ungrouped bucket always
  // sorts last so it doesn't interleave with registers that do define named groups.
  return [...groups.values()].sort((a, b) => {
    if (a.isUngrouped) return b.isUngrouped ? 0 : 1;
    if (b.isUngrouped) return -1;
    return a.label.localeCompare(b.label);
  });
}
