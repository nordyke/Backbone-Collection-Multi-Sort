<h1>Multi-Sort For Backbone Collections</h1>

<p>
	<code>MultiSortCollections</code> extends <code>Backbone.Collection</code>, 
	giving the ability to sort on multiple attributes.
</p>

<h2>Known Issues</h2>
<p>
	When models are added to a sorted collection, they are not automatically spliced into
	sorted position. 
</p>
<p>
	CAUTION: <code>Backbone.Collection.comparator</code> does not work with <code>MultiSortCollection.sortIndex()</code>.
</p>

<p>
User will need to either:
<ol>
	<li>use <code>MultiSortCollection.sortIndex</code> to move the model after it's been added</li>
	<li>call <code>MultiSortCollection.sortBy</code> after adding models.</li>
</ol>
</p>

<h2>Unit Tests</h2>
<p>Jasmin Unit Tests are located at /js/spec/</p>