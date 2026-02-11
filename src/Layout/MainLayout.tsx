import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
  onAddMateria?: () => void;
}

export function MainLayout({ children, onAddMateria }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar onAddMateria={onAddMateria}/>

        <main className="flex-1 overflow-x-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
