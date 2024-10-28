import Router from "./router";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ConfirmationProvider } from "./contexts/ConfirmationContext";

function App() {
  return (
    <>
      <LoadingProvider>
        <ConfirmationProvider>
          <Loader />
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
        </ConfirmationProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
