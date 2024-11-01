jQuery(document).ready(function ($) {

    $('.wec-languages').select2({
        width: '100%',
        placeholder: "All Countries",
        allowClear: true
    });

    $('.wec-select-product-cats').select2({
        width: '100%',
        placeholder: "All Categories",
        allowClear: true
    });

    $('.wec-cb-active').change(function () {
        send_ajax($(this));
    });

    function send_ajax(data) {
        var id = data.val();
        var slug = data.attr('data-slug');
        var stt = 'del';
        if (data.prop('checked')) {
            stt = 'add';
        }
        $.ajax({
            url: object_localize.ajax_url + "?action=wec_admin_action&param=change_active&id=" + id + "&slug=" + slug + "&stt=" + stt,
            method: 'POST',
            success: function (data) {
                $('.post-state').css('display', 'none');
            },
            error: function (data) {
            }
        });
    }

    $('a.page-title-action').wrap('<span class="wec-hover-dropdown-menu"></span>');
    $('a.page-title-action').append('<i class="vil-icon-play3"></i>');

    $('a.page-title-action').after('<ul class="wec-menu-dropdown">' + wec_taxonomy + '</ul>');

    var elements = $("input[name='tax_input[wec_email_template][]'"), i;
    for (i = 0; i < elements.length; i++) {
        if (elements[i].value === wec_admin_get.id) {
            elements[i].checked = true;
        }
    }

    $('.page-title-action').click(function (e) {
        e.preventDefault();
    });

});
