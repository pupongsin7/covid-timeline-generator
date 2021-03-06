import type { NextPage, GetStaticProps } from "next";
import { Grid, Container } from "@mui/material/";
import DetailPatient from "../components/DetailPatient/DetailPatient";
import Timeline from "../components/Timeline/Timeline";
import { InferGetStaticPropsType } from "next";
import app from "../firebase/firebase";
import moment from "moment";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import {
  getDoc,
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import Firebase from '../firebase/firebase'
export const getStaticProps: GetStaticProps = async (ctx) => {
  // const res = await fetch(`http://localhost:3000/api/TimelineData`);
  // const data = await res.json();
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }
  // return {
  //   props: { data: data }, // will be passed to the page component as props
  // };
  const getDocc = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, "covid", "1");
    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
      console.log(querySnapshot.data());
      return querySnapshot.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   console.log(doc.data());
    // });
    // console.log(querySnapshot);
  };
  let res = await getDocc();
  let data: any = JSON.stringify(res);
  return {
    props: { data },
  };
};
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
type AddDataNewRow = {
  sex: string;
  age: string;
  occupation: string;
  date: string;
  detailTimeline: string;
  detail: Data;
};
type AddData = {
  sex: string;
  age: string;
  occupation: string;
  date: string;
  detailTimeline: string;
};
interface Props {
  data: string;
}
const Home: NextPage<Props> = ({ data }) => {
  const [OriginalData, setOriginalData] = useState<TimelineData>(
    data == "{}"
      ? {
          sex: "",
          age: "",
          occupation: "",
          detail: [],
        }
      : JSON.parse(data)
  );
  const [newRow, setNewRow] = useState<AddDataNewRow>({
    sex: "",
    age: "",
    occupation: "",
    date: "",
    detailTimeline: "",
    detail: { originalDate: "", date: "", time: "", detail: "" },
  });
  const [action, setAction] = useState<String>("None");

  const AddDatatoFirebase = async (AddData: AddData) => {
    let tempDetail: Data = {
      originalDate: moment(AddData.date).format(),
      date: moment(AddData.date).format("DD/MM/yyyy").toString(),
      time: moment(AddData.date).format("HH:mm").toString(),
      detail: AddData.detailTimeline,
    };
    let newRow: AddDataNewRow = {
      sex: AddData.sex,
      age: AddData.age,
      occupation: AddData.occupation,
      date: AddData.date,
      detailTimeline: AddData.detailTimeline,
      detail: tempDetail,
    };

    setNewRow(newRow);
    setAction("Add");
    setOriginalData((prevState) => ({
      ...prevState,
      detail: [...prevState.detail, newRow.detail],
      age: newRow.age,
      occupation: newRow.occupation,
      sex: newRow.sex,
    }));
  };
  useEffect(() => {
    // console.log("???????????????????????????", OriginalData);
    // console.log(action)
    switch (action) {
      case "Add": {
        updateTimeline();
      }
      case "Delete": {
        updateTimeline();
      }
      default:
        "";
    }
  }, [OriginalData]);
  async function updateTimeline() {
    try {
      console.log("functionUpdate", OriginalData);
      const db = getFirestore(app);
      const covidRef = collection(db, "covid");
      const docRef = await updateDoc(doc(covidRef, "1"), OriginalData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const deleteItem = (datadelete: Data) => {
    console.log("indexComp", datadelete);
    const indexDataDelete = _.indexOf(OriginalData.detail, datadelete);
    console.log("find index...", indexDataDelete);
    const TempDetail = OriginalData.detail.filter((value:Data, index) => {
      if(index != indexDataDelete)return value
    });
    setAction("Delete");
    setOriginalData((prevState) => ({
      ...prevState,
      detail: TempDetail,
    }));
  };
  return (
    <Container>
      <Grid>
        <h1 className="ContentHeader">COVID Timeline Generator</h1>
      </Grid>
      <Grid container>
        <DetailPatient
          AddDatatoFirebase={AddDatatoFirebase}
          data={OriginalData}
        ></DetailPatient>
        <Grid item xs={12} md={7} lg={8} style={{ padding: "10px" }}>
          <Timeline data={OriginalData} deleteItem={deleteItem}></Timeline>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
