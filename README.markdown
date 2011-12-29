<h1>Multi-Sort For Backbone Collections</h1>

<p>
	<code>MultiSortCollections</code> extends <code>Backbone.Collection</code>, 
	giving the ability to sort on multiple attributes.
</p>

<h2>Basic Usage</h2>
This is basic usage for the methods.  See unit tests for additional examples.

<h3>sortBy(sortAttributes)</h3>
<pre>
<code>
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
</code>
</pre>

<h3>sortIndex(model)</h3>
<pre>
<code>
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
</code>
</pre>

<h3>add(model,[options])</h3>
<pre>
<code>
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
</code>
</pre>

<h2>Known Issues</h2>
<p>
	<code>MultiSortCollection.sortIndex()</code>does not work with <code>Backbone.Collection.comparator</code>.  Avoid using
	<code>comparator</code> if using this library. 
</p>


<h2>Unit Tests</h2>
<p>Jasmine Unit Tests are located at spec/</p>