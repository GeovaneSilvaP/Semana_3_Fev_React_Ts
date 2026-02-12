import "./App.css";
import FetchApiExibir from "./FetchAPI/FetchApiExibir";
import AxiosExibir from "./AxiosTs/AxiosExibir";
import LoadingErroExibir from "./LoadingErro/LoadingErroExibir";

function App() {
  return (
    <div>
      <FetchApiExibir />
      <AxiosExibir />
      <LoadingErroExibir />
    </div>
  );
}

export default App;
