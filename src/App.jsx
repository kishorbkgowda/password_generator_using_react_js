import {useState,useCallback,useEffect,useRef} from 'react'
import './App.css'
function App() 
{
const[len,setLen] = useState(8);
const[num,setNum] = useState(false);
const[char,setChar] = useState(false);
const[pass,setPass] = useState("");


// useref hook
const password = useRef(null);


// usecallback hook
const copyclip = useCallback(()=>
{

  password.current?.select();
    window.navigator.clipboard.writeText(pass);
  },[pass]
)

// useeffect hook
useEffect(()=>
{
  copyclip(),[pass]
})

const passwordgenertor = useCallback(()=>
{
  let pass = "";
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if(num) str += "0123456789";
  if(char) str += "!@#$%^&&*()_+-={}[]"


    for(let i=1;i<=len;i++)
    {
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char)
       
    }

    setPass(pass);

},[len,num,char,setPass])

useEffect(()=>{passwordgenertor()} ,[len,char,num,passwordgenertor]);
 

  return (
      <>
        <div className="w-full h-screen flex justify-center items-center" >
          <div className='min-w-min p-3 m-3 rounded-lg shadow-lg'>
            <div className='py-1 m-3'>
            <h1 className="text-3xl text-white text-center p-3 font-mono font-extrabold">Password Generator</h1>
            </div>
            <div className='flex justify-center m-3 p-2'>
              <input className='w-full text-2xl px-1 py-1.2 outline-none' type="text" value={pass} placeholder='Password' readOnly ref={password}/>
              <button className='text-center cursor-pointer p-2 text-white text-xl font-mono' onClick={copyclip}>Copy</button>
              </div>
            <div className='flex justify-center flex-wrap m-3 p-2'>
              <input type="range" min={6} max ={100} value={len} onChange={(e)=>setLen(e.target.value)} className='p-1 ml-6'/>
              <label className='px-1 py-1 font-semibold font-mono ml-3 mr-5'>Length:{len}</label>
              <input type="checkbox" defaultChecked ={num} onChange={()=>setNum((prev)=>!prev)} className='p-1 ml-10'/>
              <label className='px-1 py-1 font-semibold font-mono ml-3'>Numbers</label>
               <input type="checkbox" defaultChecked = {char} onChange={()=>setChar((prev)=>!prev)} className='px-1 py-1 ml-3'/>
               <label className='px-1 py-1 font-semibold font-mono ml-3'>Characters</label>
               </div>
          </div>
        </div> 
      </>
  )
}

export default App
