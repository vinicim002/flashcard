import { useState } from "react";
import type { PerfilModel } from "@/models/PerfilModel";
import { UserCircle, Camera, ArrowRight, Check } from "lucide-react";

type PerfilFormProps = {
  perfilAtual?: PerfilModel | null;
  onSalvar: (perfil: PerfilModel) => void;
  onClose?: () => void;
  modoOnboarding?: boolean;
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
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          {modoOnboarding ? "Bem-vindo! 👋" : "Editar Perfil"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {modoOnboarding
            ? "Configure seu perfil para começar a estudar"
            : "Atualize suas informações de conta"}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative group">
            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-200">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                  <UserCircle size={56} className="text-gray-400" />
                </div>
              )}
            </div>

            <label
              htmlFor="avatarInput"
              className="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full p-2.5 cursor-pointer hover:bg-blue-700 shadow-lg active:scale-90 transition-all border-2 border-white"
              title="Alterar foto"
            >
              <Camera size={18} />
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagemChange}
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Foto de Perfil
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="nome"
              className="text-sm font-bold text-gray-700 ml-1"
            >
              Como quer ser chamado?
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Ex: Vinicius Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3.5 text-base md:text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="profissao"
              className="text-sm font-bold text-gray-700 ml-1"
            >
              O que você estuda ou faz?
            </label>
            <div className="relative">
              <select
                id="profissao"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
                required
                className="w-full appearance-none rounded-2xl border border-gray-300 px-4 py-3.5 text-base md:text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
              >
                <option value="" disabled>
                  Selecione sua área...
                </option>
                {profissoes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <ArrowRight size={16} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 pt-4">
          {!modoOnboarding && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/3 rounded-2xl px-4 py-4 text-sm font-bold text-gray-400 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className={`
              flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all active:scale-95
              ${modoOnboarding ? "w-full bg-green-600 hover:bg-green-700 shadow-green-500/30" : "flex-1 bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {modoOnboarding ? (
              <>
                Começar agora <ArrowRight size={18} />
              </>
            ) : (
              <>
                Salvar Alterações <Check size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
