import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

export default function Pagination({
  gamesPage,
  pagination,
  limitMaxPage,
  limitMinPage,
  allGames,
  currentPage,
  onPrevClick,
  onNextClick,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allGames / gamesPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [
    allGames,
    gamesPage,
    pagination,
    onNextClick,
    onPrevClick,
    limitMaxPage,
    limitMinPage,
  ]);

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePrevClick = () => {
    onPrevClick();
  };

  const Numbers = pageNumbers.map((page) => {
    if (page <= limitMaxPage && page > limitMinPage) {
      return (
        <button
          key={page}
          onClick={() => {
            pagination(page);
          }}
        >
          {page}
        </button>
      );
    } else return null;
  });

  //   return (
  //     <div>
  //       <button
  //         onClick={() => handlePrevClick()}
  //         disabled={currentPage === pageNumbers[0]}
  //       >
  //         {"<<"}
  //       </button>
  //       {Numbers}
  //       {
  //         <button
  //           onClick={() => handleNextClick()}
  //           disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
  //         >
  //           {" "}
  //           {">>"}{" "}
  //         </button>
  //       }
  //     </div>
  //   );
  // }

  //   return (
  //     <div>
  //       <div>
  //         <button
  //           onClick={handlePrevClick}
  //           disabled={currentPage === pageNumbers[0]}
  //         >
  //           {" "}
  //           {"<<"}{" "}
  //         </button>
  //         {/* {pageDecremenEllipses} */}

  //         {Numbers}

  //         {/* {pageIncrementEllipses} */}
  //         {
  //           <button
  //             onClick={handleNextClick}
  //             disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
  //           >
  //             {" "}
  //             {">>"}{" "}
  //           </button>
  //         }
  //       </div>
  //     </div>
  //   );
  // }

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
