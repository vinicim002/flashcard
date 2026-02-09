import type { ReactNode } from "react";

type LogoDaMateriaProps = {
  icon: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function LogoDaMateria({
  icon,
  className = "",
  style,
}: LogoDaMateriaProps) {
  return (
    <div
      className={`logoDaMateria bg-primary-flashcard rounded-lg flex items-center justify-center ${className}`}
      style={style}
    >
      {icon}
    </div>
  );
}
