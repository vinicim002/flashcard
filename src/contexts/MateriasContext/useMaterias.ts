import { useContext } from "react";
import { MateriasContext } from "./MateriasContext";

export function useMateriasContext() {
  return useContext(MateriasContext);
}
