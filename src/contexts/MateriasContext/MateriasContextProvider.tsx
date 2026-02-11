import { MateriasContext } from "./MateriasContext";
import type { MateriaModel } from "@/models/MateriaModel";
import { useEffect, useState } from "react";

type MateriasContextProviderProps = {
  children: React.ReactNode;
};

export function MateriasContextProvider({
  children,
}: MateriasContextProviderProps) {
  const [materias, setMaterias] = useState<MateriaModel[]>(() => {
    const materiasSalvas = localStorage.getItem("materias");
    return materiasSalvas ? JSON.parse(materiasSalvas) : [];
  });

  function handleAddMateria(newMateria: MateriaModel) {
    setMaterias((prev) => [...prev, newMateria]);
  }

  // salva automaticamente
  useEffect(() => {
    localStorage.setItem("materias", JSON.stringify(materias));
  }, [materias]);

  return (
    <MateriasContext.Provider
      value={{
        materias,
        handleAddMateria,
      }}
    >
      {children}
    </MateriasContext.Provider>
  );
}
