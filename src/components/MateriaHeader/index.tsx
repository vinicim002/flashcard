import { PenIcon } from "lucide-react";
import { LogoDaMateria } from "../LogoDaMateria";

type MateriaHeaderProps = {
  // id: string; => futuramente para pegar a materia correta
  nome: string;
  totalCards: number;
  cardsEstudados: number;
};

export function MateriaHeader({
  nome,
  totalCards,
  cardsEstudados,
}: MateriaHeaderProps) {
  return (
    <div className="flex justify-between items-center mx-36 my-6">
      <div className="flex items-center gap-4">
        <LogoDaMateria />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-5xl font-black text-primary-flashcard">
              {nome}
            </h3>
            <button className="configIconOrName cursor-pointer">
              <PenIcon />
            </button>
          </div>
          <p className="text-black-flashcard">
            <span className="text-primary-flashcard font-semibold">
              {cardsEstudados}
            </span>{" "}
            de{" "}
            <span className="text-primary-flashcard font-semibold">
              {totalCards}
            </span>{" "}
            cards estudados
          </p>
        </div>
      </div>
      <div className="progressTotal">100%</div>
    </div>
  );
}
