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
//     $('.js-menu-btn').show();
//     $('.js-menu').hide();
//     $('#admin-home').show();
//     $('#add-job-screen').hide();
//     $('#edit-job-screen').hide();
//     $('#job-list-screen-admin').hide();
//     $('#add-worker-screen').hide();
//     $('#worker-list-screen').hide();
//     $('#worker-detail-screen').hide();
//     $('#edit-worker-screen').hide();
//     $('.js-worker-menu-btn').hide();
//     $('.js-worker-menu').hide();
//     $('#job-list-screen-worker').hide();
//     $('.js-add-note-section').hide();
//     $('#worker-profile-screen').hide();
//     $('.js-change-pw-section').hide();
// });

// ----------- ADMIN SCREEN TRIGGERS ---------------------

// Handle log in information
$('#js-login-button').on('click', function(event) {
    event.preventDefault();
    const inputEmail = $('input[name="js-userName"]').val();
    const inputPw = $('input[name="js-userPw"]').val();
    // check for spaces, undefined
    if((!inputEmail) || (inputEmail.length < 1) || (inputEmail.indexOf(' ') > 0)) {
        alert('Invalid Email')
    } 
    else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
        alert('Invalid password')
    } else {
        const loginObject = {
            email: inputEmail,
            password: inputPw
        };
        console.log(loginObject);
        $.ajax({
            type: 'POST',
            url: '/signin',
            dataType: 'json',
            data: JSON.stringify(loginObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result.type);
            if (result.type == 'worker') {
                showWorkerJobListScreen();
            } else {
                showAdminLandingScreen();
            }
        })
        .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                    alert('Invalid username and password combination. Pleae check your username and password and try again.');
        });
    }
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


//Add Job Data to database
$('#add-job-form').on('submit', function(event) {
    event.preventDefault();
    const jobName = $('#add-job-name option:selected').text();
    const services = [];
    $('input[name="add-service"]:checked').each(function(i,e){
        services.push( $(e).attr('value') )
    })
    const serviceDate = $('#date-select').val();
    const assignTo = [];
    $('input[name="assign-to"]:checked').each(function(i,e){
        assignTo.push( $(e).attr('value') )
    })
    const jobNotes = $('#add-notes').val();
    if (jobName == "") {
        alert('Please select boat');
    } else if (services == "") {
        alert('Please select service');
    } else if (serviceDate == "") {
        alert('Please select service date');
    } else if (assignTo == "") {
        alert('Please select workers');
    } else {
        const newJobObject = {
           jobName, 
           services, 
           serviceDate, 
           assignTo, 
           jobNotes 
        };
        $.ajax({
            type: 'POST',
            url: '/jobs/create',
            dataType: 'json',
            data: JSON.stringify(newJobObject),
            contentType: 'application/json'
        })
        .done(function(result) {
            console.log(result);
            alert('You successfully added a new job');
            showAdminLandingScreen();
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    }
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


// Add worker data to database
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
                showAdminLandingScreen();
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
    $('#js-edit-profile-section').hide();
});

// Open Notes section in Job List when Add Notes + Hours is clicked
$('.js-add-notes-btn').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('.js-add-note-section').show();
    $('textarea').focus();
});

// Hide Notes section when cancel is clicked
$('.js-notes-cancel-button').on('click', function(event) {
    event.preventDefault();
    $('.js-add-note-section').hide();
})

// Open Edit Profile section in Profile
$('.js-edit-profile-btn').on('click', function(event) {
    $('#js-edit-profile-section').show();
    $('#js-profile').hide();
    $('#edit-profile-phone-number').focus();
});

// Hide Edit Profile section when cancel is clicked
$('.js-profile-cancel-button').on('click', function(event) {
    $('#js-edit-profile-section').hide();
    $('#js-profile').show();

})


