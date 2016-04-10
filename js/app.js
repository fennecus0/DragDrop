$(window).load(function(){

    var span;
    var data = localStorageOut();
    data.forEach(function(el) {
        addElement(null, el.name);
    });

    $("#globalText").keypress(addElement);

    function addElement(event, hardcodedText) {
        var text = event ? $(event.target).val() : hardcodedText;
        if ( event && event.which == 13 || hardcodedText ) {
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
                if (event) {
                    $(event.target).val('');
                    localStorageIn(text);
                }
            }
            countItemCheck();
        }
        $('.btn-x').click(function(event) {
            $(event.target).parent().remove();
            localStorageIn();
            countItemCheck();
            hideMain();
        });
    }

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
    $('#form').click(editValue);
    $('.btn-submit').click(function() {
        span.html($('#addtext').val());
        localStorageIn();
        $('.gray-block').hide();
        $('.popover').hide();
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




    function localStorageIn(text) {
        var data = localStorageOut();
        data.push({'name': text});
        localStorage.setItem('todos', JSON.stringify(data));
    }

    function localStorageOut() {
        return JSON.parse(localStorage.getItem('todos')) || [];
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
    function editValue(event) {
        var target = $(event.target);
        if (target.is(".btn-edit")) {
            span = target.siblings().find('span');
            $('#addtext').val(span.html());
            $('.gray-block').show();
            $('.popover').show();
        }
    }
});
