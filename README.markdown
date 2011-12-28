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
	new Backbone.Model({name : "Charlie",number: 5}),
	new Backbone.Model({name : "Billy", number: 7}),
	new Backbone.Model({name : "Albert",number: 1}),
	new Backbone.Model({name : "Charlie",number: 4})
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
	new Backbone.Model({name : "Charlie",number: 5}),
	new Backbone.Model({name : "Billy", number: 7}),
	new Backbone.Model({name : "Albert",number: 1})
]);

models.sortBy("name","number"); //collection order is now [Albert 1, Billy 7, Charlie 5]

model = new Backbone.Model({name : "Charlie",number: 4})

//determine sort index according to most recent sort
index = models.sortIndex(model)			//returns 2
</code>
</pre>

<h3>add(model)</h3>
<pre>
<code>
//Backbone.Collection._add has been extended.  First it calls the parent,
//then it moves the model to correct position if asorted collection.
var models = new MultiSortCollection
		model,
		index;
		
models.add([
	new Backbone.Model({name : "Charlie",number: 5}),
	new Backbone.Model({name : "Billy", number: 7}),
	new Backbone.Model({name : "Albert",number: 1})
]);

models.sortBy("name","number"); //collection order is now [Albert 1, Billy 7, Charlie 5]

model = new Backbone.Model({name : "Charlie",number: 4})

index = models.add(model)			//collection order is now [Albert 1, Billy 7, Charlie 4, Charlie 5]
</code>
</pre>

<h2>Known Issues</h2>
<p>
	<code>MultiSortCollection.sortIndex()</code>does not work with <code>Backbone.Collection.comparator</code>.  Avoid using
	<code>comparator</code> if using this library. 
</p>

<p>
User will need to either:
<ol>
	<li>use <code>MultiSortCollection.sortIndex</code> to move the model after it's been added</li>
	<li>call <code>MultiSortCollection.sortBy</code> after adding models.</li>
</ol>
</p>

<h2>Unit Tests</h2>
<p>Jasmine Unit Tests are located at /spec/</p>