import {
  CheckCircleIcon,
  PenIcon,
  PlayCircleIcon,
  TreesIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function Home() {
  return (
    <div>
      <div className="mainContent">
        {/* Main content goes here */}
        <div className="flex justify-between items-center mx-36 my-6">
          {/*Aqui vai a config do titulo e da img e o status dos decks*/}
          <div className="flex items-center gap-4">
            <div className="logoDaMateria bg-primary-flashcard p-8 rounded-lg">
              <TreesIcon size={64} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-5xl font-black text-primary-flashcard">
                  REACT
                </h3>
                <button className="configIconOrName cursor-pointer">
                  <PenIcon />
                </button>
              </div>
              <p className="text-black-flashcard">
                <span className="text-primary-flashcard font-semibold">1</span>{" "}
                de{" "}
                <span className="text-primary-flashcard font-semibold">
                  1000
                </span>{" "}
                cards estudados
              </p>
            </div>
          </div>
          <div className="progressTotal">100%</div>
        </div>

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
    </div>
  );
}
