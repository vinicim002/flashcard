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
  useSidebar, // 👈
} from "@/components/ui/sidebar";

import { Home, Calendar, Settings, PlusIcon, TreesIcon } from "lucide-react";

import { SearchInput } from "../Search";
import { LogoDaMateria } from "../LogoDaMateria";
import { Progress } from "@/components/ui/progress";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const { state } = useSidebar(); // 👈 "expanded" | "collapsed"
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="bg-navbar-flashcard">
        <SidebarMenuItem className="flex items-center justify-center p-2">
          {collapsed ? ( // 👈 troca por condicional JS
            <img
              src="/img/logoIcone.svg"
              alt="Logo"
              className="h-8 w-8 shrink-0"
            />
          ) : (
            <img
              src="/img/logoCompletaAmarela.svg"
              alt="Logo"
              className="h-12"
            />
          )}
        </SidebarMenuItem>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-navbar-flashcard px-3 py-3 space-y-6">
        {/* SEARCH — só no modo expandido */}
        {!collapsed && <SearchInput />}

        {/* GROUP: MATÉRIAS */}
        <SidebarGroup className="p-0">
          {!collapsed && (
            <SidebarGroupLabel className="relative text-white-flashcard text-base p-0">
              Matérias
              <SidebarGroupAction
                title="Adicionar Matéria"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                onClick={onAddMateria}
              >
                <PlusIcon size={16} />
              </SidebarGroupAction>
            </SidebarGroupLabel>
          )}

          <div className="mt-4 space-y-2">
            {materias.map((materia) => (
              <button
                key={materia.id}
                className={`w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white-flashcard/5 transition cursor-pointer ${collapsed ? "justify-center" : ""}`}
                onClick={() => navigate(`/materia/${materia.id}`)}
                title={materia.nome}
              >
                <LogoDaMateria
                  icon={<TreesIcon size={16} />}
                  className="p-2 shrink-0"
                  style={{ backgroundColor: materia.cor }}
                />

                {!collapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className="text-base font-medium text-white-flashcard truncate">
                      {materia.nome}
                    </p>
                    <Progress value={70} className="h-1 mt-1 w-full" />
                  </div>
                )}
              </button>
            ))}

            {/* Botão + no modo colapsado */}
            {collapsed && (
              <button
                className="w-full flex items-center justify-center p-2 rounded-lg cursor-pointer text-white-flashcard"
                onClick={onAddMateria}
                title="Adicionar Matéria"
              >
                <LogoDaMateria
                  icon={<PlusIcon size={16} />}
                  className="p-2 shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                />
              </button>
            )}
          </div>
        </SidebarGroup>

        {/* DIVISOR */}
        <div className="border-t border-white-flashcard/20" />

        {/* GROUP: NAVEGAÇÃO */}
        <SidebarGroup className="p-0">
          {!collapsed && (
            <SidebarGroupLabel className="text-white-flashcard text-xs">
              Navegação
            </SidebarGroupLabel>
          )}

          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`text-white-flashcard hover:bg-white-flashcard/10 hover:text-white-flashcard ${collapsed ? "justify-center" : ""}`}
                  title={item.title}
                >
                  <a href={item.url} className="flex items-center gap-2">
                    <item.icon size={18} className="shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-navbar-flashcard px-4 py-3 border-t-2 border-white-flashcard/20">
        <div
          className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
        >
          <img
            src="/img/avatar.jpg"
            alt="Avatar do usuário"
            className="h-10 w-10 min-w-10 min-h-10 rounded-full object-cover shrink-0"
            title="Vinicius"
          />

          {!collapsed && (
            <div className="leading-tight overflow-hidden">
              <p className="text-sm font-semibold text-white-flashcard truncate">
                Vinicius
              </p>
              <p className="text-xs text-white-flashcard/70 truncate">
                Engenharia da Computação
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
