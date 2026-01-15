import { CheckCircleIcon, PlayCircleIcon } from "lucide-react";
import { Progress } from "../ui/progress";

type DeckCardProps = {
  nomeDeck: string;
  totalCards: number;
  cardsConcluidos: number;
  // onPlay: () => void;
};

export function DeckCard({
  nomeDeck = "Hook",
  totalCards = 32,
  cardsConcluidos = 32,
}: // onPlay,
DeckCardProps) {
  return (
    <li className="flex mx-36 gap-8 mt-8">
      <div className="statusCardHome flex gap-2 items-start">
        <CheckCircleIcon />
        <span>100%</span>
      </div>
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

        <button className="items-end">
          <PlayCircleIcon />
        </button>
      </div>
    </li>
  );
}
