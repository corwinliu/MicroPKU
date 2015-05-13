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
			for(var i = 0; i < results.length; i++){
				Result.push(results[i]);
			}
			//response.success(Result);
		},
		error: function(error){
			alert("Error");
		}
	})

	var SccInfo = AV.Object.extend("SccInfo");
	var query2 = new AV.Query(SccInfo);
	query2.equalTo("Date", RequestDate);
	query2.find({
		success: function(results){
			for(var i = 0; i < results.length; i++){
				Result.push(results[i]);
			}
			response.success(Result);
		},
		error: function(error){
			alert("Error");
		}
	})

	var LectureInfo = AV.Object.extend("LectureInfo");
	var query3 = new AV.Query(LectureInfo);
	query3.equalTo("Date", RequestDate);
	query3.equalTo("Depart", Depart);
	query3.find({
		success: function(results){
			for(var i = 0; i < results.length; i++){
				Result.push(results[i]);
			}
			response.success(Result);
		},
		error: function(error){
			alert("Error");
		}
	})
});



function ParseDepart(StudentId){
	var Id = parseInt(StudentId);
	Id = Id / 1000;
	Id = Id % 100000;
	return Id;
}