const fs = require('fs')
//post method controller
const postData = (req, res) => {
    //get the existing user data
    const existUsers = getUserData()
    //get the new user data from post request
    const userData = req.body
    //check if the userData fields are missing
    if (userData.fullName == null || userData.contact == null || userData.email == null || userData.id == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' })
    }
    //check if the username exist already
    const findExist = existUsers.find(element => element.id === userData.id)
    if (findExist) {
        return res.status(409).send({ error: true, msg: 'id already exist' })
    }
    //append the user data
    existUsers.push(userData)
    //save the new user data
    saveUserData(existUsers);
    res.send({ success: true, msg: 'User data added successfully' })
}
//GET method for all data
const getData = (req, res) => {
    const users = getUserData()
    res.send(users)
}
//GET method for specific username data
const getDataByUserName = (req, res) => {
    //get username from url
    const userId = req.params.id;
    //get the existing user data
    const existUsers = getUserData()
    //check if the username exist or not       
    const findExist = existUsers.find(element => element.id === userId)
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'id not exist' })
    }
    //send specific username data
    res.send(findExist);
}
const updateData = (req, res) => {
    //get the username from urls
    const userId = req.params.id
    //get the update data
    const userData = req.body
    //get the existing user data
    const existUsers = getUserData()
    //check if the username exist or not       
    const findExist = existUsers.find(element => element.id === userId)
    //if(!findExist) means findExist false
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'username not exist' })
    }
    //filter the user data
    const updateUser = existUsers.filter(element => element.id !== userId)
    //push the updated data (userData) to updateUser object
    updateUser.push(userData)
    //finally save (updateUser) object in saveUserData object
    saveUserData(updateUser)
    res.send({ success: true, msg: 'User data updated successfully !!' })
}
const deleteData = (req, res) => {
    const userId = req.params.id
    //get the existing userdata
    const existUsers = getUserData()
    //filter the userdata to remove it
    const filterUser = existUsers.filter(element => element.id !== userId)
    if (existUsers.length === filterUser.length) {
        return res.status(409).send({ error: true, msg: 'username does not exist' })
    }
    //save the filtered data
    saveUserData(filterUser)
    res.send({ success: true, msg: 'User removed successfully' })
}
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
//here we exporting controllers
module.exports = { postData, getData, updateData, deleteData, getDataByUserName }