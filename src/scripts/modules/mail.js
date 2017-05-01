/**
 *Mail
 */
define([
	'elements', 'events', 'ajax'], function(el, evt, Ajax) {

	"use strict";

	var Mail = function(options) {

		var options = defaults(options);
		var form;
		var formFields = [];
		var submitEl;

		function init() {
			form = el.find(options.formSelector)[0];
			submitEl = el.find('#form-submit .flip-trigger')[0];

			var formFieldsEl = el.find(options.formFieldsSelector);
			for (var i = formFieldsEl.length - 1; i >= 0; i--) {
				formFields.push({
					el: formFieldsEl[i],
					isEmail: el.hasClass(formFieldsEl[i], 'js-is-email'),
					minLength: formFieldsEl[i].getAttribute('data-min-length') || 0
				});
			}

			evt.addListener('.js-min-length', 'keyup', handleChangeOfInput);
			evt.addListener('.js-min-length', 'paste', handleChangeOfInput);

			evt.addListener('.js-is-email', 'keyup', handleChangeOfEmailInput);
			evt.addListener('.js-is-email', 'paste', handleChangeOfEmailInput);

			evt.addListener('#message', 'keyup', handleChangeOfMsgInput);
			evt.addListener('#message', 'paste', handleChangeOfMsgInput);
		}

		function handleChangeOfInput(event){
			if(event.target.value.length >= parseInt(event.target.getAttribute('data-min-length'))){
				el.addClass(event.target.parentNode, 'is-field-valid');
				el.removeClass(event.target.parentNode, 'is-error');
			}else {
				el.removeClass(event.target.parentNode, 'is-field-valid');
			}

			// (event.target.value.length >= parseInt(event.target.getAttribute('data-min-length'))) ?
			// 	el.addClass(event.target.parentNode, 'is-field-valid') :
			// 	el.removeClass(event.target.parentNode, 'is-field-valid');
		}


		function handleChangeOfEmailInput(event){
			if(validateEmail(event.target.value)){
				el.addClass(event.target.parentNode, 'is-field-valid');
				el.removeClass(event.target.parentNode, 'is-error');
			}else {
				el.removeClass(event.target.parentNode, 'is-field-valid')
			}
		}


		function handleChangeOfMsgInput(event){
			if(event.target.value.length >= parseInt(event.target.getAttribute('data-min-length'))){
				el.removeClass(submitEl, 'is-flipped');
				el.removeClass(event.target.parentNode, 'is-error');
			} else {
				el.addClass(submitEl, 'is-flipped');
			}
		}


		/**
		 * validates given input fields
		 * CAUTION: error-class is added to parent
		 * @param  array, array of input elements
		 * @return Boolean, form is valid
		 */
		function validate (formFields) {
			var isValid = true;
			for (var i = formFields.length - 1; i >= 0; i--) {
				if(el.hasClass(formFields[i].el, 'js-min-length')){
					if(formFields[i].el.value.length < parseInt(formFields[i].el.getAttribute('data-min-length'))){
						isValid = false;
						el.addClass(formFields[i].el.parentNode, 'is-error');
					}
				}

				if(formFields[i].el.value == ''){
					isValid = false;
					el.addClass(formFields[i].el.parentNode, 'is-error');
				}

				if(formFields[i].isEmail){
					if(!validateEmail(formFields[i].el.value)){
						isValid = false;
						el.addClass(formFields[i].el.parentNode, 'is-error');
					}
				}
			};
			return isValid;
		}


		function validateEmail(email) {
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return re.test(email);
		}


		function sayThankYou(){
			emptyFields(formFields);
			el.addClass(form, 'is-submitted');
		}


		function emptyFields(fields){
			for (var i = fields.length - 1; i >= 0; i--) {
				fields[i].el.value = '';
				el.removeClass(fields[i].el.parentNode, 'is-field-valid');
			};
		}


		function send () {
			if(validate(formFields)){
				Ajax.post(form.getAttribute('action'), {
					ajaxcall: true,
					action: 'getInContact',
					data: {
						name: el.find('#name')[0].value,
						email: el.find('#email')[0].value,
						message: el.find('#message')[0].value,
						human: el.find('#human')[0].value
					}
				}, function(data){

					if(data.response){
						console.log(data.response);
						sayThankYou();
					}
				});
			}
		}


		function defaults(opts) {
			var options = opts || {};
			var defaults = {
				formSelector: 'form',
				formFieldsSelector: '.js-input',
				submitButton: '#form-submit'
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}


		init();

		return {
			send: send
		};
	}
	return Mail;

});