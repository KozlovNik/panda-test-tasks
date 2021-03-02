import React, { useReducer } from "react";
import ReactPaginate from "react-paginate";
import { tHeadArray } from "./constants";
import { reducer, initialState } from "./reducer";
import Arrow from "./Arrow";

import styles from "./App.module.css";

function App() {
  const [{ data, page, column, order }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numOfPages = Math.ceil(data.length / 50);
  const filteredDataByPage = data.slice((page - 1) * 50, page * 50);

  return (
    <div className={styles.app}>
      <label className={styles.label}>
        Поиск{" "}
        <input
          type="text"
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH", search: e.target.value })
          }
        />
      </label>
      <table className={styles.table}>
        <thead className={styles.tHead}>
          <tr className={styles.tr}>
            {tHeadArray.map((name) => (
              <td
                key={name}
                className={styles.headTd}
                onClick={() => dispatch({ type: "SET_SORT", column: name })}
              >
                {name === column && (
                  <Arrow className={order === "DESC" ? styles.revert : ""} />
                )}{" "}
                {name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredDataByPage.map(
            ({ id, firstName, lastName, email, phone }) => (
              <tr key={`${id}-${firstName}`}>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {numOfPages > 1 && (
        <ReactPaginate
          pageCount={numOfPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          previousLabel=""
          nextLabel=""
          containerClassName={styles.pagination}
          pageClassName={styles.item}
          activeClassName={styles.activeItem}
          breakClassName={styles.breakItem}
          breakLinkClassName={styles.link}
          pageLinkClassName={styles.link}
          initialPage={page - 1}
          disableInitialCallback={true}
          onPageChange={(p) =>
            dispatch({ type: "SET_PAGE", page: p.selected + 1 })
          }
          forcePage={page - 1}
        />
      )}
    </div>
  );
}

export default App;
