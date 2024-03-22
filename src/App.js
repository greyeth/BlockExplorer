import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockInfo, setBlockInfo] = useState(null);

  useEffect(() => {
    async function getBlockData() {
      const blockNumber = await alchemy.core.getBlockNumber();
      const block = await alchemy.core.getBlock(blockNumber);

      setBlockInfo(block);
    }

    getBlockData();
  }, []); // Empty dependency array to ensure useEffect only runs once

  return (
    <div className="App">
      <div>
        <h2>Block Information:</h2>
        {blockInfo ? (
          <div>
            <p>Block Number: {blockInfo.number}</p>
            <p>Timestamp: {new Date(blockInfo.timestamp * 1000).toLocaleString()}</p>
            <p>Hash: {blockInfo.hash}</p>
            <p>Parent Hash: {blockInfo.parentHash}</p>
            {/* Add more block information as needed */}
          </div>
        ) : (
          <p>Loading block information...</p>
        )}
      </div>
    </div>
  );
}

export default App;
