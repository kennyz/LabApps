// development environment
function apply(app, express) {
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });
};
exports.apply = apply;
