import Booking from "../models/Booking.js";

export async function createBooking(req, res) {
    try {
        const { fullName, phoneNumber, email, budget, bookingDate, packagesId, servicesId } = req.body;
        const data = await Booking.create({ fullName, phoneNumber, email, budget, bookingDate, packagesId, servicesId });
        if (data) {
            res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export async function getOneBooking(req, res) {
    try {
        const { id } = req.params;

        const Booking = await Booking.findById(id).populate(['servicesId', 'packagesId']);

        if (!BookingBooking) {
            return res.status(404).json({ error: "Booking not found!" });
        }

        return res.json(Booking);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getAllbook(req, res) {
    try {
        const allBook = await Booking.find().populate(['servicesId', 'packagesId']);
        if (allBook) {
            res.status(200).json(allBook);
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteBooking(req, res) {
    try {
        const { id } = req.params;
        const book = await Booking.findById(id);
        if (!book) {
            return res.status(404).json({ error: "book not found!" });
        }
        await Booking.findByIdAndDelete(id);
        return res.status(200).json({ success: "book deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateBooking(req, res) {
    try {
        const { id } = req.params;
        const { fullName, phoneNumber, email, budget, bookingDate, packagesId, servicesId } = req.body;



        const book = await Booking.findById(id);
        if (!book) {
            return res.status(200).status(404).json({ error: "book not found!" });
        }

        book.fullName = fullName;
        book.phoneNumber = phoneNumber;
        book.email = email;
        book.budget = budget;
        book.bookingDate = bookingDate;
        book.packagesId = packagesId;
        book.servicesId = servicesId;


        await book.save();

        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

