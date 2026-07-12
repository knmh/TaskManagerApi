import { Router } from 'express'
import { userController } from '../controllers/userController'
import { requiredAuth } from '../middleware/requiredAuth'
import { requiredRole } from '../middleware/requiredRole'

const router = Router()

// مسیرهای عمومی (بدون احراز هویت)
router.post('/', userController.create)

// مسیرهای محافظت شده (فقط کاربران لاگین شده)
router.get('/', requiredAuth, userController.getAll)

// مسیرهای admin فقط
router.get('/admin-only', requiredAuth, requiredRole('admin'), (req, res) => {
    res.json({ message: 'فقط ادمین ها می‌توانند این را ببینند' })
})

// مسیرهای moderator یا admin
router.get('/moderator-area', requiredAuth, requiredRole('moderator', 'admin'), (req, res) => {
    res.json({ message: 'فقط مودریتورها و ادمین ها' })
})

router.route('/:id')
    .get(requiredAuth, userController.getOne)
    .patch(requiredAuth, userController.update)
    .delete(requiredAuth, requiredRole('admin'), userController.delete)

export default router