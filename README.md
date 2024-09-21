# Study Buddy

As the Curium team for the 2024 CSIT x SWITCH Hackathon, we aimed to enhance student experiences by reflecting on our own needs. We recognise that women in STEM are often underrepresented in tech and educational environments, leading to feelings of isolation and discouragement. Learning is inherently social, and we believe that studying together can significantly reduce these feelings.

That’s the inspiration behind StudyBuddy. Our app is designed to motivate all students, with a special focus on empowering women in STEM, by fostering friendly competition and collaboration. By allowing users to log their study hours and connect with peers who share similar goals, we gamify the studying process and enhance productivity.

We believe that StudyBuddy can help build strong connections among students, ultimately enriching their learning experience.

# Live preview

## Android app

You can download the APK for this app on android at the following link:

Note: You may need to change some security settings on your phone to enable this. See: https://www.lifewire.com/install-apk-on-android-4177185 for more troubleshooting details.

## Apple

See [Web](#web)

## Web

Go to https://ikramsaedi.github.io/study-buddy/

# How to run locally

NOTE: This doesn't work on RMIT wifi for some reason. You will need to hotspot or be on home wifi.

### Run backend server

1. `cd server`, then run `node server.js`.

### Run React Native development server for phones

### For web

1. Run `npm install` in this directory to install all your packages.
2. To run the React Native frontend development server, run `npx expo start --web`
3. To run the backend node server, `cd server`, then run `node server.js`.
4. You will need to change the `DEVELOPMENT_URL` in `config.ts` to your IP address with port 3000. Should look something like this: http://192.168.211.140:3000
5. Then go to http://localhost:8081, and it should work!

### Run on phone

1. Run `npm install` in this directory to install all your packages.
2. To run the React Native frontend development server, run `npx expo start`
3. To run the backend node server, `cd server`, then run `node server.js`.
4. You will need to change the `DEVELOPMENT_URL` in `config.ts` to your IP address with port 3000. Should look something like this: http://192.168.211.140:3000
5. Then install the Expo Go app on your phone from Play Store/App Store.
6. Then using the Expo App on your phone, scan the QR code and you should see be able to see it work.

#### Troubleshooting

You may need to press `s` in the terminal where your expo server is running to switch it into development mode.

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
- reinstalling node modules
