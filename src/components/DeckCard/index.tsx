import { PenIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router";

type DeckCardProps = {
  id: string;
  materiaId: string;
  nomeDeck: string;
  totalCards: number;
  cardsConcluidos: number;
};

export function DeckCard({
  id,
  materiaId,
  nomeDeck,
  totalCards,
  cardsConcluidos,
}: DeckCardProps) {
  const navigate = useNavigate();

  return (
    <li
      className="flex mx-36 gap-8 mt-8 hover:bg-primary-flashcard/20 transition rounded-lg p-4 cursor-pointer"
      onClick={() => navigate(`/materia/${materiaId}/deck/${id}`)}
    >
      <div className="flex justify-between items-center w-full gap-4">
        <div className="containerProgressbar flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h5 className="text-primary-flashcard font-black text-2xl">
              {nomeDeck}
            </h5>
            <p>
              <span>{cardsConcluidos}</span> de <span>{totalCards}</span> cards
              concluidos
            </p>
          </div>
          <div className="barProgressCardHome w-full">
            <Progress className="w-[1000px]" value={32} />
          </div>
        </div>

        <button className="items-end" aria-label="Edit" title="Edit">
          <PenIcon />
        </button>
      </div>
    </li>
  );
}
