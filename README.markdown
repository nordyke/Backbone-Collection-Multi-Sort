Multi-Sort For Backbone Collections
===================================

`MultiSortCollections` extends `Backbone.Collection`, 
giving the ability to sort on multiple attributes.

Basic Usage
-----------
This is basic usage for the methods.  See unit tests for additional examples.

### sortBy(sortAttributes)
	var models = new MultiSortCollection;
	models.add([
		{name : "Charlie",number: 5},
		{name : "Billy", number: 7},
		{name : "Albert",number: 1},
		{name : "Charlie",number: 4}
	]);

	//collection order is [Charlie 5, Billy 7, Albert 1, Charlie 4]

	models.sortBy("name","number");  //collection order is now [Albert 1, Billy 7, Charlie 4, Charlie 5]
	models.sortBy("number","name");  //collection order is now [Albert 1, Charlie 4, Charlie 5, Billy 7]

### sortIndex(model)
	var models = new MultiSortCollection,
			model,
			index;
			
	models.add([
		{name : "Charlie",number: 5},
		{name : "Billy", number: 7},
		{name : "Albert",number: 1}
	]);

	models.sortBy("name","number"); //collection order is now [Albert 1, Billy 7, Charlie 5]

	model = new Backbone.Model({name : "Charlie",number: 4})

	//determine sort index according to most recent sort
	index = models.sortIndex(model)			//returns 2

### add(model,[options])
	//Backbone.Collection._add has been extended.  First it calls the parent,
	//then it moves the new model to correct sort position if the collection is sorted
	var models = new MultiSortCollection
			model;
			
	models.add([
		{name : "Charlie",number: 5},
		{name : "Billy", number: 7},
		{name : "Albert",number: 1}
	]);

	models.sortBy("name","number"); //collection order is now [Albert 1, Billy 7, Charlie 5]

	model = new Backbone.Model({name : "Charlie",number: 4})

	models.add(model);	//collection order is now [Albert 1, Billy 7, Charlie 4, Charlie 5]

Known Issues
------------
`MultiSortCollection.sortIndex()`does not work with `Backbone.Collection.comparator`.  Avoid using
`comparator` if using this library. 



Unit Tests
----------
Jasmine Unit Tests are located at spec/