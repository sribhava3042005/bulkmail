import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"

function App() {
  const [msg,setmsg] = useState("")
  const [status,setstatus] = useState(false)
  const [emaillist,setEmailist] = useState([])

  function handlemsg(evt)
  {
    setmsg(evt.target.value)

  }
  function handlefile(event)
  {
    const file = event.target.files[0];
console.log(file)
  



const reader = new FileReader();
reader.onload = function (e) {
const data = e.target.result;
const workbook = XLSX.read(data, { type: 'binary' })
const sheetName = workbook.SheetNames[0]
const worksheet = workbook.Sheets[sheetName];
const emaillist = XLSX.utils.sheet_to_json(worksheet, {header:'A'});
const totalemail = emaillist.map(function(item){return item.A});
console.log(totalemail)
setEmailist(totalemail)
}

reader.readAsBinaryString(file);


  }
  function Send()
  {
    setstatus(true)
    axios.post("http://localhost:5000/sendmail",{msg:msg,emaillist:emaillist})
    .then (function(data) 
    {
      if(data.data === true)
     {
      alert("Email send successfully")
      setstatus(false)
     }
     else{
      alert("Failed to send")
     }
    })
  }
  return (
    <div>
    <div className="bg-blue-950 text-white text-center p-2">
      <h1 className="text-3xl font-medium px-5 py-3">Bulkmail</h1>
    </div>
    <div className="bg-blue-800 text-white text-center p-2">
      <h1 className=" font-medium px-5 py-3">We can help your business wih sending bulemails at once</h1>
    </div>
    <div className="bg-blue-600 text-white text-center p-2">
      <h1 className=" font-medium px-5 py-3">Drag and Drop</h1>
    </div>
    <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
      <textarea onChange={handlemsg} value={msg} className="w-[60%] h-32 py-2 outline-none px-2 border border-black rounded-md" placeholder="Enter the email text...."></textarea>
      <div>
      <input type="file" onChange={handlefile} className="border-4 border-dashed py-4 px-4 mt-5 mb-5"/>
      </div>
      <p>Total email in the file:{emaillist.length}</p>
      <button onClick={Send}className="bg-blue-950 mt-2 mb-2 py-2 px-2 text-white font-medium rounded-md w-fit">{status?"sending ....":"send"}</button>
    
    </div>
    <div className="bg-blue-300 text-white text-center p-5">
      
    </div>
    
    </div>

    
  );
}

export default App;