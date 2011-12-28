<h1>Multi-Sort For Backbone Collections</h1>

<p>
	<code>MultiSortCollections</code> extends <code>Backbone.Collection</code>, 
	giving the ability to sort on multiple attributes.
</p>

<h2>Usage</h2>

<h3>sortBy</h3>
<pre>
<code>
var models = new MultiSortCollection;
models.add([
	new Backbone.Model({name : "Charlie",number: 5}),
	new Backbone.Model({name : "Billy", number: 1}),
	new Backbone.Model({name : "Albert",number: 1}),
	new Backbone.Model({name : "Charlie",number: 4})
]);
//collection order is now [Charlie 5, Billy 1, Albert 1, Charlie 4]

models.sortBy("name","number");

//collection order is now [Albert 1, Billy 1, Charlie 4, Charlie 5]
</code>
</pre>

<h3>sortIndex</h3>
<pre>
<code>
var models = new MultiSortCollection,
		model,
		index;
		
models.add([
	new Backbone.Model({name : "Charlie",number: 5}),
	new Backbone.Model({name : "Billy", number: 1}),
	new Backbone.Model({name : "Albert",number: 1})
]);

models.sortBy("name","number"); //collection order is now [Albert 1, Billy 1, Charlie 5]

model = new Backbone.Model({name : "Charlie",number: 4})

//determine sort index according to most recent sort
index = models.sortIndex(model)			//returns 2
</code>
</pre>

<h2>Known Issues</h2>
<p>
	When models are added to a sorted collection, they are not automatically inserted into
	sorted position.  <code>Backbone.add</code> utilizes Underscore's <code>sortIndex()</code> method to determine where to insert.
</p>
<p>
	<em>CAUTION:</em> <code>MultiSortCollection.sortIndex()</code>does not work with <code>Backbone.Collection.comparator</code>. 
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