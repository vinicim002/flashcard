import { createElement } from "react";
import { getIcone } from "@/utils/icones";

type LogoDaMateriaProps = {
  icon: string | React.ReactNode;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
};

export function LogoDaMateria({
  icon,
  size = 24,
  className = "",
  style,
  iconClassName = "text-white",
}: LogoDaMateriaProps) {
  const IconComponent = typeof icon === "string" ? getIcone(icon) : null;

  return (
    <div
      className={`logoDaMateria bg-primary-flashcard rounded-lg flex items-center justify-center ${className}`}
      style={style}
    >
      {typeof icon === "string"
        ? createElement(IconComponent!, {
            size,
            className: iconClassName,
          })
        : icon}
    </div>
  );
}
