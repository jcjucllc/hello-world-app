'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Greeting' },
  { href: '/calculator', label: 'Car Calculator' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-8">
        <span className="font-bold text-lg tracking-tight">Hello World App</span>
        <div className="flex gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? 'text-white underline underline-offset-4'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
