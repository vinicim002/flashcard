import { useContext } from "react";
import { PerfilContext } from "./PerfilContext";

export function usePerfil() {
  return useContext(PerfilContext);
}
