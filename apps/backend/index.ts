import express from 'express'
import {db} from '@repo/db/client'

const app = express();

const PORT = 3001;

app.use(express.json());

app.get("/users", async (req, res) => {
    const users = await db.orm.public.User.all();

    try {
        res.json({ users });
    } catch (error) {
        res.json({ message : "there is some error while fetching the users" });
        
    }
})

app.post("/user", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.orm.public.User.create({
            email,
            password
        });

        res.json({ user });
    } catch (error) {
        res.json({ message : "this email is already exist, try different one", error });
        
    }
});

app.listen(PORT, () => {
    console.log("server is listning on Port " + PORT);
})