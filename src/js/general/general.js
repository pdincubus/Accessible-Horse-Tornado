//----------------------------------------------------
//     general mouse/keyboard accessibility fix
//----------------------------------------------------
$(document).on( 'mousedown touchdown', 'a, button, input, select, input[type=radio] + label, input[type=checkbox] + label, label, .button, textarea', function(e) {
    $(this).addClass('no-focus');
}).on('blur touchend', function(e) {
    $(this).removeClass('no-focus');
});

//----------------------------------------------------
//      steal things from:
//      http://gomakethings.com/ditching-jquery/#native-javascript-apis
//----------------------------------------------------
