import { MateriasContext } from "./MateriasContext";
import type { MateriaModel } from "@/models/MateriaModel";
import type { DeckModel } from "@/models/DeckModel";
import { useEffect, useState } from "react";

type MateriasContextProviderProps = {
  children: React.ReactNode;
};

export function MateriasContextProvider({
  children,
}: MateriasContextProviderProps) {
  // Estado das matérias
  const [materias, setMaterias] = useState<MateriaModel[]>(() => {
    try {
      const materiasSalvas = localStorage.getItem("materias");
      return materiasSalvas ? JSON.parse(materiasSalvas) : [];
    } catch {
      return [];
    }
  });

  // Adicionar matéria
  function handleAddMateria(newMateria: MateriaModel) {
    setMaterias((prev) => [...prev, newMateria]);
  }

  // Adicionar deck dentro da matéria correta
  function handleAddDeck(materiaId: string, newDeck: DeckModel) {
    setMaterias((prev) =>
      prev.map((materia) =>
        materia.id === materiaId
          ? { ...materia, decks: [...materia.decks, newDeck] }
          : materia,
      ),
    );
  }

  // Persistência
  useEffect(() => {
    localStorage.setItem("materias", JSON.stringify(materias));
  }, [materias]);

  return (
    <MateriasContext.Provider
      value={{
        materias,
        handleAddMateria,
        handleAddDeck,
      }}
    >
      {children}
    </MateriasContext.Provider>
  );
}
