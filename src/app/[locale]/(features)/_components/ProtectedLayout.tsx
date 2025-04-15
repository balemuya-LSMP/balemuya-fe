'use client';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({
  children,
  allowedRoles = []
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.user_type)) {
      router.push('/unauthorized');
    }
  }, [user, allowedRoles, router]);

  if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.user_type))) {
    return null; 
  }

  return <>{children}</>;
}