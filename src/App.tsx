import { MateriasContextProvider } from "./contexts/MateriasContext/MateriasContextProvider";
import { MainRouter } from "./routers/MainRouter";
import "./styles/global.css";
import "./styles/theme.css";

export function App() {
  return (
    <>
      <MateriasContextProvider>
        <MainRouter />
      </MateriasContextProvider>
    </>
  );
}
