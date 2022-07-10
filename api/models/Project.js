const mg = require("mongoose");

const ProjectSchema = new mg.Schema({
    name: {
        type: String,
        required: true
        
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutabe: true,
        default: ()=> Date.now()
    },
    completedAt: {
        type: Date,
        default: new Date(0)
    },
    status: {
        type: String,
        enum: ["Not Started","Started","Completed"],
        default: "Not Started"
    },
    clientId: {
        type: mg.Schema.Types.ObjectId,
        ref: "Client"
    }
});

ProjectSchema.methods.complete = function(){
    this.status = "Completed";
    this.completedAt = Date.now();
};

ProjectSchema.methods.start = function(){
    this.status = "Started";
};

module.exports = mg.model("Project", ProjectSchema);