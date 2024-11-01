<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 14/01/2019
 * Time: 8:33 SA
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$mailer = new WEC_Mailer();

//$option = get_option( WEC_OPTION );
//$temp_id   = reset( $option['list_temp_active'][$email->id] );
//$temp_id   = $mailer->email_rules( $email->id, $order );
$temp_id   = $mailer->email_follow_locate( $email->id );
$template  = get_post( $temp_id )->post_content;
$check_CPT = get_post( $temp_id )->post_type;

if ( ! empty( $template ) && $check_CPT == 'wec_email_customizer' ) {
	?>
    <!DOCTYPE html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>"/>
        <title><?php echo get_bloginfo( 'name', 'display' ); ?></title>
    </head>
    <body>
	<?php

	echo $mailer->over_write( $template, $order, $sent_to_admin, $plain_text, $email );

	?>
    </body>
    </html>
	<?php
} else {

	do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

	<?php /* translators: %1$s: Customer full name. %2$s: Order numer */ ?>
    <p><?php printf( esc_html__( 'Alas. Just to let you know &mdash; %1$s has cancelled order #%2$s:', 'woocommerce' ), esc_html( $order->get_formatted_billing_full_name() ), esc_html( $order->get_order_number() ) ); ?></p>

	<?php

	/*
	 * @hooked WC_Emails::order_details() Shows the order details table.
	 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
	 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
	 * @since 2.5.0
	 */
	do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

	/*
	 * @hooked WC_Emails::order_meta() Shows order meta data.
	 */
	do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

	/*
	 * @hooked WC_Emails::customer_details() Shows customer details
	 * @hooked WC_Emails::email_address() Shows email address
	 */
	do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );
	?>
    <p>
		<?php esc_html_e( 'Thanks for reading.', 'woocommerce' ); ?>
    </p>
	<?php

	/*
	 * @hooked WC_Emails::email_footer() Output the email footer
	 */
	do_action( 'woocommerce_email_footer', $email );

}