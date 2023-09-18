import { Router } from 'express';
// import * as passport from 'passport';
//const passport = require('passport');

import contactRoute from '../modules/contact/contact.route';
import loginRoute from '../modules/login/auth.route';
// const passportJwt = passport.authenticate('jwt', { session: false });

//const passportJwt = passport.authenticate('jwt', { session: false });

const router: Router = Router();

// router.use('/country', countryRoute);
router.use('/contact', contactRoute);
router.use('/auth', loginRoute);

export default router;
