const bcrypt = require('bcrypt');
import User from '../models/users';
import { BasicStrategy } from 'passport-http';


export default function createAuthenticators ({ logger, passport}){
	function basicAuthenticator(username, password, done) {
		User.findOne({ email: username }, function (err, user) {
			if (err) { 
				logger.log(`error authenticating user ${username}`, { data: err });
				return done(err);
			}

			if (!user) { 
				return done(null, false);
			}

			if (!bcrypt.compare(password, user.passwordHash)) { 
				logger.log(`not authenticating user ${username} - wrong password`, { data: err });
				return done(null, false); 
			}

			return done(null, user);
		});
	}
  
	passport.use(new BasicStrategy(basicAuthenticator));
}
  
