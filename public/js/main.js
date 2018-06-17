
     $(function () {
        var sue= $('input[name="sue"]');

        sue.click(function () {
            $('#summary').fadeIn();
            $('#report').css("display", "none");
        });
    });


    $(function () {
        var useS = $('#use_go');
        var logS = $('#log_go');

        $('#open_chan').click(function () {
            $('#chan_write').fadeIn();
            $('#chan_opinion').css("display", "none")
        });
        $('#backtochan').click(function () {
            $('#chan_opinion').fadeIn();
            $('#chan_write').css("display", "none")
        });
        
        $('#open_ban').click(function () {
            $('#ban_write').fadeIn();
            $('#ban_opinion').css("display", "none")
        });
        $('#backtoban').click(function () {
            $('#ban_opinion').fadeIn();
            $('#ban_write').css("display", "none")
        });

        logS.click(function () {
            $('#alerts').fadeIn();
            $('#log_go').css("border-bottom", "solid 5px #996ec4");
            $('#create_debate').css("display", "none");
            $('#use_go').css("border-bottom", "none");
        });
        useS.click(function () {
            $('#create_debate').fadeIn();
            $('#alerts').css("display", "none");
            $('#log_go').css("border-bottom", "none");
            $('#use_go').css("border-bottom", "solid 5px #996ec4");

        });
    });

$(function () {
        
        $('#agree').click(function () {
            $('#chan').css("background-color", "#6e72c4")
            $('#chan').css("color", "#fff")
            $('#ban').css("background", "#fff");
            $('#ban').css("color", "#c46e6e");
        });
        $('#oppose').click(function () {
            $('#ban').css("background", "#c46e6e")
            $('#ban').css("color", "#fff")
            $('#chan').css("background", "#fff");
            $('#chan').css("color", "#6e72c4");
        });
    });
    
//ajax 토론생성
    $('#login').click(function() {
      $.ajax({
        url: '/login',
        dataType: 'json',
        type: 'POST',
        data: {
          user_id: $("#user_id").val(),
          user_pw: $("#user_pw").val(),
        },
        success: function(response) {

        }
      });
    })
    