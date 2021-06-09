const DishesModel = require('../models/dishes.model');
const dishesModel = new DishesModel();

class DishesController {

    addNewDish(dish) {
        return dishesModel.createNewDish(dish);
    }

    fetchAllDishes() {
        return dishesModel.getAllDishes();
    }

    fetchDishById(id) {
        return dishesModel.getDishById(id);
    }

    deleteDish(id) {
        return dishesModel.deleteDish(id);
    }

    updateDish(id, body) {
        return dishesModel.updateDish(id, body);
    }
    
}

module.exports = DishesController;