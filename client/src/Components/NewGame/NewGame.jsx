import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addGame, getGenres } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";

import styles from "./NewGame.module.css";

//formulario validad con Javascript, sistema de errores

//creo la funcion Creadora de VideoJuegos
export default function Create() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const games = useSelector((state) => state.games);

  function validate(input) {
    let errors = {};

    if (input.name[0] === " ") {
      errors.name = "The name field cannot have empty spaces.";
    } else if (!input.name) {
      errors.name = "the name field is required";
    } else if (
      games.filter(
        (game) => game.name.toLowerCase() === input.name.toLowerCase()
      ).length > 0
    ) {
      // Probar con Portal 2
      errors.name = "the name already exists, this field cannot be duplicated";
    }

    if (input.description[0] === " ") {
      errors.description = "The description field cannot have empty spaces";
    } else if (!input.description) {
      errors.description = "the description field is required";
    } else if (
      input.description.length < 15 ||
      input.description.length > 800
    ) {
      errors.description =
        "the description is too short please enter more characters";
    }

    if (!input.released) {
      errors.release = "the released field is required";
    }

    if (!input.rating || input.rating > 5 || input.rating < 1) {
      errors.rating = "the rating field must be between 1 and 5";
    } else if (!input.rating) {
      errors.rating = "the rating field is required";
    }

    if (input.image[0] === " ") {
      errors.image = "You must write an image url!";
    } else if (!input.image) {
      errors.image = "the image field is required";
    } else if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(input.image)) {
      errors.image =
        "the accepted format of the image must be http:// or https:// and ends with .com/.net/...";
    }
    return errors;
  }

  //estado local de Errores e Inputs (objetos)
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: [],
  });

  // Me traigo las plataformas como si fuera una action
  const getPlatforms = function () {
    let aux = games;
    let aux2 = aux.map((e) => e.platforms).flat(5);
    let aux3 = new Set(aux2);
    let plat = [...aux3];
    return plat;
  };
  const platform = getPlatforms();

  //---------------------------------------------
  //--------------HANDLES------------------------
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleGenre(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handlePlataforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let aux = 0;
    for (let i in input) {
      if (!input[i]) aux++;
    }

    if (Object.keys(errors).length > 0 || aux > 0)
      return alert("One or more paremeters are missing");

    dispatch(addGame(input));
    alert("Game created!");
  };

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== el),
      platforms: input.platforms.filter((plat) => plat !== el),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div>
          <div>
            <div className={styles.items}>
              <label>Name </label>
              <input
                className={styles.inputs}
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.items}>
              <label>Description </label>
              <input
                className={styles.inputs}
                type="text"
                value={input.description}
                name="description"
                onChange={handleChange}
              />
              {errors.description && (
                <p className={styles.error}>{errors.description}</p>
              )}
            </div>
            <div className={styles.items}>
              <label>Image </label>
              <input
                className={styles.inputs}
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
              />
              {errors.image && <p className={styles.error}>{errors.image}</p>}
            </div>
            <div className={styles.items}>
              <label>Released </label>
              <input
                className={styles.inputs}
                type="date"
                value={input.released}
                name="released"
                onChange={handleChange}
              />
              {errors.release && (
                <p className={styles.error}>{errors.release}</p>
              )}
            </div>
            <div className={styles.items}>
              <label>Rating </label>
              <input
                className={styles.inputs}
                type="number"
                step="0.01"
                value={input.rating}
                name="rating"
                onChange={handleChange}
              />
              {errors.rating && <p className={styles.error}>{errors.rating}</p>}
            </div>
          </div>
          <div>
            <div className="custom-select">
              <label>Genres </label>
              <select onChange={handleGenre} className={styles.inputs}>
                {genres.map((e) => (
                  <option key={e.name} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <li>{input.genres.map((el) => el).join(" - ")}</li>
            <div className="custom-select">
              <label>Platform </label>
              <select onChange={handlePlataforms} className={styles.inputs}>
                {platform.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <li>{input.platforms.map((el) => el).join(" - ")}</li>
          </div>
        </div>

        <div id="divButtons">
          <button type="submit" className="add_button">
            Crear
          </button>
        </div>
      </form>
      <br />
      <br />
      <div className={styles.form2}>
        <h2>Delete Platform:</h2>
        {input.platforms.map((el) => (
          <div className={styles.items} key={el}>
            <p> {el}</p>
            <button className="delete" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        ))}
        <h2>Delete Genre:</h2>
        {input.genres.map((el) => (
          <div className="cardRemove" key={el}>
            <p>{el}</p>
            <button className="delete" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        ))}
        <div>
          <Link to="/home">
            <button className={styles.btn}>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
