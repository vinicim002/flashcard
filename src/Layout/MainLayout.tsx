import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import type { MateriaModel } from "@/models/MateriaModel";

type MainLayoutProps = {
  children: React.ReactNode;
  onAddMateria?: () => void;
  materias: MateriaModel[];
}

export function MainLayout({ children, onAddMateria, materias }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar onAddMateria={onAddMateria} materias={materias}/>

        <main className="flex-1 overflow-x-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
