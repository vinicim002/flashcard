import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router";

type DropDownCategoriaProps = {
  esconderMasterizadas: boolean;
  onToggleEsconderMasterizadas: (value: boolean) => void;
};

export function DropDownCategoria({ esconderMasterizadas, onToggleEsconderMasterizadas }: DropDownCategoriaProps) {
  const { materias } = useMateriasContext();
  const navigate = useNavigate();
  const params = useParams();

  if (!params.materiaId) return null;

  const materiaId = params.materiaId;
  const materia = materias.find((m) => m.id === materiaId);
  if (!materia) return null;

  return (
    <div className="optionsFlashCard flex items-center gap-8">
      <div className="relative inline-block w-65">
        <select
          value={params.deckId}
          onChange={(e) => navigate(`/materia/${materiaId}/deck/${e.target.value}`)}
          className="dropdown appearance-none w-full bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer"
        >
          {materia.decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.nome}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <ChevronDown className="text-black-flashcard" />
        </span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hide-mastered"
          checked={esconderMasterizadas}
          onChange={(e) => onToggleEsconderMasterizadas(e.target.checked)} // 👈
        />
        <label htmlFor="hide-mastered">Esconder masterizadas</label>
      </div>
    </div>
  );
}