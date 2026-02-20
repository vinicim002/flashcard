import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { ChevronDown } from "lucide-react";
import { useParams } from "react-router";

export function DropDownCategoria() {
  const { materias } = useMateriasContext();

  const params = useParams();
  if (!params.materiaId) return null;

  const materiaId: string = params.materiaId;

  return (
    <>
      <div className="optionsFlashCard flex items-center gap-8">
        {/*Dropdown de categorias*/}
        <div className="relative inline-block w-65">
          <select className="dropdown appearance-none w-full bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer">
            {materias.find((materia) => materia.id === materiaId)?.decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.nome}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <ChevronDown className="text-black-flashcard" />
          </span>
        </div>

        {/*Checkbox para esconder cards masterizados*/}
        <div className="flex items-center gap-2">
          <input type="checkbox" id="hide-mastered" />
          <label htmlFor="hide-mastered">Esconder masterizadas</label>
        </div>
      </div>
    </>
  );
}
