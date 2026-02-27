import { FlashCard } from "@/pages/FlashCards";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router";

export function MainRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/materia/:id" element={<Home />} />

          <Route
            path="/materia/:materiaId/deck/:deckId"
            element={<FlashCard />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
