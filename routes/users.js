export default app => {
    const user = require("../controllers/users").default
  
    var router = require("express").Router()
  
    router.get('/', user.getUsers)
    router.get('/:id', user.getUserById)
    router.post('/', user.createUser)
    router.put('/:id', user.updateUser)
    router.delete('/:id', user.deleteUser)
    app.use("/users", router)

  };