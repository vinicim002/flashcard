import { ICONES_MATERIAS } from "@/utils/icones";

type IconePickerProps = {
  value: string;
  cor: string;
  onChange: (nome: string) => void;
};

export function IconePicker({ value, cor, onChange }: IconePickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Ícone</label>
      <div className="grid grid-cols-5 gap-2">
        {ICONES_MATERIAS.map(({ nome, label, icone: Icone }) => (
          <button
            key={nome}
            type="button"
            title={label}
            onClick={() => onChange(nome)}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl border-2 transition ${
              value === nome
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Icone
              size={22}
              style={{ color: value === nome ? cor : "#6b7280" }}
            />
            <span className="text-xs text-gray-500 truncate w-full text-center">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
