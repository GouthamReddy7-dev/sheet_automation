import { useState } from "react"
/*comm_name:String, //community name
    fno:String, //flatno
    name:String,
    pno:String, //phone number
    floorno:String,
    ownerin:Boolean */
function Leave(){
    const[formdata,setformdata]=useState({
        comm_name: "",
        fno: "",
        date:"",
        
    })
    const [errors, setErrors] = useState({});
    const[valid_form,setvalidform]=useState({
        Valid_comm:1,
        Valid_fno:1,
        valid_date:1
        
    })
    const validateform=()=>{
        const newerrors={}
        Object.keys(formdata).forEach((key)=>{
            if(key!=="ownerin"&&formdata[key].trim()===""){
                newerrors[key]=true
            }
        })
        setErrors(newerrors)
        return Object.keys(newerrors).length === 0;
    }
    const senddata=async ()=>{
        try{
            if(!validateform()){
            console.log("Fill all fields");
            return;
        }
        else{
            const response=await fetch("http://127.0.0.1:8000/send_data",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            })
            if(!response.ok){
                throw new Error(`http error : ${response.status}`)
            }
            const data=await response.json()
            const user=data.user
            if(user){
                console.log("Form Submitted");
            }
            console.log(formdata);
        }  

        }
        catch(error){
            console.log(error)
        }

    }
    return(
    <>
    <div className="w-full h-146 border-2 flex justify-center items-center">
        <div className="w-110 h-130 border-gray-300 rounded-2xl shadow-lg shadow-gray-600">
        <h1 className="text-2xl font-extrabold font-mono text-center">Leave Form</h1>
        <h1 className="mt-2 ml-6 font-extrabold ">Name</h1>
        <input type="text" placeholder=" Name" className={`w-90 h-8 border-2 rounded-lg mt-2 ml-6 ${errors.comm_name?"border-2 border-red-600":"border-gray-500"}`} onChange={(e)=>setformdata((priv)=>({...priv,comm_name:e.target.value}))}/>
        <h1 className="mt-2 ml-6 font-extrabold ">Type</h1>
        <input type="text" placeholder=" Leave Type" className={`w-90 h-8 border-2 rounded-lg mt-2 ml-6 ${errors.fno?"border-2 border-red-600":"border-gray-500"}`} onChange={(e)=>setformdata((priv)=>({...priv,fno:e.target.value}))} />
        <br />
        <h1 className="mt-2 ml-6 font-extrabold ">Date</h1>
        <input type="date" className={`mt-2 ml-6 cursor-pointer border-2 border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.date?"border-2 border-red-600":"border-gray-500"}`} onChange={(e)=>setformdata((priv)=>({...priv,date:e.target.value}))}/>
        <br />
        <button className="w-90 h-10 border-2 bg-indigo-500  to-blue-500  text-white cursor-pointer rounded-lg mt-3 ml-6 hover:shadow-indigo-600 hover:shadow-lg border-indigo-500 hover:border-indigo-600 hover:bg-indigo-600  transition ease-in duration-300 hover:-translate-y-2" onClick={senddata}>apply</button>
        </div>
    </div>
    </>
    )
}
export default Leave





























































/*
import { Link } from "react-router-dom"
import { useState } from "react"
/*comm_name:String, //community name
    fno:String, //flatno
    name:String,
    pno:String, //phone number
    floorno:String,
    ownerin:Boolean 
function Signup(){
    const[formdata,setformdata]=useState({
        comm_name: "",
        fno: "",
        name: "",
        pno: "",
        floorno: "",
        ownerin: true
    })
    const [comm_name,setcommname]=useState("")
    const [fno,setfno]=useState("")
    const [name,setname]=useState("")
    const [pno,setpno]=useState("")
    const [floorno,setfloorno]=useState("")
    const [ownsein,setownerin]=useState(true)
    const[valid_form,setvalidform]=useState({
        Valid_comm:1,
        Valid_fno:1,
        Valid_name:1,
        Valid_pno:1,
        Valid_floor:1
    })
    const senddata=()=>{
        if(comm_name===""){
            setvalidform(privstate=>({...privstate,Valid_comm:0}))
        }
        if(fno===""){
            setvalidform(privstate=>({...privstate,Valid_fno:0}))
        }
        if(name===""){
            setvalidform(privstate=>({...privstate,Valid_name:0}))
        }
        if(pno===""){
            setvalidform(privstate=>({...privstate,Valid_pno:0}))
        }
        if(floorno===""){
            setvalidform(privstate=>({...privstate,Valid_floor:0}))
        }

        if(comm_name!=="" &&fno!==""&&name!==""&&pno!==""&&floorno!==""){
            console.log("form submitted")
            console.log({comm_name:comm_name,fno:fno,name:name,pno:pno,floorno:floorno,ownsein:ownsein})
            setvalidform({ Valid_comm:1,
                            Valid_fno:1,
                            Valid_name:1,
                            Valid_pno:1,
                            Valid_floor:1})
        }
        else{
            console.log("Fill The Fields")
           console.log(valid_form)
        } 
        
    }
    
    return(
    <>
    <div className="w-full h-146 border-2 flex justify-center items-center">
        <div className="w-110 h-130 border-gray-300 rounded-2xl shadow-lg shadow-gray-600">
        <h1 className="text-2xl font-extrabold font-mono text-center">Signup</h1>
        <h1 className="mt-2 ml-6 font-extrabold ">Community Name</h1>
        <input type="text" placeholder=" Community Name" className={`w-90 h-8 border-2 rounded-lg mt-2 ml-6 ${valid_form.Valid_comm?"border-gray-500":"border-2 border-red-600"}`} onChange={(e)=>setcommname(e.target.value)}/>
        <h1 className="mt-2 ml-6 font-extrabold ">Flat no</h1>
        <input type="text" placeholder=" Flat no" className={`w-90 h-8 border-2 rounded-lg mt-2 ml-6 ${valid_form.Valid_fno?"border-gray-500":"border-2 border-red-600"}`} onChange={(e)=>setfno(e.target.value)} />
        <h1 className="mt-2 ml-6 font-extrabold ">Name</h1>
        <input type="text" placeholder=" Name" className={`w-90 h-8 border-2 rounded-lg mt-2 ml-6 ${valid_form.Valid_name?"border-gray-500":"border-2 border-red-600"}`} onChange={(e)=>setname(e.target.value)} />
        <h1 className="mt-2 ml-6 font-extrabold ">Phone no</h1>
        <input type="text" placeholder=" Phone Number" className={`w-90 h-8 border-2 rounded-lg mt-2 ml-6 ${valid_form.Valid_pno?"border-gray-500":"border-2 border-red-600"}`} onChange={(e)=>setpno(e.target.value)} />
        <h1 className="mt-2 ml-6 font-extrabold ">Floor No</h1>
        <input type="text" placeholder=" Floor No" className={`w-90 h-8 border-2 rounded-lg mt-2 ml-6 ${valid_form.Valid_floor?"border-gray-500":"border-2 border-red-600"}`} onChange={(e)=>setfloorno(e.target.value)} />
        <br />
        <p className="ml-6 mt-2 font-extrabold ">Already Have Account ? <Link to="/login"><span className="underline text-blue-600 cursor-pointer">Login</span></Link></p>
        <button className="w-90 h-10 border-2 bg-indigo-500  to-blue-500  text-white cursor-pointer rounded-lg mt-3 ml-6 hover:shadow-indigo-600 hover:shadow-lg border-indigo-500 hover:border-indigo-600 hover:bg-indigo-600  transition ease-in duration-300 hover:-translate-y-2" onClick={senddata}>Signup</button>
        </div>
    </div>
    
    </>
    )
}
export default Signup
*/
