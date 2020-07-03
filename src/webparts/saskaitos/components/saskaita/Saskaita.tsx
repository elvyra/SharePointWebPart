import * as React from "react";
import styles from "./Saskaita.module.scss";
import { ISaskaitaProps, Bill } from "../ISaskaitosProps";

const Saskaita = ({ item }: ISaskaitaProps) => (
  <div className={styles.billContainer} key={item.Id}>
    <p className={styles.title}>{item.Title}</p>
    <p>{item.Date.substr(0, 10)}</p>
    <p className={styles.amount}>
      <span
        className={
          item.Payed ? styles.amountPayed : item.Late ? styles.amountLate : ""
        }
      >
        {item.Amount} €
      </span>
    </p>

    <p>{item.Responsible}</p>
  </div>
);

export default Saskaita;
