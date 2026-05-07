const config = window.bblocksViewer || {};

const urlParams = new URLSearchParams(window.location.search);

// Init registers
let register;
const registerParam = urlParams.getAll('register');
if (registerParam?.length) {
  register = registerParam.pop();
}

if (!register) {
  register = window.bblocksRegister || window.bblocksRegisters;
  if (Array.isArray(register)) {
    register = register[0];
  }
}
if (!register && import.meta.env.VITE_BBLOCK_REGISTER) {
  register = import.meta.env.VITE_BBLOCK_REGISTER;
}

if (!register) {
  register = 'https://opengeospatial.github.io/bblocks/register.json';
}

// Init showImported
// Track whether showImported was explicitly set (via window.bblocksViewer or URL/env),
// so bblock.service can apply a register-level fallback if not.
let showImportedExplicit = typeof config.showImported !== 'undefined';
let showImportedParam = urlParams.get('showImported');
if (!showImportedParam) {
  showImportedParam = import.meta.env.VITE_SHOW_IMPORTED;
}
if (showImportedParam) {
  showImportedExplicit = true;
  if (typeof showImportedParam === "number" || !isNaN(parseInt(showImportedParam))) {
    const showImportedNumber = parseInt(showImportedParam);
    config.showImported = showImportedNumber < 0 ? true : showImportedNumber;
  } else {
    config.showImported = ['true', 'on', 'all'].includes(showImportedParam);
  }
}
if (typeof config.showImported === 'undefined' || config.showImported === false) {
  config.showImported = 0;
}

if (!config.title) {
  config.title = 'OGC Location Building Blocks';
}
document.title = config.title;

if (!config.baseUrl) {
  config.baseUrl = import.meta.env.BASE_URL;
}

if (import.meta.env.DEV && !config.bblocksFallbackRainbowInstances) {
  config.bblocksFallbackRainbowInstances = [
    'https://defs.opengis.net/prez-backend/object',
    'https://defs-hosted.opengis.net/prez-hosted-b/object',
  ];
}

function setShowImported(value) {
  if (showImportedExplicit) {
    return;
  }
  if (value === true) {
    config.showImported = true;
  } else if (!value) {
    config.showImported = 0;
  } else {
    config.showImported = value < 0 ? true : value;
  }
}

export default { config, register: register, setShowImported };

