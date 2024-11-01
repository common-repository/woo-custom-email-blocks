import {wec_email_blocks} from "./components/email-blocks";
import {wec_header} from "./components/header";
import {wec_text} from "./components/text";
import {wec_inner_block} from "./components/inner";
import {wec_order_items} from "./components/order-items";
import {wec_order_total} from "./components/order-total";
import {wec_products} from "./components/products";
import {wec_socials} from "./components/socials";
import {wec_billing_address} from "./components/billing-address";
import {wec_shipping_address} from "./components/shipping-address";
import {wec_order_address} from "./components/order-address";
import {wec_columns, wec_column} from "./components/columns";
import {wec_store_info} from "./components/store-info";

wec_email_blocks();
wec_header();
wec_text();
wec_inner_block();
wec_order_items();
wec_order_total();
wec_products();
wec_socials();
wec_billing_address();
wec_shipping_address();
wec_columns();
wec_column();
wec_order_address();
wec_store_info();


function sendTestmail() {
    var headerToolbar = document.querySelector('.edit-post-header-toolbar');
    headerToolbar.insertAdjacentHTML('beforeend', '<button class="wec-change-template-btn components-button is-button is-primary is-large">Send test email</button>' +
        '  To: <input class="wec-email-address" type="email"/><img width="32" class="wec-loading-icon" src="' + object_localize.image_path + 'loading.gif" />');

    jQuery('.wec-change-template-btn').click(function () {
        var email_content = wp.data.select("core/editor").getEditedPostContent();
        var subject = (jQuery('.editor-post-title__input').val());
        var mail_to = (jQuery('.wec-email-address').val());

        if (validate_email(mail_to)) {
            jQuery.ajax({
                type: 'post',
                url: object_localize.ajax_url,
                data: {
                    content: email_content,
                    subject: subject,
                    mail_to: mail_to
                },
                success: function (result) {
                    console.log((result));
                },
                error: function (result) {
                    alert(result);
                },
                beforeSend: function () {
                    jQuery('.wec-loading-icon').show();
                },
                complete: function () {
                    jQuery('.wec-loading-icon').hide();
                }
            })
        } else {
            jQuery('.wec-email-address').val('');
            alert('Email is not valid');
        }

    });

    function validate_email(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // jQuery('.editor-post-publish-panel__toggle, .editor-post-publish-button, .editor-post-save-draft, .editor-post-switch-to-draft').click(function () {
    //     alert('You are not able to save.');
    //     return false;
    // });
    //
    //
    // jQuery('.editor-post-save-draft').click(function () {
    //     alert('You are not able to save.');
    //     return false;
    // });


}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        sendTestmail();
    }, 10)
});
