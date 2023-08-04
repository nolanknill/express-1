const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8080;

const getContestants = () => {
    const contestantsJson = fs.readFileSync("./data/contestants.json");
    
    return JSON.parse(contestantsJson);
}

app.get("/", (req, res) => {
    res.send("Welcome to /");
})

app.get("/contestants", (req, res) => {
    let contestants = getContestants();

    if (req.query.country) {
        contestants = contestants.filter((contestant) => {
            return contestant.country === req.query.country;
        })
    }

    /*  
    Test all these:
        GET
            /contestants?order=rating
            /contestants?order=rating&sort=desc
            /contestants?order=rating&sort=asc
            
            /contestants?country=USA&order=rating
            /contestants?country=USA&sort=asc
    */
    if (req.query.order === "rating") {
        if (req.query.sort === "asc") {
            // Sort ascending
            contestants.sort((a, b) => {
                return a.rating - b.rating
            })

        } else { 
            // Sort descending
            contestants.sort((a, b) => {
                return b.rating - a.rating
            })
        }
    }

    res.json(contestants);
})

// GET /contestants/:id
// DELETE /contestants/:id
app
    .route("/contestants/:id")
    .get((req, res) => {
        // How to test: 
            // GET /contestants/{existing id}
            // GET /contestants/{non-existent id}
        const { id } = req.params;

        const contestants = getContestants();
        
        const foundContestant = contestants.find(contestant => contestant.id === id);

        if (foundContestant) {
            return res.json(foundContestant)
        }

        return res.status(404).json({
            message: "Could not find contestant with id " + id
        })
    })
    .delete((req, res) => {
        const { id } = req.params;

        const contestants = getContestants();
        const filteredContestants = contestants.filter(contestant => {
            return contestant.id !== id
        });

        if (contestants.length === filteredContestants.length) {
            return res.status(404).json({
                message: "Could not find contestant with id " + id
            })
        }

        fs.writeFileSync("./data/contestants.json", JSON.stringify(filteredContestants));

        return res.sendStatus(204);
    })



app.listen(PORT, () => {
    console.log("Started listening at http://localhost:" + PORT);
})