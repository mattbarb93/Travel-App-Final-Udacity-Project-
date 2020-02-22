To open the project
Run the following commands:
npm install
npm run build-prod
npm start

Languages used

This project was done in Javascript, and the styles are in SASS. We use NPM to get the dependencies.

Dependencies in the project

For this travel app, we used babel, babel loader, css loader, file loader, html loader, html webpack plugin, node sass, sass loader, style loader, webpack, webpack cli, and webpack dev server as our dependencies

Project Goal

For this project, we intend to have the user enter a city of their choice, followed by a date which they wish to travel to said city. After getting this information, we use three different APIs to get:
- A picture of the city
- The projected minimum and maximum temperature on the day selected by the user

What have I learned?

This was the first time I had to integrate multiple APIs, and pass many calls into a single object which eventually were used to display desired information back to the user. 

What struggles have I faced?

As mentioned before, the multiple API calls were a challenge at first, but once the first two were made, I had a clear vision on how to call more than one. Another challenge was to display the number of days remaining before the trip, which I achieved by making some javascript logic with the Date() function.


