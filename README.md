# piletilevi-Automated-ui-tests

##  Description

This UI E2E test automation framework is developed with Cypress. Scope of the current automated UI tests cover the ticket purchasing flow.

### Test 1 : 
Selecting and adding a ticket to cart for a single event as a non-registered user.User add tickets without selecting a seat, so a random seat will be asigned to the user

### Test 2 : 
Selecting and adding a ticket to cart for a single event as a non-registered user. User add tickets selecting a seat.

## Run E2E UI tests in Local

Prerequisites : Node.js 12 or 14 and above

1. Clone repository to your local

2. Navigate to piletilevi-ui-tests in terminal

3. Run "npm install"


#### Run tests in headless mode with Chrome

npx cypress run --browser chrome

  
In the above command you can also change the browser you want to run the tests in with headless mode.

Ex:

* --browser firefox

* --browser edge

* --browser chromium


##### Reports :

After tests are executed, report can be found in "reports/html/index.html"


#### Run with cypress UI

npx cypress open


#### Sample report :
![Screenshot 2023-04-11 at 20 47 55](https://user-images.githubusercontent.com/116787791/231247435-115d520a-b51b-4350-ad4f-02a5df99b05e.png)
