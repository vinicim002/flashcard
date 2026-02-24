import type { MateriaModel } from "@/models/MateriaModel";
import { BookOpen, Brain, Layers, Flame, Trophy, Target } from "lucide-react";

type DashboardProps = {
  materias: MateriaModel[];
};

export function Dashboard({ materias }: DashboardProps) {
  // Calcula estatísticas globais
  const stats = materias.reduce(
    (acc, materia) => {
      materia.decks.forEach((deck) => {
        deck.cards.forEach((card) => {
          acc.total++;
          if (card.masterizado) acc.masterizados++;
          else if (card.acertosConsecutivos > 0) acc.emProgresso++;
          else acc.naoIniciados++;
        });
      });
      return acc;
    },
    { total: 0, masterizados: 0, emProgresso: 0, naoIniciados: 0 },
  );

  const pct = (n: number) =>
    stats.total === 0 ? 0 : Math.round((n / stats.total) * 100);

  return (
    <div className="dashboard p-8 h-full flex flex-col gap-8">
      {/* Título */}
      <div>
        <h1 className="text-4xl font-black text-primary-flashcard">
          Visão Geral
        </h1>
        <p className="text-gray-500 mt-1">
          Selecione uma matéria ou acompanhe seu progresso abaixo
        </p>
      </div>

      {/* Cards de estatística */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<Layers size={28} />}
          label="Total de Cards"
          value={stats.total}
          color="bg-card01-flashcard"
        />
        <StatCard
          icon={<Brain size={28} />}
          label="Masterizados"
          value={stats.masterizados}
          sub={`${pct(stats.masterizados)}%`}
          color="bg-card02-flashcard"
        />
        <StatCard
          icon={<BookOpen size={28} />}
          label="Em Progresso"
          value={stats.emProgresso}
          sub={`${pct(stats.emProgresso)}%`}
          color="bg-card03-flashcard"
        />
        <StatCard
          icon={<Target size={28} />}
          label="Não Iniciados"
          value={stats.naoIniciados}
          sub={`${pct(stats.naoIniciados)}%`}
          color="bg-card04-flashcard"
        />
      </div>

      {/* Barra de progresso geral */}
      {stats.total > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>Progresso geral</span>
            <span>{pct(stats.masterizados)}% masterizado</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-flashcard rounded-full transition-all duration-500"
              style={{ width: `${pct(stats.masterizados)}%` }}
            />
          </div>
        </div>
      )}

      {/* Lista de matérias com progresso */}
      {materias.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
            <Flame size={20} className="text-primary-flashcard" />
            Matérias
          </h2>

          {materias.map((materia) => {
            const totalMateria = materia.decks.flatMap((d) => d.cards).length;
            const masterizadosMateria = materia.decks
              .flatMap((d) => d.cards)
              .filter((c) => c.masterizado).length;
            const pctMateria =
              totalMateria === 0
                ? 0
                : Math.round((masterizadosMateria / totalMateria) * 100);

            return (
              <div
                key={materia.id}
                className="flex flex-col gap-1 bg-white-flashcard border-2 border-primary-flashcard rounded-xl px-4 py-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-black-flashcard">
                    {materia.nome}
                  </span>
                  <span className="text-sm text-gray-500">
                    {masterizadosMateria}/{totalMateria} cards
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-flashcard rounded-full transition-all duration-500"
                    style={{ width: `${pctMateria}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Estado vazio */}
      {materias.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 text-gray-400">
          <Trophy size={48} />
          <p className="text-lg font-medium">
            Crie sua primeira matéria para começar!
          </p>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar
type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  color: string;
};

function StatCard({ icon, label, value, sub, color }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 bg-white-flashcard border-2 border-primary-flashcard rounded-2xl p-4">
      <div
        className={`${color} border-2 border-primary-flashcard rounded-xl p-3 flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
        <p className="text-3xl font-black text-black-flashcard">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}