// 	Multi-Attribute Sort Functionality for Backbone Collections
// 	@author Aaron Nordyke, aaron.nordyke@gmail.com
// 	@requires Backbone,Underscore
var MultiSortCollection = Backbone.Collection.extend({
	
	//Indicates whether the collection is sorted
	_sorted : false,

	//Most recent sort attributes
	_sortAttributes : [],

	// Public Methods
  	// -------------

	// Sort by supplied `sortAttributes` array.  Primary sort
	// is `argument[0]` and last sub-sort is `argument[n]`.  Defaults to most 
	// recent `sortAttributes`, if no arguments are supplied.
	sortBy : function(sortAttributes){
		var attributes = arguments;
		if(arguments.length){
			this._sortAttributes = arguments;
		}
		this.models = this._sortBy(this.models,this._sortAttributes);
		this._sorted = true;
	},
	

	// Returns where model would be placed into sorted collection.
	// For unsorted collection, it returns the end of the collection.
	sortIndex : function(model){
		var index;
		if(!this._sorted){
			return this.models.length;
		}
		return this._sortIndex(model,this.models,this._sortAttributes);
	},
	
	// Private Functions
  // -----------------

	// Each recursion finds sortIndex of a
	// subset of models that correspond to each sort attribute.
	// The sum of indexes from child recursions are returned
	_sortIndex : function(model,models,attributes){
		var that = this,
				first,
				firstIndex,
				attr;
		//Base case #1:  No more attributes
		if(!attributes.length){
			return 0;
		}
		attr = attributes[0];
		//Finds first model with identical attribute value
		first = _(models).find(function(m){
			return m.get(attr) === model.get(attr);
		});
		//Base case #2:  no other model with identical attr value
		//so just return the index where model should be inserted
		if(_.isEmpty(first)){
			return _(models).sortedIndex(model,function(m){
				return m.get(attr);
			});
		}		
		//index of first model with identical attribute, which will be added
		//to indexes from child recursions
		firstIndex = _.indexOf(models,first);
		//Gets models with identical attribute
		//and call recursive function on next attribute in the list.
		models = _(models).filter(function(m){
			return m.get(attr) === model.get(attr);
		});
		attributes = _.last(attributes,attributes.length-1);

		return firstIndex + this._sortIndex(model,models,attributes);
	},
	
	// Recursive sort on supplied sort attributes
	_sortBy : function(models,attributes){
		var attr,
				that = this;
		
		if(!attributes.length){
			return this.models;
		}
		attr = attributes[0];
		//Base case
		if(attributes.length === 1){
			return _(models).sortBy(function(model){
				return model.get(attr);
			});
		}
		//Splits up models by sort attribute, 
		//and then does a recursive sort on each group
		else{
			models = _(models).chain().
				sortBy(function(model){
					return model.get(attr);
				}).
				groupBy(function(model){
					return model.get(attr);
				}).
				toArray().
				value();
				
			attributes = _.last(attributes,attributes.length-1);
			_(models).each(function(modelSet,index){
				models[index] = that._sortBy(models[index],attributes);
			});
			return _(models).flatten();	
		}
	},
	
	// Calls parent function `Backbone.Collection._add`, and then for sorted collections, it moves model
	// to correct position.
	_add : function(models,options){
		var model = Backbone.Collection.prototype._add.call(this,models,options);
		if(this._sorted){
			this.models.splice(this.indexOf(model), 1);
			this.models.splice(this.sortIndex(model),0,model);
		}
	}
});
