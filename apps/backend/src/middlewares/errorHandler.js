// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  })
}
