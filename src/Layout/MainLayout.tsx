import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Modal } from "@/components/Modal";
import { PerfilForm } from "@/components/Modal/PerfilForm";
import { usePerfil } from "@/contexts/PerfilContext/usePerfil";
type MainLayoutProps = {
  children: React.ReactNode;
  onAddMateria?: () => void;
};

export function MainLayout({ children, onAddMateria }: MainLayoutProps) {
  const { perfil, salvarPerfil } = usePerfil(); // 👈 estado compartilhado

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar onAddMateria={onAddMateria} />

        <main className="flex-1 overflow-x-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </div>

      <Modal isOpen={!perfil} onClose={() => {}}>
        <PerfilForm modoOnboarding={true} onSalvar={salvarPerfil} />
      </Modal>
    </SidebarProvider>
  );
}
