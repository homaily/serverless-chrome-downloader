#!/usr/bin/env node

const path = require('path')
const index = require('./index')

setImmediate(async () => {
  const [location, channel, repoName] = process.argv.slice(2)

  if (!location) return usage()
  if (channel && ['stable', 'dev', 'beta'].indexOf(channel) === -1) return usage()

  const location2 = path.resolve(process.cwd(), location)

  await index(location2, channel, repoName)

  process.exit()
})

function usage () {
  console.log(`
Usage:

npx serverless-chrome-downloader [download-path] [channel] [repo-name]
  - [download-path]     Where to download the chrome binary (Required).
  - [channel]           Channel to download (stable | beta | dev). (Optional, default is stable).
  - [repo-name]         Github repo to download from (Optional, default is adieuadieu/serverless-chrome).
`)

  process.exit()
}
