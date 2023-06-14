const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const { loggedAuth, adminAuth, loginCustomer } = require('../middlewares/loginMiddleware')
const dataError = require('../middlewares/errorHandler')

router.post('/loginUser', Controller.loginUser)
router.post('/regisUser', Controller.registerUser) //create
router.post('/googleLog', Controller.googleLogin)

router.get('/renderword', Controller.renderWord)//read
router.post('/submitLog', loggedAuth, Controller.inputLog)//createlog
router.post('/addProgress', loggedAuth, Controller.inputProgress)//createprogress
router.get('/renderLog', loggedAuth, Controller.renderLogs)
router.get('/renderDetailLog/:id', loggedAuth, Controller.renderLogsDetail)
router.post('/logUpdate/:id', loggedAuth, Controller.updateLogs)
router.delete('/deleteLog/:id', loggedAuth, Controller.deleteLog)


router.use(dataError)

module.exports = router;