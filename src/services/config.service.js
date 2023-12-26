const config = window.bblocksViewer || {};

let registers = window.bblocksRegisters;
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

