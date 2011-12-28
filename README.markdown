<h1>Multi-Sort For Backbone Collections</h1>

<p>
	<code>MultiSortCollections</code>
	(multi-sort.collection.js) extends <code>Backbone.Collection</code>, 
	giving the ability to sort on multiple attributes.
</p>

<h2>Known Issues</h2>
<p>
	When models are added to a sorted collection, they are not automatically spliced into
	their sorted position, because <code>MultiSortCollection.sortedIndex()</code> does not work 
	with <code>Backbone.Collection.comparator</code>
</p>

<p>
User will need to either:
<ol>
	<li>use <code>MultiSortCollection.sortedIndex</code> to move the model after it's been added</li>
	<li>call MultiSortCollection.sortBy after adding models.</li>
</ol>
</p>

<h2>Unit Tests</h2>
<p>Jasmin Unit Tests are located at /js/spec/</p>