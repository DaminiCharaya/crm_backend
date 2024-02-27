export default app => {
    const role = require("../controllers/roles").default
  
    var router = require("express").Router()
  
    router.get('/', role.getRoles)
    router.post('/', role.createRole)
    router.put('/:id', role.updateRole)
    router.delete('/:id', role.deleteRole)
    app.use("/roles", router)

  };