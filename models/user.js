const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
})

userSchema.pre(
    'save',
    async function(next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

module.exports = mongoose.model('User', userSchema)