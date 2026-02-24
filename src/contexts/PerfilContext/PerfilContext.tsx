import { createContext } from "react";
import type { PerfilModel } from "@/models/PerfilModel";

type PerfilContextProps = {
  perfil: PerfilModel | null;
  salvarPerfil: (perfil: PerfilModel) => void;
};

export const PerfilContext = createContext({} as PerfilContextProps);
