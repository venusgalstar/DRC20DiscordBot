'use client'
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') ?? "";
  const [seed, setSeed] = useState(code);
  const [hash, setHash] = useState('');

  const handleSeedChange = (ev:any) => {
    setSeed(ev.target.value)
  }
  const handleHashChange = (ev:any) => {
    setHash(ev.target.value)
  }

  const sign= async () => {
    if(seed == "") {
      alert("Token name is invalid.")
    }
    else {
      var button = document.getElementById('sign');
      //button.style.disabled = "disabled";

      sign();
    }
  }

  return (
    <main className="p-2">
      <br></br>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4 place-content-center h-50 border-4 rounded-lg border-cyan-500 p-4">
          <span>Code value</span>
          <input type="text" id="seed" className="border border-slate-600 rounded pl-1 pr-1" value={seed} onChange={handleSeedChange} readOnly></input>
          <span>Signed hash</span>
          <input type="text" id="hash" className="border border-slate-600 rounded pl-1 pr-1" value={hash} onChange={handleHashChange}></input>
          <span></span>
          <button onClick={sign} id="sign" className='h-8 border-0 rounded bg-sky-500/75 hover:bg-cyan-600 text-white'>sign</button>
        </div>
      </div>
    </main>
  );
}

export default Page;
