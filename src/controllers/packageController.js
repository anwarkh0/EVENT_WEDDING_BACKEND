import Package from "../models/Package.js";
import fs from 'fs';
import path from 'path';

export async function createPackage(req, res) {
    try {
        const { price, maxPeopole, isCustom, servicesId, description } = req.body;
        const image = req.file.path;
        const data = await Package.create({ image, price, maxPeopole, isCustom, servicesId, description });
        if (data) {
            res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}



export async function getOnePackage(req, res) {
    try {
        const { id } = req.params;

        // Find the Package by its ID
        const onePackage = await Package.findById(id).populate(['servicesId']);

        // Check if the Package exists
        if (!onePackage) {
            return res.status(404).json({ error: "Package not found!" });
        }

        // Return the Package data 
        return res.json(onePackage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getPackages(req, res) {
    try {
        const packages = await Package.find().populate(['servicesId']);
        if (packages) {
            res.json(packages);
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to delete an package along with its image file
export async function deletePackage(req, res) {
    try {
        const { id } = req.params;
        // Find the Package by id
        const onePackege = await Package.findById(id);
        if (!onePackege) {
            return res.status(404).json({ error: "Package not found!" });
        }
        // Delete the image file associated with the Package
        fs.unlinkSync(onePackege.image);
        // Delete the Package from the database
        await Package.findByIdAndDelete(id);
        return res.json({ success: "Package deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function updatePackage(req, res) {
    try {
        const { id } = req.params;
        const {  price, maxPeopole, isCustom, servicesId, description } = req.body;
        let image = "";

        // Check if a new image file is uploaded
        if (req.file) {
            image = req.file.path;
        }

        // Find the package by id
        const onePackage = await Package.findById(id);
        if (!onePackage) {
            return res.status(404).json({ error: "package not found!" });
        }

        // Update the package name
        onePackage.price = price;
        onePackage.maxPeopole = maxPeopole;
        onePackage.isCustom = isCustom;
        onePackage.servicesId = servicesId;
        onePackage.description = description;

        // Check if a new image file is uploaded
        if (image && onePackage.image !== image) {
            // Check if the old image file exists
            if (fs.existsSync(onePackage.image)) {
                // Delete the old image file associated with the package
                fs.unlinkSync(onePackage.image);
            }
            // Update the image file path
            onePackage.image = image;
        }

        // Save the updated package
        await onePackage.save();

        return res.json(onePackage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

