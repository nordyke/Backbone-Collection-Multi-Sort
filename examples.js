var models = new MultiSortCollection,
model;

models.add([
	{name : "Charlie",number: 5},
	{name : "Billy", number: 7},
	{name : "Albert",number: 1},
	{name : "Charlie",number: 4}
]);

//collection order is [Charlie 5, Billy 7, Albert 1, Charlie 4]

models.sortBy("number","name");  //collection order is now [Albert 1, Charlie 4, Charlie 5, Billy 7]
models.sortBy("name","number");  //collection order is now [Albert 1, Billy 7, Charlie 4, Charlie 5]

model = new Backbone.Model({name : "Charlie",number:4.5});
console.log(models.sortIndex(model));		//returns 3
models.add(model);	//colleciton order is now [Albert 1, Billy 7, Charlie 4, Charlie 4.5, Charlie 5]
