import React from "react";
import type { MateriaModel } from "@/models/MateriaModel";

type MateriasContextType = {
  materias: MateriaModel[];
  handleAddMateria: (materia: MateriaModel) => void;
};

export const MateriasContext = React.createContext(
  {} as MateriasContextType
);
