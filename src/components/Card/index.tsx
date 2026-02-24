import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { Progress } from "../ui/progress";
import { useParams } from "react-router";
import { useState } from "react";
import { BtnEuSeiNaoSei } from "../BtnEuSeiNaoSei";
import type { DeckModel } from "@/models/DeckModel";
import type { CardModel } from "@/models/CardModel";

type CardProps = {
  deck: DeckModel | undefined;
  cardsDisponiveis: CardModel[];
  indiceAtual: number;
  onProximo: () => void;
};

export function Card({
  deck,
  cardsDisponiveis,
  indiceAtual,
  onProximo,
}: CardProps) {
  const { handleResponderCard } = useMateriasContext();
  const params = useParams();
  const [virado, setVirado] = useState(false);
  const gradeBg = "/img/grade.png";

  if (!deck) return null;

  if (cardsDisponiveis.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[420px] gap-4">
        <h2 className="text-2xl font-bold">🎉 Tudo revisado!</h2>
        <p>Volte mais tarde para continuar.</p>
      </div>
    );
  }

  const cardAtual = cardsDisponiveis[indiceAtual];
  const progresso = ((indiceAtual + 1) / cardsDisponiveis.length) * 100;

  function handleVirarCard() {
    setVirado((prev) => !prev);
  }

  function handleEuSei() {
    handleResponderCard(params.deckId!, cardAtual.id, true);
    onProximo();
    setVirado(false);
  }

  function handleEuNaoSei() {
    handleResponderCard(params.deckId!, cardAtual.id, false);
    onProximo();
    setVirado(false);
  }

  return (
    // 👇 card-container envolve o article inteiro
    <div
      className="card-container h-[420px] cursor-pointer"
      onClick={handleVirarCard}
    >
      <div className={`card-inner ${virado ? "virado" : ""}`}>
        {/* ===== FRENTE ===== */}
        <article
          className="card-frente flashcard bg-secondary-flashcard rounded-2xl p-6 flex flex-col justify-between border-4 border-primary-flashcard"
          style={{
            backgroundImage: `url(${gradeBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center">
            <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-4 py-2 rounded-2xl border-2 border-primary-flashcard w-80">
              {deck.nome}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 flex-1 mt-4">
            <h2 className="font-black text-6xl text-center">
              {cardAtual.frente}
            </h2>
            <p className="text-sm text-gray-400">
              Click para revelar a resposta
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Progress value={progresso} />
            <div>
              {indiceAtual + 1}/{cardsDisponiveis.length}
            </div>
          </div>
        </article>

        {/* ===== VERSO ===== */}
        <article
          className="card-verso flashcard bg-secondary-flashcard rounded-2xl p-6 flex flex-col justify-between border-4 border-primary-flashcard"
          style={{
            backgroundImage: `url(${gradeBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center">
            <div className="categoriaFlashCard flex items-center justify-center bg-white-flashcard text-black-flashcard px-4 py-2 rounded-2xl border-2 border-primary-flashcard w-80">
              {deck.nome}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 flex-1 mt-4">
            <p className="font-medium text-lg text-center">{cardAtual.verso}</p>
            <p className="text-sm text-gray-400">Click para voltar</p>
            {/* 👇 Impede que clicar nos botões vire o card de volta */}
            <div onClick={(e) => e.stopPropagation()}>
              <BtnEuSeiNaoSei
                onEuSei={handleEuSei}
                onEuNaoSei={handleEuNaoSei}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Progress value={progresso} />
            <div>
              {indiceAtual + 1}/{cardsDisponiveis.length}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
