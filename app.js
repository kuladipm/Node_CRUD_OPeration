//parent application router

// we need routing bcz main/parent application have multiple modules and we want keep each module  separate so that reduce complexity


/*below we created const variable express and assigned require function which includes express module as argument and this is main module 
or we can say that this module start code execution  */

const express = require('express')

//below we created const variable fs and assigned require function which includes fs npm default module as argument
const fs = require('fs')


// now register route(child) are available to parent application
//require('./routes/registration.js') in require function we assigned url of route(child)
const register=require('./routes/registration.js')

//invoked express function and stored in app const variable
/*in below line, we use 'app' as placeholder to receive the output from express() function, which is an object, 
we can use it in our code (by accessing his methods and properties like any other Class )
in other words, we use the 'app' Object, which  produced from 'express()' function,
 that we imported from 'express.js' file .
NOTE 1) and of course we can give any name instead of 'app' , but it's a good practice 
when you follow what the most developers use to name this packages, 
that make easier to understand your code specialty when you work in team.
*/
const app = express()

/*After we make this registration route (child) available to the parent, we need to tell the parent application when to
 use this route application. Lets say when a user hits the path ('/api/user/add') on registration  we need 
the post route application of  registration rout  to handle the request and we do it by using the Express's use (url,route name) method*/
app.use('/api',register)

//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})