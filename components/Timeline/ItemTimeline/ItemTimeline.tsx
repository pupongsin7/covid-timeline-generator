import * as React from "react";
import styles from "./styles.module.scss";
import { Grid, Input } from "@mui/material";
import {useEffect,useState} from "react"
interface IItemTimelineProps {
  data: [date: string, data: Array<Data>];
  deleteItem:(datadelete:Data)=>void;
}
type Data = {
  originalDate: Date;
  date: string;
  time: string;
  detail: string;
};

const ItemTimeline = (props: IItemTimelineProps) => {
  var timeline:any = props.data;
  const DeleteTimeLine = (key:any) => {
    const dataDelete:Data = (timeline[1])[key]
    props.deleteItem(dataDelete)
  };
  useEffect(()=>{
    timeline=props.data
  },[props.data])
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
              <button className={styles.buttonDelete} onClick={() =>DeleteTimeLine(key)}>
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
