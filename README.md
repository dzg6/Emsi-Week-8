# Emsi-week-7

Created by Mark Reynolds

## Concept
To use the API's provided by Gabe to create a fully functional donut store.

## Design
Index page loads app.js module. Inside of App.js is all the event listeners for the top level buttons. When a button is click it gets processed by the site-hooks.js which then forwards all the data to an aynschronous api wrapper called POS which sends all requests to API and waits for the proper response.

Once a request is successfully process then site-hooks.js updates and prints the new html

### NodeJS Server
To run the local salesTax api you need to run the server.js file
````
node server.js
````