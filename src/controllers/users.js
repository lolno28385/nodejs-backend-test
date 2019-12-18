import bcrypt from 'bcrypt';
import User from '../models/users';


export default ({asyncHandler, logger, errors}) => {
	const createNewUser = async(req, res, next) => { //eslint-disable-line
		const {
			firstName,
			lastName,
			email,
			password
		} = req.body;

		logger.info(`1 - start - signup request email:${ email }`);

		// if already registered, do not proceed
		const alreadyRegistered = await User.findOne({email});
		if(alreadyRegistered){
			logger.info(`1.1 - already registered - signup request email: ${email}`);
			throw errors.alreadyRegistered({body: req.body, comment: 'already registered', alreadyRegistered});
		}

		//hash password
		bcrypt.hash(password, 10, async (err, passwordHash) => {
			logger.info(` 2 - hashing password - signup request email:${email}`);
			if(err) throw errors.errorhashing({comment: 'failed to hash password', err});
            
			//create user
			const newUser = new User({
				firstName,
				lastName,
				email,
				passwordHash,
			});
			logger.info(` 3 - creating user - signup request email:${email}`);
			await newUser.save();
			res.status(200).json(newUser);
		});
	};
   
	const updateUser = async(req, res) => {
		const {
			firstName,
			lastName,
			email,
			password
		} = req.body;

		logger.info(`update user call  - started -  ${email}`);
    
		const passwordHash = (password) ? await bcrypt.hash(password, 10) : undefined;
		
		let update = Object.assign({}, 
			firstName && {firstName},
			lastName && {lastName},
			passwordHash && {passwordHash},
			email && {email}
		);

		const newUser = await User.findOneAndUpdate({email}, {...update}, {new: true});
        
		if (!newUser) {
			logger.info(`update user call  - user not found -  ${email}`);
			throw errors.userNotFound();
		}

		logger.info(`update user call  - finished -  ${email}`);
        
		res.json({
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email
		});
	};

	return {
		create: asyncHandler(createNewUser), // handles signups
		update: asyncHandler(updateUser), // updates a user given its email
	};
};
