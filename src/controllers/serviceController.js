import Service from "../models/Service.js";
import fs from 'fs';
////////////////




export async function createService(req, res) {
    try {
        const { name, description, price } = req.body;
        const image = req.file.path;
        const data = await Service.create({ image, name, description, price });
        if (data) {
            res.json(data);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export async function getOneService(req, res) {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ error: "service not found!" });
        }

        return res.json(service);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getServices(req, res) {
    try {
        const services = await Service.find()
        if (services) {
            res.json(services);
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteService(req, res) {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ error: "service not found!" });
        }
        fs.unlinkSync(service.image);
        await Service.findByIdAndDelete(id);
        return res.json({ success: "service deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateService(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, } = req.body;
        const image = "";

        // Check if a new image file is uploaded
        if (req.file) {
            image = req.file.path;
        }

        // Find the service by id
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ error: "service not found!" });
        }

        // Update the service name
        service.name = name;
        service.description = description;
        service.price = price;

        // Check if a new image file is uploaded
        if (image && service.image !== image) {
            // Check if the old image file exists
            if (fs.existsSync(service.image)) {
                // Delete the old image file associated with the Service
                fs.unlinkSync(service.image);
            }
            // Update the image file path
            service.image = image;
        }

        // Save the updated Service
        await service.save();

        return res.json(service);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}