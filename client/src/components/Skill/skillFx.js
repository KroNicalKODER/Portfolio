// Animation styles for switching category; the Skills screen has a picker to compare them.
export const SKILL_FX = [
  { id: 'flippulse', label: 'Flip + Pulse' },
  { id: 'eclipse', label: 'Eclipse' },
  { id: 'flip', label: 'Flipboard' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'conveyor', label: 'Conveyor' },
];
const FX_KEY = 'skillFx3';
export const loadFx = () => {
  try {
    const v = localStorage.getItem(FX_KEY);
    return SKILL_FX.some((f) => f.id === v) ? v : 'flippulse';
  } catch {
    return 'flippulse';
  }
};
export const saveFx = (id) => {
  try {
    localStorage.setItem(FX_KEY, id);
  } catch {
    /* ignore */
  }
};
