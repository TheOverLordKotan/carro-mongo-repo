const Carro = require('./Carro.modelo.js');

//Crear nuevo produto
exports.create = (req, res) => {
    //Se valida la peticion tipo POST
    if(!req.body) {
        
        return res.status(400).send({
            message: "El contenido del Carro no puede estar vacío"
        });
    }

    //Se crea la instancia de un Carro y a cada atributo se le asigna un valor
    const Carro = new Carro({
        titulo: req.body.titulo || "Titulo por defecto", 
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        empresa: req.body.empresa
    });

    //Almacenar un documento en la base de datos
    Carro.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al momento de haber creado un Carro."
        });
    });
};

// Traer todos los carros.
exports.findAll = (req, res) => {
    Carro.find()
    .then(carros => {
        res.send(carros);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Se genera un error al momento de recuperar los carros en la base de datos."
        });
    });
};

// Encuentre un solo Carro a través del id del Carro(id)
exports.findOne = (req, res) => {
    Carro.findById(req.params.idCarro)
    .then(Carro => {
        if(!Carro) {
            return res.status(404).send({
                message: "El Carro con el id " + req.params.idCarro + " no se encuentra en la base de datos"
            });            
        }
        res.send(Carro);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "El Carro con el id " + req.params.idCarro + " no se encuentra en la base de datos"
            });                
        }
        return res.status(500).send({
            message: "Se genera un error al momento de intentar consultar el Carro con id " + req.params.idCarro
        });
    });
};

// Actualizar un Carro
exports.update = (req, res) => {
    // Validar Carro
    if(!req.body) {
        return res.status(400).send({
            message: "El contenido del Carro a modificar no puede estar vacio"
        });
    }

    // Encontrar y luego actualizar un Carro con la estructura enviada del Carro en el body de la peticion
    Carro.findByIdAndUpdate(req.params.idCarro, {
        titulo: req.body.titulo || "Titulo Carro por defecto", 
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        empresa: req.body.empresa
    }, {new: true})
    .then(Carro => {
        if(!Carro) {
            return res.status(404).send({
                message: "El Carro con el " + req.params.idCarro + " no fue encontrado en la base de datos"
            });
        }
        res.send(Carro);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "El Carro con el " + req.params.idCarro + " no fue encontrado en la base de datos"
            });                
        }
        return res.status(500).send({
            message: "Se genera un error al momento de intentar actualizar el Carro con id " + req.params.idCarro
        });
    });
};

// Eliminar un Carro especifico a partir del id del Carro
exports.delete = (req, res) => {
    Carro.findByIdAndRemove(req.params.idCarro)
    .then(Carro => {
        if(!Carro) {
            return res.status(404).send({
                message: "El Carro con el " + req.params.idCarro + " no fue encontrado en la base de datos"
            });
        }
        res.send({message: "El Carro con id " + req.params.idCarro + " fue eliminado satisfactoriamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "El Carro con id " + req.params.idCarro + " no fue encontrado!"
            });                
        }
        return res.status(500).send({
            message: "No se puede eliminar el Carro con id " + req.params.idCarro
        });
    });
};