const express = require('express');
const app = express();

app.use(express.json());

const contestants = [
    {
        "id": 1,
        "name": "Jaida Essence Hall",
        "hometown": "Milwaukee, Wisconsin",
        "country": "USA",
        "age": 34,
        "originalSeason": "Season 12",
        "rating": 10
    },
    {
        "id": 2,
        "name": "Shea Couleé",
        "hometown": "Chicago, Illinois",
        "country": "USA",
        "age": 32,
        "originalSeason": "Season 9",
        "rating": 10
    },
    {
        "id": 3,
        "name": "The Vivienne",
        "hometown": "Liverpool",
        "country": "UK",
        "age": 29,
        "originalSeason": "UK Series 1",
        "rating": 10
    },
    {
        "id": 4,
        "name": "Monét X Change",
        "hometown": "New York City, New York",
        "country": "USA",
        "age": 31,
        "originalSeason": "Season 10",
        "rating": 10
    },
    {
        "id": 5,
        "name": "Yvie Oddly",
        "hometown": "Denver, Colorado",
        "country": "USA",
        "age": 28,
        "originalSeason": "Season 11",
        "rating": 10
    }
]

app
    .route("/contestants")
    .get((req, res) => {
        res.status(200).json(contestants);
    })
    .post((req, res) => {
        // Add a contestant!

        // Please validate above this point (check the age and rating are numbers)
        // and that all values are here (name, hometown, country, originalSeason)

        const {
            name,
            hometown,
            country,
            age,
            originalSeason,
            rating
        } = req.body;

        if (!name || !hometown || !country || !age || !originalSeason || !rating) {
            return res.status(400).json({error: "You're missing required fields!"});
        }

        const newContestant = {
            id: contestants[contestants.length - 1].id + 1,
            name,
            hometown,
            country,
            age,
            originalSeason,
            rating
        }

        contestants.push(newContestant);

        res.status(201).json(newContestant);
    })

//GET /contestants/:contestantId
app.get("/contestants/:contestantId", (req, res) => {
    const contestantId = Number(req.params.contestantId);
    
    const foundContestant = contestants.find((contestant) => {
        return contestant.id === contestantId;
    });

    if (!foundContestant) {
        return res.status(404).json({ error: "Contestant not found" });
    }

    // respond with 404 if didn't find contestant
    return res.status(200).json(foundContestant);
});

app.listen(8080, function() {
    console.log("Server is now listening at http://localhost:8080");
});