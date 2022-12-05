//child module router

//below we created const variable express and assigned require function which includes express module as argument
const express = require('express')

//below we created const variable fs and assigned require function which includes fs npm default module as argument
const fs = require('fs')

//express.Router() it is a instance of express we call the .Router() method on the top-level Express import
const router=express.Router()


//this line is required to parse the request body
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// This method is called as a middleware in your application using the code: router.use(express.json());

router.use(express.json()) 

/* Create - POST method */
router.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData()

    //get the new user data from post request
    const userData = req.body

    //check if the userData fields are missing
    if (userData.fullname == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.status(401).send({ error: true, msg: 'User data missing'})
    }
    

    //check if the username exist already
    const findExist = existUsers.find(user => user.username === userData.username)
    if (findExist) {
        return res.status(409).send({ error: true, msg: 'username already exist' })
    }

    //append the user data
    existUsers.push(userData)

    //save the new user data
    saveUserData(existUsers);
    res.send({ success: true, msg: 'User data added successfully' })

})

/* Read - GET method */
router.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

/* Update - Patch method */
router.patch('/user/update/:username', (req, res) => {
    //get the username from url
    const username = req.params.username

    //get the update data
    const userData = req.body

    //get the existing user data
    const existUsers = getUserData()

    //check if the username exist or not       
    const findExist = existUsers.find(user => user.username === username)
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'username not exist' })
    }

    //filter the userdata
    const updateUser = existUsers.filter(user => user.username !== username)

    //push the updated data (userData) to updateUser object
    updateUser.push(userData)

    //finally save (updateUser) object in saveUserData object
    saveUserData(updateUser)

    res.send({ success: true, msg: 'User data updated successfully !!' })
})

/* Delete - Delete method */
router.delete('/user/delete/:username', (req, res) => {
    const username = req.params.username

    //get the existing userdata
    const existUsers = getUserData()
    
    //filter the userdata to remove it
    const filterUser = existUsers.filter(user => user.username !== username)

    if (existUsers.length === filterUser.length) {
        return res.status(409).send({ error: true, msg: 'username does not exist' })
    }

    //save the filtered data
    saveUserData(filterUser)

    res.send({ success: true, msg: 'User removed successfully' })

})


/* util functions */

//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)
}
/* util functions ends */

//To use this router in another file, there needs to be a module.exports= router name so that other files can access registration router
module.exports=router
