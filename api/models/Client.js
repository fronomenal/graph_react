const mg = require("mongoose");

const ClientSchema = new mg.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

module.exports = mg.model("Client", ClientSchema);