const config = window.bblocksViewer || {};
let registers;

const urlParams = new URLSearchParams(window.location.search);
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

export default { config, registers };

