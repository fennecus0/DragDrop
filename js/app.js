$(document).ready(function(){
    $("#globalText").keypress(function(event) {
        var text = $(this).val();
        if ( event.which == 13 ) {
            schowMain();

            if (text !== '') {
                $('#form').append('<li class="">'
                    +'<div class="checkBlock">'
                    + '<label>'
                    + '<input type="checkbox" id="checkInput">'
                    + '<span>' + text + '</span>'
                    + '</label>'
                    + '</div>'
                    + '<button type="button" class="btn-edit"></button>'
                    + '<button type="button" class="btn-x">x</button>'
                    + '</li>');
                $(this).val('');
            }
            countItemCheck();
        }

        $('.btn-x').click(function() {
            $(this).parent().remove();
            countItemCheck();
        });
        $('.btn-edit').click(function() {
            $('.gray-block').show();
            $('.popover').show();
        });
        $('.btn-popover-x').click(function() {
            $('.gray-block').hide();
            $('.popover').hide();
        });
    });
    $('#btn-checkall').click(function() {
        checkAllOut();
        countItemCheck();
    });
    $('.btn-yellow').click(function() {
        $('#form').empty();
        hideMain();
        countItemCheck();
    });
    $('.btn-danger').click(function() {
        $('li').removeClass('li-active');
        $('li').removeClass('li-completed');
        countItemCheck();
    });
    $('.btn-green').click(function() {
        showActive();
        countItemCheck();
    });
    $('.btn-gray').click(function() {
        showCompleted();
        countItemCheck();
    });


    function schowMain() {
        $('#main').show();
        $('#footer').show();
    }
    function countItemCheck () {
        var countItemCheck = 0,
            fotmInput = $('#form input:checkbox');

        for (var i = 0; i < fotmInput.length; i++) {
            if (fotmInput[i].checked == false){
                countItemCheck+=1;
            }

        }
        return($('.todoCountAll i').html(countItemCheck));
    }
    function showActive(){
        for (var i = 0; i < $('#form li').length; i++) {
            if($('#form input').eq(i).prop('checked') == true){
                $('#form li').eq(i).addClass('li-active');
            } else {
                $('#form li').eq(i).removeClass('li-completed');
            }
        }
    }
    function showCompleted(){
        for (var i = 0; i < $('#form li').length; i++) {
            if($('#form input').eq(i).prop('checked') == false){
                $('#form li').eq(i).addClass('li-completed');
            } else {
                $('#form li').eq(i).removeClass('li-active');
            }
        }
    }
    function checkAllOut(){
        if($(':checked').length == $('#form li').length){
            $('#form input').prop( "checked", false );
        } else if($(':checked').length !== $('#form li').length){
            $('#form input').prop( "checked", true );
        }
    }

    /*    function hideMain() {
     $('#main').hide();
     $('#footer').hide();
     }*/


    $(function() {
        $("ul#form").sortable();
    });
});