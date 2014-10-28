/**
 * Created by tomasnagy on 23/10/14.
 */
$(document).ready(function() {

    $('input[type="submit"]').on('click', function() {
        $.ajax({
            dataType: 'json',
            url: 'http://localhost:8080/apiData',
            data: $('form').serialize(),
            success: function(items) {

            }
        });
        return false;
    });

});
