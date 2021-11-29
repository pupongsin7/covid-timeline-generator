import * as React from "react";
import styles from "./styles.module.css";
import { Grid, Input } from "@mui/material";
interface IItemTimelineProps {
  data: [date: string, data: Array<Data>];
}
type Data = {
  originalDate: Date;
  date: string;
  time: string;
  detail: string;
};

const ItemTimeline = (props: IItemTimelineProps) => {
  const DeleteTimeLine = () => {
    console.log("ClickDelete");
  };
  let timeline: any = props.data;
  console.log(timeline);
  return (
    <div className={styles.Itemtimeline}>
      <div className={styles.LineTimeline}></div>
      <div className={styles.date}>{timeline[0]}</div>
      <div className={styles.Circle}></div>
      <div className={styles.ItemTimeInTimeLine}>
        {timeline[1].map((value: any, key: any) => (
          <div className={styles.DetailTimeline} key={key}>
            <div className={styles.TimelineInItemBox}>{value.time}</div>
            <div className={styles.DetailContent}>{value.detail}</div>
            <div className={styles.BoxButton}>
              <button className={styles.buttonDelete} onClick={DeleteTimeLine}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ItemTimeline;
