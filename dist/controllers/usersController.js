"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const firebase_1 = require("../config/firebase");
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role } = req.body;
    try {
        const userRef = firebase_1.db.collection('users').doc();
        yield userRef.set({ name, role });
        res.status(201).send('User created');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.createUser = createUser;
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersSnapshot = yield firebase_1.db.collection('users').get();
        const users = usersSnapshot.docs.map(doc => doc.data());
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getUsers = getUsers;
// Update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, role } = req.body;
    try {
        const userRef = firebase_1.db.collection('users').doc(id);
        yield userRef.update({ name, role });
        res.status(200).send('User updated');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield firebase_1.db.collection('users').doc(id).delete();
        res.status(200).send('User deleted');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deleteUser = deleteUser;
