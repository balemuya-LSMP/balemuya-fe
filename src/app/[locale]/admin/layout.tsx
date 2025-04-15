import ProtectedLayout from "../(features)/_components/ProtectedLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout allowedRoles={['admin']}>
      {children}
    </ProtectedLayout>
  );
}