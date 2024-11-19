import Link from 'next/link';
import React from 'react';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

function CustomLink({ href, children }: CustomLinkProps) {
  return (
    <Link
      href={href}
      className="px-4 font-medium text-gray-600 py-2 border shadow-sm border-gray-800 hover:shadow-md hover:scale-105 duration-200 rounded-full text-sm flex items-center gap-2"
    >
      {children}
    </Link>
  );
}

export default CustomLink;
