import DashboardLayout from "@/components/layout/dashboard-layout";

export default function NodalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout role="nodal" name="Nodal Officer">{children}</DashboardLayout>;
}
