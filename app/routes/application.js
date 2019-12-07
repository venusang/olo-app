import Route from '@ember/routing/route';

export default Route.extend({
  model() {
   return fetch('pizzas.json')
    .then(function(res) {
        return res.json()
    });
  }
});
