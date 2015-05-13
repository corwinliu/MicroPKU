// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("GetInfoList", function(request, response){
	var StudentId = request.params.StudentId;
	var RequestDate = request.params.RequestDate;
	var Depart = ParseDepart(StudentId);
	var Result;


	var DeanInfo = AV.Object.extend("DeanInfo");
	var query = new AV.Query(DeanInfo);
	query.equalTo("Date", RequestDate);
	query.find({
		success: function(results){
			Result = results;
		},
		error: function(error){
			alert("Error");
		}
	})

	var SccInfo = AV.Object.extend("SccInfo");
	var query = new AV.Query(SccInfo);
	query.equalTo("Date", RequestDate);
	query.find({
		success: function(results){
			Result += results;
			response.success(Result);
		},
		error: function(error){
			alert("Error");
		}
	})


});


AV.Cloud.define("GetCourseList", function(request, response){
	var StudentId = request.params.StudentId;
	var RequestDate = request.params.RequestDate;
	var CourseInfo = AV.Object.extend("CourseInfo");
	var query = new AV.Query(CourseInfo);
	query.equalTo("Date", RequestDate);
	query.equalTo("StudentId")
	query.find({
		success: function(results){
			response.success(results);
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