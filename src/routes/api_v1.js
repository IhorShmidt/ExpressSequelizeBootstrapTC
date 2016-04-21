"use strict";
var router = require('express').Router();
var path = require('path');

var organizationController = require('../controller/organization.js');
var userController = require('../controller/user.js');

// -------------------------------------------------------
// ORGANIZATION
// -------------------------------------------------------
router.get('/organization',  organizationController.getAll);
router.post('/organization',  organizationController.create);
router.put('/organization/:id',  organizationController.update);
router.delete('/organization/:id',  organizationController.delete);

// -------------------------------------------------------
// USER
// -------------------------------------------------------
router.post('/user',  userController.create);
router.get('/users', userController.getAll);
router.put('/user/:id', userController.update); // 1
router.delete('/user/:id', userController.delete); // 2

router.get('orguser/:id', userController.getUserOrg); // 3

router.get('users/org/:id', userController.getByTitle); // 3.a

// -------------------------------------------------------
// Homework
// -------------------------------------------------------

// 1. update user API

// 2. delete user API

// 3. get all user by organization id

// 3a. get list of user by organization id and filter by title specified in query string


module.exports = router;
