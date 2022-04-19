import { useEffect, useMemo, useState } from 'react'
import { VALID_CHAIN } from '~/constants/chain'
import { web3Provider } from '~/provider/web3'

export const useConnectWallet = () => {
  const [activeChainId, setActiveChain] = useState<string | undefined>(undefined)
  const [currentAccount, setActiveAccount] = useState<string | undefined>(undefined)
  const isValidChain = useMemo(() => VALID_CHAIN.id === activeChainId, [activeChainId])

  useEffect(() => {
    if (!window?.ethereum) return () => {}

    const tryAsync = async () => {
      const account = await web3Provider.getAccount()
      setActiveChain(window?.ethereum?.chainId)
      setActiveAccount(account)
    }

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      const account = accounts[0]
      setActiveAccount(account)
      web3Provider.currentAccount = account
    });

    window.ethereum.on('chainChanged', (chainId: string) => {
      setActiveChain(chainId)
    });

    tryAsync()

    return () => {}
  }, [])

  const handleConnect = () => web3Provider.handleAccountRequest()

  return { handleConnect, isValidChain, currentAccount }
}
