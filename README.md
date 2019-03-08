# CryptoBike

## Description
CryptoBike is a service that allows people to rent out their bikes remotely by attaching a simple device to their bike lock.
It tracks the bike through an ERC-721 implementation which contains telemetry data received from the bike in real time.

## Build Instructions
* Make sure you have [Node.js](https://nodejs.org/en/), [truffle](https://truffleframework.com/) and [ganache](https://truffleframework.com/ganache) (or the CLI)
* Clone the repo using `git clone https://github.com/govi218/CryptoBike`
* `cd` into the folder and run `yarn` (if you don't have yarn, you can get it [here](https://yarnpkg.com/lang/en/docs/install/#debian-stable))
* Now run `cd crypto-bike-abi && yarn` as it has separate dependencies
* Go to the project root and run `npm start`; this will create a local server that you access by running `https://localhost:3000` on your browser
* Start the Ganache server
* Navigate to the `crypto-bike-abi` folder again, and run:

```
truffle compile
truffle migrate
```

Finally, you can head back to the website and book a (randomly generated) bike. 