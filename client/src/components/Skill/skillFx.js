// Animation styles for switching category; the Skills screen has a picker to compare them.
export const SKILL_FX = [
  { id: 'train', label: 'Train' },
  { id: 'warp', label: 'Warp' },
  { id: 'core', label: 'Core' },
  { id: 'flip', label: 'Flip' },
];
const FX_KEY = 'skillFx';
export const loadFx = () => {
  try {
    return localStorage.getItem(FX_KEY) || 'train';
  } catch {
    return 'train';
  }
};
export const saveFx = (id) => {
  try {
    localStorage.setItem(FX_KEY, id);
  } catch {
    /* ignore */
  }
};
