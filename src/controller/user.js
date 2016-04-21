"use strict";

var model = require("../model");


exports.getAll = function (req, res) {
    model.User.findAll().then(function (user) {
        res.status(200).json(user);
    });
};

exports.create = function (req, res) {
    var data = req.body;
    model.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title,
        OrganizationId: data.OrganizationId
    }).then(function (user) {
        res.status(200).json(user);

    }).catch(function (error) {
        res.status(500).send(error);
    });
};


exports.update = function (req, res) {
    var data = req.body;
    model.User.findOne({where: {id: req.params.id}}).then(function (user) {
        if (!user) {
            res.status(404).json({error: "User not found"});
        } else {
            if (data.firstName) {
                user.firstName = data.firstName;
            }
            if (data.lastName) {
                user.lastName = data.lastName;
            }
            if (data.title) {
                user.title = data.title;
            }
            if(data.OrganizationId) {
                user.OrganizationId= data.OrganizationId;
            }

            user.save().then(function (user) {
                res.status(200).json(user);
            })
        }
    });
};

exports.delete = function (req, res) {
    model.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        if (!user) {
            res.status(404).json({error: "User not found"});
        }
        res.status(200).json('User with ID: ' + req.params.id + ' was deleted');
    });
};

exports.getUserOrg = function (req, res) {
    // console.log(req.params);
    model.User.findAll({
        where: {
            OrganizationId: req.params.id
        }
    }).then(function (users) {
        if (!users) {
            res.status(404).json({error: "Users not found"});
        }
        res.status(200).json(users);
    });
};

exports.getByTitle = function (req, res) {
    req.params.id = req.params.id || '';
    req.params.query = req.params.query || '';
    model.User.findAll({
        where: {
            OrganizationId: req.params.id,
            title: req.params.query
        }
    }).then(function (users) {
        if (!users) {
            res.status(404).json({error:'Users with this tittle or organization id not found'});
        }
        res.status(200).json(users);
    });
};