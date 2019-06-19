# Marketscope
Marketscope is a mock stock portfolio game where you can buy, sell and short U.S. stocks and see overall how much profit you've made or lost over time. The original idea is the premise that the user represents a hyptothetically "broke" Warren Buffet who only has a million dollars left in his fortune and it's up to you (the user) to see how he can make it all back.
 
 [LIVE SITE](https://damp-depths-60270.herokuapp.com/)
 > As the app is hosted on Heroku's free tier, please give the site some time to load. Thanks for your patience.
 
## Planning & Design
I knew this would have to be a full stack app in order to monitor and save each user trade and the current profit and loss math behind each held stock in the portfolio. I decided to use Mongoose and Express for the backend and React for the front end. 


#### Tech Used in this Project:
* Node
* Express
* React
* Axios
* Promises
* AJAX
* MLab (Mongoose DB GUI)
* Third-Party API (IEX Stock Exchange)

#### Design:
For the initial wireframe and UI design, I've used AdobeXD to get a solid visualization of the overall layout, colors and feel of the app before starting to get into the actual coding and development process. I decided to go with a 3 column dashboard layout for desktop and laptop sizes which is fully responsive at the lower screen sizes. Although I initially was a fan of the pure white background in the mockup phase, once in the development phase, the darker background seemed to present much better as a finanicial type of app so I decided to stick with those changes.

* AdobeXD UI Mockup (Before)
![alt text](https://github.com/RajisteB/marketscope/blob/master/client/src/images/Web%201920%20%E2%80%93%202.jpg)
 
* Live Site (After)
![alt text](https://github.com/RajisteB/marketscope/blob/master/client/src/images/Marketscope%20-%20SC.png)


## Development 
Development of the app was fairly straightforward however, working on this project provided a very apt lesson to fully plan out as much as you can beforehand. Perhaps the most difficult part was just getting the portfolio/stock profit and loss math correct when there are a variety of variables to take into account such as price, time, amount of shares, keeping track of the buying and selling and how that interacts with the current portfolio, etc. Once that was completed and tested to satisfaction, the rest of the coding process was just an issue of finding the time to complete everything.

#### Issue(s):
There were not too many issues in either the design or the development process, however, one thing that definitely stood out was regarding Node/Express and the sending of HTTP headers. As a stock app, when a user buys or sells a stock, there's multiple functions for the action in order to properly write the correct date and numbers to the database, however, the basic setup to send a response (either to the front-end or db) requires using such methods as res.send(). Res.send() by default is actually both "send" function and an "end" function. Basically once res.send() is triggered it prevents any more HTTP headers from being sent. Being that my app requires an action to hit multiple functions on the backend, this definitely created an issue for me. 

#### Solution(s):
The solution (after thoroughly reading through the docs a few times) was to just write the response with res.write(), and then, within the routes, call next() so the backend knows to go on to the next function without sending res.end(). Res.end() is called at the end of the function that is executed last, thus, giving me the flexibility I needed to properly store all the releveant information and preventing "ERROR: Headers have already been set" from being thrown everytime a user makes a trade.


## Questions, Comments or Inquiries?
Please don't hesistate to reach out to: Rajisteb@gmail.com if you have any questions or comments! Thanks!
