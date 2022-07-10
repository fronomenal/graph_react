const mg = require("mongoose");

const ClientSchema = new mg.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
});

module.exports = mg.model("Client", ClientSchema);