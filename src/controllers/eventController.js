import Event from "../models/Event.js";

export async function getEvents(req, res) {
    try {
        const events = await Event.find();
        if (events) {
            res.json(events);
        }
    } catch (error) {
        console.log(error);
    }
}
export async function createEvent(req, res) {
    try {
        const { name } = req.body;
        const image = req.file.path;
        const data = await Event.create({ name, image });
        if (data) {
            res.json(data);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateEvent(req, res) {
    try {
        const { _id, name } = req.body;
        const image = req.file.path;
        if (!_id || !name || !image) {
            return res
                .status(400)
                .json({ error: "An id and a new name should be provided!" });
        }
        const data = await Event.findOneAndUpdate(
            { _id: _id },
            { name: name },
            { image: image }
        );
        if (data) {
            return res.json(data);
        }
    } catch (error) {
        console.log(error);
    }
}
export async function deleteEvent(req, res) {
    try {
        const { id } = req.query;
        const response = await Event.findOneAndDelete({ _id: _id });
        if (response) {
            return res.json({ success: "Event deleted!" });
        } else {
            return res.status(404).json({ error: "Event not found!" });
        }
    } catch (error) {
        console.log(error);
    }
}