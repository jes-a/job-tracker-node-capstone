"use strict";


function showAdminLandingScreen() {
    $('#login-screen').hide();
    $('html').addClass('white-bg');
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
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('.js-add-note-section').hide();
    $('#worker-profile-screen').hide();
}

function showWorkerJobListScreen() {
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
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
    $('.js-worker-menu-btn').show();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').show();
    $('.js-add-note-section').hide();
    $('#worker-profile-screen').hide();
}

// ----------- DOCUMENT READY FUNCTION ---------------------

$(document).ready(function() {
    $('#login-screen').show();
    $('html').removeClass('white-bg');
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
    $('#worker-profile-screen').hide();
});

// // for testing purposes
// $(document).ready(function() {
//     $('#login-screen').hide();
//     $('html').addClass('white-bg');
//     $('.js-menu-btn').hide();
//     $('.js-menu').hide();
//     $('#admin-home').hide();
//     $('#add-job-screen').hide();
//     $('#edit-job-screen').hide();
//     $('#job-list-screen-admin').show();
//     $('#add-worker-screen').hide();
//     $('#worker-list-screen').hide();
//     $('#worker-detail-screen').hide();
//     $('#edit-worker-screen').hide();
//     $('.js-worker-menu-btn').show();
//     $('.js-worker-menu').hide();
//     $('#job-list-screen-worker').show();
//     $('.js-add-note-section').hide();
//     $('#worker-profile-screen').show();
//     $('.js-change-pw-section').hide();
// });

// ----------- ADMIN SCREEN TRIGGERS ---------------------

// Handle log in information
$('#js-login-button').on('click', function(event) {
    event.preventDefault();
});

// Sign out and refresh page
$('.js-logout-link').on('click', function(event) {
    location.reload();
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

$('#add-worker-form').on('submit', function(event) {
    event.preventDefault();
    const firstName = $('#add-first-name').val();
    const lastName = $('#add-last-name').val();
    const phoneNumber = $('#add-phone-number').val();
    const address = $('#add-address').val();
    const address2 = $('#add-address-2').val();
    const city = $('#add-city').val();
    const state = $('#add-state').val();
    const zipCode = $('#add-zip-code').val();
    const email = $('#add-email').val();
    const password = $('#add-initial-pw').val();
    const type = $('input[class="add-type"]:checked').val();
    const status = $('input[class="add-status"]:checked').val();
    console.log(firstName, lastName, phoneNumber, address, address2, city, state, zipCode, email, password, type, status);
    if (firstName == "") {
        alert('Please input first name');
    } else if (lastName == "") {
        alert('Please input last name');
    } else if (phoneNumber == "") {
        alert('Please input phone number');
    } else if (address == "") {
        alert('Please input address');
    } else if (address2 == "") {
        alert('Please input address2');
    } else if (city == "") {
        alert('Please input city');
    } else if (state == "") {
        alert('Please input state');
    } else if (zipCode == "") {
        alert('Please input zip code');
    } else if (email == "") {
        alert('Please input email');
    } else if (password == "") {
        alert('Please input password');
    } else if (type == "") {
        alert('Please input type');
    } else if (status == "") {
        alert('Please input status');
    } else {
        const newUserObject = {
            firstName,
            lastName,
            phoneNumber,
            address,
            address2,
            city,
            state,
            zipCode,
            email,
            password,
            type,
            status
        };
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            .done(function(result) {
                console.log(result);
                alert('You successfully added a new user');
                // showSignInPage();
            })
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
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


// -------------- WORKER SCREEN TRIGGERS ---------------

// Open worker nav menu from headers
$('.js-worker-menu-btn').on('click', function(event) {
    $('.js-worker-menu').toggle();
    console.log('worker menu button clicked');
});

// Open Job List Screen from nav
$('.js-job-list-link').on('click', function(event) {
    showWorkerJobListScreen();
});

// Open Profile screen from nav
$('.js-profile-link').on('click', function(event) {
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
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
    $('.js-worker-menu-btn').show();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('.js-add-note-section').hide();
    $('#worker-profile-screen').show();
    $('.js-change-pw-section').hide();
});

// Open Notes section in Job List when Add Notes + Hours is clicked
// **** HOW TO TOGGLE OPEN ONLY CLOSEST NOTE SECTION??
$('.js-add-notes-btn').on('click', function(event) {
    $('.js-add-note-section').show();
});

// Hide Notes section when cancel is clicked
$('.js-notes-cancel-button').on('click', function(event) {
    $('.js-add-note-section').hide();
})

// Open Change Password section in Profile
$('.js-change-password-btn').on('click', function(event) {
    $('.js-change-pw-section').show();
});

// Hide Change Password section when cancel is clicked
$('.js-profile-cancel-button').on('click', function(event) {
    $('.js-change-pw-section').hide();
})


