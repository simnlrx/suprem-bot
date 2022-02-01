const {model, Schema} = require("mongoose");

module.exports = model("Tickets", new Schema({
    GuildID: String,
    MemberID: String,
    ChannelID: String,
    Closed: Boolean,
    Locked: Boolean,
    Type: String,
}))