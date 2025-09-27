use('yogiBot');

const count = db.getCollection('userverifications').countDocuments();
console.log(`Zweryfikowanych użytkowników: ${count}`);

db.getCollection('userverifications').find().toArray();
