const Task = require('../modal/tasks')

exports.tasklist = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.send({ status: 200, message: "Success", data: tasks });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.createtask = async (req, res) => {
    try {
        const { title, description, completed, imageUrl } = req.body;
        const newTask = new Task({
            title,
            description,
            completed,
            imageUrl
        });
        await newTask.save();
        return res.send({ status: 200, message: "Success", data: newTask });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updatetask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.send({ status: 200, message: "Success", data: task });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deletetask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        return res.send({ status: 200, message: `Task with id ${req.params.id} deleted` });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};