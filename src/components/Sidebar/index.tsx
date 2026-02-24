import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  useSidebar, // 👈
} from "@/components/ui/sidebar";

import { PenIcon, PlusIcon, TreesIcon, UserCircle } from "lucide-react";

import { SearchInput } from "../Search";
import { LogoDaMateria } from "../LogoDaMateria";
import { Progress } from "@/components/ui/progress";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { useNavigate } from "react-router";
import { Modal } from "../Modal";
import { usePerfil } from "@/contexts/PerfilContext/usePerfil";
import { useModal } from "@/hooks/use-modal";
import { PerfilForm } from "../Modal/PerfilForm";

type AppSidebarProps = {
  onAddMateria?: () => void;
};

export function AppSidebar({ onAddMateria }: AppSidebarProps) {
  const { materias } = useMateriasContext();
  const navigate = useNavigate();
  const { state } = useSidebar(); // 👈 "expanded" | "collapsed"
  const collapsed = state === "collapsed";
  const { perfil, salvarPerfil } = usePerfil();
  const modalPerfil = useModal();

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
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-navbar-flashcard px-4 py-3 border-t-2 border-white-flashcard/20">
        <div
          className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
        >
          {/* Avatar com hover para editar */}
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={() => modalPerfil.open()}
            title="Editar perfil"
          >
            {perfil?.avatarUrl ? (
              <img
                src={perfil.avatarUrl}
                alt="Avatar"
                className="h-10 w-10 min-w-10 min-h-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 min-w-10 min-h-10 rounded-full bg-gray-400 flex items-center justify-center">
                <UserCircle size={24} className="text-white" />
              </div>
            )}

            {/* Caneta aparece no hover */}
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <PenIcon size={14} className="text-white" />
            </div>
          </div>

          {!collapsed && (
            <div className="leading-tight overflow-hidden">
              <p className="text-sm font-semibold text-white-flashcard truncate">
                {perfil?.nome ?? "Usuário"}
              </p>
              <p className="text-xs text-white-flashcard/70 truncate">
                {perfil?.profissao ?? ""}
              </p>
            </div>
          )}
        </div>

        {/* Modal de edição de perfil */}
        <Modal isOpen={modalPerfil.isOpen} onClose={modalPerfil.close}>
          <PerfilForm
            perfilAtual={perfil}
            onSalvar={salvarPerfil}
            onClose={modalPerfil.close}
          />
        </Modal>
      </SidebarFooter>
    </Sidebar>
  );
}
