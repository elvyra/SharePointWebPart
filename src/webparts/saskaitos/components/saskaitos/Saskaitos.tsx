import * as React from "react";
import styles from "./Saskaitos.module.scss";
import { ISaskaitosProps } from "../ISaskaitosProps";
import Saskaita from "../saskaita/Saskaita";

export default class Saskaitos extends React.Component<ISaskaitosProps, {}> {
  public render(): React.ReactElement<ISaskaitosProps> {
    let list = this.props.list.value;
    return (
      <div className={styles.saskaitos}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Sąskaitos web part</span>
              <p className={styles.subTitle}>
                Demo web part displays list of all items in 'Sąskaitos' list in
                SharePoint.
              </p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.billsContainer}>
          {list.map((item) => (
            <Saskaita item={item} />
          ))}
        </div>
      </div>
    );
  }
}
