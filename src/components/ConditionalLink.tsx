"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

interface ConditionalLinkProps extends Omit<LinkProps, 'href'> {
  children: ReactNode;
  className?: string;
}

export function ConditionalLink({ children, ...props }: ConditionalLinkProps) {
  const { user } = useAuth();
  const href = user ? "/dashboard" : "/auth/signup";

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}