import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
} from "@/components/ui/sidebar";

import {
  Home,
  Calendar,
  Settings,
  PlusIcon,
  TreesIcon,
} from "lucide-react";

import { SearchInput } from "../Search";
import { LogoDaMateria } from "../LogoDaMateria";
import { Progress } from "@/components/ui/progress";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
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
      <SidebarContent className="bg-navbar-flashcard px-3 py-3 space-y-6">
        {/* SEARCH */}
        <SearchInput />

        {/* GROUP: MATÉRIAS */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="relative text-white-flashcard text-base p-0">
            <span className="group-data-[collapsible=icon]:hidden">
              Matérias
            </span>

            <SidebarGroupAction
              title="Adicionar Matéria"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <PlusIcon size={16} />
            </SidebarGroupAction>
          </SidebarGroupLabel>

          {/* LISTA DE MATÉRIAS */}
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4].map((_, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition"
              >
                <LogoDaMateria
                  icon={<TreesIcon size={16} />} className="p-2"
                />

                <div className="flex-1">
                  <p className="text-base font-medium text-white-flashcard">
                    React
                  </p>
                  <Progress value={70} className="h-1 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </SidebarGroup>

        {/* GROUP: NAVEGAÇÃO */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-white-flashcard text-xs">
            Navegação
          </SidebarGroupLabel>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-white-flashcard hover:bg-white/5 transition"
              >
                <item.icon size={18} />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-navbar-flashcard px-4 py-3">
        {/* User / logout futuramente */}
      </SidebarFooter>
    </Sidebar>
  );
}
