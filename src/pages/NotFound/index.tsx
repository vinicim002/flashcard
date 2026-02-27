import { useNavigate } from "react-router";
import { Home, AlertCircle, ArrowLeft } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary-flashcard flex flex-col items-center justify-center p-4 text-center">
      {/* Círculos de Brilho de Fundo (Blur) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-flashcard-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-flashcard-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 animate-in fade-in zoom-in duration-500">
        {/* Ícone de Alerta Animado */}
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-white/5 rounded-full border-2 border-dashed border-white/10 animate-pulse">
            <AlertCircle size={80} className="text-secondary-flashcard" />
          </div>
        </div>

        {/* Texto de Erro */}
        <h1 className="text-8xl font-black text-white-flashcard mb-2 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white-flashcard/90 mb-4">
          Página não encontrada
        </h2>
        <p className="text-white-flashcard/80 max-w-md mx-auto mb-10 leading-relaxed">
          Parece que você tentou acessar um deck que não existe ou a página foi
          movida. Não deixe isso atrapalhar seus estudos!
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 text-white-flashcard font-bold hover:bg-white/10 transition-all active:scale-95"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Voltar
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-secondary-flashcard text-navbar-flashcard font-black hover:bg-secondary-flashcard shadow-lg shadow-secondary-flashcard/20 transition-all active:scale-95"
          >
            <Home size={18} />
            Página Inicial
          </button>
        </div>
      </div>

      {/* Rodapé Visual */}
      <div className="absolute bottom-8 text-white-flashcard text-xs font-medium uppercase tracking-[0.2em]">
        Flashcards Manager • 2026
      </div>
    </div>
  );
}
