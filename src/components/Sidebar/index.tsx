import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Home, Calendar, Settings, PlusIcon, TreesIcon } from "lucide-react";

import { SearchInput } from "../Search";
import { LogoDaMateria } from "../LogoDaMateria";
import { Progress } from "@/components/ui/progress";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
];

type AppSidebarProps = {
  onAddMateria?: () => void;
};

export function AppSidebar({ onAddMateria }: AppSidebarProps) {
  const { materias } = useMateriasContext();

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
              onClick={onAddMateria}
            >
              <PlusIcon size={16} />
            </SidebarGroupAction>
          </SidebarGroupLabel>

          {/* LISTA DE MATÉRIAS */}
          <div className="mt-4 space-y-2">
            {materias.map((materia) => (
              <button
                key={materia.id}
                className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white-flashcard/5 transition cursor-pointer"
              >
                <LogoDaMateria
                  icon={<TreesIcon size={16} />}
                  className={"p-2"}
                  style={{ backgroundColor: materia.cor }}
                />

                <div className="flex-1">
                  <p className="text-base font-medium text-white-flashcard group-data-[collapsible=icon]:hidden">
                    {materia.nome}
                  </p>
                  <Progress
                    value={70}
                    className="h-1 mt-1 w-full group-data-[collapsible=icon]:hidden"
                  />
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

          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon size={18} />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-navbar-flashcard px-4 py-3 border-t-2 border-white-flashcard">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src="/img/avatar.jpg"
            alt="Avatar do usuário"
            className="h-12 w-12 rounded-full object-cover"
          />

          {/* Info do usuário */}
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-white-flashcard">
              Vinicius
            </p>
            <p className="text-xs text-white-flashcard/70">
              Engenharia da Computação
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
