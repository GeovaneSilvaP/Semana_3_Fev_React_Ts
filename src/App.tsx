import "./App.css";
import FetchApiExibir from "./FetchAPI/FetchApiExibir";
import AxiosExibir from "./AxiosTs/AxiosExibir";
import LoadingErroExibir from "./LoadingErro/LoadingErroExibir";
import JSONServeExibir from "./JSONServe/JSONServeExibir";

function App() {
  return (
    <div>
      <FetchApiExibir />
      <AxiosExibir />
      <LoadingErroExibir />
      <JSONServeExibir />
    </div>
  );
}

export default App;
