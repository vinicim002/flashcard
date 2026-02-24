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
    <section
      className="
      containerFlashcard flex flex-col 
      bg-bg-flashcard border-4 border-primary-flashcard rounded-3xl 
      p-4 md:p-8 
      w-full min-[1200px]:w-2/3 /* 👈 100% no mobile, 66% após 1200px */
      min-h-[500px] min-[1200px]:h-[730px] 
      justify-between gap-y-6
    "
    >
      {/* Header do Flashcard (Filtros/Dropdown) */}
      <div className="w-full flex">
        <DropDownCategoria
          esconderMasterizadas={esconderMasterizadas}
          onToggleEsconderMasterizadas={setEsconderMasterizadas}
        />
      </div>

      {/* Área Central (O Card em si) */}
      <div className="flex-grow flex items-center justify-center w-full">
        <Card
          deck={deck}
          cardsDisponiveis={cardsDisponiveis}
          indiceAtual={indiceSeguro}
          onProximo={handleProximo}
        />
      </div>

      {/* Navegação Inferior */}
      <div className="buttonsVoltarProximo flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto">
        <button
          onClick={handleAnterior}
          disabled={totalCards === 0}
          className="
            w-full sm:w-auto
            bg-white-flashcard text-black-flashcard 
            px-8 py-3 rounded-2xl border-2 border-primary-flashcard 
            cursor-pointer disabled:opacity-50 
            active:scale-95 transition-transform
            font-bold
          "
        >
          Anterior
        </button>

        <p className="text-black-flashcard font-medium order-first sm:order-none">
          Card{" "}
          <span className="text-primary-flashcard font-bold">
            {totalCards === 0 ? 0 : indiceSeguro + 1}
          </span>{" "}
          de <span className="font-bold">{totalCards}</span>
        </p>

        <button
          onClick={handleProximo}
          disabled={totalCards === 0}
          className="
            w-full sm:w-auto
            bg-white-flashcard text-black-flashcard 
            px-8 py-3 rounded-2xl border-2 border-primary-flashcard 
            cursor-pointer disabled:opacity-50 
            active:scale-95 transition-transform
            font-bold
          "
        >
          Próximo
        </button>
      </div>
    </section>
  );
}
