import { SidebarProvider } from "@/components/ui/sidebar";
import { Modal } from "@/components/Modal";
import { PerfilForm } from "@/components/Modal/PerfilForm";
import { usePerfil } from "@/contexts/PerfilContext/usePerfil";
import { MainLayoutInner } from "@/components/ui/MainLayoutInner";

type MainLayoutProps = {
  children: React.ReactNode;
  onAddMateria: () => void;
};

export function MainLayout({ children, onAddMateria }: MainLayoutProps) {
  const { perfil, salvarPerfil } = usePerfil();

  return (
    <SidebarProvider defaultOpen={false}>
      <MainLayoutInner onAddMateria={onAddMateria}>{children}</MainLayoutInner>

      <Modal isOpen={!perfil} onClose={() => {}}>
        <PerfilForm modoOnboarding={true} onSalvar={salvarPerfil} />
      </Modal>
    </SidebarProvider>
  );
}
