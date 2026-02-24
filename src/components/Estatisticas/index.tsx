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

    if (!deck)
      return { total: 0, masterizadas: 0, emProgresso: 0, naoIniciadas: 0 };

    const cards = deck.cards;

    return {
      total: cards.length,
      masterizadas: cards.filter((c) => c.masterizado).length,
      emProgresso: cards.filter(
        (c) => !c.masterizado && c.acertosConsecutivos > 0,
      ).length,
      naoIniciadas: cards.filter(
        (c) => !c.masterizado && c.acertosConsecutivos === 0,
      ).length,
    };
  }, [materias, params.deckId]);

  return (
    <aside
      className="
      bg-bg-flashcard border-4 border-primary-flashcard rounded-3xl 
      p-5 md:p-8
      w-full min-[1200px]:w-1/4 
      h-auto min-[1200px]:h-[730px] 
      flex flex-col gap-6
      estatisticaFlashCard
    "
    >
      <h3 className="text-3xl md:text-4xl font-black text-center text-primary-flashcard lg:pb-7">
        Estatística de estudos
      </h3>

      {/* Removi 'grid-cols-1 sm:grid-cols-2' e 'overflow-y-auto'.
         Agora ele é 'flex flex-col', garantindo que fiquem SEMPRE um embaixo do outro.
      */}
      <div className="flex flex-col gap-4">
        <StatItem
          label="TOTAL DE CARDS"
          value={stats.total}
          icon={<LayersIcon size={48} />}
          bgColor="bg-card01-flashcard"
        />

        <StatItem
          label="MASTERIZADAS"
          value={stats.masterizadas}
          icon={<BrainIcon size={48} />}
          bgColor="bg-card02-flashcard"
        />

        <StatItem
          label="EM PROGRESSO"
          value={stats.emProgresso}
          icon={<BookOpenIcon size={48} />}
          bgColor="bg-card03-flashcard"
        />

        <StatItem
          label="NÃO INICIADAS"
          value={stats.naoIniciadas}
          icon={<SparkleIcon size={48} />}
          bgColor="bg-card04-flashcard"
        />
      </div>
    </aside>
  );
}
function StatItem({
  label,
  value,
  icon,
  bgColor,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div className="flex w-full min-h-[120px]">
      <div className="flex flex-col justify-center items-center gap-1 w-2/3 bg-white-flashcard border-2 border-primary-flashcard border-r-0 rounded-l-2xl py-4 px-2">
        <h5 className="text-xs md:text-sm font-bold text-black-flashcard text-center uppercase tracking-tighter">
          {label}
        </h5>
        <h3 className="text-3xl md:text-4xl font-black text-black-flashcard">
          {value}
        </h3>
      </div>
      <div
        className={`flex items-center justify-center w-1/3 ${bgColor} border-2 border-primary-flashcard rounded-r-2xl text-primary-flashcard`}
      >
        {icon}
      </div>
    </div>
  );
}
