/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { NxService } from '../../shared/nx-library/nx-service';
import { LoginController } from './auth.controller';
import { LoginService } from './auth.service';

import passport from "passport";

const passportJwt = passport.authenticate('jwt', { session: false });

const router: Router = Router();
const nx = new NxService();
const ds = new LoginService(nx);
const ctrl = new LoginController(ds);

router.post('/create', ctrl.create);
router.post('/findAll', ctrl.findAll);
router.post('/login', ctrl.login);

export default router;
