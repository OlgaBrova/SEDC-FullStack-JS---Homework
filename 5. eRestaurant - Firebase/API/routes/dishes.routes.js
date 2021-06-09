const router = require('express').Router();
const DishesController = require('../controllers/dishes.controller');
const dishesController = new DishesController();

router.post('/new-dish', (req, res) => {
    const newDish = req.body;

    dishesController.addNewDish(newDish)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
        res.status(400).json(error);
        });   
});

router.get('/:id?', (req, res) => {
    if(req.params && req.params.id) {
        const id = req.params.id;

        dishesController.fetchDishById(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    } else {
        dishesController.fetchAllDishes()
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
});

router.delete('/:id', (req, res) => {
    if (req.params && req.params.id) {
        const id = req.params.id;

        dishesController.deleteDish(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                res.status(400).json(error);
              });
    }
});

router.put('/update/:id', (req, res) => {
    if (req.params && req.params.id) {
        dishesController.updateDish(req.params.id, req.body)
            .then((data) => {
                res.status(200).json(data);
              })
              .catch((error) => {
                res.status(400).json(error);
              });
    }
});


module.exports = router;