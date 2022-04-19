import { useCallback, useEffect, useMemo, useState } from "react"
import { getSafetyNumber } from "~/helpers/number"
import { web3, web3Provider } from "~/provider/web3"
import { useGetContractAbi } from "./use-get-contract-abi"

type Props = {
  contractId: string
  contractAbi: any
}

export const useMintNft = ({ contractAbi, contractId }: Props) => {
  const [isLoading, setLoading] = useState(false)
  const [isAvailable, setAvailability] = useState(false)
  const [availableCount, setAvailableCount] = useState(0)
  const [minAmount, setAmount] = useState<any>()
  const [ownerAddress, setOwnerAddress] = useState<string>()
  const [currency] = useState<string>('ETH')

  const contract = useGetContractAbi({ contractAbi, contractId })

  const amount = useMemo(() => minAmount && web3.utils.fromWei(minAmount), [minAmount])

  const getPrice = useCallback(async () => {
    try {
      const amount = await contract.methods.minRate().call()
      setAmount(amount)

      return amount
    } catch (error) {
      console.error(error)
      return undefined
    }
  }, [])

  const getOwnerAddress = useCallback(async () => {
    try {
      const ownerAddress = await contract.methods.owner().call()
      setOwnerAddress(ownerAddress)

      return ownerAddress
    } catch (error) {
      console.error(error)
      return undefined
    }
  }, [])

  const handleUpdateSupply = useCallback(async () => {
    try {
      setLoading(true)
      const maxSupplyStr = await contract.methods.MAX_SUPPLY().call()
      const currentSupplyStr = await contract.methods.totalSupply().call()
  
      const currentSupply = getSafetyNumber(currentSupplyStr)
      const maxSupply = getSafetyNumber(maxSupplyStr)
      setAvailability(currentSupply < maxSupply)
      setAvailableCount(maxSupply - currentSupply)
  
      return { maxSupply, currentSupply }
    } catch (error) {
      console.error(error)
      return undefined
    } finally {
      setLoading(false)
    }
  }, [contract])

  const handleMintNft = useCallback(async () => {
    try {
      setLoading(true)
      const account = await web3Provider.getAccount()
      const amount = await getPrice()
      const mintedNft = await contract.methods.safeMint(account).send({ from: account, value: amount })

      return mintedNft
    } catch (error) {
      console.error(error)
      return undefined
    } finally {
      setLoading(false)
    }
  }, [])

  const handleWithdraw = useCallback(async () => {
    try {
      setLoading(true)
      const account = await web3Provider.getAccount()
      const result = await contract.methods.withdraw().send({ from: account })

      return result
    } catch (error) {
      console.error(error)
      return undefined
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    handleUpdateSupply()
    getPrice()
    getOwnerAddress()
  }, [])

  return {
    contract,
    isLoading,
    isAvailable,
    availableCount,
    amount,
    currency,
    ownerAddress,
    handleMintNft,
    handleWithdraw,
    handleUpdateSupply,
  }
}
