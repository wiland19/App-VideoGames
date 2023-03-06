import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.Landing}>
      <h1>VideoGame App!!!</h1>
      <Link to="/home">
        <button className={styles.button}>START!!!</button>
      </Link>
    </div>
  );
}
