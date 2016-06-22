var myApp = angular.module('myApp', []);

//creating a new directive
myApp.directive('fileModel', ['$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

//creating a new service
myApp.service('fileUpload', ['$http', function($http) {
	this.uploadFileToUrl = function(file, uploadUrl) {
		var fd = new FormData();
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.success(function() {
			console.log('file uploaded successfully !');
		})

		.error(function(err) {
			console.log(err);
		});
	}
}]);

//creating the controller 
myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload) {
	$scope.uploadFile = function() {
		var file = $scope.myFile;
		console.log('file is ');
		console.dir(file);
		var target = 'mySample.png';
		var source = file.name;
		var uploadUrl = "http://52.74.237.78:8080/hms/spring/s3upload/reports/USER2016031001063906135" + "?target=" + target + "&source=" + source;
		fileUpload.uploadFileToUrl(file, uploadUrl);
	};
}]);

