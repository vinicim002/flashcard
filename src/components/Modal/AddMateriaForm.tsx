import type { MateriaModel } from "@/models/MateriaModel";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type AddMateriaFormProps = {
  onSubmit: (materia: MateriaModel) => void;
};

export function AddMateriaForm({ onSubmit }: AddMateriaFormProps) {
  const [nomeMateria, setNomeMateria] = useState("");
  function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNomeMateria(event.target.value);
  }

  const [urlImgMateria, setUrlImgMateria] = useState("");
  function handleUrlImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrlImgMateria(event.target.value);
  }

  const [corMateria, setCorMateria] = useState("#5aa9e6");
  function handleCorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCorMateria(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newMateria = {
      id: uuidv4(),
      nome: nomeMateria,
      deck: [],
      totalDecksConcluidos: 0,
      imagemUrl: urlImgMateria,
      cor: corMateria,
    };
    onSubmit(newMateria);
    setNomeMateria("");
    setUrlImgMateria("");
    setCorMateria("#5aa9e6");
  }

  return (
    <>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Adicionar Matéria</h2>
        <p className="text-sm text-gray-500">
          Crie uma nova matéria para organizar seus decks
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="addMateria"
            className="text-sm font-medium text-gray-700"
          >
            Nome da matéria
          </label>
          <input
            id="addMateria"
            type="text"
            placeholder="Ex: React"
            value={nomeMateria}
            onChange={handleNomeChange}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Imagem */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="addImage"
            className="text-sm font-medium text-gray-700"
          >
            Ícone / imagem
          </label>
          <input
            id="addImage"
            type="file"
            value={urlImgMateria}
            onChange={handleUrlImgChange}
            className="text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-sm file:font-medium file:text-blue-600 hover:file:bg-blue-100"
          />
        </div>

        {/* Cor */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="addColor"
            className="text-sm font-medium text-gray-700"
          >
            Cor de fundo
          </label>
          <input
            id="addColor"
            type="color"
            value={corMateria}
            onChange={handleCorChange}
            className="h-10 w-14 cursor-pointer rounded-md border"
          />
        </div>

        {/* Footer / Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
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
