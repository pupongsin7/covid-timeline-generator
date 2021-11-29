import * as React from 'react';
import styles from './styles.module.css'
import { Grid,Input } from '@mui/material';
import ItemTimeline from './ItemTimeline/ItemTimeline'
import { useEffect,useState } from 'react';
import * as _ from 'lodash'
interface ITimelineProps {
    data:TimelineData
}
type TimelineData = {
    sex:string,
    age:string,
    occupation:string,
    detail:Array<Data>,
  }
  type Data = {
    originalDate:Date,
    date:string,
    time:string,
    detail:string,
  }
  const groupBy1 = (items:any, key:any) => items.reduce(
    (result:any, item:any) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }), 
    {},
  );
const Timeline = (props:ITimelineProps) => {
  const [timeline,setTimeline] = useState<TimelineData>(props.data)
  const [groupforLoopItem,setGroupforLoopItem] = useState<any>([])
  useEffect(()=>{
    setGroupforLoopItem(_.groupBy(timeline.detail,'date'))
  },[])
    
    return(
        <Grid container className={styles.main}  direction="column" >
            <Grid container  direction="column" >
                <Grid  textAlign="center" className={styles.HeaderTimeline}>Timeline</Grid>
                <Grid container justifyContent="center">
                    <div className={styles.NameTag}>
                        <div className={styles.SexAgeLabel}>ผู้ป่วย{'หญิง'} อายุ {'23'} ปี</div>
                        <div className={styles.OccupationLabel}>อาชีพ Frontend Developer</div>
                    </div>
                </Grid>
                <Grid container direction="column" className={styles.ContainerTimeline}>
                    {/* {timeline.map((value,key) => (
                    <ItemTimeline data={value} key={key}></ItemTimeline>
                    ))} */}
                    {
                      Object.entries(groupforLoopItem).map((value:any,key)=>(
                        <ItemTimeline data={value} key={key}></ItemTimeline>
                      ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Timeline