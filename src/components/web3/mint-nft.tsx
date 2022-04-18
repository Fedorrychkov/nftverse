import { useConnectWallet } from './hooks/use-connect-wallet'
import { useGetContractAbi } from './hooks/use-get-contract-abi'
import { contractAbi, contractId } from '~/abi/NFTVerseLand'

export const MintNft = () => {
  const connect = useConnectWallet()
  const contract = useGetContractAbi({ contractAbi, contractId })
  const handleMint = async () => {
    connect()
    try {
      console.log(contract.methods, 'contract.methods')
      const res = await contract.methods.totalSupply().call()
      console.log(res, 'res')
    } catch (error) {
      console.error(error)
    }
  }

  return <button onClick={handleMint}>mint</button>
}
