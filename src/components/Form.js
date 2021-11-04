import useInput from "../hooks/useInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { albumsActions } from "../store/albumsSlice";

const Form = () => {
  const dispatch = useDispatch();

  const {
    value: enteredCountry,
    isValueValid: countryIsValid,
    hasError: countryHasError,
    reset: countryReset,
    inputChangeHandler: countryInputChangeHandler,
    blurHandler: countryBlurHandler,
  } = useInput(
    (value) =>
      value.length <= 3 && value.length > 0 && /^[a-zA-Z]+$/.test(value)
  );

  const {
    value: enteredId,
    isValueValid: idIsValid,
    hasError: idHasError,
    reset: idReset,
    inputChangeHandler: idInputChangeHandler,
    blurHandler: idBlurHandler,
  } = useInput((value) => /^\d+$/.test(value));

  let formIsValid = false;

  if (idIsValid && countryIsValid) {
    formIsValid = true;
  }

  const apiCall = async () => {
    const [albumsResponse, currencyResponse] = await Promise.all([
      axios
        .get(
          `https://itunes.apple.com/lookup?id=${enteredId}&entity=album&country=${enteredCountry}`
        )
        .catch((error) => {
          console.log(error);
          dispatch(albumsActions.finishedSearching());
          dispatch(albumsActions.apiCallHasError());
        }),
      axios.get(`https://restcountries.com/v3.1/alpha/${enteredCountry}`),
    ]);

    if (albumsResponse && currencyResponse) {
      const currencyObj = currencyResponse.data[0].currencies;
      const currencyName = currencyObj[Object.keys(currencyObj)[0]].name;
      const finalAlbumsList = albumsResponse.data.results
        .filter((el, index) => index !== 0)
        .map((el, index) => {
          return {
            id: el.collectionId,
            artistName: el.artistName,
            artistLink: el.artistViewUrl,
            albumName: el.collectionName,
            albumLink: el.collectionViewUrl,
            artwork: el.artworkUrl100,
            trackCount: el.trackCount,
            explicit: el.collectionExplicitness,
            albumPrice: el.collectionPrice,
            currency: currencyName,
          };
        });

      if (albumsResponse.data.results.length === 0) {
        dispatch(albumsActions.finishedSearching());
        dispatch(albumsActions.apiCallHasError());
      }
      dispatch(albumsActions.finishedSearching());
      dispatch(albumsActions.addAlbums(finalAlbumsList));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(albumsActions.apiCallHasNoError());
    dispatch(albumsActions.startedSearching());
    apiCall();
    countryReset();
    idReset();
  };
  const countryInputClasses = countryHasError
    ? "form-control invalid"
    : "form-control";

  const idInputClasses = idHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <h1>Album Search Page</h1>
      <div className={idInputClasses}>
        <label htmlFor="artistId">Artist ID:</label>
        <input
          type="text"
          id="artistId"
          value={enteredId}
          onBlur={idBlurHandler}
          onChange={idInputChangeHandler}
        />
        {!!idHasError && (
          <p className="error-text">Artist ID field has an error</p>
        )}
      </div>
      <div className="control-group">
        <div className={countryInputClasses}>
          <label htmlFor="name">Country:</label>
          <input
            type="text"
            id="name"
            value={enteredCountry}
            onBlur={countryBlurHandler}
            onChange={countryInputChangeHandler}
          />
          {!!countryHasError && (
            <p className="error-text">Country field has an error</p>
          )}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};
export default Form;
