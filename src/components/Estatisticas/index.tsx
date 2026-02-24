import { BookOpenIcon, BrainIcon, LayersIcon, SparkleIcon } from "lucide-react";
import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { useParams } from "react-router";
import { useMemo } from "react";

export function Estatisticas() {
  const { materias } = useMateriasContext();
  const params = useParams();

  const stats = useMemo(() => {
    const deck = materias
      .flatMap((m) => m.decks)
      .find((d) => d.id === params.deckId);

    if (!deck) return { total: 0, masterizadas: 0, emProgresso: 0, naoIniciadas: 0 };

    const cards = deck.cards;

    return {
      total: cards.length,
      masterizadas: cards.filter((c) => c.masterizado).length,
      emProgresso: cards.filter((c) => !c.masterizado && c.acertosConsecutivos > 0).length,
      naoIniciadas: cards.filter((c) => !c.masterizado && c.acertosConsecutivos === 0).length,
    };
  }, [materias, params.deckId]);

  return (
    <aside className="containerEstatisticaCards bg-bg-flashcard border-4 border-primary-flashcard rounded-2xl w-1/4 h-[730px] p-5 flex justify-center gap-y-10">
      <div className="estatisticaCards flex flex-col gap-3">
        <h3 className="text-4xl font-black text-center text-primary-flashcard pb-7">
          Estatística de estudos
        </h3>

        {/* Total de cards */}
        <div className="statusCards flex w-full">
          <div className="flex flex-col justify-center items-center gap-2 w-2/3 bg-white-flashcard border-2 border-primary-flashcard border-r-0 rounded-l-2xl py-6">
            <h5 className="text-2xl font-semibold text-black-flashcard">TOTAL DE CARDS</h5>
            <h3 className="text-5xl font-bold text-black-flashcard">{stats.total}</h3>
          </div>
          <div className="flex items-center justify-center w-1/3 bg-card01-flashcard border-2 border-primary-flashcard rounded-r-2xl">
            <LayersIcon size={64} />
          </div>
        </div>

        {/* Masterizadas */}
        <div className="statusCards flex w-full">
          <div className="flex flex-col justify-center items-center gap-2 w-2/3 bg-white-flashcard border-2 border-primary-flashcard border-r-0 rounded-l-2xl py-6">
            <h5 className="text-2xl font-semibold text-black-flashcard">MASTERIZADAS</h5>
            <h3 className="text-5xl font-bold text-black-flashcard">{stats.masterizadas}</h3>
          </div>
          <div className="flex items-center justify-center w-1/3 bg-card02-flashcard border-2 border-primary-flashcard rounded-r-2xl">
            <BrainIcon size={64} />
          </div>
        </div>

        {/* Em progresso */}
        <div className="statusCards flex w-full">
          <div className="flex flex-col justify-center items-center gap-2 w-2/3 bg-white-flashcard border-2 border-primary-flashcard border-r-0 rounded-l-2xl py-6">
            <h5 className="text-2xl font-semibold text-black-flashcard">EM PROGRESSO</h5>
            <h3 className="text-5xl font-bold text-black-flashcard">{stats.emProgresso}</h3>
          </div>
          <div className="flex items-center justify-center w-1/3 bg-card03-flashcard border-2 border-primary-flashcard rounded-r-2xl">
            <BookOpenIcon size={64} />
          </div>
        </div>

        {/* Não iniciadas */}
        <div className="statusCards flex w-full">
          <div className="flex flex-col justify-center items-center gap-2 w-2/3 bg-white-flashcard border-2 border-primary-flashcard border-r-0 rounded-l-2xl py-6">
            <h5 className="text-2xl font-semibold text-black-flashcard">NÃO INICIADAS</h5>
            <h3 className="text-5xl font-bold text-black-flashcard">{stats.naoIniciadas}</h3>
          </div>
          <div className="flex items-center justify-center w-1/3 bg-card04-flashcard border-2 border-primary-flashcard rounded-r-2xl">
            <SparkleIcon size={64} />
          </div>
        </div>

      </div>
    </aside>
  );
}