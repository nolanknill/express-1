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
    .get((_req, res) => {
        res.status(200).json(contestants);
    })
    .post((req, res) => {
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
app.route("/contestants/:contestantId")
    .get((req, res) => {
        const contestantId = Number(req.params.contestantId);
        
        const foundContestant = contestants.find((contestant) => {
            return contestant.id === contestantId;
        });

        if (!foundContestant) {
            return res.status(404).json({ error: "Contestant not found" });
        }

        // respond with 404 if didn't find contestant
        return res.status(200).json(foundContestant);
    })
    .delete((req, res) => {
        const contestantId = Number(req.params.contestantId);
        
        const foundContestantIndex = contestants.findIndex((contestant) => {
            return contestant.id === contestantId;
        });

        if (foundContestantIndex === -1) {
            return res.status(404).json({ error: "Contestant not found" });
        }

        contestants.splice(foundContestantIndex, 1);
        return res.status(204).send();
    });

app.listen(8080, function() {
    console.log("Server is now listening at http://localhost:8080");
});