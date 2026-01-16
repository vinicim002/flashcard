import { SearchIcon } from "lucide-react";

export function SearchInput() {
  return (
    <>
      <div className="flex items-center gap-2 border-b-2 border-white-flashcard py-1 group-data-[collapsible=icon]:hidden">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full rounded-md text-sm outline-none placeholder:text-white-flashcard text-white-flashcard bg-transparent"
        />
        <button type="button" className="cursor-pointer">
          <SearchIcon size={16} className="text-white-flashcard" />
        </button>
      </div>
    </>
  );
}
