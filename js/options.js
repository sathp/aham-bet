(function ($) {
	'use strict';

	// Template Helper Function
	$.fn.hasAttr = function(attribute) {
		var obj = this;

		if (obj.attr(attribute) !== undefined) {
			return true;
		} else {
			return false;
		}
	};

	function checkVisibility (object) {
		var el = object[0].getBoundingClientRect(),
			wHeight = $(window).height(),
			scrl =  wHeight - (el.bottom - el.height),
			condition = wHeight + el.height;

		if (scrl > 0  && scrl < condition) {
			return true;
		} else {
			return false;
		}
	};

	// Scroll Events
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};
	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	};
	function preventDefaultForScrollKeys(e) {
	    if (keys[e.keyCode]) {
	        preventDefault(e);
	        return false;
	    }
	};
	function disableScroll() {
		if (window.addEventListener) window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;
	};
	function enableScroll() {
		if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null;
		window.onwheel = null;
		window.ontouchmove = null;
		document.onkeydown = null;
	};

	var teslaThemes = {
		init: function () {
			this.checkInputsForValue();
			this.pageNavigation();
			this.nrOnlyInputs();
			this.slickInit();
			this.parallaxInit();
			this.animatedCounters();
			this.toggles();
			this.tabsInit();
			this.countDownInit();
			this.googleMaps();
		},

		// Template Custom Functions
		checkInputsForValue: function () {
			$(document).on('focusout', '.check-value', function () {
				var text_val = $(this).val();
				if (text_val === "" || text_val.replace(/^\s+|\s+$/g, '') === "") {
					$(this).removeClass('has-value');
				} else {
					$(this).addClass('has-value');
				}
			});
		},

		pageNavigation: function () {
			var visibleArray = [],
				currentSectionID,
				n = $('.section').length,
				k = true;

			function highLightNav () {
				$('.main-nav li').removeClass('high-lighted');
				$('.main-nav li.active').addClass('high-lighted');

				highLightItem();

				$(window).on('resize', function () {
					highLightItem();
				});
			}

			function highLightItem () {
				$('.active-indicator').css({
					'width': $('.main-nav li.active').width(),
					'left': $('.main-nav li.active').offset().left - $('.main-nav').offset().left + 'px'
				});
			}

			highLightNav();

			// Main Nav Scrolling
			$(window).on('scroll', function () {
				var st = $(this).scrollTop();

				// Make Header Smaller
				if (st > $('.main-header').height()) {
					$('.main-header').addClass('smaller');
				} else {
					$('.main-header').removeClass('smaller');
				}

				// Navigation
				visibleArray = [];
				for (var i = 0; i < n ; i ++) {
					if (checkVisibility($('.section').eq(i))) {
						visibleArray.push(i);
					}
				}

				currentSectionID = Math.max.apply(Math, visibleArray);
				if (currentSectionID != -Infinity && n > 1) {
					$('.main-nav li a').parent().removeClass('active');
					$('.main-nav li a[href="#' + $('.section').eq(currentSectionID).attr('id') + '"]').parent().addClass('active');
				}

				if (k) {
					highLightNav();
				}
			});

			// Anchor Scrolling
			$('.main-nav li a').on('click', function () {
				var obj = $(this);

				if ($(window).width() > 1200) {
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							k = false;
							$('html, body').animate({
								scrollTop: target.offset().top - $('.main-header').height() / 2
							}, 1000);
							setTimeout(function () {
								$('.main-nav li a').parent().removeClass('active');
								obj.parent().addClass('active');
								highLightNav();
								k = true;
							}, 1100);
							return false;
						}
					}
				}
			});
		},

		nrOnlyInputs: function () {
			$('.nr-only').keypress(function (e) {
				if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
					return false;
				}
			});
		},

		slickInit: function () {
			// Get All Carousels from the page
			var carousel = $('.tt-carousel');

			// Get All Sliders from the page
			var slider = $('.tt-slider');

			// Init Carousels
			carousel.each(function () {
				var obj = $(this),
					items = obj.find('.carousel-items');

				items.slick({
					focusOnSelect: true,
					speed: obj.hasAttr('data-speed') ? obj.data('speed') : 600,
					slidesToShow: obj.hasAttr('data-items-desktop') ? obj.data('items-desktop') : 4,
					arrows: obj.hasAttr('data-arrows') ? obj.data('arrows') : true,
					dots: obj.hasAttr('data-dots') ? obj.data('dots') : true,
					infinite: obj.hasAttr('data-infinite') ? obj.data('infinite') : false,
					slidesToScroll: obj.hasAttr('data-items-to-slide') ? obj.data('items-to-slide') : 1,
					initialSlide: obj.hasAttr('data-start') ? obj.data('start') : 0,
					asNavFor: obj.hasAttr('data-as-nav-for') ? obj.data('as-nav-for') : '',
					centerMode: obj.hasAttr('data-center-mode') ? obj.data('center-mode') : '',
					vertical: obj.hasAttr('data-vertical') ? obj.data('vertical') : false,
					responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: obj.hasAttr('data-items-small-desktop') ? obj.data('items-small-desktop') : 3,
                                slidesToScroll: obj.hasAttr('data-items-small-desktop') ? obj.data('items-small-desktop') : 3
                            }
                        },
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: obj.hasAttr('data-items-tablet') ? obj.data('items-tablet') : 2,
                                slidesToScroll: obj.hasAttr('data-items-tablet') ? obj.data('items-tablet') : 2
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: obj.hasAttr('data-items-phone') ? obj.data('items-phone') : 2,
                                slidesToScroll: obj.hasAttr('data-items-phone') ? obj.data('items-phone') : 2
                            }
                        }
                    ]
				});
			});

			// Init Sliders
			slider.each(function () {
				var obj = $(this),
					items = obj.find('.slides-list');

				items.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					focusOnSelect: true,
					autoplay: obj.hasAttr('data-autoplay') ? obj.data('autoplay') : false,
					autoplaySpeed: obj.hasAttr('data-autoplay-speed') ? obj.data('autoplay-speed') : 2000,
					pauseOnHover: obj.hasAttr('data-pause-on-hover') ? obj.data('pause-on-hover') : true,
					fade: obj.hasAttr('data-fade') ? obj.data('fade') : false,
					dots: obj.hasAttr('data-dots') ? obj.data('dots') : true,
					speed: obj.hasAttr('data-speed') ? obj.data('speed') : 500,
					arrows: obj.hasAttr('data-arrows') ? obj.data('arrows') : true,
					infinite: obj.hasAttr('data-infinite') ? obj.data('infinite') : false,
					initialSlide: obj.hasAttr('data-start') ? obj.data('start') : 0,
					asNavFor: obj.hasAttr('data-as-nav-for') ? obj.data('as-nav-for') : ''					
				});
			});
		},

		parallaxInit: function () {
			var container = jQuery('[data-parallax-bg]');

			if (container.length) {
				container.each(function(index) {
					var boxImg = container.eq(index),
						boxImgData = boxImg.data('parallax-bg'),
						parallaxBox = boxImg.find('.box-img > span');

					parallaxBox.css({
						'background-image': 'url("' + boxImgData + '")'
					});

					function parallaxEffect () {
						var elCont = container[index],
							el = elCont.getBoundingClientRect(),
							wHeight = jQuery(window).height(),
							scrl =  wHeight-(el.bottom - el.height),
							scrollBox = boxImg.find('.box-img'),
							condition = wHeight+el.height,
							progressCoef = scrl/condition;

						if( scrl > 0  && scrl < condition) {
							scrollBox.css({
								transform: 'translateY('+(progressCoef * 100)+'px)'
							});
						}
					}

					parallaxEffect();

					jQuery(window).scroll(function() {
						parallaxEffect();
					});
				});
			}
		},

		animatedCounters: function () {
			function animateCounterBoxes () {
				$('.counter-box').each(function () {
				 	var obj = $(this);

				 	if (checkVisibility(obj) && obj.attr('data-state') === "0") {
				 		obj.attr('data-state', '1');

				 		var animationTime = 2500;

			 			$({
					  		Counter: 0
					  	}).animate({
				  			Counter: parseInt(obj.data('counter-value'), 10)
					  	}, {
					    	duration: animationTime,
					    	easing: 'swing',
					    	step: function (now) {
					      		obj.find('.value-container').text(Math.ceil(now));
					    	}
					  	});
				 	}
				});
			};

			animateCounterBoxes();

			$(window).on('scroll', function () {
				animateCounterBoxes();
			});
		},

		toggles: function () {
			// Video Toggles
			var oldVideoHeight,
				oldIframe,
				oldPosition;

			setTimeout(function () {
				oldVideoHeight = $('.video-wrapper').outerHeight(true);
				$('.video-wrapper').css({
					'height': oldVideoHeight + 'px'
				});
			}, 300);

			$('.video-btn-toggle').on('click', function () {
				$('.video-wrapper').css({
					'height': '100vh'
				});

				$('.main-header').addClass('hide-top');

				oldPosition = $(window).scrollTop();

				$('html, body').animate({
		            scrollTop: $('.video-wrapper').offset().top + 'px'
		        }, 'swing');

				$('.video-wrapper').addClass('show-video');

				oldIframe = $('.video-wrapper .video-container').html();

				$('.video-wrapper .video-container iframe')[0].src += "?autoplay=1";

				disableScroll();
			});

			$(document).on('click', '.video-close-bar .close-btn', function () {
				$('.video-wrapper').css({
					'height': oldVideoHeight + 'px'
				});

				$('.main-header').removeClass('hide-top');

				$('.video-wrapper').removeClass('show-video');

				$('.video-wrapper .video-container').html(oldIframe);

				enableScroll();

				$('html, body').animate({
		            scrollTop: oldPosition + 'px'
		        }, 'swing');
			});

			// Mobile Nav
			$('.mobile-nav-toggle').on('click', function () {
				$('body').toggleClass('mobile-navigation-visible');
				if ($('body').hasClass('mobile-navigation-visible')) {
					$('.content-wrapper, .main-header').css({
						'-webkit-transform': 'translateY(' + $('.main-nav').outerHeight(true) + 'px)',
						'transform': 'translateY(' + $('.main-nav').outerHeight(true) + 'px)'
					});
				} else {
					$('.content-wrapper, .main-header').css({
						'-webkit-transform': 'translateY(0px)',
						'transform': 'translateY(0px)'
					});	
				}
				return false;
			});

			$('.main-nav').on('click', function (e) {
				if ($(window).width() < 1200) {
					e.stopPropagation();
				}
			});

			$(document).on('click', function () {
				$('.content-wrapper, .main-header').css({
					'-webkit-transform': 'translateY(0px)',
					'transform': 'translateY(0px)'
				});
			});

			$(window).on('scroll resize', function () {
				if ($('body').hasClass('mobile-navigation-visible')) {
					$('body').removeClass('mobile-navigation-visible')
					$('.content-wrapper, .main-header').css({
						'-webkit-transform': 'translateY(0px)',
						'transform': 'translateY(0px)'
					});	
				}
			});

			$('.main-nav .menu-item-has-children > a').on('click', function (e) {
				var obj = $(this);
				if ($(window).width() < 1200) {
					e.preventDefault();
					obj.next().slideToggle(200);
					setTimeout(function () {
						$('.content-wrapper, .main-header').css({
							'-webkit-transform': 'translateY(' + $('.main-nav').outerHeight(true) + 'px)',
							'transform': 'translateY(' + $('.main-nav').outerHeight(true) + 'px)'
						});
					}, 200)
				}
			});

			// Register Area
			$('.register-image-wrapper').one('click', function () {
				$('.register-area-wrapper').addClass('show-form');
			});

			// Custom Select Boxes
			$('.custom-select').each(function () {
				var obj = $(this);

				obj.find('.select-option').on('click', function () {
					obj.find('.select-option').removeClass('active-option');
					$(this).addClass('active-option');
					obj.find('.select-value').addClass('has-value').attr('value', $(this).text());
				});
			});

			// Main Popup Toggle
			$('.top-tickets, .pricing-table .buy-btn').on('click', function (e) {
				e.preventDefault();
				$('.page-popup').addClass('open');
				$('.page-popup .popup-overlay').css({
					top: e.clientY,
					left: e.clientX,
					'opacity': .95,
					width: (window.innerWidth + window.innerHeight) * 2,
					height: (window.innerWidth + window.innerHeight) * 2
				});
			});


			// Close Main Popup
			$('.page-popup .close-popup-btn').on('click', function () {
				$('.page-popup .popup-overlay').css({
					width: 0,
					height: 0
				});
				setTimeout(function() {
					$('.page-popup').removeClass('open');
					$('.page-popup .popup-overlay').css({
						'opacity': '.2',
						'left': 'auto',
						'top': 'auto'
					});
				}, 410);
			});
		},

		tabsInit: function () {
			var tabs = $('.tabed-content');

			tabs.each(function () {
				var tab = $(this),
					option = tab.find('.tabs-header .tab-link'),
					content = tab.find('.tab-item');

				option.on('click', function () {
					var obj = $(this);

					if (!obj.hasClass('current')) {
						option.removeClass('current');
						obj.addClass('current');

						if (tabs.hasClass('gallery-tabs')) {
							tab.addClass('switching');

							setTimeout(function () {
								content.removeClass('current');
								$('#' + obj.data('tab-link')).addClass('current');

								tabs.removeClass('switching');
							}, 1795);
						} else {
							content.removeClass('current');
							$('#' + obj.data('tab-link')).addClass('current');
						}
					}
				});
			});
		},

		accordionInit: function () {
			var accordion = $('.accordion-group');

			accordion.each(function () {
				var accordion = $(this).find('.accordion-box');

				accordion.each(function () {
					var obj = $(this),
						header = $(this).find('.box-header h4'),
						body = $(this).find('.box-body');

					header.on('click', function () {
						if (obj.hasClass('open')) {
							body.velocity('slideUp', {
								duration: 150,
								complete: function () {
									obj.removeClass('open');
								}
							});
						} else {
							obj.addClass('open');
							body.velocity('slideDown', {duration: 195});
						}
					});
				});
			});
		},

		countDownInit: function () {
			var cd_duedate = jQuery('.countdown-timmer').attr('data-duedate');
		    var cd_start = new Date().getTime();
		    var cd_end = new Date(cd_duedate).getTime();
			$('.countdown-timmer').countdown(cd_duedate, function(event) {
				var $this = $(this);
		        // Total days
		        var days = Math.round(Math.abs((cd_start - cd_end)) / (24 * 60 * 60 * 1000));
		        var divider = {
		            'seconds': 60,
		            'minutes': 60,
		            'hours': 24
		        };
		        var progress = null;
		        switch (event.type) {
		            case "seconds":
		            case "minutes":
		            case "hours":
		            case "days":
		            case "weeks":
		            case "daysLeft":
		                $this.find('.' + event.type).html(event.value);
		                if (event.type === 'days') {
		                    progress = ((days - event.value) * 100) / (days);
		                } else {
		                    progress = (100 / divider[event.type]) * (divider[event.type] - event.value);
		                }
		                break;
		            case "finished":
		                $this.hide();
		                break;
		        }
			});
		},

		googleMaps: function () {
			if ($('#contact-popup').length) {
                var infobox = new InfoBox({
                    content: document.getElementById('contact-popup'),
                    closeBoxURL: ""
                });
            }

			// Describe Google Maps Init Function
			function initialize_contact_map (customOptions) {
                var mapOptions = {
                        center: new google.maps.LatLng(customOptions.map_center.lat, customOptions.map_center.lon),
                        zoom: parseInt(customOptions.zoom),
                        scrollwheel: false,
                        disableDefaultUI: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
                    };
                var contact_map = new google.maps.Map($('#map-canvas')[0], mapOptions),
                    marker = new google.maps.Marker({
                        map: contact_map,
                        position: new google.maps.LatLng(customOptions.marker_coord.lat, customOptions.marker_coord.lon),
                        animation: google.maps.Animation.DROP,
                        icon: customOptions.marker,
                    });

                infobox.open(contact_map, marker);

                $(window).on('scroll', function () {
                	if (checkVisibility($('.map-wrapper'))) {
                		setTimeout(function () {
                			$('.map-wrapper').addClass('show-popup');	
                		}, 750);
                	} else {
						$('.map-wrapper').removeClass('show-popup');
                	}
                });
            }

            if ($('#map-canvas').length) {
            	var customOptions = $('#map-canvas').data('options');
                google.maps.event.addDomListener(window, 'load', initialize_contact_map(customOptions));
            }
		}
	};

	$(document).ready(function(){
		teslaThemes.init();

		setTimeout(function () {
			$('body').addClass('dom-ready');
		}, 300);
	});
}(jQuery));
