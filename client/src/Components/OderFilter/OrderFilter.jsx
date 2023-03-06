import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getGenres } from "../../Redux/action";
import styles from "./OrderFilter.module.css";

export default function OrderFilter({
  handleOrderName,
  handleOrderRating,
  handleFilterByApi,
  handleFilterCreated,
  handleFilterByDb,
  handleFilterGenre,
}) {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch]);

  let Names = [];
  allGames.forEach((game) => {
    game.genres?.forEach((genre) => {
      if (!Names.includes(genre.name)) {
        Names.push(genre.name);
      }
    });
  });

  return (
    <div>
      <div className={styles.cosas}>
        <p className={styles.p}> FILTER EXISTING</p>
        <select
          className={styles.box}
          onChange={(e) => {
            handleFilterCreated(e);
          }}
        >
          <option value="" selected disabled>
            Select...
          </option>
          <option value="All"> All </option>
          <option value="api"> Api </option>
          <option value="created"> Created </option>
        </select>

        <div>
          <p className={styles.p}>ORDER BY NAME</p>
          <select
            className={styles.box}
            onChange={(e) => {
              handleOrderName(e);
            }}
          >
            <option value="" selected disabled>
              Select...
            </option>
            <option value="ASC">A TO Z</option>
            <option value="DESC">Z TO A</option>
          </select>
        </div>

        <div>
          <p className={styles.p}>ORDER BY RATING</p>
          <select
            className={styles.box}
            onChange={(e) => {
              handleOrderRating(e);
            }}
          >
            <option value="" selected disabled>
              Select...
            </option>
            <option value="ASC">Low Rating</option>
            <option value="DESC">Hight Rating</option>
          </select>
        </div>

        <div>
          <p className={styles.p}>FILTER BY GENRE</p>
          <select className={styles.box} onChange={(e) => handleFilterGenre(e)}>
            <option value="" selected disabled>
              Select...
            </option>
            <option value="Action">Action</option>
            <option value="Indie">Indie</option>
            <option value="Strategy">Strategy</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Arcade">Arcade</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Platformer">Platformer</option>
            <option value="Racing">Racing</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Fighting">Fighting</option>
            <option value="Sports">Sports</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
          </select>
        </div>
      </div>
    </div>
  );
}
