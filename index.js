#!/usr/bin/env node

const request = require('request-promise')

async function getTx(network, hex) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    uri: `https://api.whatsonchain.com/v1/bsv/${network}/tx/hash/${hex}`,
    json: true
  }

  try {
    const response = await request(options)
    return response
  } catch (err) {
    throw err
  }
}

;(async () => {
  const optionDefinitions = [
    { name: 'test', type: Boolean },
    { name: 'stn', type: Boolean },
    { name: 'hex', type: String, defaultOption: true }
  ]

  const commandLineArgs = require('command-line-args')
  const options = commandLineArgs(optionDefinitions)

  let network = 'main'
  if (options.test) {
    network = 'test'
  } else if (options.stn) {
    network = 'stn'
  }

  try {
    const tx = await getTx(network, options.hex)
    console.log(tx)
  } catch (err) {
    console.log(err.message)
  }

})()
