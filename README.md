# serverless-chrome-downloader

Serverless Chrome Downloader. The aim of this project is to automate discovering and downloading the latest build of [Serverless Headless Chrome](https://github.com/adieuadieu/serverless-chrome/) which built specifically for serverless environments such as AWS Lambda.

<br>


## Install
```bash
npm install serverless-chrome-downloader --save-dev
```

<br>


## Usage
```js
const chromeDownloader = require('serverless-chrome-downloader')

chromeDownloader(
  './vendor/headless_chrome',     // Location (required). The path to save the headless chrome binary
  'stable',                       // Channel (optional, default is stable). One of: stable, beta or dev
  'adieuadieu/serverless-chrome'  // Github repo to download from (optional)
)
```

<br>


## Command Line Usage
```bash
npx serverless-chrome-downloader [download-path] [channel] [repo-name]
  - [download-path]     Where to download the chrome binary (Required).
  - [channel]           Channel to download (stable | beta | dev). (Optional, default is stable).
  - [repo-name]         Github repo to download from (Optional, default is adieuadieu/serverless-chrome).
```

<br>

## License

**serverless-chrome-downloader** released under the [MIT](./LICENSE) license.<br>
Authored and maintained by Abdulaziz Homaily with help from [contributors](https://github.com/homaily/serverless-chrome-downloader/contributors).

GitHub [@homaily](https://github.com/homaily) · Twitter [@homaily](https://twitter.com/homaily)
