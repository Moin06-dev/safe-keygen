import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [lenght, setlenght] = useState(8);
  const [numberAllowed, setNumerAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordref = useRef(null)

  const genratePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()+=";

    for (let index = 1; index < lenght; index++) {
      const ran = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ran);
    }

    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed]);


  useEffect(()=>{
genratePassword()
  },[lenght, numberAllowed,charAllowed])

  const CopyToCliboard=()=>{
    window.navigator.clipboard.writeText(password)
    passwordref.current?.select()
    passwordref.current.focus()
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          Password Generator..
        </h1>

        {/* Password + Copy */}
        <div className="flex items-center gap-3 bg-white/20 rounded-lg p-3 shadow-inner">
          <input
            value={password}
            className="flex-1 px-3 py-2 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none shadow-md"
            type="text"
            placeholder="Password..."
            readOnly
            ref={passwordref}
          />
          <button onClick={CopyToCliboard} className="bg-gradient-to-r from-pink-600 to-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform">
            CopyToCliboard
          </button>
        </div>

        {/* Slider */}
        <div className="bg-white/20 rounded-lg p-4 shadow-inner flex flex-col gap-3 text-left">
          <label htmlFor="lenght" className="text-white font-medium">
            Length: <span className="font-bold">{lenght}</span>
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={lenght}
            id="lenght"
            className="w-full accent-pink-500 cursor-pointer"
            onChange={(e) => setlenght(e.target.value)}
          />
        </div>

        {/* Checkboxes */}
        <div className="bg-white/20 rounded-lg p-4 shadow-inner flex flex-col gap-3 text-left">
          <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumerAllowed((prev) => !prev);
              }}
              className="accent-pink-500 w-5 h-5"
              id="number"
            />
            Numbers
          </label>

          <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="accent-pink-500 w-5 h-5"
              id="charInput"
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
