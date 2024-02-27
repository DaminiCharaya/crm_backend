export default app => {
    const activity = require("../controllers/activities").default
  
    var router = require("express").Router()

    router.get('/', activity.getActivities)
    router.get('/:id', activity.getActivityById)
    router.post('/', activity.createActivity)
    router.put('/:id', activity.updateActivity)
    router.delete('/:id', activity.deleteActivity)
    app.use("/activity", router)

  };