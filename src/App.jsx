import { useState,useCallback,useRef, useEffect } from "react"

function App() {
  const [password,setPassword] = useState("");
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str+= "123456789"
    if(charAllowed) str+= "!@#$%^&*-_+=[]{}~`"

    for(let i=1;i<length;i++)
    {
    let char =   Math.floor(Math.random() * str.length +1)
    pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const passCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])



  return (
    
    <div className="Pass-Gen">
      <div className="box">
        <h4>Password Generator</h4>
        <input 
        type="text"
        placeholder="password"
        readOnly
        value={password}

        />
         <button onClick={passCopy}>Copy</button>

        <div className=' diff flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
      </div>
      
    </div>
  )
}

export default App
