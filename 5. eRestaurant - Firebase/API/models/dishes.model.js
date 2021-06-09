class DishesModel {

    createNewDish(postDish) {
        return new Promise((resolve, reject) => {
            process.firebase
                .firestore()
                .collection("dishes")
                .add(postDish)
                .then((data) => {
                    resolve(data);
                }) 
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getAllDishes() {
        return new Promise((resolve, reject) => {
            process.firebase
                .firestore()
                .collection("dishes")
                .get()
                .then((dishArray) => {
                    let data = [];
                    dishArray.forEach((document) => {
                        data.push({
                            id: document.id,
                            ...document.data(),
                        });
                    });
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                  });
        });
    }

    getDishById(id) {
        return new Promise((resolve, reject) => {
          process.firebase
            .firestore()
            .collection("dishes")
            .doc(id)
            .get()
            .then((document) => {
              const dish = {
                id: document.id,
                ...document.data(),
              };
              resolve(dish);
            })
            .catch((error) => {
              reject(error);
            });
        });
    }

    deleteDish(id) {
        return new Promise((resolve, reject) => {
          process.firebase
            .firestore()
            .collection("dishes")
            .doc(id)
            .delete()
            .then((payload) => {
              resolve(payload);
            })
            .catch((error) => {
              reject(error);
            });
        });
    }

    
    updateDish(dishId, dishData) {
        const dish = {
            name: dishData.name,
            price: dishData.price
        };

        return new Promise((resolve, reject) => {
            process.firebase
                .firestore()
                .collection("dishes")
                .doc(dishId)
                .update(dish)
                .then(() => {
                resolve({ message: "Dish successfully saved!" });
                })
                .catch((error) => {
                reject(error);
                });
        });
    }

}

module.exports = DishesModel;