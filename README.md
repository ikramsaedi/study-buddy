# Study Buddy

As the Curium team for the 2024 CSIT x SWITCH Hackathon, we aimed to enhance student experiences by reflecting on our own needs. We recognise that women in STEM are often underrepresented in tech and educational environments, leading to feelings of isolation and discouragement. Learning is inherently social, and we believe that studying together can significantly reduce these feelings.

That’s the inspiration behind StudyBuddy. Our app is designed to motivate all students, with a special focus on empowering women in STEM, by fostering friendly competition and collaboration. By allowing users to log their study hours and connect with peers who share similar goals, we gamify the studying process and enhance productivity.

We believe that StudyBuddy can help build strong connections among students, ultimately enriching their learning experience.

# Live preview

## Android app

You can download the APK for this app on android at the following link: https://expo.dev/accounts/ikramsaedi/projects/study-buddy/builds/76550001-71fe-4cfe-a966-7da3303e16ee

Note: You may need to change some security settings on your phone to enable this. See: https://www.lifewire.com/install-apk-on-android-4177185 for more troubleshooting details.

If you struggle to set this up, see [Web](#web)

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
4. You will need to change the `DEVELOPER_URL` in `config.ts` to your IP address with port 3000. Should look something like this: http://192.168.211.140:3000
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

# How we built it

### Brainstorming

We began by brainstorming ways to enhance the student experience, generating a variety of ideas. After gathering unbiased feedback from three individuals, we ultimately decided to develop the StudyBuddy app.

### Design

On the Friday evening before development, we collaborated in Figma to create our designs. You can view our design mockups here: [Figma Design Link](https://www.figma.com/design/vtZKXpnQCeHXoxGiqOsvEP/Hackathon?node-id=0-1&node-type=canvas&t=Al2fL83IKAlyOkpB-0).

### Frontend

We built our app using Expo and React Native, using our designs to create functional pages. The frontend makes requests to the backend server as needed; for example, it uses a POST request to fetch a user's logged study hours from the database for display within the app.

#### Performance concerns

We have implemented short polling for the leaderboard page so that we get live updates. So for every 2 seconds, we update the page. We didn't have time to consider implementing something like SSE (Server Sent Events).

### Database

To organise our data, we created ERD diagrams that mapped out the relationships between tables. We chose SQLite for our database because it’s locally stored, eliminating the need for cloud hosting and simplifying the setup process.

### Server

We used an Express server that connects to our SQLite database. The server features multiple routes, including GET and POST requests, to interact with the database. The frontend is it's only client.

### Deployment

We deployed both the server and database on [Render](https://dashboard.render.com/) using a paid tier option. The React Native frontend was deployed using Expo Application Services.

## Challenges we ran into

### expo-sqlite Library Issues

We encountered problems with the expo-sqlite library, which didn't work with an existing SQLite database. This led to significant time wasted in troubleshooting. As a workaround, we ended up writing a Node server to manage our backend needs.

### Deployment Challenges

While deploying the Node server on Render, we faced limitations with the free tier, which caused the server to go down every 15 minutes. To avoid time constraints, we decided to upgrade to a paid tier.

### Learning New Technologies

We had to quickly learn and adapt to several new technologies, including React Native, Node, Express, SQLite, and Expo, which added to our workload and time used.

### Time Constraints

The time constraint was impacted the decision making in our development process.

### Compatibility Issues

RMIT's internet was not compatible with running Expo, which took time to debug and forced us to use our personal mobile data to run our application.

## Accomplishments that we're proud of

We are proud of several accomplishments from our project. Throughout the process, we gained knowledge on new technologies such as, integrating the server, database, and front end, allowing us to experience the entire development process. We also explored numerous new tech experiences such as, deploying the front-end React Native app to Expo Application Services and the server to Render, which was complex but very fulfilling. Our team member Ikram also dedicatedly sacrificed her concert plans to focus on our hackathon project, demonstrating her commitment to our team!

## What we learned

While developing, we worked with new technologies, such as React Native, Node, Express, SQLite, and Expo, which allowed us to skill build. We also improved our time management abilities by implementing time-blocking techniques, allowing us to stay organised and focused. Additionally, we learned the importance of teamwork and communication; understanding each other’s strengths and perspectives was vital to our success.

## What's next for Study Buddy

We'd like to understand about how we can keep on supporting community within this application. This could mean adding chats or reactions to send to fellow peers when they are more productive or need cheering up!
