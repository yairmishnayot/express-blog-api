import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.send("get all users");
})

router.get("/:id", (req, res) => {
    res.send("get a single user");
})

router.post("/", (req, res) => {
    res.send("create a single user");
})

router.put("/:id", (req, res) => {
    res.send("update user");
});

router.delete("/:id", (req, res) => {
    res.send("delete a user");
})

export default router;