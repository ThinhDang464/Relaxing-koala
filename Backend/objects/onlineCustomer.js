const mongoose = require('mongoose');
const onlineCustomer = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    deliveryAddress: { type: String},
    reservations: [
        {
          date: { type: Date, required: true },
          time: { type: String, required: true },
          numberOfPeople: { type: Number, required: true },
          specialComments: { type: String }
        }
      ],
  });
module.exports = onlineCustomer;