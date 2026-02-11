import { FlashCard } from "@/pages/FlashCards";
import { Home } from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";


export function MainRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/materia/:id" element={<Home />}/>
          <Route path="/flashcard" element={<FlashCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
