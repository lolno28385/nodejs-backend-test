There's only a few points I'd like to mention, the rest are just static points:


## Dependency injection using Factory Design Pattern
I have used Factory functions for routers and controllers, this allows to inject dependencies cascadingly through the app without having to import dependencies everywhere. This practice promotes: 
 1. clean architecture, no module coupling in most situations
 2. lower memory footprint
 3. easily extensible handlers
 4. module reusability


 ## Enable es6 in codebase through babel compiler
 The case for es6 is documented infinite times thoughout the internet, but I like to empasize that ES6 is the future of Javascript and any codebase planning to follow ecosystem standards must follow and ES6 makes developer's lifes much much easier and its clean and redable syntax is much more welcoming to developers.

Here's a more detailed explanation:

http://blog.thefirehoseproject.com/posts/12-reasons-es6-future-javascript-web-development/

## Async handler
There is a principal in software engineering: throw now and catch later. I've acomplished this though the use of an error handler as the last express handler. This method allows for seperating business logic and error handling.

## Errors object
The errors object contains all errors that the application will produce in runtime. As a security best practice, it also masks error descriptions, data and reasons from the enduser. This way in case someone is probing the API, they would never get any sort of information that would help them move further.