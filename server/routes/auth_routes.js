const { Router } = require("express");
const { createUser,
    validateLogin,
    getProfile,
    deleteToken } = require("../controller/auth_controller");
const { verify_token } = require("../middleware/verify_token");



const router = Router();

// lo que hace esto es disponibilizar los metodos del controlador
// en cada una de las rutas de la aplicación 

router.post('/register', (req,res) => createUser(req,res));


router.post('/login', (req,res) => validateLogin(req,res));


router.get('/profile', verify_token, (req,res) => getProfile(req,res));


router.get('/logout', verify_token, (req,res) => deleteToken(req,res));



module.exports = router;