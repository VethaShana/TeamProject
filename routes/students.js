import express from 'express'
import auth from '../middleware/auth.js'
import * as StudentsController from '../controllers/students.js'
import ROLES from '../utils/roles.js'
import validate from '../middleware/validate.js'
import studentValidationSchema from '../validation/studentValidation.js'
const router = express.Router()

router.get(
	'/',
	auth(ROLES.ADMIN, ROLES.STUDENT),
	StudentsController.getStudents
)
router.get(
	'/:id/installments',
	auth(ROLES.ADMIN),
	StudentsController.getInstallments
)
router.post(
	'/',
	auth(ROLES.STUDENT),
	validate({ schema: studentValidationSchema, path: 'body' }),
	StudentsController.createStudent
)
router.delete('/:id', auth(ROLES.ADMIN), StudentsController.deleteStudent)
router.put('/:id', auth(ROLES.ADMIN), StudentsController.updateStudent)
router.post('/pdf', auth(ROLES.ADMIN), StudentsController.PDFStudent)

export default router
