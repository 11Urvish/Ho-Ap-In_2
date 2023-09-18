import { Router } from 'express';
import { NxService } from '../../shared/nx-library/nx-service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

const router: Router = Router();
const nx = new NxService();
const ds = new CustomerService(nx);
const ctrl = new CustomerController(ds);

router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);

export default router;
