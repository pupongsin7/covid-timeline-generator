import * as React from "react";
import styles from "./styles.module.css";
import { Grid, Box, Button } from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
import { useState, useEffect } from "react";
import moment from "@date-io/moment";
import { style } from "@mui/system";
import { isDate } from "moment";
type AddData = {
  sex: string;
  age: string;
  occupation: string;
  date: Date | null;
  detailTimeline: string;
};
type TimelineData = {
  sex: string;
  age: string;
  occupation: string;
  detail: Array<Data>;
};
type Data = {
  originalDate: Date | null;
  date: string;
  time: string;
  detail: string;
};
interface IDetailPatientProps {
  AddDatatoFirebase: (AddData: AddData) => void;
  data: TimelineData;
}
const DetailPatient: React.FC<IDetailPatientProps> = (
  props: IDetailPatientProps
) => {
  const [timeline, setTimeline] = useState<TimelineData>(props.data);
  const [date, setDate] = useState<Date | null>(new Date());
  const [detailTimeline, setDetailTimeline] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [checkValidate, setCheckValidate] = useState<Boolean>(false);
  const addData = () => {
    let DatatoAdd: AddData = {
      sex: sex,
      age: age,
      occupation: occupation,
      date: date,
      detailTimeline: detailTimeline,
    };
    props.AddDatatoFirebase(DatatoAdd);
  };
  useEffect(() => {
    const Checkdata: Boolean =
      age.trim().length > 0 &&
      occupation.trim().length > 0 &&
      detailTimeline.trim().length > 0;
    setCheckValidate(Checkdata);
  }, [age, occupation, date, detailTimeline]);
  useEffect(() => {
    setTimeline(props.data);
    setSex(props.data.sex);
    setAge(props.data.age);
    setOccupation(props.data.occupation);
  }, [props.data]);
  useEffect(() => {
    setTimeline(props.data);
    setSex(timeline.sex);
    setAge(timeline.age);
    setOccupation(timeline.occupation);
  }, []);
  return (
    <Grid item xs={12} md={5} lg={4} style={{ padding: "10px" }}>
      <Grid container className={styles.main}>
        <Grid item xs={12} className={styles.content}>
          ข้อมูลผู้ป่วย
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.formControl}>
            <label htmlFor="">เพศ</label>
            <select
              className={styles.select}
              value={sex}
              onChange={(event: any) => {
                setSex(event.target.value);
              }}
            >
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.formControl}>
            <label htmlFor="">อายุ</label>
            <input
              className={styles.input}
              name="age"
              placeholder="อายุ"
              type="text"
              value={age}
              onChange={(event: any) => {
                setAge(event.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.formControl}>
            <label htmlFor="">อาชีพ</label>
            <input
              className={styles.input}
              name="occupation"
              placeholder="อาชีพ"
              type="text"
              value={occupation}
              onChange={(event: any) => {
                setOccupation(event.target.value);
              }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container className={styles.main}>
        <Grid item xs={12} className={styles.content}>
          ข้อมูลไทม์ไลน์
        </Grid>
        {/* DateTimePiker */}
        <Grid item xs={12} md={12}>
          <div className={styles.formControl}>
            <label htmlFor="">วันเวลา</label>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDateTimePicker
                label="Custom input"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input
                      className={[styles.input, styles.inputdisabled].join(" ")}
                      ref={inputRef}
                      {...inputProps}
                      disabled
                    />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>
            {/* <input className={styles.input}  name="detail" placeholder="เวลา" type="textarea"/> */}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.formControl}>
            <label htmlFor="">รายละเอียด</label>
            <textarea
              className={styles.textAreaStyle}
              name="detail"
              placeholder="กรอกรายละเอียด"
              value={detailTimeline}
              onChange={(event: any) => {
                setDetailTimeline(event.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <button
            className={styles.AddButton}
            onClick={addData}
            disabled={!checkValidate}
          >
            + เพิ่มข้อมูล
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DetailPatient;
