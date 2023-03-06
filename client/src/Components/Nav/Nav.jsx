import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGames } from "../../Redux/action";
import styles from "./Nav.module.css";

export default function Nav() {
  const dispatch = useDispatch();

  function handleDispatch() {
    dispatch(getGames());
  }

  return (
    <header className={styles.container}>
      <nav>
        <div className={styles.cosas}>
          <div>
            <Link
              className={styles.menuh}
              to="/home"
              onClick={() => handleDispatch()}
            >
              Home
            </Link>
            <Link className={styles.menuh} to="/games">
              {" "}
              Create Game
            </Link>

            <Link className={styles.menuh} to="/genres">
              {" "}
              Genres{" "}
            </Link>
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
      </nav>
    </header>
  );
}
