import {
  CheckCircleIcon,
  PlayCircleIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { MateriaHeader } from "@/components/MateriaHeader";

export function Home() {
  return (
    <div className="mainContent">
      {/* Main content goes here */}
      <MateriaHeader/>
      <div>
        {/*Aqui vai uma barra simples com titulo "meus decks", btn para adicionar novo deck */}
        <div className="flex items-center justify-between bg-bg-flashcard py-2">
          <h2 className="text-2xl font-bold text-black-flashcard mx-36">
            MEUS DECKS
          </h2>
          <button className="btnAddNewDeck mx-36 bg-white-flashcard text-black-flashcard px-4 py-2 pr-5 rounded-2xl border-2 border-primary-flashcard cursor-pointer">
            Adicionar novo deck
          </button>
        </div>
      </div>

      <div>
        {/*Aqui vai a listagem dos decks*/}
        <ul>
          <li className="flex mx-36 gap-8 mt-8">
            <div className="statusCardHome flex gap-2 items-start">
              <CheckCircleIcon />
              <span>100%</span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <div className="containerProgressbar flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h5 className="text-primary-flashcard font-black text-2xl">
                    Hooks
                  </h5>
                  <p>
                    <span>32</span> de <span>32</span> cards concluidos
                  </p>
                </div>
                <div className="barProgressCardHome w-full">
                  <Progress className="w-[1000px]" value={32} />
                </div>
              </div>

              <button className="items-end">
                <PlayCircleIcon />
              </button>
            </div>
          </li>

          <li className="flex mx-36 gap-8 mt-8">
            <div className="statusCardHome flex gap-2 items-start">
              <CheckCircleIcon />
              <span>100%</span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <div className="containerProgressbar flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h5 className="text-primary-flashcard font-black text-2xl">
                    Hooks
                  </h5>
                  <p>
                    <span>32</span> de <span>32</span> cards concluidos
                  </p>
                </div>
                <div className="barProgressCardHome w-full">
                  <Progress className="w-[1000px]" value={32} />
                </div>
              </div>

              <button className="items-end">
                <PlayCircleIcon />
              </button>
            </div>
          </li>

          <li className="flex mx-36 gap-8 mt-8">
            <div className="statusCardHome flex gap-2 items-start">
              <CheckCircleIcon />
              <span>100%</span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <div className="containerProgressbar flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h5 className="text-primary-flashcard font-black text-2xl">
                    Hooks
                  </h5>
                  <p>
                    <span>32</span> de <span>32</span> cards concluidos
                  </p>
                </div>
                <div className="barProgressCardHome w-full">
                  <Progress className="w-[1000px]" value={32} />
                </div>
              </div>

              <button className="items-end">
                <PlayCircleIcon />
              </button>
            </div>
          </li>

          <li className="flex mx-36 gap-8 mt-8">
            <div className="statusCardHome flex gap-2 items-start">
              <CheckCircleIcon />
              <span>100%</span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <div className="containerProgressbar flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h5 className="text-primary-flashcard font-black text-2xl">
                    Hooks
                  </h5>
                  <p>
                    <span>32</span> de <span>32</span> cards concluidos
                  </p>
                </div>
                <div className="barProgressCardHome w-full">
                  <Progress className="w-[1000px]" value={32} />
                </div>
              </div>

              <button className="items-end">
                <PlayCircleIcon />
              </button>
            </div>
          </li>

          <li className="flex mx-36 gap-8 mt-8">
            <div className="statusCardHome flex gap-2 items-start">
              <CheckCircleIcon />
              <span>100%</span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <div className="containerProgressbar flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h5 className="text-primary-flashcard font-black text-2xl">
                    Hooks
                  </h5>
                  <p>
                    <span>32</span> de <span>32</span> cards concluidos
                  </p>
                </div>
                <div className="barProgressCardHome w-full">
                  <Progress className="w-[1000px]" value={32} />
                </div>
              </div>

              <button className="items-end">
                <PlayCircleIcon />
              </button>
            </div>
          </li>

          <li className="flex mx-36 gap-8 mt-8">
            <div className="statusCardHome flex gap-2 items-start">
              <CheckCircleIcon />
              <span>100%</span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <div className="containerProgressbar flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h5 className="text-primary-flashcard font-black text-2xl">
                    Hooks
                  </h5>
                  <p>
                    <span>32</span> de <span>32</span> cards concluidos
                  </p>
                </div>
                <div className="barProgressCardHome w-full">
                  <Progress className="w-[1000px]" value={32} />
                </div>
              </div>

              <button className="items-end">
                <PlayCircleIcon />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
