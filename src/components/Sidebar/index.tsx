import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";

import { PenIcon, PlusIcon, UserCircle } from "lucide-react";

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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { perfil, salvarPerfil } = usePerfil();
  const modalPerfil = useModal();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Estilo para esconder barra de rolagem interna */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .sidebar-no-scrollbar::-webkit-scrollbar { display: none; }
        .sidebar-no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `,
        }}
      />

      {/* HEADER */}
      <SidebarHeader className="bg-navbar-flashcard h-20 flex items-center justify-center border-b border-white/5">
        <SidebarMenuItem className="list-none flex items-center justify-center w-full">
          {/* Adicionado o onClick para voltar ao "/" */}
          <div
            className="cursor-pointer transition-transform active:scale-95"
            onClick={() => navigate("/")}
          >
            {collapsed ? (
              <img
                src="/img/logoCircle.png"
                alt="Logo"
                className="h-9 w-9 min-w-[2.25rem] rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-12 items-center justify-center p-2 animate-in fade-in duration-500">
                <img
                  src="/img/logoCompletaAmarela.svg"
                  alt="Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            )}
          </div>
        </SidebarMenuItem>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-navbar-flashcard px-3 py-4 space-y-6 overflow-y-auto sidebar-no-scrollbar">
        {!collapsed && (
          <div className="animate-in slide-in-from-left-2 duration-300">
            <SearchInput />
          </div>
        )}

        <SidebarGroup className="p-0">
          {!collapsed && (
            <SidebarGroupLabel className="flex items-center justify-between text-white-flashcard/60 font-bold text-xs uppercase tracking-widest p-0 px-1 mb-4">
              Matérias
              <button
                onClick={onAddMateria}
                className="p-1 hover:bg-white/10 rounded-md transition-colors text-white-flashcard"
                title="Adicionar Matéria"
              >
                <PlusIcon size={18} />
              </button>
            </SidebarGroupLabel>
          )}

          <div className="space-y-1.5">
            {materias.map((materia) => {
              // --- LÓGICA DE CÁLCULO DE PROGRESSO ---
              const decks = materia.decks || [];

              // Pegamos todos os cards de todos os decks desta matéria
              const todosOsCards = decks.flatMap((deck) => deck.cards || []);
              const totalCards = todosOsCards.length;

              // Filtramos quantos desses cards estão masterizados
              const cardsMasterizados = todosOsCards.filter(
                (card) => card.masterizado,
              ).length;

              // Calculamos a porcentagem (se não houver cards, progresso é 0)
              const progressoCalculado =
                totalCards > 0
                  ? Math.round((cardsMasterizados / totalCards) * 100)
                  : 0;

              return (
                <button
                  key={materia.id}
                  className={`
                    w-full flex items-center gap-3 p-2 rounded-xl transition-all group cursor-pointer
                    hover:bg-white/10 active:scale-95
                    ${collapsed ? "justify-center" : "px-3"}
                  `}
                  onClick={() => navigate(`/materia/${materia.id}`)}
                  title={`${materia.nome} (${progressoCalculado}%)`}
                >
                  <div className="shrink-0 transition-transform group-hover:scale-110">
                    <LogoDaMateria
                      icon={materia.icone}
                      className="h-10 w-10 shadow-md"
                      style={{ backgroundColor: materia.cor }}
                    />
                  </div>

                  {!collapsed && (
                    <div className="flex-1 text-left overflow-hidden animate-in fade-in slide-in-from-left-1">
                      <p className="text-sm font-bold text-white-flashcard truncate">
                        {materia.nome}
                      </p>
                      {/* Barra de progresso com o valor calculado dinamicamente */}
                      <Progress
                        value={progressoCalculado}
                        className="h-1 mt-1 w-full"
                      />
                    </div>
                  )}
                </button>
              );
            })}

            {collapsed && (
              <button
                className="w-full flex items-center justify-center p-2 mt-4 text-white-flashcard/40 hover:text-white-flashcard transition-colors"
                onClick={onAddMateria}
              >
                <div className="h-10 w-10 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center">
                  <PlusIcon size={20} />
                </div>
              </button>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-navbar-flashcard p-4 border-t border-white/5">
        <div
          className={`
            flex items-center gap-3 p-1 rounded-2xl transition-colors
            ${collapsed ? "justify-center" : "hover:bg-white/5 cursor-pointer"}
          `}
          onClick={() => !collapsed && modalPerfil.open()}
        >
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={() => collapsed && modalPerfil.open()}
          >
            {perfil?.avatarUrl ? (
              <img
                src={perfil.avatarUrl}
                alt="Avatar"
                className="h-10 w-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full object-cover border-2 border-white/10 group-hover:border-yellow-400 transition-all"
              />
            ) : (
              <div className="h-10 w-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full bg-white/10 flex items-center justify-center">
                <UserCircle size={24} className="text-white-flashcard" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PenIcon size={12} className="text-white" />
            </div>
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0 animate-in fade-in duration-300">
              <p className="text-sm font-bold text-white-flashcard truncate">
                {perfil?.nome ?? "Usuário"}
              </p>
              <p className="text-[10px] font-medium text-white-flashcard/50 uppercase truncate">
                {perfil?.profissao ?? "Estudante"}
              </p>
            </div>
          )}
        </div>

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
