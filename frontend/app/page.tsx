'use client'
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWallet } from './wallet' 

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

  const wallet = useWallet();

  const sign= async () => {
    if(!wallet.connected){
      alert("Please connect wallet first")
    }
    else {
      const signedPsdtHex = await (window as any).dogeLabs.signMessage('0x' + code)
      let hash = document.getElementById('hash');
      hash.innerHTML = signedPsdtHex;
    }
  }

  const walletConnect= async () => {
    await wallet.connectWallet();
  }

  return (
    <main className="p-2">
      <center><h1 className='text-4xl'>Code Sign by Wallet</h1></center><br></br>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4 place-content-center h-50 border-4 rounded-lg border-cyan-500 p-4">
          <span>Code value</span>
          <input type="text" id="seed" className="border border-slate-600 rounded pl-1 pr-1" value={seed} onChange={handleSeedChange} readOnly></input>
          <span>Signed hash</span>
          <textarea id="hash" className="border border-slate-600 rounded pl-1 pr-1" value={hash} onChange={handleHashChange}></textarea>
          <button onClick={walletConnect} id="walletConnect" className='h-8 border-0 rounded bg-sky-500/75 hover:bg-cyan-600 text-white'>Connect Wallet</button>
          <button onClick={sign} id="sign" className='h-8 border-0 rounded bg-sky-500/75 hover:bg-cyan-600 text-white'>sign</button>
        </div>
      </div>
    </main>
  );
}

export default Page;
