import { useState } from "react";
import type { PerfilModel } from "@/models/PerfilModel";
import { UserCircle } from "lucide-react";

type PerfilFormProps = {
  perfilAtual?: PerfilModel | null;
  onSalvar: (perfil: PerfilModel) => void;
  onClose?: () => void;
  modoOnboarding?: boolean; // true = primeira vez, false = edição
};

const profissoes = [
  "Estudante",
  "Médico",
  "Engenharia da Computação",
  "Direito",
  "Psicologia",
  "Administração",
  "Enfermagem",
  "Arquitetura",
  "Outro",
];

export function PerfilForm({
  perfilAtual,
  onSalvar,
  onClose,
  modoOnboarding = false,
}: PerfilFormProps) {
  const [nome, setNome] = useState(perfilAtual?.nome ?? "");
  const [profissao, setProfissao] = useState(perfilAtual?.profissao ?? "");
  const [avatarUrl, setAvatarUrl] = useState(perfilAtual?.avatarUrl ?? "");
  const [previewUrl, setPreviewUrl] = useState(perfilAtual?.avatarUrl ?? "");

  function handleImagemChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Imagem muito grande. Use uma imagem menor que 2MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSalvar({ nome, profissao, avatarUrl });
    onClose?.();
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {modoOnboarding ? "Bem-vindo! Configure seu perfil" : "Editar Perfil"}
        </h2>
        <p className="text-sm text-gray-500">
          {modoOnboarding
            ? "Antes de começar, nos conte um pouco sobre você"
            : "Atualize suas informações de perfil"}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Avatar"
                className="h-24 w-24 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                <UserCircle size={48} className="text-gray-400" />
              </div>
            )}
            <label
              htmlFor="avatarInput"
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 cursor-pointer hover:bg-blue-700 transition"
              title="Alterar foto"
            >
              ✏️
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagemChange}
            />
          </div>
          <p className="text-xs text-gray-400">
            Clique no ícone para alterar a foto
          </p>
        </div>

        {/* Nome */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">
            Seu nome
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Ex: Vinicius"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Profissão */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="profissao"
            className="text-sm font-medium text-gray-700"
          >
            Área de estudo / Profissão
          </label>
          <select
            id="profissao"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white"
          >
            <option value="" disabled>
              Selecione...
            </option>
            {profissoes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {!modoOnboarding && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {modoOnboarding ? "Começar →" : "Salvar"}
          </button>
        </div>
      </form>
    </>
  );
}
