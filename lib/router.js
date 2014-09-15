Router.configure({
  layoutTemplate: 'layout'
});


ProductsListController = RouteController.extend({
  template: 'productsList',
  increment: 8,
  perRowCount: 4, 
  limit: function() { 
    return parseInt(this.params.productsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  onBeforeAction: function() {
    this.productsSub = Meteor.subscribe('products', this.findOptions());
  },
  products: function() {
    return Products.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.products().count() === this.limit();
    return {
      products: this.products(),
      ready: this.productsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

/*
NewProductsListController = ProductsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newProducts.path({productsLimit: this.limit() + this.increment})
  }
});
*/
/*
BestProductsListController = ProductsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestProducts.path({productsLimit: this.limit() + this.increment})
  }
});
*/


Router.map(function() {
  this.route('home', {
    path: '/',
    controller: ProductsListController
  });
  /*
  this.route('newPosts', {
    path: '/new/:postsLimit?'//,
    controller: NewPostsListController
  });
  
  this.route('bestPosts', {
    path: '/best/:postsLimit?',
    controller: BestPostsListController
  });
  
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });
  
  this.route('postSubmit', {
    path: '/submit',
    progress: {enabled: false}
  });

  */
});

/*
var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
}
*/
//Router.onBeforeAction('loading');
//Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
//Router.onBeforeAction(function() { clearErrors() });