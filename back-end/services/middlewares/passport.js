import GoogleStrategy from 'passport-google-oauth20';
import "dotenv/config";
import User from "../models/user.model.js";
import { generateJWT } from './auth.js';


const options = {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: process.env.G_CB,
};


const googleStrategy = new GoogleStrategy(options, async (accessToken, refreshToken, profile, done) => {
    try {

        const { email, given_name, family_name, sub, picture, birthday } = profile._json;

        const user = await User.findOne({ email });

        if (user) {
            const accToken = await generateJWT({
                _id: user._id,
                isHost: user.isHost
            })

            done(null, { accToken, email, given_name, family_name, picture, birthday, sub, _id: user._id, isHost: user.isHost })
        } else {

            const newUser = new User({
                name: given_name,
                surname: family_name,
                email: email,
                username: email,
                birthday: birthday,
                avatar: picture,
                password: sub,
                isHost: false,
                googleId: sub
            })

            await newUser.save();

            const accToken = await generateJWT({
                email: newUser.email
            });

            done(null, { accToken, email, given_name, family_name, picture, birthday, sub, _id: newUser._id })
        }

    } catch (error) {
        done(error)
    }

});

export default googleStrategy;