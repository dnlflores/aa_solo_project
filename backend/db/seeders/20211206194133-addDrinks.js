'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Drinks', [
      {id: 1, name: 'Lagunitas IPA', imgUrl: 'https://lagunitas.com/wp-content/uploads/2021/05/ipa01-1.png', description: 'A well-rounded, Highly drinkable India Pale Ale. A bit of Caramel Malt barley provides the richness that mellows out the twang of the hops, including Cascade, Centennial, Chinook and a splash of honorary “C” hop, Simcoe. Best enjoyed from mustache.', strength: 6.2, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 2, name: "Lil Sumpin' IPA", imgUrl: 'https://lagunitas.com/wp-content/uploads/2021/05/lss-hero.png', description: 'With a certain thing we call a nice wheatly-esque-ish-ness, A Little Sumpin’ Sumpin’ is a truly unique style. Featuring a strong hop finish on a silky body, it’s a hoppy pale wheat ale that is great for IPA fans, but so smooth that hefeweizen fans dig it, too.', strength: 7.5, userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 3, name: "Space Dust IPA", imgUrl: 'https://halftimebeverage.com/pub/media/catalog/product/cache/1ad0bbb23494a3b849326156b954c309/3/2/32133.png', description: 'Space Dust balances bitterness with a sweetness of hop flavors. Grapefruit, mango, and orange aromas with a medium body and a dry finish.', strength: 8.2, userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {id: 4, name: "Mind Haze IPA", imgUrl: 'https://www.firestonebeer.com/wp-content/uploads/2020/04/MH-large-710x1205-1.png', description: 'From the coast of California comes Mind Haze, a free‑spirited beer made to elevate your perceptions—juicy, fresh and loaded with an imaginative array of tropical hop flavors.', strength: 6.2, userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {id: 5, name: "Dankenstein's Monster IPA", imgUrl: "https://i.postimg.cc/RFhYXnKh/Mason-Aleworks-Dankenstiens-Monster-16-OZ-CAN-1200x630-removebg-preview.png", description: "IT'S ALIVE!!! IT'S ALIIIIIIIIIIVEEEEEEEE!!! Just in time for the spooky season, this monstrous unfiltered double IPA packed is packed to the brim with classic and dank hops. We pieced together this monster with Cascade, CTZ, Chinook, Centennial, and Simcoe giving you big citrus. big pine, and all the dankness you could ask for.", strength: 10.0, userId: 5, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Drinks', null, {});
  }
};
