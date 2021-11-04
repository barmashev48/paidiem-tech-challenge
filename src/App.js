import "./App.css";
import Form from "./components/Form";
import AlbumsList from "./components/AlbumsList";
import { useSelector } from "react-redux";

function App() {
  const apiCallHasError = useSelector(
    (state) => state.albumsReducer.apiCallHasError
  );

  const isSearching = useSelector((state) => state.albumsReducer.isSearching);

  return (
    <div className="App">
      <Form />
      {isSearching && <p>Searching...</p>}
      {apiCallHasError && <p>Please enter valid artist ID and country code</p>}
      {!apiCallHasError && <AlbumsList />}
    </div>
  );
}

export default App;
