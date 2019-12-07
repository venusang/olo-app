import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { get, computed } from '@ember/object';

export default Component.extend({
  pizzas: alias('model'),
  pizzaOrders: computed('pizzas', function(){
    let pizzas = get(this, 'pizzas');

    let allPizzas=[];
    pizzas.forEach((pizza)=>{
      allPizzas.push(pizza.toppings.toString());
    });

    return allPizzas;
  }),
  pizzaOptions: computed('pizzas', function(){
    let pizzas = get(this, 'pizzas');

    let allPizzas=[];
    pizzas.forEach((pizza)=>{
      allPizzas.push(pizza.toppings.toString());
    });
    let sortedToppings = allPizzas.sort();
    let pizzaOptions =[...new Set(sortedToppings)];

    return pizzaOptions.sort();
  }),
  pizzaOrderTally: computed('pizzas', function(){
    let pizzaOrders = get(this, 'pizzaOrders');

    let counts={};

    for(let i = 0, len = pizzaOrders.length; i < len; i++){
      let word = pizzaOrders[i];

      if(counts[word] === undefined){
         counts[word] = 1;
      } else {
         counts[word] = counts[word] + 1;
      }
     }
     let orders=[];
     for (let [key, value] of Object.entries(counts)) {
        let pizza = {
          'order': key,
          'count': value
        };
        orders.push(pizza);
      }
      orders = orders.sortBy('count');
      return orders.slice(orders.length-20, orders.length).reverse();
  })
});
