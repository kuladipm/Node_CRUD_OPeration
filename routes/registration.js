//child module router
//below we created const variable express and assigned require function which includes express module as argument
const express = require('express')
//express.Router() it is a instance of express we call the .Router() method on the top-level Express import
const router = express.Router()
//here we getting controllers which is exported by registration_controller
const { postData, getData, updateData, deleteData, getDataByUserId } = require('../controllers/registration_controller.js')
//this line is required to parse the request body
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// This method is called as a middleware in your application using the code: router.use(express.json());
router.use(express.json())
/* Create - POST method */
router.post('/user', postData)
/* Read - GET method for specific username data */
router.get('/user/:id', getDataByUserId)
/* Read - GET method  for all data*/
router.get('/user', getData)
/* Update - Patch method */
router.patch('/user/:id', updateData)
/* Delete - Delete method */
router.delete('/user/:id', deleteData)
/*To use this router in another file, there needs to be a module.exports= router name so that other files can access registration router*/
module.exports = router
