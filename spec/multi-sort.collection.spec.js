describe("Multi-sort collection",function(){
	var models;
			
	beforeEach(function(){
		models = new MultiSortCollection;
		models.add([
			{name : "Charlie",number: 5},
			{name : "Billy", number: 1},
			{name : "Albert",number: 1}
		]);
	});
	
	describe("sort",function(){
		
		it("sorts according to attr",function(){
			models.sortBy("name");
			expect(models.pluck("name")).toEqual(["Albert","Billy","Charlie"]);
		});
	
		it("sorts by two attributes",function(){
			models.add({name : "Charlie",number:0});
			models.sortBy("name","number");
			expect(models.pluck("name")).toEqual(["Albert","Billy","Charlie","Charlie"]);
			expect(models.pluck("number")).toEqual([1,1,0,5]);
		});
		
		it("stores attributes",function(){
			models.sortBy("name","number");
			expect(models._sortAttributes).toEqual(["name","number"]);
		});

	});
	
	describe("sortIndex",function(){
		
		it("gets last index for new model when collection is not sorted",function(){
			var model = new Backbone.Model({name : "Bart",number:0});
			expect(models.sortIndex(model)).toEqual(3);
		});

		it("gets index where new model should be inserted, pt 1",function(){
			var model = new Backbone.Model({name : "Bart",number:0});
			models.sortBy("name","number");
			expect(models.sortIndex(model)).toEqual(1);
		});
		
		it("gets index where new model should be inserted, pt 2",function(){
			var model = new Backbone.Model({name : "Billy",number:2});
			models.sortBy("name","number");
			expect(models.sortIndex(model)).toEqual(2);
		});
		
		it("gets index where new model should be inserted, pt 3",function(){
			var model = new Backbone.Model({name : "Charlie",number:1});
			models.sortBy("name","number");
			expect(models.sortIndex(model)).toEqual(2);
		});
	});
	
	describe("add",function(){
		
		it("adds model to end of array for unsorted collection",function(){
			models.add({name : "Aaron",number:0});
			expect(models.pluck("name")).toEqual(["Charlie","Billy","Albert","Aaron"]);
		});
		
		it("adds model to correct spot for sorted collection",function(){
			models.sortBy("name","number");
			models.add({name : "Aaron",number:0});
			expect(models.pluck("name")).toEqual(["Aaron","Albert","Billy","Charlie"]);
		});
		
		it("adds multiple models to correct spots",function(){
			models.sortBy("name","number");
			models.add([
				{name : "Aaron",number:0},
				{name : "Charlie",number:4}
			]);
			expect(models.pluck("name")).toEqual(["Aaron","Albert","Billy","Charlie","Charlie"]);
			expect(models.pluck("number")).toEqual([0,1,1,4,5]);
		});
	});
});
