//aca pocedemos atrabar con react que es una libreria para el desarollo frontend, tambien es donde aparecen los hooks q

// el hook useState es el que nos permite agregarle un estado local a un componente funcional y cambiar ese estado.
// el hook useEffect Por defecto se ejecuta después del primer renderizado y después de cada actualización
// useDispatch permite acceder a cualquier store pero esta vez para actualizar algo
// useSelector es un Hook que nos permite extraer datos del store de Redux utilizando una función selectora,

import React, { useState, useEffect } from "react";
//hooks react-redux
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  getGenres,
  orderGames,
  orderRating,
  filterByGenres,
} from "../../Redux/action";

// import styles from "./Home.module.css";

//components
import Nav from "../Nav/Nav";
import OrderFilter from "../OderFilter/OrderFilter";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  //declaro la variable del dispatch
  const dispatch = useDispatch();

  //Map state to Props, en la constante allCountries traer todo lo que esta en el estado countries[]
  const allGames = useSelector((state) => state.games);

  //traer del estado los countries cuando el componente se monta con useEffect

  useEffect(() => {
    dispatch(getGames()); //MapDispatch tO Props
  }, [dispatch]); // array de dependendias para no tener un bucle infinito de llamados

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //Pagination
  //estado lacal de la pagina
  const [currentPage, setCurrentPage] = useState(1); //pagina incial en 1
  const [gamesPage /* setGamesPage */] = useState(15); // 10 paises por pagina
  const indexLastGame = currentPage * gamesPage; // ultimo indice 10
  const indexFirstGame = indexLastGame - gamesPage; // se calcula

  //9 paises primer pagina
  const [firstPage, setFirstPage] = useState(15);
  const difference = gamesPage - firstPage;

  //paises a mostar
  const currentGames = allGames?.slice(indexFirstGame, indexLastGame); //muestra desde el primero hasta el ultimo si existe

  // const currentGames = allGames.slice(
  //   currentPage === 1 ? indexFirstGame : indexFirstGame - difference,
  //   indexLastGame - difference
  // );

  //Limitar
  const [limitMaxPage, setLimitMaxPage] = useState(10);
  const [limitMinPage, setLimitMinPage] = useState(0);
  const [, /* orderN */ setOrderName] = useState([]);
  const [, /* orderP */ setOrderRating] = useState([]);
  const [, /* orderC */ setOrderContinent] = useState([]);
  const pageLimitNumber = gamesPage;

  //pagination

  function pagination(pageNumber) {
    setCurrentPage(pageNumber);
  }

  // //functions nuevas

  function onPrevClick() {
    if ((currentPage - 1) % pageLimitNumber === 0) {
      setLimitMaxPage(limitMaxPage - pageLimitNumber);
      setLimitMinPage(limitMinPage - pageLimitNumber);
    }
    setCurrentPage((prev) => prev - 1);
  }
  function onNextClick() {
    if (currentPage + 1 > limitMaxPage === 0) {
      setLimitMaxPage(limitMaxPage + pageLimitNumber);
      setLimitMinPage(limitMinPage + pageLimitNumber);
    }
    setCurrentPage((prev) => prev + 1);
  }

  //Functions Orders

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderGames(e.target.value));
    setCurrentPage(1);
    setOrderName(`Ordered by: ${e.target.value}`);
    e.target.value = "default";
  }
  function handleOrderRating(e) {
    e.preventDefault();
    dispatch(orderRating(e.target.value));
    setCurrentPage(1);
    setOrderRating(`Ordered by: ${e.target.value}`);
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(orderRating(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
  }

  // function handleRefresh(e) {
  //   e.preventDefault();
  //   dispatch(getCountries());
  //   setCurrentPage(1);
  // }

  return (
    <div>
      {/* <button
        className={styles.button}
        onClick={(e) => {
          handleRefresh(e);
        }}
      >
        Refresh Filters
      </button> */}
      <div>
        <Nav />
      </div>

      <div>
        <OrderFilter
          handleOrderName={handleOrderName}
          handleOrderRating={handleOrderRating}
          handleFilterGenre={handleFilterGenre}
          handleFilterCreated={handleFilterCreated}
        />

        <Pagination
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          gamesPage={gamesPage}
          pagination={pagination}
          limitMaxPage={limitMaxPage}
          limitMinPage={limitMinPage}
          allGames={allGames.length}
        />
      </div>

      <div>
        {currentGames?.map((game) => {
          return (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image}
              rating={game.rating}
              genres={game.genres}
            />
          );
        })}
      </div>
    </div>
  );
}
