'use client'
import { useState, useRef, useEffect } from 'react';
import { Web3 } from 'web3';

function Page() {
  const seedRef = useRef(null);
  const hashRef = useRef(null);

  const [seed, setSeed] = useState('');
  const [hash, setHash] = useState('');

  const { address, isConnected } = useAccount();

  const handleSeedChange = (ev:any) => {
    setSeed(ev.target.value)
  }
  const handleHashChange = (ev:any) => {
    setHash(ev.target.value)
  }

  const sign= async () => {
    if(seed == "") {
      alert("Token name is invalid.")
      seedRef.current.focus()
    }
    else if(!isConnected) {
      alert("Please connect your wallet.")
    }
    else {
      var button = document.getElementById('sign');
      //button.style.disabled = "disabled";

      sign();
    }
  }

  return (
    <main className="p-2">
      <div className="flex justify-end">
        <ConnectButton />
      </div>
      <br></br>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4 place-content-center h-50 border-4 rounded-lg border-cyan-500 p-4">
          <span>Seed String</span>
          <input type="text" id="seed" ref={seedRef} className="border border-slate-600 rounded pl-1 pr-1" value={seed} onChange={handleSeedChange}></input>
          <span>Signed hash</span>
          <input type="text" id="hash" ref={hashRef} className="border border-slate-600 rounded pl-1 pr-1" value={hash} onChange={handleHashChange}></input>
          <span></span>
          <button onClick={sign} id="sign" className='h-8 border-0 rounded bg-sky-500/75 hover:bg-cyan-600 text-white'>sign</button>
        </div>
      </div>
    </main>
  );
}

export default Page;
