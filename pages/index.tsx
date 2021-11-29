import type { NextPage, GetStaticProps } from "next";
import { Grid, Container } from "@mui/material/";
import DetailPatient from "../components/DetailPatient/DetailPatient";
import Timeline from "../components/Timeline/Timeline";
import { InferGetStaticPropsType } from "next";
import app from "../firebase/firebase";
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
  originalDate: Date;
  date: string;
  time: string;
  detail: string;
};
type AddData = {
  sex: string;
  age: string;
  occupation: string;
  date: Date | null;
  detailTimeline: string;
};
interface Props {
  data: string;
}
const Home: NextPage<Props> = ({ data }) => {
  const [OriginalData, setOriginalData] = useState<TimelineData>(
    JSON.parse(data)
  );
  const AddDatatoFirebase = (AddData: AddData) => {
    console.log(AddData);
  };
  useEffect(() => {
    const db = getFirestore(app);
    async function addDocc() {
      try {
        const covidRef = collection(db, "covid");
        const docRef = await setDoc(doc(covidRef, "1"), {
          sex: "ชาย",
          age: "20",
          occupation: "Frontend Developer",
          detail: [
            {
              originalDate: new Date(),
              date: "01/03/2021",
              time: "16.00",
              detail: "สวดมนต์ข้ามคืนตั้งแต่เย็น",
            },
            {
              originalDate: new Date(),
              date: "02/03/2021",
              time: "11.00",
              detail: "ออกไปซื้ออาหารเช้าที่ 7-11 หน้าปากซอย",
            },
            {
              originalDate: new Date(),
              date: "02/03/2021",
              time: "14.00",
              detail: "นอนดู Netflix  เรื่อง Attack on Titan",
            },
            {
              originalDate: new Date(),
              date: "02/03/2021",
              time: "16.00",
              detail: "ดูหนังเหนื่อยนอนเล่นกับแมวบนเตียง",
            },
            {
              originalDate: new Date(),
              date: "03/03/2021",
              time: "10.00",
              detail:
                "ออกไปหาลูกค้าโดยนั่งวินมอเตอร์ไซต์ออกมาหน้าปากซอยต่อรถเมย์สาย 29 ไปลง BTS หมอชิต แล้วนั่ง BTS ไปลงสถานีตลาดพลู จากนั้นเดินไปนั่งรถสองแถวที่หน้าเดอะมอลล์ท่าพระไปลง  Central พระราม 2 แล้วต่อรถเมล์ไปลงตลาดมหาชัย",
            },
          ],
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    async function updateDocc() {
      try {
        const covidRef = collection(db, "covid");
        const docRef = await updateDoc(doc(covidRef, "1"), {
          sex: "ชาย",
          age: "20",
          occupation: "Backend Developer",
          detail: [
            {
              originalDate: new Date(),
              date: "01/03/2021",
              time: "19.00",
              detail: "สวดมนต์ข้ามคืนตั้งแต่เย็น",
            },
            {
              originalDate: new Date(),
              date: "02/03/2021",
              time: "11.00",
              detail: "ออกไปซื้ออาหารเช้าที่ 7-11 หน้าปากซอย",
            },
            {
              originalDate: new Date(),
              date: "02/03/2021",
              time: "14.00",
              detail: "นอนดู Netflix  เรื่อง Attack on Titan",
            },
            {
              originalDate: new Date(),
              date: "02/03/2021",
              time: "16.00",
              detail: "ดูหนังเหนื่อยนอนเล่นกับแมวบนเตียง",
            },
            {
              originalDate: new Date(),
              date: "03/03/2021",
              time: "10.00",
              detail:
                "ออกไปหาลูกค้าโดยนั่งวินมอเตอร์ไซต์ออกมาหน้าปากซอยต่อรถเมย์สาย 29 ไปลง BTS หมอชิต แล้วนั่ง BTS ไปลงสถานีตลาดพลู จากนั้นเดินไปนั่งรถสองแถวที่หน้าเดอะมอลล์ท่าพระไปลง  Central พระราม 2 แล้วต่อรถเมล์ไปลงตลาดมหาชัย",
            },
          ],
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // updateDocc();
    // addDocc();
  }, []);
  async function getCities(db: any) {
    const citiesCol: any = db
      .collection("timeline")
      .onSnapshot((snapshot: any) => {
        console.log(snapshot.docs);
      });
  }
  return (
    <Container>
      <Grid>
        <h1 className="ContentHeader">COVID Timeline Generator</h1>
      </Grid>
      <Grid container>
        <DetailPatient AddDatatoFirebase={AddDatatoFirebase}></DetailPatient>
        <Grid item xs={12} md={7} lg={8} style={{ padding: "10px" }}>
          <Timeline data={OriginalData}></Timeline>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
