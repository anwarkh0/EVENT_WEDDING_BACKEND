import Event from "../models/Event.js";
import fs from "fs"
import Package from "../models/Package.js";
import Service from "../models/Service.js";
export async function createEvent(req, res) {
    try {
        const { name, description, packageId, serviceId } = req.body;
        const image = req.file.path;
        const data = await Event.create({ name, image, description, packageId, serviceId });
        if (data) {
            res.json(data);
        }
    } catch (error) {
        console.log(error);
    }
}

// export async function getOneEvent(req, res) {
//     try {
//         const { id } = req.params;
//         const event = await Event.findById(id)
//             .populate('packageId')
//             .populate('serviceId')

//         const packages = await Package.find({ _id: { $in: event.packageId } }).populate('servicesId');

//         if (!event) {
//             return res.status(404).json({ error: "Event not found!" });
//         }

//         const events = [event , ...packages]
//         // Return the event data 
//         return res.json({ events });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ error: "Internal Server Error" , message : error.message });
//     }
// }

export async function getOneEvent(req, res) {
    try {
        const { id } = req.params;
        const event = await Event.findById(id)
            .populate({
                path: 'packageId',
                populate: {
                    path: 'servicesId',
                    model: 'Service'
                }
            })
            .populate('serviceId');

        if (!event) {
            return res.status(404).json({ error: "Event not found!" });
        }

        return res.json({ event });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}
// export async function getOneEvent(req, res) {
//     try {
//         const { id } = req.params;
//         const event = await Event.findById(id)
//             .populate({
//                 path: 'packageId',
//                 populate: {
//                     path: 'servicesId', // Specify the path to populate
//                     model: 'Service' // Model to use for population
//                 }
//             })
//             .populate('serviceId'); // Populate the serviceId field
//         if (!event) {
//             return res.status(404).json({ error: "Event not found!" });
//         }
//         // Return the event data 
//         return res.json({ event });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }



export async function getEvents(req, res) {
    try {
        const events = await Event.find().populate(['packageId', 'serviceId']);
        if (events) {
            res.json(events);
        }
    } catch (error) {
        console.log(error);
    }
}
// Function to delete an event along with its image file
export async function deleteEvent(req, res) {
    try {
        const { id } = req.params;
        // Find the event by id
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found!" });
        }
        // Delete the image file associated with the event
        fs.unlinkSync(event.image);
        // Delete the event from the database
        await Event.findByIdAndDelete(id);
        return res.json({ success: "Event deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        let image = "";
        // Check if a new image file is uploaded
        if (req.file) {
            image = req.file.path;
        }
        // Find the event by id
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found!" });
        }
        // Update the event name
        event.name = name;
        event.description = description;
        event.packageId = packageId;
        event.serviceId = serviceId;
        // Check if a new image file is uploaded
        if (image && event.image !== image) {
            // Check if the old image file exists
            if (fs.existsSync(event.image)) {
                // Delete the old image file associated with the event
                fs.unlinkSync(event.image);
            }
            // Update the image file path
            event.image = image;
        }
        // Save the updated event
        await event.save();
        return res.json(event);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

