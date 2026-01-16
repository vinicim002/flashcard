import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Home, Inbox, Calendar, Settings, PlusIcon } from "lucide-react";
import { SearchInput } from "../Search";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="bg-navbar-flashcard px-4 py-3">
        <SidebarMenuItem className="flex p-2 justify-center">
          <img src="/img/logoCompletaAmarela.svg" alt="Logo" className="h-12" />
        </SidebarMenuItem>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-navbar-flashcard px-3 py-4 space-y-6">
        {/* SEARCH */}
        <SearchInput />

        {/* GROUP: DECK */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="flex items-center justify-between text-white-flashcard text-xs">
            <span className="group-data-[collapsible=icon]:hidden">Deck</span>

            <SidebarGroupAction aria-label="Adicionar matéria">
              <PlusIcon size={14} />
            </SidebarGroupAction>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="flex items-center justify-between py-3">
              <h3 className="text-base font-bold text-white-flashcard group-data-[collapsible=icon]:hidden">
                ADICIONAR MATÉRIA
              </h3>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GROUP: MENU */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-white-flashcard text-xs">
            Navegação
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon size={18} />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-navbar-flashcard px-4 py-3">
        {/* User / logout futuramente */}
      </SidebarFooter>
    </Sidebar>
  );
}
