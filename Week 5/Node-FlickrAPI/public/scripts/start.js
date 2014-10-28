/**
 * Created by tomasnagy on 23/10/14.
 */
$(document).ready(function() {

    $('button').on('click', function() {
        $.ajax({
            dataType: 'json',
            url: 'http://localhost:8080/apiData',
            data: $('form').serialize(),
            success: function(items) {
                var i,
                    l = items.items.length,
                    imagecontainer,
                    htmlBuilder = '';

                imagecontainer = document.getElementById('imagecontainer');

                for(i = 0; i < l; i++) {
                    console.log(items.items[i].media.m);
                    htmlBuilder += '<img src="' + items.items[i].media.m + '" />'
                }

                imagecontainer.innerHTML = htmlBuilder;
            }
        });
        return false;
    });

});
