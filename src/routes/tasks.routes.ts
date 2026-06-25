import { Router } from 'express'
import { tasksController } from '../controllers/tasks.controller'
import { requiredAuth } from '../middleware/requiredAuth'

const router = Router()

router.use(requiredAuth)

router.route('/')
    .get(tasksController.getAll)
    .post(tasksController.create)

router.route('/:id')
    .get(tasksController.getOne)
    .patch(tasksController.update)
    .delete(tasksController.delete)

export default router