import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-navbar-flashcard">
        <SidebarMenuItem className="flex justify-center py-2">
          <img src="../public/img/logoCompletaAmarela.svg" alt="" />
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent className="bg-amber-300">a</SidebarContent>
    </Sidebar>
  );
}
