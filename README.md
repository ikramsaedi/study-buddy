# Live preview

## Android app

As of 21/09/2024 18:16, you can download the APK for this app on android at the following link: https://expo.dev/accounts/ikramsaedi/projects/study-buddy/builds/846c37c7-3a80-4775-93ff-c545280b8fe6

Note: You may need to change some security settings on your phone to enable this. See: https://www.lifewire.com/install-apk-on-android-4177185 for more troubleshooting details.

## Apple

See [Web](#web)

## Web

Go to https://ikramsaedi.github.io/study-buddy/

# How to run

1. Run `npm install` in this directory to install all your packages.
2. To run the server, run `npx expo start`
3. Then using the expo app on your phone, scan the QR code and you should see it work on your phone

# How to deploy

### Web Frontend using Github Pages

Run `npm run deploy`.

### Android Frontend using Expo

1. Make an Expo account if you don't have one at: https://expo.dev/signup
2. In terminal, run `npm install --global eas-cli` to install Expo Application Services. This is what we will use to deploy the app.
3. You will need to run `eas init` to create a project on the expo projects dashboard. Ensure that the existing eas config is not overwritten by this.
4. Run `eas build -p android --profile preview`. This will allow you to build your project and push it up to Expo Application Services.
5. Once this has completed, you will be able to scan a QR code to download an APK file on your phone. You may need to change some security settings on your phone to enable this. See: https://www.lifewire.com/install-apk-on-android-4177185 for more troubleshooting details.
6. Then you should just be able to open it and see it work!

### Server

This uses Render to deploy a web service which is the Node server. This only works with Ikram's credentials at the moment, sorry!

It currently automatically deploys from the server/ directory. To manually deploy, you will need to login to Render.

# Troubleshooting

### Local development for expo

If you have any issues running the server try:

- brew install watchman
- calling me
- reinstalling node modules
