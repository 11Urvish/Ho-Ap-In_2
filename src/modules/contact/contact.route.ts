import { Router } from 'express';
import { NxService } from '../../shared/nx-library/nx-service';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

const router: Router = Router();
const nx = new NxService();
const ds = new ContactService(nx);
const ctrl = new ContactController(ds);


router.post('/delete', ctrl.delete);
router.get('/findById',ctrl.findById,);
router.post('/findAll', ctrl.findAll);
router.post('/create',ctrl.create );
router.post('/update', ctrl.update);

export default router;
