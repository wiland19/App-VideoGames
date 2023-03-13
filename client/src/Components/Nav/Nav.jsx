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
            <Link className={styles.menuh} to="/game">
              <button>Create Game</button>
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
