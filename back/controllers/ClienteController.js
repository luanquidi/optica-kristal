'use strict'

// Se declaran variables de controlador.
const cliente = require("../models/cliente");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');


// ========================================================== MÉTODOS CONTROLADOR ====================================================

const registroCliente = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    let listadoClientes = [];

    // Se valida existencia del usuario.
    listadoClientes = await cliente.find({ email: data.email });

    if (listadoClientes.length === 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {
                    // Se registra el cliente
                    data.password = hash;
                    const reg = await cliente.create(data);
                    res.status(200).send({
                        datos: true,
                        resultadoExitoso: true,
                        mensaje: 'Operación existosa!'
                    });
                } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'Error server.' })
            });
        } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'No hay una contraseña.' })


    } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'El correo ya existe en la base de datos.' })
}

const loginCliente = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    let listadoClientes = [];

    // Se valida existencia del usuario.
    listadoClientes = await cliente.find({ email: data.email });

    // Se valida que exista el correo.
    if (listadoClientes.length === 0) res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'El correo no existe en la base de datos.' });
    else {
        // Se declara el cliente seleccionado.
        const usuario = listadoClientes[0];

        // Se comparan las contraseñas.
        bcrypt.compare(data.password, usuario.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    datos: usuario,
                    token: jwt.createToken(usuario),
                    resultadoExitoso: true,
                    mensaje: 'Operación existosa!'
                });
            } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'Credenciales de acceso no coinciden.' });
        });
    }
}

const listarClientes = async (req, res) => {

    if (req.user) {
        if (req.user.rol === 'Administrador' || req.user.rol === 'Auxiliar') {
            // Se declaran variables
            let listadoClientes = [];
            // Se valida existencia del usuario.
            listadoClientes = await cliente.find();

            res.status(200).send({
                datos: listadoClientes,
                resultadoExitoso: true,
                mensaje: 'Operación existosa!'
            });

        } else res.status(500).send({ datos: null, resultadoExitoso: false, mensaje: 'No access.' });
    } else res.status(500).send({ datos: null, resultadoExitoso: false, mensaje: 'No access.' });

}





// Se exportan todas las funcionalidades.
module.exports = {
    registroCliente,
    loginCliente,
    listarClientes

}