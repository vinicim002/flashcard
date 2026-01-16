import { MateriaHeader } from "@/components/MateriaHeader";
import { DeckList } from "@/components/DeckList";
import { DeckListHeader } from "@/components/DeckListHeader";
import { MainLayout } from "@/Layout/MainLayout";

export function Home() {
  const decks = [
    {
      id: "1",
      nome: "Hooks",
      totalCards: 32,
      cardsConcluidos: 32,
    },
    {
      id: "2",
      nome: "Context API",
      totalCards: 20,
      cardsConcluidos: 5,
    },
  ];

  return (
    <MainLayout>
      <div className="mainContent">
        <MateriaHeader nome={"REACT"} cardsEstudados={1} totalCards={1000} />
        <DeckListHeader />
        <DeckList decks={decks} />
      </div>
    </MainLayout>
  );
}
