# Creating a new Express application

1. Create a project folder

2. Add package.json using `npm init -y`
    - This uses the defaults for initializing!

3. create a main file called `server.js`

4. Run `git init`
    
    a. Add `.gitignore` for node_modules

5. Install express package using `npm install express`

6. Import express in `server.js` and add endpoints!

7. Add scripts to package.json:

```
"scripts": {
    "start": "node server.js",
    "dev": "npx nodemon server.js"
}
```

8. Start server using `npm run dev`


## Installing this demo
1. Download repository from GitHub

2. Run `npm install` in the project directory to install depedencies

3. Run `npm run dev`

## Available Endpoints
- `GET /contestants`

- `GET /contestants/:id`

- `DELETE /contestants/:id`

- `POST /contestants`. Required fields:
    - age
    - country
    - hometown
    - name
    - rating
    - originalSeason

