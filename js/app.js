$(window).load(function(){
    localStorageOut();

    $("#globalText").keypress(function(event) {
        var text = $(this).val();
        if ( event.which == 13 ) {
            schowMain();

            if (text !== '') {
                $('#form').append('<li>'
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
            localStorageIn();
            countItemCheck();
        }

        $('.btn-x').click(function() {
            $(this).parent().remove();
            localStorageIn();
            countItemCheck();
            hideMain();
        });
        $('.btn-edit').click(function() {
            $('.gray-block').show();
            $('.popover').show();
        });

    });
    $('#btn-checkall').click(function() {
        checkAllOut();
        countItemCheck();
        showBtnCompleted();
    });
    $('.btn-clear-completed').click(function() {
        var formCheckbox = $('li input:checkbox');

        for (var i = 0; i < formCheckbox.length; i++) {
            if (formCheckbox[i].checked == true){
                $('#form li')[i].remove();
                countItemCheck();
                localStorageIn();
            }

        }
        hideMain();
        /*$('#form').empty();
        hideMain();*/

    });
    $('.btn-show-all').click(function() {
        $('li').removeClass('li-active');
        $('li').removeClass('li-completed');
        countItemCheck();
    });
    $('.btn-active').click(function() {
        showActive();
        countItemCheck();
    });
    $('.btn-completed').click(function() {
        showCompleted();
        countItemCheck();
    });
    $('.btn-popover-x').click(function() {
        $('.gray-block').hide();
        $('.popover').hide();
    });
    $('.btn-x').click(function() {
        $(this).parent().remove();
        localStorageIn();
        countItemCheck();
        hideMain();
    });
    $('.btn-edit').click(function() {
        $('.gray-block').show();
        $('.popover').show();
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

    function showBtnCompleted(){
        if($('.li-completed').length > 0){
            $('.btn-clear-completed').show();
        }
    }

    function localStorageIn() {
        if ($("#form").html() !== null) {
            /*localStorage["myKey"] = JSON.stringify($("#form").html());*/
            localStorage.setItem('myKey', $("#form").html());
            countItemCheck();
        }
    }
    function localStorageOut() {
        if (localStorage["myKey"] != null) {
            /*$("#form").html(JSON.parse(localStorage["myKey"]));*/
            $("#form").html(localStorage.getItem('myKey'));
            countItemCheck();
        }
    }
    function hideMain() {
        if ($('li input:checkbox').length == 0) {
            $('#main').hide();
            $('#footer').hide();
        }
    }

    $(function() {
        $("ul#form").sortable();
    });



});