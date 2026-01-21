import type { ReactNode } from "react";

type LogoDaMateriaProps = {
  icon: ReactNode;
  className?: string;
};

export function LogoDaMateria({ icon, className = "" }: LogoDaMateriaProps) {
  return (
    <div
      className={`logoDaMateria bg-primary-flashcard rounded-lg flex items-center justify-center ${className}`}
    >
      {icon}
    </div>
  );
}
