# ReelTime - Browse the latest and best movies and TV!

### SETU Full Stack Web Development 2: Assignment 1
### React Movies App

## Table of Contents
- [About the project](#about-the-project)
- [Features](#features)
- [Dependencies](#dependencies)
- [Installing the project locally](#installing-the-project-locally)
- [Remote Deployments](#remote-deployments)
- [Using the app](#using-the-app)
- [Credits](#credits)
- [Use of AI](#ai)

## About the project

ReelTime is a web application which allows users to browse movies and TV shows. Users can browse categories such as popular, upcoming, or top rated media, view similar movies or TV, and browse people such as actors and actresses, directors and producers, and writers and composers. The platform allows users to favourite or add media to must-watch lists, to add movie reviews, and to add fantasy movies which they may hope to see someday.

This repository contains the frontend code for ReelTime, which was built using React. It fetches data from The Movies Database (TMDB) API, and persists data such as favourites to Firestore. The app uses Firebase for authentication and Material UI for styling.

## Features

- Users can browse different categories of movies and TV.
- Users can filter by title, genre, rating, or year, in addition to sort by date, rating, or popularity.
- Users can see reviews for both movies and TV shows, and may write movie reviews which are persisted to the database.
- Users can see cast, crew, and similar media, in addition to watch official trailers if present.
- Users can add media that they like to "favourites" lists, and upon clicking in to any piece of media they may also add it to a "must watch" list. Both lists are persisted to the database.
- Users can add details of a movie they hope might be made someday through the "Fantasy Movie" form.
- Although users can browse media without logging in, many of these features require authentication. The application allows easy signup through Google Auth, or email and password if desired.

## Dependencies

Node.js and npm are required. Package dependencies are found in package.json.

## Installing the project locally.

```bash
# Clone the repo
git clone https://github.com/bit-of-a-git/reeltime-movies-app.git

# Navigate to the project directory
cd spot-swap

# Install dependencies
npm install

# Copy example .env file 
cp .env.example .env

# Populate .env file
# ...

# Start the project
npm start
```

## Remote Deployments

This project has been deployed on Vercel.

- https://reeltime-six.vercel.app

## Using the app

To get started, click the burger icon in the header to open the sidebar. From here, you can browse various categories of movies and TV shows. Selecting an image will take you to a detailed page, where you can view information about the cast, crew, and similar titles. You can also explore individual cast and crew profiles to learn more about their work and credits.

For enhanced features such as favourites, must-watch lists, and reviews, log in by clicking the "Log In" button in the header. You can sign in quickly with your Google account or create an account using your email and password.

Once logged in, blue heart icons will appear above movies, TV shows, and people, allowing you to add them to your favourites. To view your saved movies, navigate to Favourites → Movies. You can write reviews for movies by clicking the icon at the bottom left of a movie card. Your reviews are accessible under "My Movie Reviews."

You can also submit fantasy movies you hope to see someday by providing details such as overview, genres, and production companies. To keep track of movies and TV shows you want to watch, use the must-watch lists by clicking the icon in the upper left of any detail page.

To remove items from your favourites or must-watch lists, go to the favourites page and click the bin icon. You can also delete reviews and fantasy movies on their respective pages.

## Credits

Much of the code was taken from SETU's Full Stack Web Development 2 course, and follows on from the end of the labs.

Former SETU students Kieron Garvey and Eoin Fennessy's projects were extremely valuable when working on this project, and I referred to them frequently, looking at how they achieved app features and occasionally taking code to start on features.

https://github.com/ki321g/MovieAPP was referred to for:
- Authentication
- Storage
- Movie details
- Trailer feature
- Menu drawer
- Sorting

https://github.com/eoinfennessy/movies-app was referred to for:
- Fantasy movies
- Accordions
- Pagination
- Person details

Other sources which were referred to:
- https://stackoverflow.com/questions/78114219/property-env-does-not-exist-on-type-importmeta-ts2339
- https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app
- https://mui.com/material-ui/react-text-field
- https://stackoverflow.com/questions/64882223/im-having-trouble-with-react-datepicker-position
- https://base-ui.com/react/components/number-field
- https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
- https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp
- https://mui.com/material-ui/react-accordion
- https://dev.to/mhmdjaw/an-alternative-to-the-javascript-switch-statement-1kah
- https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable
- https://www.w3schools.com/cssref/func_cubic-bezier.php
- https://stackoverflow.com/questions/63488140/how-can-i-remove-line-above-the-accordion-of-material-ui
- https://mui.com/material-ui/react-accordion

## Use of AI

- I used GitHub Copilot to generate commit messages, which I typically changed or added to afterwards. I also used Copilot to generate PR messages.
- I also used Copilot to debug issues, and occasionally when I ran into a problem I could not find an answer to on Google, I asked Copilot.
- I used CodeRabbit to review my commits and point out potential issues or suggestions.