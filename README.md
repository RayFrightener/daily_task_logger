# daily_task_logger

Tech Stack: 
Front-end: HTML, HTMX, JS, CSS
Back-end: Node.js with express, Postgresql 

Back-end is developed using the MVC (Model-View-Controller) pattern or a variation of it.

Benefits

Modularity: Each component (controller, route, service) has a single responsibility, making the code easier to manage and understand.

Reusability: Services can be reused across different controllers, promoting DRY (Don't Repeat Yourself) principles.

Testability: Isolated components are easier to test individually, improving the overall test coverage and reliability of the application.

A section of this readme is to write how the daily_task_logger was developed and what is the intention behind it. 
Not sure how it will be reproduced, but I am sure it can be. 


2.5.25
Today the sub-directories for the backend directory was created and I added controllers, routes, services for the backend directory and css, js sub-directories for the frontend directory.  

Routes use controllers.
Controllers use services.
Services perform database queries.

Controllers: Functions executed when an HTTP request (such as POST or GET) is made. They act as middlemen between the HTTP request and database querying, often using services to perform the actual data operations.

Routes: HTTP requests made to the backend. Routes embed controllers, which handle the request logic.

Services: Independent functions that perform database queries. They are used within controllers to handle data operations.




