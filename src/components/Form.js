import useInput from "../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import AlbumsList from "./AlbumsList";
import AlbumItem from "./AlbumItem";

// import { useDispatch } from "react-redux";

const Form = () => {
  // const dispatch = useDispatch();
  const [albumsList, setAlbumsList] = useState([]);

  const {
    value: enteredName,
    isValueValid: nameIsValid,
    hasError: nameHasError,
    reset: nameReset,
    inputChangeHandler: nameInputChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredId,
    isValueValid: idIsValid,
    hasError: idHasError,
    reset: idReset,
    inputChangeHandler: idInputChangeHandler,
    blurHandler: idBlurHandler,
  } = useInput((value) => /^\d+$/.test(value));

  let formIsValid = true;

  // if (nameIsValid && emailIsValid && amountIsValid) {
  //   formIsValid = true;
  // }

  const apiCall = () => {
    //itunes.apple.com/lookup?id=909253&entity=album
    axios({
      url: `https://itunes.apple.com/lookup?id=${enteredId}&entity=album`,
      // params: {
      //   id: enteredId,
      //   entity: "album",
      // },
    }).then((res) => {
      console.log(res.data.results);
      setAlbumsList(res.data.results);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    apiCall();
    nameReset();

    idReset();
  };
  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";

  const amountInputClasses = idHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>iTunes</h1>
        <div className={amountInputClasses}>
          <label htmlFor="amount">Artist ID:</label>
          <input
            type="text"
            id="amount"
            value={enteredId}
            onBlur={idBlurHandler}
            onChange={idInputChangeHandler}
          />
          {!!idHasError && (
            <p className="error-text">Amount field has an error</p>
          )}
        </div>
        {/* <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">Country:</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onBlur={nameBlurHandler}
            onChange={nameInputChangeHandler}
          />
          {!!nameHasError && (
            <p className="error-text">Name field must not be empty</p>
          )}
        </div>
      </div> */}
        <div className="form-actions">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
      {albumsList.map((el, index) => {
        if (index === 0) {
          return;
        }

        return (
          <AlbumItem
            key={el.collectionId}
            artistName={el.artistName}
            albumName={el.collectionName}
            albumPrice={el.collectionPrice}
            currency={el.currency}
          />
        );
      })}
    </div>
  );
};
export default Form;
