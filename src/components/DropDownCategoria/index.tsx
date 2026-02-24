import { useMateriasContext } from "@/contexts/MateriasContext/useMaterias";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router";

type DropDownCategoriaProps = {
  esconderMasterizadas: boolean;
  onToggleEsconderMasterizadas: (value: boolean) => void;
};

export function DropDownCategoria({
  esconderMasterizadas,
  onToggleEsconderMasterizadas,
}: DropDownCategoriaProps) {
  const { materias } = useMateriasContext();
  const navigate = useNavigate();
  const params = useParams();

  if (!params.materiaId) return null;

  const materiaId = params.materiaId;
  const materia = materias.find((m) => m.id === materiaId);
  if (!materia) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
      {/* Dropdown de Seleção de Deck */}
      <div className="relative inline-block w-full sm:w-64">
        <select
          value={params.deckId}
          onChange={(e) =>
            navigate(`/materia/${materiaId}/deck/${e.target.value}`)
          }
          className="dropdown appearance-none w-full bg-white-flashcard text-black-flashcard px-4 py-3 sm:py-2 pr-10 rounded-2xl border-2 border-primary-flashcard cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-primary-flashcard/20 transition-all"
        >
          {materia.decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.nome}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <ChevronDown className="text-primary-flashcard" size={20} />
        </span>
      </div>

      {/* Checkbox de Filtro */}
      <div className="flex items-center gap-3 px-1">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="hide-mastered"
            checked={esconderMasterizadas}
            onChange={(e) => onToggleEsconderMasterizadas(e.target.checked)}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-primary-flashcard checked:bg-primary-flashcard transition-all"
          />
          {/* Ícone customizado para o checkbox (opcional, mas melhora o visual) */}
          <svg
            className="absolute h-3.5 w-3.5 pointer-events-none hidden peer-checked:block stroke-white outline-none left-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <label
          htmlFor="hide-mastered"
          className="text-sm md:text-base font-medium text-black-flashcard cursor-pointer select-none"
        >
          Esconder masterizadas
        </label>
      </div>
    </div>
  );
}
