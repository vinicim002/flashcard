import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { Progress } from "../ui/progress";
import { useParams } from "react-router";

export function Card() {
  const { materias } = useMateriasContext();

  const params = useParams();
  if (!params.deckId) return null;

  const deck = materias
    .flatMap((materia) => materia.decks)
    .find((deck) => deck.id === params.deckId);

  if (!deck) return null;

  const cardAtual = deck.cards[0];

  return (
    <>
      <article className="flashcard bg-secondary-flashcard rounded-2xl p-6 flex justify-center items-center border-4 border-primary-flashcard h-[420px]">
        <div className="frontCard flex justify-center items-center flex-col gap-4">
          {/*Categora*/}
          <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard w-80">
            Hooks
          </div>
          <div className="flex flex-col justify-center items-center gap-y-2 pt-6">
            <h2 className="font-black text-8xl">{cardAtual.frente}</h2>
            <p className="cursor-pointer">Click para revelar a resposta</p>
          </div>
          <div className="flex items-center justify-center gap-4 pt-6">
            <Progress value={50} />
            <div>1/10</div>
          </div>
        </div>
      </article>
    </>
  );
}
