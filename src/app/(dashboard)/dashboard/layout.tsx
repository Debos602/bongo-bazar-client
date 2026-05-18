import Sidebar from "@/components/shared/Sidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh">
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: 256 }}>
        <DashboardHeader />
        <div className="flex-1" style={{ paddingTop: 64 }}>
          {children}
        </div>
      </div>
    </main>
  );
}
