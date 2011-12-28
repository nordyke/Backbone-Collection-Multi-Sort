/**
 * Multi-Attribute Sort Functionality for Backbone Collections
 * @author Aaron Nordyke, aaron.nordyke@gmail.com
 * @requires Backbone,Underscore
 */
var MultiSortCollection = Backbone.Collection.extend({
	
	_sorted : false,
	
	/**
	 * Sort by supplied attributes.  First param is sorted first, and
	 * last final is final subsort.  Will use most recent sortAttributes, if none supplied.
	 * @param {String} sortAttributes
	 */
	sortBy : function(sortAttributes){
		var attributes = arguments;
		if(arguments.length){
			this._sortAttributes = arguments;
		}
		this.models = this._sortBy(this.models,this._sortAttributes);
		this._sorted = true;
	},
	
		/**
	 * Returns where model would be placed into sorted collection.
	 * Do NOT call on unsorted collection.
	 * @param {Object} model 
	 * @return {Integer} index where model would be inserted into sorted
	 * 									 collection. Returns end of array, if unsorted.
	 */
	sortIndex : function(model){
		var index;
		//return end of un-sorted arrays
		if(!this._sorted){
			return this.models.length;
		}
		return this._sortIndex(model,this.models,this._sortAttributes);
	},
	
		/**
	 * Recursive sortedIndex
	 * Each recursion finds sortedIndex of subset of models
	 * that correspond to each sortattribute.
	 * Then sum of indexes from recursions are returned
	 */
	_sortIndex : function(model,models,attributes){
		var that = this,
				first,
				firstIndex,
				attr;
		//base case #1:  no more attributes
		if(!attributes.length){
			return 0;
		}
		attr = attributes[0];
		//get first model with identical attribute value
		first = _(models).find(function(m){
			return m.get(attr) === model.get(attr);
		});
		//base case #2:  no other model with identical attr value
		//so just return the index where it should be inserted
		if(_.isEmpty(first)){
			return _(models).sortedIndex(model,function(m){
				return m.get(attr);
			});
		}
		//else get indexOf 'first'
		//indexOf first
		firstIndex = _(models).indexOf(first);
		//get group of models with identical attribute
		//and call recursive function on next attribute in the list.
		models = _(models).filter(function(m){
			return m.get(attr) === model.get(attr);
		});
		attributes = _.last(attributes,attributes.length-1);
		
		return firstIndex + this._sortIndex(model,models,attributes);
	},
	
	/**
	 * Recursive sort
	 */
	_sortBy : function(models,attributes){
		var attr,
				that = this;
		//special case
		if(!attributes.length){
			return this.models;
		}
		//base case
		if(attributes.length === 1){
			attr = attributes[0];
			return _(models).sortBy(function(model){
				return model.get(attr);
			});
		}
		else{
			attr = attributes[0];
			
			//split up models by sort attribute, then call _sortBy with remaining attributes
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
	}
});
