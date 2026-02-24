import { useState } from "react";
import { PerfilContext } from "./PerfilContext";
import type { PerfilModel } from "@/models/PerfilModel";

export function PerfilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [perfil, setPerfil] = useState<PerfilModel | null>(() => {
    try {
      const salvo = localStorage.getItem("perfil");
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  function salvarPerfil(novoPerfil: PerfilModel) {
    localStorage.setItem("perfil", JSON.stringify(novoPerfil));
    setPerfil(novoPerfil); // 👈 um único estado compartilhado
  }

  return (
    <PerfilContext.Provider value={{ perfil, salvarPerfil }}>
      {children}
    </PerfilContext.Provider>
  );
}
