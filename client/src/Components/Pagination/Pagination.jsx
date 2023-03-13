import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

export default function Pagination({
  gamesPage,
  pagination,

  allGames,
  currentPage,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allGames / gamesPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [allGames, gamesPage, pagination]);

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button
              onClick={() => pagination(number)}
              key={`${number}paginado`}
              className={styles.pagination}
              disabled={currentPage === pageNumbers[0]}
            >
              {number}
            </button>
          ))}
      </ul>
    </nav>
  );
}
