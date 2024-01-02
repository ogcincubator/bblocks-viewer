const VALUES = [
  "stable",
  "under-development",
  "submitted",
  "experimental",
  "retired",
  "superseded",
  "invalid",
  "reserved",
];

const statusColors = {
  'stable': 'green',
  'under-development': 'red',
  'experimental': 'deep-orange',
  'retired': 'brown',
  'superseded': 'brown-lighten-1',
  'submitted': 'deep-orange-darken-2',
  'invalid': 'red-darken-4',
  'reserved': 'grey-darken-2',
}

const getStatusName = s => s.charAt(0).toUpperCase() + s.substring(1).replaceAll('-', ' ');

const statuses = VALUES.map(s => ({
  value: s,
  label: getStatusName(s),
  color: statusColors[s],
}));

export { statuses, statusColors, getStatusName };
