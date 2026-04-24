const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

let bookings = [];

app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/public/index.html");
});

// booking
app.post("/book",(req,res)=>{
  const data = req.body;

  const seat = data.zone + "-" + Math.floor(Math.random()*999);

  const price =
    data.zone==="VIP"?6000:
    data.zone==="A"?4000:
    data.zone==="B"?2500:1500;

  const ticket = {
    id: "FLW"+Date.now(),
    seat,
    price,
    ...data
  };

  bookings.push(ticket);

  res.json(ticket);
});

// QR
app.post("/qr", async (req,res)=>{
  const qr = await QRCode.toDataURL(JSON.stringify(req.body));
  res.json({qr});
});

app.listen(3000,()=>console.log("FLOWER CONCERT RUN http://localhost:3000"));