'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import ProtectedLayout from "../(features)/_components/ProtectedLayout";
import Header from "./_components/header";

export default function ProfessionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedLayout allowedRoles={['professional']}>
            {children}
        </ProtectedLayout>
    );
}