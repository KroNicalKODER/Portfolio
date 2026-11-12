import React from 'react';

import gitHub from '../assets/Logos/github.png';
import LinkedIn from '../assets/Logos/linkedin.png';
import Leetcode from '../assets/Logos/leetcode.png';
import CodeChef from '../assets/Logos/codechef.png';
import { links } from '../Data/profile';

const socials = [
  { href: links.github, icon: gitHub, label: 'GitHub' },
  { href: links.linkedin, icon: LinkedIn, label: 'LinkedIn' },
  { href: links.leetcode, icon: Leetcode, label: 'LeetCode' },
  { href: links.codechef, icon: CodeChef, label: 'CodeChef' },
];

// Small round icon links; the name appears under the icon on hover/focus.
const SocialIcons = ({ size = 'md', className = '' }) => {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const img = size === 'sm' ? 16 : 20;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className={`group relative flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-300/10 hover:shadow-[0_0_18px_rgba(0,255,224,0.35)] focus-visible:border-cyan-300 ${box}`}
        >
          <img width={img} height={img} src={s.icon} alt="" className="opacity-80 transition-opacity group-hover:opacity-100" />
          <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded bg-black/80 px-2 py-0.5 font-inter text-[0.6rem] font-bold tracking-wide text-cyan-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {s.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
