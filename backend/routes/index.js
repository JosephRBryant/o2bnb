// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/api/csrf/restore', function(req, res) {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

module.exports = router;
