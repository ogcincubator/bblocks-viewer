// Typed relations between building blocks, from most to least specific. Shared by the
// dependency graph (edge colors) and the building block header (relation chips) so the two
// stay visually consistent.
export const relations = [
  {type: 'isDescribedBy', label: 'Described by', icon: 'mdi-book-open-variant', color: '#00897b'},
  {type: 'isProfileOf', label: 'Profile of', icon: 'mdi-arrow-up-circle-outline', color: 'blue'},
];

export const relationColors = Object.fromEntries(relations.map(r => [r.type, r.color]));
