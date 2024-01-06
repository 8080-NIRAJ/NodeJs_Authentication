import Account from "../models/account.js";

// Rendering home page
export const homePage = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.render("homePage");
    }
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

// Rendering signup page
export const userSignup= async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/homePage");
    }
    return res.render("signupPage");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

// Rendering login page
export const UserLogin = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/homePage");
    }
    return res.render("loginPage");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

// Rendering reset page
export const reset = async (req, res) => {
  try {
    return res.render("resetPasswordPage");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

// Signup functionality
export const newUserSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    //console.log(password);
    //console.log(confirmPassword);
    if (password !== confirmPassword) {
      req.flash("error", "Password  do not match try again");
      return res.redirect("/");
    }

    const existAccount = await Account.findOne({ email: email });

    if (existAccount) {
      req.flash("error", "User Already Exists Please Login");
      return res.redirect("/");
    }

    const account = await Account.create({
      name: name,
      email: email,
      password: password,
    });

    req.flash("success", "Your Account Created Successfully!");
    return res.redirect("/login");
  } catch (error) {
    console.log("Oops, something went wrong", error);
    res.redirect("/");
  }
};

// SignIn functionality
export const signin = async (req, res) => {
  try {
    req.flash("success", "Welcome to Authentication Api");
    return res.redirect("/home");
  } catch (error) {
    console.log("Oops, something went wrong", error);
    res.redirect("/login");
  }
};

// Password reset functionality
export const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const account = await Account.findOne({ email: email });
    if (!account) {
      req.flash("error", "Your Account does Not Exits");
      return res.redirect("/reset");
    }

    if (account.password !== oldPassword) {
      req.flash("error", "Current password does not match try again");
      return res.redirect("/reset");
    }

    account.password = newPassword;
    await account.save();

    req.flash("success", "Password updated successfully");
    res.redirect("/login");
  } catch (error) {
    console.log("Oops, something went wrong", error);
    res.redirect("/login");
  }
};

// Destroy session
export const userLogout = async (req, res, next) => {
  try {
    req.logout(function (error) {
      if (error) {
        return next(error);
      }
      req.flash("success", "logged out successfully!");
      res.redirect("/");
    });
  } catch (error) {
    console.log("Oops, something went wrong", error);
    res.redirect("/");
  }
};
