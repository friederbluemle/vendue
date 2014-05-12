/**
 * ProductController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProductController)
   */
  _config: {},

  'new': function(req, res) {
    res.view();
  },

  create: function (req, res, next) {
    Product.create(req.params.all(), function productCreated(err, product) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        return res.redirect('/product/new');
      }

      res.redirect('/product/show/' + product.id);
    });
  },

  // render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next) {
    Product.findOne(req.param('id'), function foundProduct(err, product) {
      if (err) return next(err);
      if (!product) return next();
      res.view({
        product: product
      });
    });
  },

  index: function(req, res, next) {
    // Get an array of all products in the Product collection(e.g. table)
    Product.find(function foundProducts(err, products) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        products: products
      });
    });
  },

  // render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next) {
    // Find the product from the id passed in via params
    Product.findOne(req.param('id'), function foundProduct(err, product) {
      if (err) return next(err);
      if (!product) return next('Product doesn\'t exist.');
      res.view({
        product: product
      });
    });
  },

  // process the info from edit view
  update: function(req, res, next) {
    Product.update(req.param('id'), req.params.all(), function productUpdated(err) {
      if (err) {
        return res.redirect('/product/edit/' + req.param('id'));
      }
      res.redirect('/product/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {
    Product.findOne(req.param('id'), function foundProduct(err, product) {
      if (err) return next(err);
      if (!product) return next('Product doesn\'t exist.');

      Product.destroy(req.param('id'), function productDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/product');
    });
  }

};
