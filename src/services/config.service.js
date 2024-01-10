const config = window.bblocksViewer || {};

const urlParams = new URLSearchParams(window.location.search);

// Init registers
let registers;
const registerParam = urlParams.getAll('register');
if (registerParam?.length) {
  registers = [];
  registerParam.forEach(r => r.split(',').forEach(rr => registers.push(rr)));
}

if (!registers) {
  registers = window.bblocksRegisters;
}
if (!registers && import.meta.env.VITE_BBLOCK_REGISTERS) {
  registers = import.meta.env.VITE_BBLOCK_REGISTERS.split(',');
}

if (!registers || !registers.length) {
  registers = ['https://opengeospatial.github.io/bblocks/register.json'];
}

if (!Array.isArray(registers)) {
  registers = [registers];
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

export default { config, registers };

