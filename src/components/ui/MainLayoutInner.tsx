import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "../Sidebar";

type MainLayoutInnerProps = {
  children: React.ReactNode;
  onAddMateria: () => void;
};

export function MainLayoutInner({
  children,
  onAddMateria,
}: MainLayoutInnerProps) {
  const { setOpenMobile } = useSidebar(); // 👈 controla a sidebar mobile

  function handleAddMateria() {
    setOpenMobile(false); // 👈 fecha a sidebar no mobile
    onAddMateria(); // 👈 depois abre o modal
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <AppSidebar onAddMateria={handleAddMateria} />

      <main className="flex-1 overflow-x-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </div>
  );
}
