// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


type TimelineData = {
  sex:string,
  age:string,
  occupation:string,
  data:Array<Data>,
}
type Data = {
  originalDate:Date,
  date:string,
  time:string,
  detail:string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TimelineData>
) {

  
  let data:Array<Data> = [
    {originalDate:new Date(),date:'01/03/2021',time:'16.00',detail:'สวดมนต์ข้ามคืนตั้งแต่เย็น'},
    {originalDate:new Date(),date:'02/03/2021',time:'11.00',detail:'ออกไปซื้ออาหารเช้าที่ 7-11 หน้าปากซอย'},
    {originalDate:new Date(),date:'02/03/2021',time:'14.00',detail:'นอนดู Netflix  เรื่อง Attack on Titan'},
    {originalDate:new Date(),date:'02/03/2021',time:'16.00',detail:'ดูหนังเหนื่อยนอนเล่นกับแมวบนเตียง'},
    {originalDate:new Date(),date:'03/03/2021',time:'10.00',detail:'ออกไปหาลูกค้าโดยนั่งวินมอเตอร์ไซต์ออกมาหน้าปากซอยต่อรถเมย์สาย 29 ไปลง BTS หมอชิต แล้วนั่ง BTS ไปลงสถานีตลาดพลู จากนั้นเดินไปนั่งรถสองแถวที่หน้าเดอะมอลล์ท่าพระไปลง  Central พระราม 2 แล้วต่อรถเมล์ไปลงตลาดมหาชัย'}
  ]
  let DataforResponse:TimelineData = {
    sex:"หญิง",
    age:"25",
    occupation:"Frontend Developer",
    data:data,
  }
  res.status(200).json(DataforResponse)
}
