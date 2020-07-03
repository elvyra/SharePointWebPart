import * as React from "react";
import styles from "../Saskaita.module.scss";
import { ISaskaitaProps, Bill } from "../ISaskaitosProps";

const Saskaita = (props: ISaskaitaProps) => (
  <p className={styles.billTitle}>{props.item.Title}</p>
);

export default Saskaita;
