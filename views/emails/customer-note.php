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
$mailer    = new WEC_Mailer();
$temp_id   = $mailer->email_rules( 'customer_note', $order );
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

	$order_customer_note = "<blockquote>" . wpautop( wptexturize( $customer_note ) ) . "</blockquote>";

	$template = str_replace( '{customer_note}', $order_customer_note, $template );

	echo $mailer->over_write( $template, $order, $sent_to_admin, $plain_text, $email );

	?>
    </body>
    </html>
	<?php
} else {

	/*
	 * @hooked WC_Emails::email_header() Output the email header
	 */
	do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

	<?php /* translators: %s: Customer first name */ ?>
    <p><?php printf( esc_html__( 'Hi %s,', 'woocommerce' ), esc_html( $order->get_billing_first_name() ) ); ?></p>
    <p><?php esc_html_e( 'The following note has been added to your order:', 'woocommerce' ); ?></p>

    <blockquote><?php echo wpautop( wptexturize( $customer_note ) ); ?></blockquote><?php // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	?>

    <p><?php esc_html_e( 'As a reminder, here are your order details:', 'woocommerce' ); ?></p>

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
    <p><?php esc_html_e( 'Thanks for reading.', 'woocommerce' ); ?></p>
	<?php

	/*
	 * @hooked WC_Emails::email_footer() Output the email footer
	 */
	do_action( 'woocommerce_email_footer', $email );

}