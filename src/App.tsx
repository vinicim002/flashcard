import { MessagesContainer } from "./components/MessagesContainer";
import { MateriasContextProvider } from "./contexts/MateriasContext/MateriasContextProvider";
import { PerfilContextProvider } from "./contexts/PerfilContext/PerfilContextProvider";
import { MainRouter } from "./routers/MainRouter";
import "./styles/global.css";
import "./styles/theme.css";

export function App() {
  return (
    <>
      <PerfilContextProvider>
        <MateriasContextProvider>
          <MessagesContainer>
            <MainRouter />
          </MessagesContainer>
        </MateriasContextProvider>
      </PerfilContextProvider>
    </>
  );
}
