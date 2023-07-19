# Getting Started with Pup Quest

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

After cloning this project you should first install the node modules

#### `npm i`

##Setting up certificates
Then you'll need to set up an SSL certificate for this to work with the backend. This means you have to launch the site with https protocol.
Theres tons of ways you can do this so I'll describe a quick easy way to do it.

First, we want tools to make certificates with.
#### `brew install mkcert`
#### `brew install nss`
#### `mkcert -install`

Then, in the root of the project directory, you should make a certificate folder like this
#### `mkdir -p .cert`

And then generate an ssl certificate to host the site securely
#### `mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"`

The start script is already set up for this but if you set up your certs in a different way you may need to alter it.

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


