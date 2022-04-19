import { useConnectWallet } from './hooks/use-connect-wallet'
import { contractAbi, contractId } from '~/abi/NFTVerseLand'
import { VALID_CHAIN } from '~/constants/chain'
import { useMintNft } from './hooks/use-mint-nft'
import { useMemo } from 'react'

export const MintNft = () => {
  const { handleConnect, isValidChain, currentAccount } = useConnectWallet()
  const { isAvailable, availableCount, amount, currency, ownerAddress, isLoading, handleUpdateSupply, handleWithdraw, handleMintNft } = useMintNft({ contractAbi, contractId })

  const isOwner = useMemo(() => ownerAddress?.toLowerCase() === currentAccount?.toLowerCase(), [ownerAddress, currentAccount])
  const handleMint = async () => {
    handleConnect()

    try {
      const nft = await handleMintNft()
      console.log(nft, 'nft')
      await handleUpdateSupply()
    } catch (error) {
      console.error(error)
    }
  }

  const withdrawHandler = async () => {
    handleConnect()

    try {
      const result = await handleWithdraw()
      console.log(result, 'result')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {currentAccount && <p>Current wallet: {currentAccount}</p>}
      {availableCount && <p>Available: {availableCount}</p>}
      {amount && <p>price: {amount} {currency}</p>}
      {!isValidChain && <p>You need change network to {VALID_CHAIN.title}</p>}
      {isLoading && <p>loading...</p>}
      <button disabled={!isValidChain || !isAvailable || isLoading} onClick={handleMint}>mint</button>
      {isOwner && <button disabled={isLoading} onClick={withdrawHandler}>withdraw balance</button>}
    </div>
  )
}
