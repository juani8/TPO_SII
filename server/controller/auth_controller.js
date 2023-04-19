const UserModel = require('../models/user.js');


const createUser = async (req,res) => {
    //se reciben los siguietnes parametros del request
    const { name, email, password } = req.body;

    try {
        //se llama al metodo que hashea la password
        password = await User.hashPassword(password);
        //se crea el usuario con los datos recibidos
        const User = new UserModel(
            {name: name,
            email: email,
            password: password}
        );
        
        
        //se guarda el doc del user
        await User.save();
        res.status(200).send({data: User, message: 'Account created succesfully'})
    } catch (err) {
        res.status(422).json(err);
    } 
};


const validateLogin = async (req,res) => {
    console.log(req.body);
    const { email, password } = req.body;

    // mongo document email: request email
    const User = await UserModel.findOne({email: email});

    //if not null
    if (User) {
        const passValid = await User.comparePassword(password);
        if(passValid){
            const token = await User.generateToken();
            //otra opcion
            //res.status(200).json({ auth: true, data: token, message: 'Sign in successful, please wait...' });
            res.status(200).cookie('token', token).json(User);
        } else {
            res.status(422).json('password not valid');
        }
    } else {
        res.status(422).json('User not found')
    };
};
    

const getProfile = async (req, res) => {
    //se reciben parametros del request
    const { _id, email } = req;
    const User = await UserModel.findOne({_id: _id});
    res.status(200).json( User );
};


const deleteToken = async (req, res) => {
    res.cookie('token', '', {maxAge: 1}).json(true);
};


module.exports = {
    createUser,
    validateLogin,
    getProfile,
    deleteToken
};