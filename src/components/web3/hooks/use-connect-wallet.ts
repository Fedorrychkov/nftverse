import { useEffect } from 'react'
import { web3Provider } from '~/provider/web3'

export const useConnectWallet = () => {
  const handleConnect = () => web3Provider.handleAccountRequest()

  return handleConnect
}
