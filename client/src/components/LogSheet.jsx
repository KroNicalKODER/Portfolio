import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Full mission log: the page dims and blurs, and a panel rises from the bottom.
// Rendered in a portal so ancestor transforms/overflow can't clip it. While open it sets
// body[data-overlay="open"], which the desktop screen navigation respects.
const LogSheet = ({ job, open, onClose, compact = false }) => {
  useEffect(() => {
    if (!open) return undefined;
    document.body.dataset.overlay = 'open';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      delete document.body.dataset.overlay;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="sheet"
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${job.name} full log`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
            className={`relative w-full text-white font-inter bg-gradient-to-b from-[#0c0f1d]/95 to-[#05060d]/95 border border-b-0 border-cyan-300/30 rounded-t-2xl shadow-[0_-20px_60px_rgba(0,255,224,0.12)] ${
              compact ? 'max-h-[85svh]' : 'max-w-5xl max-h-[82vh] mx-6'
            }`}
          >
            {/* header */}
            <div className={`sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0c0f1d]/95 rounded-t-2xl ${compact ? 'px-4 py-3' : 'px-8 py-5'}`}>
              <div>
                <div className={`font-mono tracking-[0.25em] text-cyan-300 ${compact ? 'text-[0.55rem]' : 'text-[0.65rem]'}`}>
                  MISSION LOG ▸ {job.name.toUpperCase()} ▸{' '}
                  <span className={job.current ? 'text-green-400' : 'text-yellow-300'}>{job.current ? 'ACTIVE' : 'COMPLETE'}</span>
                </div>
                <div className={`mt-1 font-extrabold ${compact ? 'text-base' : 'text-2xl'}`}>{job.role}</div>
                <div className={`font-bold text-gray-400 ${compact ? 'text-[0.65rem]' : 'text-xs'}`}>
                  {job.company} · {job.period}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 h-9 w-9 rounded-full border border-white/20 text-white/80 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* body */}
            <div
              className={`overflow-y-auto overscroll-contain ${compact ? 'px-4 py-4 max-h-[calc(85svh-5.5rem)]' : 'px-8 py-6 max-h-[calc(82vh-7rem)]'}`}
            >
              <ul className={`grid gap-x-10 gap-y-3 text-gray-200 ${compact ? 'text-[0.72rem]' : 'grid-cols-2 text-[0.85rem]'}`}>
                {job.points.map((pt, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + j * 0.04 }}
                    className="flex gap-2 leading-relaxed"
                  >
                    <span className="text-cyan-300 font-mono">&gt;</span>
                    <span>{pt}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LogSheet;
