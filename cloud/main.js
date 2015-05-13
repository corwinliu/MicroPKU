// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("GetInfoList", function(request, response){
	var StudentId = request.params.StudentId;
	var RequestDate = request.params.RequestDate;
	var Depart = ParseDepart(StudentId);
	var Result = new Array();



	var DeanInfo = AV.Object.extend("DeanInfo");
	var query1 = new AV.Query(DeanInfo);
	query1.equalTo("Date", RequestDate);
	query1.find({
		success: function(results){
			//for(var i = 0; i < results.length; i++){
				Result.push(results);
				//console.log(1);
				var SccInfo = AV.Object.extend("SccInfo");
				var query2 = new AV.Query(SccInfo);
				query2.equalTo("Date", RequestDate);
				query2.find({
					success: function(results){
						//for(var i = 0; i < results.length; i++){
							Result.push(results);
							//console.log(2);
							var LectureInfo = AV.Object.extend("LectureInfo");
							var query3 = new AV.Query(LectureInfo);
							query3.equalTo("Date", RequestDate);
							console.log(Depart);
							query3.equalTo("Depart", Depart);
							query3.find({
								success: function(results){
									Result.push(results);
									response.success(Result);
								},
								error: function(error){
									alert("Error");
								}
							})
					},
					error: function(error){
						alert("Error");
					}
				})
		},
		error: function(error){
			alert("Error");
		}
	})
});

AV.Cloud.define("GetItem", function(request, response) {
	var ObjectId = request.params.objectId;
	var Source = request.params.Source;
	console.log("ObjectId: " + ObjectId);
	console.log("Source: " + Source);
	if (Source == "Dean") {
		getItemFromTable("DeanInfo", ObjectId, response);
	}
	else if (Source == "Scc") {
		getItemFromTable("SccInfo", ObjectId, response);
	}
	else if (Source == "Lecture") {
		getItemFromTable("LectureInfo", ObjectId, response);
	}
	else {
		alert("Error");
		console.log("No such resource");
		response.success("");
	}
});

function getItemFromTable(table, object_id, response) {
	var Info = AV.Object.extend(table);
	var query = new AV.Query(Info);
	query.equalTo("objectId", object_id);
	query.find({
		success: function(results){
			response.success(results);
		},
		error: function(error){
			alert("Error");
			console.log("CQL Error in table: " + table);
		}
	})
}


function ParseDepart(StudentId) {
	var Id = parseInt(StudentId);
	Id = Math.floor(Id / 1000);
	Id = Id % 100000;
	return Id+"";
}