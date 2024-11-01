<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 15/01/2019
 * Time: 3:17 CH
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!-- wp:wec/woo-email-blocks {"enable_width":true,"out_bg_color":"#dddddd","in_bg_color":"#ffffff"} -->
<div style="background-color:#dddddd;padding:4% 4% 4% 4% " class="wp-block-wec-woo-email-blocks"><div style="width:600px;height:undefinedpx;min-height:100px;margin:auto;background-color:#ffffff;border:0px solid undefined;max-width:100%;background-image:url();background-size:cover;border-radius:0px;font-family:Lato, sans-serif"><!-- wp:wec/header {"padding_top":0,"padding_bottom":0,"out_bg_color":"#222222","in_bg_color":"#222222","content":"Home &nbsp;&nbsp;&nbsp;Shop &nbsp;&nbsp;&nbsp;Services &nbsp;&nbsp;&nbsp;About","alignment":"right","text_color":"#ffffff","mediaURL":"%%domain%%/woo-custom-email-blocks/assets/img/sample-logo.png","mediaID":1} -->
        <div style="background-color:#222222;padding:0% 4% 0% 4% " class="wp-block-wec-header"><div style="width:undefinedpx;height:undefinedpx;margin:auto;background-color:#222222;text-align:right;border:0px solid undefined;max-width:100%;color:#ffffff;font-size:14px;line-height:1.5;border-radius:0px;overflow:hidden"><table style="width:100%"><tr><td style="width:30%;text-align:right;padding:10px 0"><div><img style="width:100%" src="%%domain%%/woo-custom-email-blocks/assets/img/sample-logo.png"/></div></td><td style="width:70%;text-align:right;color:#ffffff;font-size:14px;vertical-align:middle"><div>Home &nbsp;&nbsp;&nbsp;Shop &nbsp;&nbsp;&nbsp;Services &nbsp;&nbsp;&nbsp;About</div></td></tr></table></div></div>
        <!-- /wp:wec/header -->

        <!-- wp:wec/inner-block {"enable_width":true,"padding_left":0,"padding_right":0,"padding_top":0,"mediaURL":"%%domain%%/woo-custom-email-blocks/assets/img/sample-background.jpg"} -->
        <div style="padding:0% 0% 4% 0% " class="wp-block-wec-inner-block"><div style="width:undefinedpx;height:undefinedpx;min-height:100px;margin:auto;border:0px solid undefined;max-width:100%;background-image:url(%%domain%%/woo-custom-email-blocks/assets/img/sample-background.jpg);background-size:cover;border-radius:0px"><!-- wp:wec/text {"content":"Cancelled Order","alignment":"center","text_color":"#ffffff","font_size":30} -->
                <div style="padding:4% 4% 4% 4% " class="wp-block-wec-text"><div style="width:undefinedpx;height:undefinedpx;margin:auto;text-align:center;border:0px solid undefined;max-width:100%;color:#ffffff;font-size:30px;line-height:1.5;border-radius:0px;opacity:1;padding:0% 0">Cancelled Order</div></div>
                <!-- /wp:wec/text -->

                <!-- wp:wec/text {"content":"Alas. Just to let you know — {customer_name} has cancelled order ","alignment":"center","text_color":"#ffffff"} -->
                <div style="padding:4% 4% 4% 4% " class="wp-block-wec-text"><div style="width:undefinedpx;height:undefinedpx;margin:auto;text-align:center;border:0px solid undefined;max-width:100%;color:#ffffff;font-size:14px;line-height:1.5;border-radius:0px;opacity:1;padding:0% 0">Alas. Just to let you know — {customer_name} has cancelled order </div></div>
                <!-- /wp:wec/text -->

                <!-- wp:wec/text {"padding_left":28,"padding_right":28,"padding_bottom":8,"border_width":5,"border_color":"#f7c11d","border_radius":10,"content":"Order Number: #{order_number}","alignment":"center","text_color":"#ffffff","font_size":16,"text_padding":5} -->
                <div style="padding:4% 28% 8% 28% " class="wp-block-wec-text"><div style="width:undefinedpx;height:undefinedpx;margin:auto;text-align:center;border:5px solid #f7c11d;max-width:100%;color:#ffffff;font-size:16px;line-height:1.5;border-radius:10px;opacity:1;padding:5% 0">Order Number: #{order_number}</div></div>
                <!-- /wp:wec/text --></div></div>
        <!-- /wp:wec/inner-block -->

        <!-- wp:wec/order-items {"padding_bottom":0,"border_width":1,"border_color":"#e2e2e2","th_text_color":"#ffffff","th_bg_color":"#000000","tbody_bg_color":"#fcfcfc","border_bottom_width":1,"border_bottom_color":"#e2e2e2"} -->
        <div style="padding:4% 4% 0% 4% " class="wp-block-wec-order-items"><div style="width:undefinedpx;height:undefinedpx;margin:auto;max-width:100%;line-height:1.5;border-radius:0px"><table style="width:100%;border-collapse:collapse;margin:0;border:1px solid #e2e2e2;table-layout:fixed"><thead style="background-color:#000000;color:#ffffff;font-size:14px"><tr><th style="text-align:left;padding:15px;background-color:#000000">PRODUCT</th><th style="text-align:left;padding:15px;background-color:#000000">DESCRIPTION</th><th style="text-align:center;padding:15px;background-color:#000000">QTY</th><th style="text-align:center;padding:15px;background-color:#000000">PRICE</th></tr></thead><tbody style="background-color:#fcfcfc;font-size:14px">%%order_items<tr style="border-bottom:1px solid #e2e2e2"><td style="text-align:left;padding:5px 15px;vertical-align:middle"><div style="text-align:center;width:fit-content;border:1px solid #eee;padding:5px"><img style="width:100%;max-width:100px" src="%%product_image%%"/></div></td><td style="text-align:left;padding:5px 15px;vertical-align:middle">%%product_name%%</td><td style="text-align:center;padding:5px 15px;vertical-align:middle">%%product_quantity%%</td><td style="text-align:center;padding:5px 15px;vertical-align:middle">%%product_price%%</td></tr>%%</tbody></table></div></div>
        <!-- /wp:wec/order-items -->

        <!-- wp:wec/order-total {"padding_top":0,"border_width":1,"border_color":"#e2e2e2","in_bg_color":"#fcfcfc","alignment_left":"right","alignment_right":"left","text_color":"#000000"} -->
        <div style="padding:0% 4% 4% 4% " class="wp-block-wec-order-total"><div style="width:undefinedpx;height:undefinedpx;margin:auto;background-color:#fcfcfc;border:1px solid #e2e2e2;max-width:100%;color:#000000;font-size:14px;line-height:1;border-radius:0px;padding:10px"><table style="width:100%">%%order_total<tr><td style="text-align:right;font-weight:bold;padding:5px 30px">%%total_title%%</td><td style="text-align:left;padding:5px 30px">%%total_value%%</td></tr>%%</table></div></div>
        <!-- /wp:wec/order-total -->

        <!-- wp:wec/order-address {"border_width":1,"border_color":"#e2e2e2","in_bg_color":"#fcfcfc","heading_color":"#ff0000"} -->
        <div style="padding:4% 4% 4% 4% " class="wp-block-wec-order-address"><div style="width:undefinedpx;height:undefinedpx;margin:auto;max-width:100%;line-height:1.5"><table style="width:100%;table-layout:fixed"><tr><td style="width:48%;padding:10px;border:1px solid #e2e2e2;border-radius:0px;background-color:#fcfcfc"><div style="font-weight:bold;color:#ff0000;font-size:15px;padding-bottom:5px">BILLING ADDRESS</div><div style="font-size:13px">%%order_billing%%</div></td><td style="padding:10px"></td><td style="width:48%;vertical-align:top !important;padding:10px;border:1px solid #e2e2e2;border-radius:0px;background-color:#fcfcfc"><div style="font-weight:bold;color:#ff0000;font-size:15px;padding-bottom:5px">SHIPPING ADDRESS</div><div style="font-size:13px">%%order_shipping%%</div></td></tr></table></div></div>
        <!-- /wp:wec/order-address -->

        <!-- wp:wec/text {"out_bg_color":"#222222","content":"Thank for reading!","alignment":"center","text_color":"#ffffff","font_size":18} -->
        <div style="background-color:#222222;padding:4% 4% 4% 4% " class="wp-block-wec-text"><div style="width:undefinedpx;height:undefinedpx;margin:auto;text-align:center;border:0px solid undefined;max-width:100%;color:#ffffff;font-size:18px;line-height:1.5;border-radius:0px;opacity:1;padding:0% 0">Thank for reading!</div></div>
        <!-- /wp:wec/text --></div></div>
<!-- /wp:wec/woo-email-blocks -->