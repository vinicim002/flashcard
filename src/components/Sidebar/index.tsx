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
      <SidebarHeader className="bg-navbar-flashcard">
        <SidebarMenuItem className="flex p-2">
          <img src="/img/logoCompletaAmarela.svg" alt="Logo" className="h-12" />
        </SidebarMenuItem>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-navbar-flashcard px-3 py-3'">
        <SearchInput />

        {/* GROUP: DECK */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="relative text-white-flashcard text-base p-0">
            <span className="group-data-[collapsible=icon]:hidden">
              Matérias
            </span>

            <SidebarGroupAction
              title="Add Matéria"
              className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <PlusIcon size={16} />
            </SidebarGroupAction>
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* GROUP: MENU */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-white-flashcard text-xs p-0">
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
