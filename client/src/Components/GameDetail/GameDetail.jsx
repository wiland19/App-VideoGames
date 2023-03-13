import React from "react";

import { getGamesByid, clear } from "../../Redux/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Game.module.css";
import Loading from "../Loading/Loading";

export default function CountryDetail(props) {
  // const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);

  // useEffect(() => {
  //   dispatch(getGamesByid(props.match.params.id));
  //   return () => dispatch(clear());
  // }, [dispatch, props.match.params.id]);

  useEffect(() => {
    setTimeout(() => dispatch(getGamesByid(props.match.params.id)), 3000);
    return () => dispatch(clear());
  }, [dispatch, props.match.params.id]);

  // useEffect(() => {
  //   dispatch(getGamesByid(id)); //acedo al id del detalle
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getGamesByid(id));
  //   return () => dispatch(clearGame());
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{game.name}</h1>
        <img
          className={styles.image}
          src={game.image}
          alt={game.name}
          width="300px"
        />
        <h3>Genres:{` | ${game.genres} | `}</h3>
        <h3>Released: {game.released}</h3>
        <h4 className={styles.title}>Rating: {`★${game.rating}★`}</h4>

        <p>
          Description:
          {game.description}
        </p>
        <h6>Platforms: {game.platforms}</h6>

        <h4>Id:{game.id}</h4>
      </div>

      <Link to="/home">
        <button className={styles.button}> Back </button>
      </Link>
    </div>
  );
}

// /* .card p{
//  text-align: justify;
// } */

// .texto {
//  text-align: justify;
//  display: inline-block;
// }

// .image {
//   border-radius: 10px;
//   border: 35px;
//   border: solid;
//   /* fijamos ancho y alto para reservar espacio */
//   width: 70px;
//   height: 90px;

// }

// .button {
//   background-color: #101010;
//   /* Green */
//   border: none;
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   border-radius: 25px;
// }

// .button:hover {
//   background-color: #4CAF50;
//   /* Green */
//   color: white;
// }
