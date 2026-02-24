import { CircleCheck, XCircle } from "lucide-react";

type BtnEuSeiNaoSeiProps = {
  onEuSei: () => void;
  onEuNaoSei: () => void;
};

export function BtnEuSeiNaoSei({ onEuSei, onEuNaoSei }: BtnEuSeiNaoSeiProps) {
  return (
    <div className="buttonsFlashCard flex justify-center items-center gap-10">
      <button
        onClick={onEuSei}
        className="btnEuSei flex gap-x-2 bg-primary-flashcard text-white-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-secondary-flashcard cursor-pointer"
      >
        <span>
          <CircleCheck />
        </span>
        Eu sei essa
      </button>

      <button
        onClick={onEuNaoSei}
        className="btnEuNaoSei flex gap-x-2 bg-primary-flashcard text-white-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-secondary-flashcard cursor-pointer"
      >
        <span>
          <XCircle />
        </span>
        Eu não sei
      </button>
    </div>
  );
}
