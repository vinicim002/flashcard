import { showMessage } from "@/adapters/showMessage";
import type { MateriaModel } from "@/models/MateriaModel";
import { createElement, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconePicker } from "@/components/IconePicker";
import { getIcone } from "@/utils/icones";
import { Save } from "lucide-react";

type AddMateriaFormProps = {
  onSubmit: (materia: MateriaModel) => void;
  onClose: () => void;
};

function PreviewIcone({
  nome,
  size,
  className,
}: {
  nome: string;
  size: number;
  className?: string;
}) {
  return createElement(getIcone(nome), { size, className });
}

export function AddMateriaForm({ onSubmit, onClose }: AddMateriaFormProps) {
  const [nomeMateria, setNomeMateria] = useState("");
  const [corMateria, setCorMateria] = useState("#5aa9e6");
  const [icone, setIcone] = useState("BookOpen");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!nomeMateria.trim() || nomeMateria.trim().length < 3) {
      showMessage.error("A matéria deve ter pelo menos 3 caracteres.");
      return;
    }

    onSubmit({
      id: uuidv4(),
      nome: nomeMateria,
      decks: [],
      totalDecksConcluidos: 0,
      cor: corMateria,
      icone,
    });

    onClose();
    showMessage.success("Matéria criada com sucesso!");
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-full max-h-[82vh]">
      {/* Estilo para esconder a barra de rolagem */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `,
        }}
      />

      {/* Header Fixo */}
      <div className="mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Nova Matéria
        </h2>
        <p className="text-sm text-gray-500">
          Personalize sua matéria com ícones e cores
        </p>
      </div>

      {/* Preview Dinâmico - Fixo */}
      <div
        className="w-full h-20 rounded-2xl mb-6 flex items-center justify-center gap-3 transition-all duration-300 shadow-inner flex-shrink-0"
        style={{ backgroundColor: corMateria }}
      >
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <PreviewIcone
            nome={icone}
            size={32}
            className="text-white drop-shadow-md"
          />
        </div>
        <span className="text-white font-bold text-xl drop-shadow-md truncate max-w-[70%]">
          {nomeMateria.trim() || "Nova Matéria"}
        </span>
      </div>

      {/* Formulário com Scroll Invisível */}
      <form
        className="space-y-5 flex-1 overflow-y-auto no-scrollbar px-1 pb-4"
        onSubmit={handleSubmit}
      >
        {/* Nome */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="addMateria"
            className="text-sm font-semibold text-gray-700 ml-1"
          >
            Nome da matéria
          </label>
          <input
            id="addMateria"
            type="text"
            required
            minLength={3}
            maxLength={50}
            placeholder="Ex: Programação React"
            value={nomeMateria}
            onChange={(e) => setNomeMateria(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base md:text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
          />
        </div>

        {/* Seletor de Cor */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex flex-col">
            <label
              htmlFor="addColor"
              className="text-sm font-semibold text-gray-700"
            >
              Cor da Matéria
            </label>
            <span className="text-xs text-gray-400 font-mono uppercase">
              {corMateria}
            </span>
          </div>
          <input
            id="addColor"
            type="color"
            value={corMateria}
            onChange={(e) => setCorMateria(e.target.value)}
            className="h-12 w-16 cursor-pointer rounded-lg border-2 border-white shadow-sm transition-transform active:scale-90"
          />
        </div>

        {/* Picker de Ícones */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Selecione um Ícone
          </label>
          <div className="rounded-2xl border border-gray-200 p-2 bg-white shadow-sm">
            <IconePicker value={icone} cor={corMateria} onChange={setIcone} />
          </div>
        </div>
      </form>

      {/* Footer Fixo */}
      <div className="mt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 flex-shrink-0 bg-white">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Save size={18} /> Criar Matéria
        </button>
      </div>
    </div>
  );
}
