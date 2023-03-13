//---------Importo las librerias a trabajar para este componente

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../../Redux/action";
import styles from "./SearchBar.module.css";

export default function SearchBar({ setCurrentPage }) {
  //declaro la variable del dispatch
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //function guardo en el estado local lo que tengo en el input
  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  //submmit
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getGamesByName(name));
    setCurrentPage(1);
    setName("");
  }

  return (
    <div className={styles.container}>
      <form>
        <input
          type="text"
          value={name}
          placeholder="Find Game..."
          className={styles.input}
          onChange={(e) => handleChange(e)}
        />
        <button
          className={styles.button2}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          <span className={styles.btn}>Search</span>
        </button>
      </form>
    </div>
  );
}
