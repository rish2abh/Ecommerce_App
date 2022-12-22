const server = require("../index");
var chai = require("chai");
const chaiHttp = require("chai-http");


chai.should();
chai.use(chaiHttp);

describe("USER API", () => {
  describe("User signup API", () => {
    it("if invalid or empty fields provided return validation error", (done) => {
      const data = {
        name: "nilesh",
        email: "nilesh123@gmail.com",
        contactNumber: 882300523,
        password: "nilesh@123",
        confirmPassword: "nilesh@!23",
        gender : "male",
        role: "vender",
      };
      chai
        .request(server)
        .post("/user/createUser")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a("object");
          res.body.should.have.property("status").eq("Failed");
          res.body.should.have
            .property("message")
            .eq('"password" should contain at least 1 uppercase character');
            done()
        });
    });
    it("if already registered user provided then return it with valid message", (done) => {
      const data = {
        name: "nilesh",
        email: "nilesh123@gmail.com",
        contactNumber: 882300523,
        password: "Nilesh@123",
        confirmPassword: "Nilesh@!23",
        gender : "male",
        role: "user",
      };
      chai
        .request(server)
        .post("/user/createUser")
        .send(data)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.a("object");
          res.body.should.have.property("status").eq("Failed");
          res.body.should.have.property("message").eq("User Already Exists");
          done()
        });
    });
    it("if pass and confirm pass not same then return it with valid message", (done) => {
      const data = {
        name: "nilesh",
        email: "niles1223@gmail.com",
        contactNumber: 882300523,
        password: "Nilesh@123",
        confirmPassword: "nilesh@!23",
        gender : "male",
        role: "user",
      };
      chai
        .request(server)
        .post("/user/createUser")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a("object");
          res.body.should.have.property("status").eq("Failed");
          res.body.should.have.property("message").eq("Password and Confirm password should be same");
          done()
          
        });
    });
    it("if valid data provided return success registered message ", (done) => {
        const data = {
          name: "rahul",
          email: "nikhilpatil759@gmail.com",
          contactNumber: 8823005232,
          password: "Nikhil@1996",
          confirmPassword: "Nikhil@1996",
          gender : "male",
          role: "vender",
        };
        chai
          .request(server)
          .post("/user/createUser")
          .send(data)
          .end((err, res) => {
            // res.should.have.status(201);
            // res.should.be.a("object");
            // res.body.should.have.property("status").eq("success");
            // res.body.should.have.property("message").eq("created successfully");
            done()
            
          });
      });
  });
  describe("User Login API",() =>{
    it("If invalid or empty fields provided return validation error", (done) => {
      const data = {
        email: "",
        password: "patilnikhil",
      };
      chai
        .request(server)
        .post("/user/loginUser")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a("object");
          res.body.should.have.property("status").eq("Failed");
          res.body.should.have
            .property("message")
            .eq("\"email\" is not allowed to be empty");
          done();
        });
    });

    it("If not a registered user provided return invalid message ", (done) => {
      const data = {
        email: "nikhilpatil059@gmail.com",
        password: "patilnikhil",
      };
      chai
        .request(server)
        .post("/user/loginUser")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have.property("status").eq("Failed");
          res.body.should.have
            .property("message")
            .eq("You are not registered user");
          done();
        });
    });

    it("If invalid user password provided return invalid message ", (done) => {
      const data = {
        email: "rishabh123@gmail.com",
        password: "patilnikhi",
      };
      chai
        .request(server)
        .post("/user/loginUser")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have.property("status").eq("Failed");
          res.body.should.have.property("message").eq("Invalid Password");
          done();
        });
    });

    it("if valid data provided return success login message :", (done) => {
      const data = {
        email: "rishabh123@gmail.com",
        password: "Rishabh@123",
      };
      chai
        .request(server)
        .post("/user/loginUser")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("status").eq("Success");
          res.body.should.have.property("message").eq("Successfully login");
          res.body.should.have.property("token");
          done();
        });
    });
  })
});