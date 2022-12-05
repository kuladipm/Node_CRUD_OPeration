

const fs=require('fs')
const postData=(req, res) => {
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

}

const getData=(req, res) => {
    const users = getUserData()
    res.send(users)
}
const updateData=(req, res) => {
    //get the username from url
    const username = req.params.username

    //get the update data
    const userData = req.body

    //get the existing user data
    const existUsers = getUserData()

    //check if the username exist or not       
    const findExist = existUsers.find(user => user.username === username)
    if (findExist) {
        return res.status(409).send({ error: true, msg: 'username not exist' })
    }

    //filter the userdata
    const updateUser = existUsers.filter(user => user.username !== username)

    //push the updated data (userData) to updateUser object
    updateUser.push(userData)

    //finally save (updateUser) object in saveUserData object
    saveUserData(updateUser)

    res.send({ success: true, msg: 'User data updated successfully !!' })
}

const deleteData=(req, res) => {
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
/* util functions 

/* util functions ends */


//here we exporting controllers
module.exports={postData,getData,updateData,deleteData}