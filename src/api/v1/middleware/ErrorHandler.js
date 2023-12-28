const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    console.log();
    res.status(res.statusCode !== 200 ? res.statusCode : 500).json({ error: err.message ? err.message : 'Internal Server Error' });
}

module.exports = errorHandler