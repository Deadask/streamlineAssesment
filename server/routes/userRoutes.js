const {register,login, setAvatar, getAllUsers} = require("../controllers/usersController");

const router = require('express').Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
router.get('/alluser/:Id,',getAllUsers);



module.exports = router;