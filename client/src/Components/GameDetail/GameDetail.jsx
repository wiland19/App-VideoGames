import React from "react";
import { useParams } from "react-router-dom";
import { getGamesByid, clearGame } from "../../Redux/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from "./Game.module.css";

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);
  const home = useHistory();

  useEffect(() => {
    dispatch(getGamesByid(id)); //acedo al id del detalle
  }, [dispatch]);

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
          width="200px"
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

        <Link to="/home">
          <button className={styles.button} onClick={() => home.push(`/home`)}>
            {" "}
            Back{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
