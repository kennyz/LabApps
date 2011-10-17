// global config options
function apply(app, express) {
  app.configure(function(){
    app.use(express.static(__dirname + '/public'));
  });
  require('./../config/environment/development.js').apply(app, express);
  require('./../config/environment/production.js').apply(app, express);
};
exports.apply = apply;
