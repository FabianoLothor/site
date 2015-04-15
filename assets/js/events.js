// Listeners
document.addEventListener("informationReceived", function(e) {
	information = e.detail;

	$("#full_name").html(
		information.get("name") + " " +
		information.get("surname") + " " +
		information.get("last_name")
	);
}, false);

document.addEventListener("contentReceived", function(e) {
	content = e.detail;

	$("#profession").html(content.get("profession"));
}, false);