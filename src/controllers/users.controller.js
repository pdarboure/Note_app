const userCtrl = {}
const User = require("../models/User")
const passport = require("passport")

userCtrl.renderSignUpForm = (req, res) => {
    res.render("users/signup")
}

userCtrl.signup = async(req, res) => {
    const errors = []
    console.log(req.body);
    console.log(errors);
    const { name, email, password, confirm_password } = req.body
    if (password != confirm_password) {
        errors.push({ text: "contraseña no coincide!" });
    }
    if (password.length < 4) {
        errors.push({ text: "contraseña tendria que ser mas larga que cuatro caracteres" })
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({email:email});    
        if (emailUser) {
            req.flash("error_msg", "ya usaste ese correo bostero querido, proba otro") 
            res.redirect("/users/signup")
        } else {
            const newUser = new User ({name, email, password})
            newUser.password = await newUser.encryptPassword (password)
            await newUser.save();
            req.flash("success_msg", "te registraste bostero!")
            res.redirect("/users/signin")
        }
    }
}
userCtrl.renderSignInForm = (req, res) => {
    res.render("users/signin")
}
userCtrl.signin = passport.authenticate("local",{
    failureRedirect:"/users/signin",
    successRedirect: "/notes",
    failureFlash:true
})

userCtrl.logout = (req, res) => {
    req.session.user = {}
    req.flash("success_msg", "cerraste sesion bostero!")
    res.redirect("/users/signin")
}
module.exports = userCtrl