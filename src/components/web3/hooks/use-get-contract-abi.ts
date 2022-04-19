import { AbiItem } from "web3-utils"
import { web3 } from "~/provider/web3"

type Props = {
  contractId: string
  contractAbi: any
}

export const useGetContractAbi = ({ contractId, contractAbi }: Props) => {
  return new web3.eth.Contract(contractAbi as AbiItem[], contractId)
}
