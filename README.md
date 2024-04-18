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

See [Frontend Engineer Assessment.pdf](docs/Frontend Engineer Assessment (3).pdf).

* Display of client info (id, name, etc.)
* Removed pie chart, display name in red for clients with one or more accounts with a negative balance
* Added nav bar
* Display the amount of listed and total clients
* Accounts bar chart: now with horizontal bars and a shared balances scale. This is to more easily compare account balances between clients.
* As a consequence of the previous item, there is now a single account balances chart legend shared across all clients, i.e. unselecting a card type applies to all clients.


# To Fix

* Account balance chart: the bars get thinner as there are less accounts per client. This is probably due to the implementation of the `getChartInnerHeight()` function...


# Possible Improvements

* Card types and their color should come from the backend
* Add pagination when listing clients. Would have an effect on the client service and the API 
* Refactor API exposed by backend into an API tailored for the frontend. E.g. an endpoint that returns all the info we need at once: clients, accounts and card types. This way only 1 roundtrip.
