# Scoop

This is my Final Capstone Project for Nashville Software School. It was due May 18th, 2018, so it was completed around that time. I will slowly be pushing up new updates to this project. I used NodeJS and ReactJS for this project.




## Change Log:

#### 5/19/18
  Initial MVP reached. Site only runs on my computer. Has no authentication. is not deployed.

#### 6/14/18
  Site deployed on Heroku as a Full Stack app with Node and React. Load times are insane. Still no authentication.

#### 9/13/18
  Project separated into two repositories:
    (https://github.com/joechesney/Scoop-Server)[https://github.com/joechesney/Scoop-Server]
    (https://github.com/joechesney/Scoop-Client)[https://github.com/joechesney/Scoop-Client]

  This way, I can change the project's two halves more easily. Also, it drastically improved load times, and I can deploy each End of the project sparately. The Client side is deployed through Firebase, while the Server side is deployed through Heroku.


# Deprecated Docs:

## Goals:
1. Build a webscraper using NodeJS to pull price data off of a popular used music gear website.
2. Save user "watchlists" to a database with item description and average prices.
3. Listen to listings posted for watchlist items on the website and compare their prices to the average price for that item.
4. If the listed price of the new listing is lower than the average price for that item, then my app will send a notification to the user to let them know that a good deal is available, and there will be a link to that item.
5. The main 2 pages of the app will be as follows:
  a. Watchlist items all listed on one page with the best deal available and the average price of that item shown. There will only be one product block per watched list item on this page.
  b. A list of "scoops", which is a page that ONLY shows items that below a certain price threshold. This page will be the main focus of the app. Its purpose will be to show only a few of the very best deals available on the site, filtered by their watchlist.

## Post-mvp:
1. A "feed" page that lists all of the best deals for all the watched items the user has, sorted in order by the best deal available. There can be multiple product blocks for each watchlist item on this page.
2. User settings where they can change which "page" displays upon opening the app.


## Using this App

1. In order to use this app, as of 5/19/18, the user must create a real Reverb.com account, apply for an App Permission, which will give you a client ID and aClient Secret. Then you need to save these keys in a file called "secrets.js" will be saved in Backend/utils.

2. First you'll need install all of the node packages, so type `npm install` into the terminal.

3. Because this is a react app you must run 2 separate servers. First run the backend server, by typing `nodemon server.js` into the terminal from the root directory. Then in a separate terminal run `npm start` to start the React server. This SHOULD automatically open the React local server in your browser. If it does not, then something has probably crashed with React, or you can open your local host server manually and go to the port number listed in the React terminal.

4. There are 5 pages on Scoop:
    NOTE: if you have no products in your feed or your watchlist, then nothing will show up on pages 1, 2, or 4. The content of these pages is entirely based on whether you already have items in these lists. Actually, most likely React will crash if there's no content for it to load onto these pages. The 'Reverb Deals' page should always have content to display. Its content is pulled from a constant, yet dynamically-created list provided by the Reverb API.
    i. The Home page Shows the splash screen with logo and the 4 main links to the other four pages.
    ii. The My Feed page will read products from your actual Reverb account. If you have no products added to your feed, there will be nothing on this page.
    iii. The Reverb Deals page pulls content from this page : (https://reverb.com/handpicked/deals)[https://reverb.com/handpicked/deals] and should always content to display.
    iv. The Scoop Deals page will loop through every product in your Feed and only return the products that are confirmed equal to/ under the determined market value for the product. This page is the most advanced feature of the site, and can take up to 15 seconds to loop through hundreds/thousands of product listings on the site, depending on the amount of products in your Feed.


 ## Issues and Bugs
 I would love to hear feedback about this site.
 Any and all bugs can be added to issue tickets, or can be sent directly to me at joedihchesney@gmail.com
 Thanks for checking out my site!
