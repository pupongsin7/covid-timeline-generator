import * as React from "react";
import styles from "./styles.module.css";
import { Grid, Input } from "@mui/material";
import ItemTimeline from "./ItemTimeline/ItemTimeline";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import { areDayPropsEqual } from "@mui/lab/PickersDay/PickersDay";
interface ITimelineProps {
  data: TimelineData;
  deleteItem: (datadelete: Data) => void;
}
type TimelineData = {
  sex: string;
  age: string;
  occupation: string;
  detail: Array<Data>;
};
type Data = {
  originalDate: string;
  date: string;
  time: string;
  detail: string;
};

const groupBy1 = (items: any, key: any) =>
  items.reduce(
    (result: any, item: any) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );
const Timeline = (props: ITimelineProps) => {
  const deleteItem = (datadelete: any) => {
    props.deleteItem(datadelete);
  };
  const [timeline, setTimeline] = useState<TimelineData>({
    sex: "",
    age: "",
    occupation: "",
    detail: [],
  });
  const [groupforLoopItem, setGroupforLoopItem] = useState<any>([]);
  const [tempPo, settempPo] = useState<any>([]);
  useEffect(() => {
    setTimeline((prevState) => ({
      ...props.data,
      detail: _.sortBy(props.data.detail, function (dateObj) {
        return new Date(dateObj.originalDate);
      }),
    }));
  }, [props.data]);
  useEffect(() => {
    setTimeline(props.data);
    setTimeline((prevState) => ({
      ...props.data,
      detail: _.sortBy(props.data.detail, function (dateObj) {
        return new Date(dateObj.originalDate);
      }),
    }));
  }, []);
  useEffect(() => {
    setGroupforLoopItem(_.groupBy(timeline.detail, "date"));
  }, [timeline]);

  return (
    <Grid container className={styles.main} direction="column">
      <Grid container direction="column">
        <Grid textAlign="center" className={styles.HeaderTimeline}>
          Timeline
        </Grid>
        <Grid container justifyContent="center">
          <div className={styles.NameTag}>
            <div className={styles.SexAgeLabel}>
              ผู้ป่วย{timeline.sex} อายุ {timeline.age} ปี
            </div>
            <div className={styles.OccupationLabel}>
              อาชีพ {timeline.occupation}
            </div>
          </div>
        </Grid>
        <Grid container direction="column" className={styles.ContainerTimeline}>
          {/* {timeline.map((value,key) => (
                    <ItemTimeline data={value} key={key}></ItemTimeline>
                    ))} */}
          {Object.entries(groupforLoopItem).map((value: any, key) => (
            <ItemTimeline
              deleteItem={deleteItem}
              data={value}
              key={key}
            ></ItemTimeline>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Timeline;
