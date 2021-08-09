const { MongoClient } = require("mongodb");
//const bcrypt = require("bcrypt");
const saltRounds = 10;
// Connection URI
const uri =
  "mongodb+srv://lukeitty:Tradewinds11@cluster0.tmjgl.mongodb.net/test";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let userC;
async function connect() {
  //try {
    // Connect the client to the server
    await console.log("connecting to server");
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    userC = await client.db("creativeproject330").collection("users");
    // userC.find({username:"lukeitty"}, function(err,user){
    //     console.dir(user);
    // })
    //console.log("Connected successfully to server");
}

async function disconnect(){
    await client.close();
}

async function createUser(user, pass){
    await connect();
   let hash = pass;
   //await bcrypt.hash(pass, saltRounds)
   await userC.insertOne({
    username: user,
    password: hash
   })
   await disconnect();
}

async function loginUser(user, pass){
    await connect();
    //first get user from database
    let foundUser = await userC.findOne({username: user});
    //console.log(foundUser);
    //return await bcrypt.compare(pass, foundUser.password);
    //await disconnect();
    return await pass === foundUser.pass;
}

async function test(){
    await connect();
    //await createUser("luke", "password");
    console.log(await loginUser("luke", "password"));
    await disconnect();
}

export {connect, disconnect, createUser, loginUser}