import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { Card } from "../Card";
import { DropDownCategoria } from "../DropDownCategoria";
import { useParams } from "react-router";
import { useMemo, useState } from "react";

export function FlashCardMain() {
  "use no memo";

  const { materias } = useMateriasContext();
  const params = useParams();
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [esconderMasterizadas, setEsconderMasterizadas] = useState(false); // 👈

  const deck = useMemo(() => {
    return materias.flatMap((m) => m.decks).find((d) => d.id === params.deckId);
  }, [materias, params.deckId]);

  const cardsDisponiveis = useMemo(() => {
    if (!deck) return [];

    return deck.cards.filter((card) => {
      if (esconderMasterizadas && card.masterizado) return false; // 👈 filtro
      return (
        !card.masterizado &&
        (!card.proximaRevisao || card.proximaRevisao <= Date.now())
      );
    });
  }, [deck, esconderMasterizadas]);

  const totalCards = cardsDisponiveis.length;
  const indiceSeguro = indiceAtual < totalCards ? indiceAtual : 0;

  function handleProximo() {
    setIndiceAtual((prev) => (prev + 1 < totalCards ? prev + 1 : 0));
  }

  function handleAnterior() {
    setIndiceAtual((prev) => (prev - 1 >= 0 ? prev - 1 : totalCards - 1));
  }

  return (
    <section className="containerFlashcard flex flex-col bg-bg-flashcard border-4 border-primary-flashcard rounded-2xl p-5 w-2/3 h-[730px] gap-y-10">
      {/* 👇 Passa o estado e o handler */}
      <DropDownCategoria
        esconderMasterizadas={esconderMasterizadas}
        onToggleEsconderMasterizadas={setEsconderMasterizadas}
      />

      <Card
        deck={deck}
        cardsDisponiveis={cardsDisponiveis}
        indiceAtual={indiceSeguro}
        onProximo={handleProximo}
      />

      <div className="buttonsVoltarProximo flex justify-between items-center">
        <button
          onClick={handleAnterior}
          disabled={totalCards === 0}
          className="btnNextCard bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer disabled:opacity-50"
        >
          Voltar
        </button>

        <p>
          Card {totalCards === 0 ? 0 : indiceSeguro + 1} de {totalCards}
        </p>

        <button
          onClick={handleProximo}
          disabled={totalCards === 0}
          className="btnPreviousCard bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </section>
  );
}
