const UserSchema = require("../model/userSchema");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Transporter = require("../Service/sendMail")


const signUp = async (req, res) => {
  try {
    const { confirm_password, password } = req.body;
    const { email, role,gender } = req.body;
    const userData = new UserSchema(req.body);
    const userExist = await UserSchema.findOne({ email: email });
    if (userExist != null) {
     return res.status(400).json({
        status: "Failed",
        message: "Email Already Exist",
      });
    } else if (password == confirm_password && userData != null) {
      const salt = await Bcrypt.genSalt(10);
      userData.password = await Bcrypt.hash(password, salt);
      if (role === "user") {
        userData.isActive = true;
      } else {
        userData.isActive = false;
      }
      if (gender === "male") {
        userData.profile_pic = "/uploads/male_Avatar.jpg"        
      } else {
        userData.profile_pic = "/uploads/female_Avatar.jpg"
      }
      await userData.save();
      res.status(201).json({
        status: "Success",
        message: "SignUp Complete go to Login ",
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Password not match",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Something went Wrong",
    });
  }
};

const login = async(req,res)=>{
  const {email, password} = req.body;
try{
  const isUser = await UserSchema.findOne({email : email})
  if(isUser){
    const isPassword = await Bcrypt.compare(password ,isUser.password)
    if(isPassword){
       const token = jwt.sign(
     { userId : isUser._Id},
     process.env.JWT_SCRECT_KEY,
     {expiresIn : "5d"}
     );
     res.status(200).json({
      status : "Success",
      message : "Login Success",
      token : token
     })  
    }else (
     res.status(401).json({
      status : "Failed",
      message : "Invalid Password"
     })
    )
  }else{
    res.status(401).json({
      status : "Falied",
      message : "You are not register User"
    })  
  }
}catch (err){
  res.status(500).json({
    status : "Failed",
    message : err.message
 })
 }
}
const sendUserResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try{
  const userVal = await UserSchema.findOne({ email : email });
  if (userVal) {
    const secret = userVal._id + process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userID : userVal._id }, secret, { expiresIn: "15m" });
    const link = `http://127.0.0.1:3000/api/userVal/reset/${userVal._id}/${token}`;

    console.log("===>>> link", link);
    let info = await Transporter.sendMail({
      from : "rishabhshrivastava205@gmail.com",
      to : email,
      subject : "Password Reset Link",
      html : `<a href = ${link}>Click here to reset password </a>`,
    });
    res.json({
      status : 200,
      message : "Please Check Your Mail",
      token,
    });
  } else {
    res.send({
      status : 400,
      message : "Email is required",
    });
  }
}catch(err){
  res.json({
    status : 500,
    message : err.message,
  });
}
}

const userPasswordReset = async (req, res) => {
  const { password, confirm_password } = req.body;
  const { id, token } = req.params;
  const User = await UserSchema.findById(id);
  const new_secret = User._id + process.env.JWT_SECRET_KEY;
  try {
    jwt.verify(token, new_secret);
    if (password && confirm_password) {
      if (password != confirm_password) {
        res.json({
          status: 401,
          message: "Password and confirm password Should be Same",
        });
      } else {
        const salt = await Bcrypt.genSalt(10);
        const new_password = await Bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(User._id, {
          $set: { password: new_password },
        });
        res.json({
          success: 200,
          message: "Password Reset Succesfully",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "All Fields Are Required",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: message.err,
    });
  }
};

const editProfile = async(req,res)=>{
  const id = req.params.id;
  const data = req.body
  try{
    const filePath = `/uploads/${req.file.filename}`;
    data.profile_pic = filePath
    const myProfile = await UserSchema.findByIdAndUpdate(id,data,{new:true})
    res.status(200).json({
      status : "Success",
      message : "Profile updated Successfully"
    })
  }catch(err){
    res.send(err.message)
  }
}


module.exports ={ signUp ,
                 login,
                 sendUserResetPasswordEmail,
                 userPasswordReset,
                 editProfile
                };
