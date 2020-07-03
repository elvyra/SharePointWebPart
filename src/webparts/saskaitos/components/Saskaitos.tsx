import * as React from "react";
import styles from "./Saskaitos.module.scss";
import { ISaskaitosProps } from "./ISaskaitosProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class Saskaitos extends React.Component<ISaskaitosProps, {}> {
  public render(): React.ReactElement<ISaskaitosProps> {
    let list = this.props.list.value;
    console.log("Gavau lista: ", list);
    return (
      <div className={styles.saskaitos}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className={styles.description}>
                {escape(this.props.description)}
              </p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
              <p>{this.props.absoluteUrl}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
