$(document).ready(function() {
	initialize();
});

function initialize() {
	Parse.initialize("OfQGHeUlU7pQ7t35TGZC1R8GfCugRaWlWaKiuIh9", "ZGGGk8JKEbwKOcBY50VgOKQ4uuPTiGrjGlYtM06l");

	getInformation();
	getContent();
}

function dispatchCustomEvent(eventName, args) {
	document.dispatchEvent(new CustomEvent(eventName, {"detail": args}));
}