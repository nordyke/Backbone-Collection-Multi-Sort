<h1>Multi-Sort For Backbone Collections</h1>

<code>MultiSortCollections</code>
(multi-sort.collection.js) extends <code>Backbone.Collection</code>, 
giving the ability to sort on multiple attributes.

<h2>Known Issues</h2>
When models are added to a sorted collection, they are not automatically spliced into
their sorted position, because <code>MultiSortCollection.sortedIndex()</code> does not work 
with <code>Backbone.Collection.comparator</code>

User will need to either 
1) use <code>MultiSortCollection.sortedIndex</code> to move the model after it's been added,
2) call MultiSortCollection.sortBy after adding models.

<h2>Unit Tests</h2>
Jasmin Unit Tests are located at /js/spec/