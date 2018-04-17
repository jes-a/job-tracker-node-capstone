"use strict";


function showAdminLandingScreen() {
	$('#login-screen').hide();
	$('.js-menu-btn').show();
	$('.js-menu').hide();
	$('#admin-home').show();
	$('#add-job-screen').hide();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').hide();
}


// Open Job List Screen for Worker on Login
function showWorkerLandingScreen() {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').show();
	$('.js-worker-menu').hide();
	$('#job-list-screen-worker').show();
	$('.js-add-note-section').hide();
	$('#worker-profile-screen').hide();
}


// Triggers

$(document).ready(function() {
	$('#login-screen').show();
	$('.js-menu-btn').hide();
	$('.js-menu').hide();
	$('#admin-home').hide();
	$('#add-job-screen').hide();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').hide();
	$('.js-menu-btn').hide();
	$('.js-worker-menu').hide();
	$('#job-list-screen-worker').hide();
	$('.js-add-note-section').hide();
	$('#worker-profile-screen').hide();
});

// Handle log in information
$('#js-login-button').on('click', function(event) {
	event.preventDefault();
	showWorkerLandingScreen();
});

// Sign out and refresh page
$('.js-logout-link').on('click', function(event) {
	event.preventDefault();
});


// Open admin landing screen when home is clicked on
$('.js-admin-home a').on('click', function(event) {
	showAdminLandingScreen();
	console.log('home button clicked');
});

// Open nav menu from headers
$('.js-menu-btn').on('click', function(event) {
	$('.js-menu').toggle();
	console.log('menu button clicked');
});	


// go to Admin Landing Screen when cancel is clicked
$('.js-cancel-button').on('click', function(event) {
	showAdminLandingScreen();
});

// Open Add Job Screen
$('.js-add-job').on('click', function(event) {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').hide();
	$('.menu').hide();
	$('#admin-home').hide();
	$('#add-job-screen').show();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').hide();
});


// Open job list screen from landing page or nav
$('.js-job-list-admin').on('click', function(event) {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').show();
	$('.menu').hide();
	$('#admin-home').hide();
	$('#add-job-screen').hide();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').show();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').hide();
	console.log('openJobListScreen ran');
});


// Open add worker screen from landing page or nav
$(document).on('click', '.js-add-worker', function(event) {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').hide();
	$('.menu').hide();
	$('#admin-home').hide();
	$('#add-job-screen').hide();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').show();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').hide();
	console.log('openAddWorkerScreen ran');
});

// Open worker list screen from landing page or nav
// Fill in with worker list from db
$('.js-workers-screen').on('click', function(event) {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').show();
	$('.menu').hide();
	$('#admin-home').hide();
	$('#add-job-screen').hide();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').show();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').hide();
	console.log('openWorkersScreen ran');
});	

// Open worker detail screen from db details	
$('.js-worker-name').on('click', function(event) {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').show();
	$('.menu').hide();
	$('#admin-home').hide();
	$('#add-job-screen').hide();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').show();
	$('#edit-worker-screen').hide();
	console.log('worker name clicked');
});

// Open edit worker form
$('.js-worker-detail').on('click', '.js-edit-worker-button', function(event) {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').hide();
	$('#admin-home').hide();
	$('#add-job-screen').hide();
	$('#edit-job-screen').hide();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').show();
});

// Open edit job screen from edit button and fill in relevant fields
$('.js-job-list').on('click', '.js-edit-job-link', function(event) {
	$('*').scrollTop(0);
	$('#login-screen').hide();
	$('.js-menu-btn').hide();
	$('#admin-home').hide();
	$('#add-job-screen').hide();
	$('#edit-job-screen').show();
	$('#job-list-screen-admin').hide();
	$('#add-worker-screen').hide();
	$('#worker-list-screen').hide();
	$('#worker-detail-screen').hide();
	$('#edit-worker-screen').hide();
	console.log('edit job link clicked');
});

// Add worker to server
$('#js-add-worker-button').on('click', function(event) {
	event.preventDefault();
	console.log('Added worker ran');
});

// Save worker to server
$('#js-save-worker-button').on('submit', function(event) {
	event.preventDefault();
	console.log('Edited worker ran');
});

// Add job to server
$('#js-add-job-button').on('click', function(event) {
	event.preventDefault();
	console.log('Added job ran');
	// add job to server
});

// Save edited job to server
$('#js-save-job-button').on('click', function(event) {
	event.preventDefault();
	console.log('Edited job ran');
});


