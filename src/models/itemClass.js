export const itemClasses = [
  {label: 'Schema', value: 'schema'},
  {label: 'Data type', value: 'datatype'},
  {label: 'Model', value: 'model'},
  {label: 'API path', value: 'path'},
  {label: 'API parameter', value: 'parameter'},
  {label: 'API header', value: 'header'},
  {label: 'API cookie', value: 'cookie'},
  {label: 'API', value: 'api'},
];

const LABEL_MAP = Object.fromEntries(itemClasses.map(e => [e.value, e.label]));
export const getLabel = (itemClass) => LABEL_MAP[itemClass] || itemClass;
