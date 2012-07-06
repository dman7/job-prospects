# MyJobProspects
A simple app that demostrates how to use Linkedin's Javascript SDK.

## Run me!
To run the app, obtain a Linkedin API, and add it in `index.html` (make sure the API key is not a string). Then type `ruby myjobprospects.rb`; this will start a Thin web server, listening on port 4567.

## Tech Stack
This app uses Linkedin's Javascript SDK to access a user's peers and extract their education, their first and last names and their headline. Sinatra web framework provides the abstraction for a web server. You can see the app in live-action at 