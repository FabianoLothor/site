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

	$("title").html(_informations.fullName + " - " + content.profession);
	$("#profession").html(content.profession);
	$("#copyright").html(content.copyright
		.replace("{yearSite}", _settings.yearSite)
		.replace("{to}", getCurrentYear() > _settings.yearSite ? " - " + getCurrentYear() : ""));

	for (index in menu) {
		if(menu[index].enable) {
			$("#menu").append("<li class='menu_item'><a alt='" + menu[index].title + "' href='#'><div id='" + index + "' class='menu_item_block " + _settings.colors[colorsUsed] + "'><i class='fa fa-" + menu[index].icon + "'></i><strong><span class='menu_item_title'>" + menu[index].title + "</span></strong><span class='menu_item_subtitle'>" + menu[index].subtitle + "</span></div></a></li>");
			
			$("section#" + index + ".content").addClass(_settings.colors[colorsUsed]);
			$("section#" + index + ".content h2").html(menu[index].subtitle);

			switch (index) {
				case "profile" :
					profile = content.profile;

					$("#resume").html(profile.resume);

					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.name + "</label><span>" + _informations.fullName +"</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.nickname + "</label><span>" + _informations.nickname +"</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.locality + "</label><span>" + _informations.locality +"</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.email + "</label><span>" + _informations.email + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.skype + "</label><span>" + _informations.skype + "</span></li>");
					//$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.phone + "</label><span>" + _informations.phone + "</span></li>");
					//$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.birthplace + "</label><span>" + _informations.birthplace + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.birthday + "</label><span>" + _informations.birthday.complete + " (" + (getCurrentYear() - _informations.birthday.year) + ")</span></li>");
					$("#personal_informations").append("<li class='clear'></li>");

					for (var index = 1; index <= _settings.total_photos; ++index) {
						$("#photos_slider").append("<img alt='Foto " + index + "' src='" + _settings.photos_path + "photo_" + index + ".jpg' />");;
					};

					$('.nivoSlider').nivoSlider({
						directionNav : false,
						controlNav : true,
						controlNavThumbs : false,
						randomStart : true
					});
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