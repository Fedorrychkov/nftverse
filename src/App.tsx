import React from 'react';
import { MintNft } from './components/web3/mint-nft';
import { globalStyles } from './theming/global';

function App() {
  return (
    <div css={globalStyles}>
      <MintNft />
    </div>
  );
}

export default App;
