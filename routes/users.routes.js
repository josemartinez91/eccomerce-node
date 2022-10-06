const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
	checkToken,
	getUserOrderById,
	getUserOrders,
	getUserProducts
} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares');
const {createUserValidations} = require('../middlewares/validators.middlewares')

const usersRouter = express.Router();

usersRouter.post('/', createUserValidations, createUser);

usersRouter.post('/login', login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

usersRouter.get('/me', getUserProducts);

usersRouter.get('/orders', getUserOrders);

usersRouter.get('/orders/:id', getUserOrderById);

usersRouter.get('/check-token', checkToken);

module.exports = { usersRouter };
