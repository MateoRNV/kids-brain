// Initializes the `attachment` service on path `/uploads`
const _pick = require('lodash/pick');
const fs = require('fs');
const { Uploads } = require('./uploads.class');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');
const UPLOAD_DIR = 'public/uploads/';
const UPLOAD_BASE_URL = 'http://localhost:3031/uploads/';
var mime = require('mime-types');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const path = `${UPLOAD_DIR}`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path); // where the files are being stored
  },
  filename: (_req, file, cb) => { 
    const fileExtention = mime.extension(file.mimetype);
    cb(null, `${Date.now()}-${file.originalname.replace(" ","-")}.${fileExtention}`) 
  }
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1e8 //  The max file size in bytes, here it's 10MB
  }
});

function getBody (req) {
  const file = req.file;
  const url = `${UPLOAD_BASE_URL}${file.filename}`;
  return Object.assign(
    {
      url
    },
    _pick(file, 'originalname','mimetype', 'size', 'filename')
  );
}

function uploadMiddleware (req, _res, next) {
  const { method } = req;
  if (method === 'POST' || method === 'PATCH') {
    req.feathers.file = req.file;
    req.body = getBody(req);
  }
  next();
}
module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use(
    '/uploads',
    upload.single('attachment'),
    uploadMiddleware,
    new Uploads(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
