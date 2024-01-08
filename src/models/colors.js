const defaultPalette = [
  '#4363d8', '#e6194b', '#297a32', '#75670b',
  '#f58231', '#911eb4', '#30a5a5', '#f032e6',
  '#85ab08', '#997474', '#008080', '#e6beff',
  '#9a6324', '#fffac8', '#800000', '#aaffc3',
  '#808000', '#ffd8b1', '#000075', '#808080',
  '#000000'];

const createChooser = (palette = defaultPalette) => {
  const mapping = {}, seen = new Set();
  return id => {
    if (!seen.has(id)) {
      mapping[id] = palette[seen.size % palette.length];
      seen.add(id);
    }
    return mapping[id];
  };
};

export { defaultPalette, createChooser };
