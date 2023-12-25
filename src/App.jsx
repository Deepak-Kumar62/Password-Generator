import{useState,useEffect, useCallback, useRef} from "react"

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //not optimized
  // const generatePassword = () => {
  //   let pass = ""
  //   let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  //   if(numberAllowed) text += "1234567890"
  //   if(symbolsAllowed) text += "`!@#$%^&*~"
  //   for(let i = 1; i <= length; i++){
  //     let randomNo =Math.floor(Math.random()*text.length + 1) 
  //     pass += text.charAt(randomNo)
  //   }
  //   setPassword(pass)
  // }

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) text += "1234567890"
    if(symbolsAllowed) text += "`!@#$%^&*~"
    for(let i = 1; i <= length; i++){
      let randomNo =Math.floor(Math.random()*text.length + 1) 
      pass += text.charAt(randomNo)
    }
    setPassword(pass)
  },[length,numberAllowed,symbolsAllowed,password])



  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    console.log(passwordRef)
    console.log(passwordRef.current);
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])



 useEffect(()=> {
  // generatePassword()
  passwordGenerator();
 },[length,setNumberAllowed,setSymbolsAllowed])

  return (
   <div className="bg-gray-500 w-[700px] p-4 mx-auto mt-10 rounded">
    <h1 className='text-2xl text-center mb-4 text-white'>Password Generator</h1>
    <div className="flex">
      <input type="text" className='w-full p-2 text-lg outline-none rounded-l-md'
        value={password}
        readOnly
        ref={passwordRef}
      />
      <button 
        className='px-5 py-1 text-lg bg-blue-500 text-white rounded-r-md'
        onClick={copyPasswordToClipboard}
      >copy</button>
    </div>

    <div className='inline-flex p-4 space-x-3 items-center'>
      <input type="range" name="length" className="cursor-pointer"
        min={1}
        max={100}
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <label htmlFor="length" className='text-lg text-white'>Length {length}</label>
    </div>

    <div className='inline-flex p-4 space-x-2 items-center'>
      <label htmlFor="num" className='text-lg text-white'>NumbersInput</label>
      <input type="checkbox" name="num" className='w-4 h-4 mt-1' 
        defaultChecked = {numberAllowed}
        onChange={() => {
          setNumberAllowed((prev) => !prev)}
        }
      />
    </div>

    <div className='inline-flex p-4 space-x-2 items-center'>
      <label htmlFor="symbol" className='text-lg text-white'>SymbolsInput</label>
      <input type="checkbox" name="symbol" className='w-4 h-4 mt-1 focus:ring-green-500 rounded'
        defaultChecked = {symbolsAllowed}
        onChange={() => {
          setSymbolsAllowed((prev) => !prev)
        }}
      />
    </div>
   </div>
  )
}

export default App
