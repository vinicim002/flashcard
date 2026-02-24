import type { MateriaModel } from "@/models/MateriaModel";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type EditMateriaFormProps = {
  materia: MateriaModel;
  onEdit: (dadosAtualizados: Partial<MateriaModel>) => void;
  onDelete: () => void;
  onClose: () => void;
};

export function EditMateriaForm({
  materia,
  onEdit,
  onDelete,
  onClose,
}: EditMateriaFormProps) {
  const [nome, setNome] = useState(materia.nome);
  const [cor, setCor] = useState(materia.cor);
  const [imagemUrl, setImagemUrl] = useState(materia.imagemUrl ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onEdit({ nome, cor, imagemUrl });
    onClose();
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true); // primeiro clique pede confirmação
      return;
    }
    onDelete();
    onClose();
  }

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Editar Matéria</h2>
          <p className="text-sm text-gray-500">
            Atualize as informações da matéria
          </p>
        </div>

        {/* Botão deletar */}
        <button
          type="button"
          onClick={handleDelete}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
            confirmDelete
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-red-500 hover:bg-red-50"
          }`}
        >
          <Trash2 size={14} />
          {confirmDelete ? "Confirmar exclusão" : "Excluir"}
        </button>
      </div>

      {/* Preview */}
      <div
        className="w-full h-16 rounded-xl mb-4 flex items-center justify-center"
        style={{ backgroundColor: cor }}
      >
        <span className="text-white font-bold text-lg drop-shadow">
          {nome || "Preview"}
        </span>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="editNome"
            className="text-sm font-medium text-gray-700"
          >
            Nome da matéria
          </label>
          <input
            id="editNome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Imagem URL */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="editImagem"
            className="text-sm font-medium text-gray-700"
          >
            URL da imagem (opcional)
          </label>
          <input
            id="editImagem"
            type="text"
            placeholder="https://..."
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Cor */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="editCor"
            className="text-sm font-medium text-gray-700"
          >
            Cor de fundo
          </label>
          <input
            id="editCor"
            type="color"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="h-10 w-14 cursor-pointer rounded-md border"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}
