const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next)
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })




//project delete
const deleteItem = async (itemId, model) => {
  const item = await model.findByPk(itemId)
  await item.destroy()
}


module.exports = { asyncHandler, csrfProtection, deleteItem }
