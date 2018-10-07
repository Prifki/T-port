# Development server

This is simple server that provides anough abilities to work with FE stuff (html + js + css) without worry about other problems.

## Features

- It could render pages from the templates. Handlebars (check the http://handlebarsjs.com/ for documentation and examples) is used as a template engine.
- It provide ability to extract the repeatable parts of the pages into separate files (partials).
- It allows to mock REST api with plain json files.
- It watch changes in files and reload opened pages automatically.
- It serves static assets required for the application.

## How to use it?

Step 1: clone the repository

Step 2: run command in your shell of choice `npm install` within the folder with the project to install required dependencies.

Step 3: run command `npm run start`. Wait for couple moments to see the url listening by the run application. It will be something like http://localhost:8090.

Step 4: open the browser with the url from the previous step.

## How to add the page?

To add page, for example available on the url `/catalog/catalog-item`, you have to create folder `catalog` within the folder `/app/templates/paged` and put the `catalog-item.hbs` file there.

After that content of the file will be available on the url from above. Please take a note that there should be no any file extensions (.html or .hbs).

## What are the partials within the `app/template/partials` folder for?

They are useful if you don't want to copy-paste some parts of html from page to page. Partials allow to extract such html into separate file and use it anywhere. 

## How to create partials?

To create partial you have to put *.hbs file with the HTML somewhere within the `app/templates/partials` folder. 

## How to use partials?

Add `{{> html/start }}` instruction into your page. Handlebars will render content from the file `app/templates/partials/html/start.hbs` instead of it.

## How to mock REST API responses?

Development server have special url directory dedicated for that http://localhost:8090/rest. All urls within this directory will be interpreted in a special way, so that request made on url `/rest/getItems/2` will return the content of the file `2.json` located within the `app/rest/getItems` folder of your project.

## What if there are some problems with development server itself?

Please, create an issue or merge request for the project. We will do something with it ASAP.

## ToDo

0. ~~handlebars support~~
0. ~~simple read rest handler~~
0. ~~write initial documentation~~
1. convert it into npm package to provide simple way to update it for the new features and the bug fixes
2. add handlebar service allowing to read data from json files or even maybe call rest api for data from the template
3. add a script for a project configuring with helpful stuff (eslint configuration, editorconfig and so on)
4. way to add custom read handlers for rest request
5. write handler for rest requests
6. check the compatibility with the react-create-app, adjust implementation if needed