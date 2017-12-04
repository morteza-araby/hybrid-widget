(function ($) {
  $(function () {
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    /**
 * Widget
 */
    // var userProfileContainer = document.getElementById('c3user-profile-container');
    // var userRoomsContainer = document.getElementById('c3user-rooms-container');
    // var chatContainer = document.getElementById('c3chat-container');
    // var callContainer = document.getElementById("c3call-container");

    // C3EventEmitter.on('change', (event) => {
    //   logme('Got Event:', event);
    //   switch (event.action) {
    //     case 'SET_CURRENT_ROOM':
    //       userRoomsContainer.style.display = 'none';
    //       break;
    //     case 'APP_CHAT_WIDGET_DESTROYED':
    //       userRoomsContainer.style.display = 'block';
    //       break;

    //     default:
    //       break;
    //   }


    // });




  }); // end of document ready
})(jQuery); // end of jQuery name space

function logme(msg, e) {
  console.log('### in Mobile view: ', msg, e);
}
