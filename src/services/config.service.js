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
const showImportedParam = urlParams.get('showImported');
if (showImportedParam !== null) {
  config.showImported = ['true', '1'].includes(showImportedParam);
} else if (typeof config.showImported === 'undefined') {
  config.showImported = false;
}

if (!config.title) {
  config.title = 'OGC Location Building Blocks';
}
document.title = config.title;

export default { config, register: register };

