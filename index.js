'use strict'

const {promisify} = require('util')
const fs = require('fs')

const fetch = require('node-fetch')
const unzip = require('decompress-unzip')

const writeFilePromise = promisify(fs.writeFile)

module.exports = async (location, channel, repoName) => {
  if (!location) {
    throw new Error('location is required')
  }

  if (fs.existsSync(location)) {
    console.log('file already exist. Aborting download.')
    return
  }

  if (channel && ['stable', 'dev', 'beta'].indexOf(channel) === -1) {
    throw new Error('channel is not valid. Must be one of: stable, beta or dev')
  }

  if (!channel) channel = 'stable'
  if (!repoName) repoName = 'adieuadieu/serverless-chrome'

  const channelRegex = new RegExp(`^${channel}-`, 'i')
  const repoURL = `https://api.github.com/repos/${repoName}/releases`

  console.log('Getting latest release...')
  const response = await fetch(repoURL)
  const result = await response.json()

  if (!result || !result[0] || !result[0].assets || !result[0].assets.length) {
    throw new Error('Couldn\'t find latest release with assets')
  }

  // get channel asset
  const asset = result[0].assets.find(item => channelRegex.test(item.name))
  if (!asset) {
    throw new Error(`Couldn't find channel (${channel})`)
  }

  // get download size
  const size = (asset.size / 1024 / 1024).toFixed(1)

  console.log(`Downloading (${asset.label}) [${size} MB]...`)
  const archiveResponse = await fetch(asset.browser_download_url)
  const archiveBuffer = await archiveResponse.buffer()

  console.log('Unzipping...')
  const archive = await unzip()(archiveBuffer)
  const binary = archive.find(file => file.path === 'headless-chromium')

  if (!binary) {
    throw new Error('Couldn\'t find (headless-chromium) in the zipped file')
  }

  console.log('Saving file...')
  await writeFilePromise(location, binary.data, {mode: 0o755})

  console.log('Done!')
}
