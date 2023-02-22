const { assert } = require('chai')
const { ethers } = require('hardhat')

describe('PayClik Tests:', () => {
  let provider
  let payClik
  let _to = '0x3fFb803a41BD61e1fE7a4d63d2DA751B2de7Db3E'

  beforeEach(async () => {
    provider = new ethers.providers.JsonRpcProvider(
      'https://rpc.ankr.com/eth_goerli'
    )
  })

  it('Contract Deployment', async () => {
    const PayClikContract = await ethers.getContractFactory('PayClik')
    const PayClikContractDeployed = await PayClikContract.deploy()
    await PayClikContractDeployed.deployed()

    console.log(
      `PayClik contract address is: ${PayClikContractDeployed.address}`
    )

    payClik = await ethers.getContractAt(
      'PayClik',
      PayClikContractDeployed.address
    )
  })

  it('Get Current address balance', async () => {
    const addressBalance = await payClik.getBalance()
    const balance = ethers.utils.formatEther(addressBalance)
    console.log(balance)
  })

  it('Send ether to another address', async () => {
    let _amount = ethers.utils.parseEther('0.0002')


    const sending = await payClik.sendEther(_to, _amount, { value: _amount })
    await sending.wait()
  })

  it('Balance less than amount to be sent', async () => {
    let _amount = ethers.utils.parseEther('4')

    try {
      const sending = await payClik.sendEther(_to, _amount, { value: _amount })
      await sending.wait()
      assert.fail("Transacton should have failed")
    } catch (err) {
      console.log(err.message);
      assert.include(err.message)
    }
  })

  it("When amount to be sent is 0", async () => {
    let _amount = ethers.utils.parseEther('0')

    try {
      const sending = await payClik.sendEther(_to, _amount, { value: _amount })
      await sending.wait()
      assert.fail("Transacton should have failed")
    } catch (err) {
      console.log(err.message);
      assert.include(err.message)
    }
  })

  it("Sending to invalid address", async () => {
    let _to = "0x0000000000000000000000000000000000000000";
    let _amount = ethers.utils.parseEther('0.0002')

    try {
      const sending = await payClik.sendEther(_to, _amount, { value: _amount })
      await sending.wait()
      assert.fail("Transacton should have failed")
    } catch (err) {
      console.log(err.message);
      assert.include(err.message)
    }
  })
})
