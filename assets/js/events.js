// Listeners
document.addEventListener("loadedSettings", function(e) {
	_settings = e.detail;

	waitingDependencies();
}, false);

document.addEventListener("informationReceived", function(e) {
	_informations = e.detail;
	_informations.fullName = _informations.name + " " + _informations.surname + " " + _informations.last_name;

	$("#full_name").html(_informations.fullName);

	waitingDependencies();
}, false);

document.addEventListener("socialMediaReceived", function(e) {
	socialMedia = e.detail;

	if(Object.keys(socialMedia).length > 0) {
		$("#social").removeAttr("hidden");

		for (index in socialMedia) {
			if(socialMedia[index].enable) {
				$("#social").append("<a alt='" + socialMedia[index].name + "' href='" + socialMedia[index].url + "' target='_blank'>" + "<img id='" + index + "_icon' class='social_icon' title='" + socialMedia[index].name + "' src='assets/images/social/" + index + ".svg' />" + "</a>");
			}
		}

		$("#social img").first().addClass("first_social_icon");
		$("#social img").last().addClass("last_social_icon");

		$("#social img").jrumble({ x : 0, y : 0, rotation : 5 });
		$("#social img").hover( function() { $(this).trigger("startRumble"); }, function(){ $(this).trigger("stopRumble"); });
	}
}, false);

document.addEventListener("contentReceived", function(e) {
	content = e.detail;
	menu = content.menu;
	colorsUsed = 0;

	$("#profession").html(content.profession);
	$("#copyright").html(content.copyright.replace("{to}", getCurrentYear() > 2015 ? " - " + getCurrentYear() : ""));

	for (index in menu) {
		if(menu[index].enable) {
			$("#menu").append("<li class='menu_item'><a alt='" + menu[index].title + "' href='#'><div id='" + index + "' class='menu_item_block " + _settings.colors[colorsUsed] + "'><i class='fa fa-" + menu[index].icon + "'></i><strong><span class='menu_item_title'>" + menu[index].title + "</span></strong><span class='menu_item_subtitle'>" + menu[index].subtitle + "</span></div></a></li>");
			
			$("section#" + index + ".content").addClass(_settings.colors[colorsUsed]);
			$("section#" + index + ".content h2").html(menu[index].subtitle);

			switch (index) {
				case "profile" :
					profile = content.profile;

					$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.name + "</span><span class='value'>" + _informations.fullName + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.nickname + "</span><span class='value'>" + _informations.nickname + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.locality + "</span><span class='value'>" + _informations.locality + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.email + "</span><span class='value'>" + _informations.email + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.skype + "</span><span class='value'>" + _informations.skype + "</span></li>");
					//$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.phone + "</span><span class='value'>" + _informations.phone + "</span></li>");
					//$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.birthplace + "</span><span class='value'>" + _informations.birthplace + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><span class='text'>" + profile.birthday + "</span><span class='value'>" + _informations.birthday.complete + "</span></li>");
				break;
				case "experience" :

				break;
				case "contact" :

				break;
			}

			++colorsUsed;
		}
	}

	menuLoaded();
}, false);