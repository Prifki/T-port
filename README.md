# T-port

An educational project on developing an application which simulates the operation of the information system of a transport company.

## Site sections description

### Header

The header contents the user functional which allows him:

* To search transport, stops and routes with autocomplete and open the corresponding cards;
* To sign in and sign out of the application;
* To watch and edit favorite transport, stops and routes signs.
* To open the cards of the favorite entities.

It contents a navigation bar as well, which hides into a burger-menu when the window is not wide enough.
The site logo is a link to the main page and it refreshes the single-page application.

### The main page

Here is the main section of the web-application. A full-screen scrollable and zoomable map is situated here to provide the ability to watch the routes conveniently and cozy. 

There is a Find-A-Route window where the user chooses the stop from which he is going to start his trip, the last destination of his trip and the time when he wanna start. (Autocomplete is provided). When the user pushes the FIND button, the route on the map and the detailed information of the shortest trip are appearing. On the information window he can see the time of transport depatures, the type of the transport, the route names and the transfer stations. All the items are the links for the corresponding cards which can be opened in a modal window.

### Transport

On this page the full list of the available transports is shown. There is an ability to sort the column of the transport seats number by clicking on the column title. Also a user can filter the items by transport types by pushing the corresponding buttons or by routes, typing the route name into the filtering form. Table pagination is provided for the convenientness of inspecting. Clicking on a transport number will open a corresponding card.

### Stops

On the current page there is a list of stops which the user can sort by its name, filter by name and routes. The stop names are the links to the corresponding cards. A pagination is provided.

### Routes

On this page the routes are shown as well as the stops of its departure and arrival. You can sort the routes list by route names. Clicking on a route name will display the route informarion on a map and open the corresponding card.

### Cards

The cards contain information of an opened entity. The stop cards also provide a map whith a marked geoposition. The displayied entities are the links for another card opening. Near the card title there is a favorites pictogram which allows you to add the current card to favorites for the further convenient usage.

### Footer

Copyright info


## Moderating

If the user has a privilage of a modarator, it allows him to edit the table items, remove them and add another ones. There is a settings pictogram on the corners of the tables which opens the moderating functionality.



