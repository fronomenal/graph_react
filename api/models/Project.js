const mg = require("mongoose");

const ProjectSchema = new mg.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Not Started","Started","Completed"]
    },
    clientId: {
        type: mg.Schema.Types.ObjectId,
        ref: "Client"
    }
});

module.exports = mg.model("Project", ProjectSchema);