function apply(app, express) {
  
  // todo: build an mvc setup so that we can redirect routes to controllers

  app.get('/', function(request, response) {
    response.render('index.jade', { layout: false }); 
  });

  // simple catch all, right now just look for a template with the name
  app.get('/:template', function(request, response) {
    response.render(request.params.template + '.jade', { layout: false });
  });

  /*
  app.get('/:controller/:action/:id', function(request, response) {
    // find some way to dispatch to a controller
  });
  */

};
exports.apply = apply;
