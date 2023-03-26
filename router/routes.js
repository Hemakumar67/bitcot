const express = require('express');
const router = express.Router();
const crud = require('../controller/crud')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const newFileName = `${file.originalname}`;
        cb(null, newFileName);
    }
});
const upload = multer({ storage });
router.get('/tasks', crud.tasklist);
router.post('/tasks', upload.single('attachments'), crud.createtask);
router.put('/tasks/:id', crud.updatetask);
router.delete('/tasks/:id', crud.deletetask);
module.exports = router;


