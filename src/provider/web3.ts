import type Web3 from 'web3'

const Web3Package = require('web3')

type ConstructorProps = {
  httpProviderUrl?: string
}

export class Web3Provider {
  web3: Web3
  private account: string | undefined
  private static _instance: Web3Provider;

  constructor({ httpProviderUrl }: ConstructorProps = {}) {
    if (!httpProviderUrl && !window.ethereum) {
      throw Error('Have not web3 provider')
    }

    this.web3 = new Web3Package(httpProviderUrl ? new Web3Package.providers.HttpProvider(httpProviderUrl) : window.ethereum)

    return this
  }

  public static get Web3Instance() {
    const instance = this._instance || (this._instance = new this())

    return instance.web3
  }

  public static get Instance() {
    const instance = this._instance || (this._instance = new this())

    return instance
  }

  public async getAccount() {
    const accounts = await this.web3.eth.getAccounts()
    this.account = accounts?.[0]

    return this.account
  }

  public async handleAccountRequest() {
    await window.ethereum.send('eth_requestAccounts')

    return true
  }
}

export const web3 = Web3Provider.Web3Instance
export const web3Provider = Web3Provider.Instance
