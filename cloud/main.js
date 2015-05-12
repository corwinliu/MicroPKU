// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("GetInfoList", function(request, response){
	var StudentId = request.params.StudentId;
	var RequestDate = request.params.RequestDate;
	var Depart = ParseDepart(StudentId);
	var query = new AV.query(DeanInfo);
	query.equalTo("Date", RequestDate);
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