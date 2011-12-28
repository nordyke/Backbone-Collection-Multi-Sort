<h1>Multi-Sort For Backbone Collections</h1>

<p>
	<code>MultiSortCollections</code> extends <code>Backbone.Collection</code>, 
	giving the ability to sort on multiple attributes.
</p>

<h2>Known Issues</h2>
<p>
	When models are added to a sorted collection, they are not automatically inserted into
	sorted position.  <code>Backbone.add</code> utilizes Underscore's <code>sortIndex()</code> method to determine where to insert.
</p>
<p>
	CAUTION: <code>MultiSortCollection.sortIndex()</code>does not work with <code>Backbone.Collection.comparator</code>. 
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