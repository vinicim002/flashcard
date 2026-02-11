import { PenIcon, TreesIcon } from "lucide-react";
import { LogoDaMateria } from "../LogoDaMateria";
import type { MateriaModel } from "@/models/MateriaModel";

type MateriaHeaderProps = {
  materiaAtual: MateriaModel;
};

export function MateriaHeader({ materiaAtual }: MateriaHeaderProps) {
  return (
    <div className="flex justify-between items-center mx-36 my-6">
      <div className="flex items-center gap-4">
        <LogoDaMateria
          icon={<TreesIcon size={64} />}
          className={"p-2"}
          style={{ backgroundColor: materiaAtual.cor }}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-5xl font-black text-primary-flashcard">
              {materiaAtual.nome}
            </h3>
            <button className="configIconOrName cursor-pointer">
              <PenIcon />
            </button>
          </div>
          <p className="text-black-flashcard">
            <span className="text-primary-flashcard font-semibold">{400}</span>{" "}
            de{" "}
            <span className="text-primary-flashcard font-semibold">{400}</span>{" "}
            cards estudados
          </p>
        </div>
      </div>
      <div className="progressTotal">100%</div>
    </div>
  );
}
