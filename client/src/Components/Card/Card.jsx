import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ id, name, image, genres, rating }) {
  return (
    <div className={styles.card}>
      <Link to={`/home/${id}`}>
        <h3>{name}</h3>
        <img className={styles.image} src={image} alt="{name}" />
      </Link>
      <h4>Genres: {` |${genres}| `}</h4>
      <h5>Rating: {`★${rating}★`}</h5>
    </div>
  );
}
