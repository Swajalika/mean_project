/* Confugures our database and returns the mongoose object.
   Models will map the database schema, that we will create, 
   and convert them into collections 
   and then mongoose will use these models to map our data to the mongoose database
   and fetch the data and map it into these models.
*/

/* Import the mongoose module, that is, reference to mongoose library*/
const mongoose =  require('mongoose'); 

/* Assigns to global promise.
    Allows us to handle asynchronous code that could take a long while
    to complete; so when we're connecting to a database it could be that
    the database takes a lot of time to connect and we don't want our
    application to freeze until the database connects.
*/
mongoose.Promise = global.Promise;

/* Connect to the module*/
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;