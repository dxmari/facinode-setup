exports.path = require('path')
exports.fs = require('fs')
exports.dotenv = require('dotenv-safe')
exports.pbkdf2 = require('pbkdf2');
exports.Cryptr = require('cryptr');

exports.ENV_CONSTANTS = require('./src/generics/env_constants')
exports.constants = require('./src/generics/constants')

exports.mongoose = require('mongoose')
exports.Schema = require('mongoose').Schema
exports.db_connection = require('./src/config/connect-db')

exports.http = require('http')
exports.express = require('express')()
exports.router = require('express').Router()

exports.auth_controller = require('./src/controllers/auth/auth.controller')

exports.auth_routes = require('./src/routers/auth/auth.route')

exports.AppConfig = require('./src/config/app-config')
exports.app = require('./index')


exports.User = require('./src/models/auth/user');
