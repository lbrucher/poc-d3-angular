# POCFELaurentB

## Techs

* Angular v17
* Bootstrap
* E2E: Puppeteer


## Commands

Setup:
```
$ npm install
```

Run locally:
```
$ npm start
```

Run unit tests:
```
$ npm test
```

Run e2e tests:
```
$ npm run e2e
```


# Deviation from the original description

* Display of client info (id, name, etc.)
* Removed pie chart, display name in red for clients with one or more accounts with a negative balance
* Added nav bar
* Display the amount of listed and total clients


# Possible Improvements

* Card types and their color should come from the backend
* Add pagination when listing clients. Would have an effect on the client service and the API 
* Refactor API exposed by backend into an API tailored for the frontend. E.g. an endpoint that returns all the info we need at once: clients, accounts and card types. This way only 1 roundtrip.
