function getInformation() {
	var query = new Parse.Query(Parse.Object.extend("information"));

	query.first({
		success: function(results) {
			dispatchCustomEvent("informationReceived", results);
		},
		error: function(error) {
			parseException(error.code, error.message);
		}
	});
}

function getContent() {
	var query = new Parse.Query(Parse.Object.extend("content"));

	query.first({
		success: function(results) {
			dispatchCustomEvent("contentReceived", results);
		},
		error: function(error) {
			parseException(error.code, error.message);
		}
	});
}

function parseException(code, message) {
	console.log(code, message);
}