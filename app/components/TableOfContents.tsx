'use client';

import { useState, useEffect } from 'react';

interface TableOfContentsProps {
  sections: { id: string; title: string }[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="space-y-1">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
        In This Article
      </h3>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
        >
          {section.title}
        </a>
      ))}
    </nav>
  );
}
