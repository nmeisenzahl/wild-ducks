var ANIMATIONDURATION	= 500;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fix IE-bug that prevents a:active-styles from being applied, when an anchor's child is clicked
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var IEActiveAnchorsFixed = false;

function fixIEActiveAnchors() {
	if (IEActiveAnchorsFixed)
		return;

	$("a").children().mousedown(function (event) {
		$(this).parent().addClass('tileClickEffect');
		event.preventDefault();
	});
	$("a").children().mouseup(function (event) {
		$(this).parent().removeClass('tileClickEffect');
		event.preventDefault();
	});
	$("a").children().mouseleave(function (event) {
		$(this).parent().removeClass('tileClickEffect');
		event.preventDefault();
	});

	IEActiveAnchorsFixed = true;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Draw indicator for selected item in main-navigation
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainNavSelectionIndicatorDrawn = false;

function drawMainNavSelectionIndicator() {
	if (mainNavSelectionIndicatorDrawn)
		return;

	var item = $(".mainnav .selected");

	if (1 > item.length)
		return;

	item.append("<img id='mainnav_indicator' src='images/mainnav indicator.png'/>");

	mainNavSelectionIndicatorDrawn	= true;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fade-out page
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fadeOut() {
	var cmd = "$('.content').addClass('zero');"
			+ "$('.mainnav').addClass('lout');"
			+ "$('.subnav').addClass('vout');"
			+ "$('.sitemap').addClass('rout');";

	setTimeout(cmd, 100);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Open home-page
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function home() {
	fadeOut();
	setTimeout("document.location.href = 'index.html';", ANIMATIONDURATION);
}

function openTab(url) {
	window.open('/index.html', '_blank').location = url;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add fade-out effect on anchor-click
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var outAnimationAdded = false;

function addOutAnimation() {
	if (outAnimationAdded)
		return;

	// Add home-redirection to the logo
	$("#mainnav_claim").click(function (event) {
		event.preventDefault();
		home();
	});

	$("#mainnav_Fred").click(function (event) {
		event.preventDefault();
		home();
	});

	// Add transitions to anchor-clicks
	$("a").click(function (event) {
		event.preventDefault();

		var openInNewTab = $(this).attr('target') == '_blank';
		var tileAnimation = (0 < $(this).parents('.tiles').length) && !openInNewTab;
		var siteAnimation = (null == $(this).attr('href').match(/.+\?na/)) && (null == $(this).attr('href').match(/mailto\:.+/)) && !openInNewTab;

		if (tileAnimation) {
			var currentTile = $(this).parent();
			var o = currentTile.offset();

			$('body').prepend("<ul id='ctc' class='tiles'></ul>");

			currentTile = currentTile.clone();

			currentTile.attr("id", "currentTile");

			$('#ctc').append(currentTile);

			$('#ctc').css('position', 'fixed');
			$('#ctc').css('left', o.left + 'px');
			$('#ctc').css('top', o.top + 'px');

			var scaleFactor = Math.max(Math.round($(window).height() / currentTile.height() * 10) / 10, Math.round($(window).width() / currentTile.width() * 10) / 10);

			o = currentTile.offset();

			var tox = Math.round((o.left - $(window).scrollLeft()) / ($(window).width() - currentTile.width()) * 100);
			var toy = Math.round((o.top - $(window).scrollTop()) / ($(window).height() - currentTile.height()) * 100);

			currentTile = $('#currentTile');

			currentTile.css('z-index', '1000');
			currentTile.css('transition', 'transform 0.5s ease, opacity 0.7s ease');
			currentTile.css('transform-origin', tox + '% ' + toy + '%');
			currentTile.css('transform', 'scale(' + scaleFactor + ',' + scaleFactor + ')');
			currentTile.css('-webkit-transition', '-webkit-transform 0.5s ease, opacity 0.7s ease');
			currentTile.css('-webkit-transform-origin', tox + '% ' + toy + '%');
			currentTile.css('-webkit-transform', 'scale(' + scaleFactor + ',' + scaleFactor + ')');
			currentTile.css('-o-transition', '-o-transform 0.5s ease, opacity 0.7s ease');
			currentTile.css('-o-transform-origin', tox + '% ' + toy + '%');
			currentTile.css('-o-transform', 'scale(' + scaleFactor + ',' + scaleFactor + ')');
			currentTile.css('opacity', '0');
		}

		if (siteAnimation) {
			fadeOut();
		}

		var url = $(this).attr('href');
		var cmd;
		
		if (openInNewTab)
			cmd = "openTab('" + url + "');";
		else
			cmd = "document.location = '" + url + "';";

		if (tileAnimation)
			cmd = "$('#ctc').remove();" + cmd;

		setTimeout(cmd, siteAnimation ? ANIMATIONDURATION : 0);
	});

	outAnimationAdded = true;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Show fade-in effect
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showInAnimation() {
	var siteAnimation = null == document.location.href.match(/.+\?na/);
	var cmd = "$('#loadingpage').hide();";

	if (siteAnimation) {
		// Make all list-items zero-size...
		$('li').addClass('zero');

		// ...and hide the loading screen and restore the original size of all listitems
		cmd = cmd + "$('li').removeClass('zero');";
	}

	setTimeout(cmd, siteAnimation ? 200 : 0);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Shows the next frame of Fred's animated eye
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var currentFredAnimationFrame = 0;
var fredAnimationFrames = new Array();
var fredAnimationFramesSmall = new Array();

function nextFredAnimationFrame() {
	if (0 == currentFredAnimationFrame++){
		setTimeout('nextFredAnimationFrame();', 5000 + (Math.random() * 5000 - 2500));
		return;
	}

	currentFredAnimationFrame %= 5;

	$('img.fredEye').attr('src', fredAnimationFrames[currentFredAnimationFrame].src);
	$('img.fredEyeSmall').attr('src', fredAnimationFramesSmall[currentFredAnimationFrame].src);

	setTimeout('nextFredAnimationFrame();', 30);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Animates Fred's eye
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function animateFred() {
	for (var i = 0; i < 5; i++) {
		fredAnimationFrames[i] = new Image(); fredAnimationFrames[i].src = 'images/fredeye' + i + '.png';
		fredAnimationFramesSmall[i] = new Image(); fredAnimationFramesSmall[i].src = 'images/fredeyesmall' + i + '.png';
	}
	
	nextFredAnimationFrame();
}

$(document).ready(function () {
	fixIEActiveAnchors();
	drawMainNavSelectionIndicator();
	addOutAnimation();
	showInAnimation();
	animateFred();

	// This is only here to correctly handle history-back. Leaving this out shows a blank page when hitting back in the browser.
	$(window).bind("pageshow", function (event) {
		if (event.originalEvent.persisted) {
			$('.content').removeClass('zero');
			$('.mainnav').removeClass('lout');
			$('.subnav').removeClass('vout');
			$('.sitemap').removeClass('rout');
		}
	});
});

$(window).unload(function () {
	// This is only here to correctly handle history-back in opera. Leaving this out shows a blank page when hitting back in the browser.
});