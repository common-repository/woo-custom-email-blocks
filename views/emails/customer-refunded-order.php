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
$temp_id    = $mailer->email_rules( 'customer_refunded_order', $order );
$template   = get_post( $temp_id )->post_content;
$check_CPT  = get_post( $temp_id )->post_type;

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

	/*
	 * @hooked WC_Emails::email_header() Output the email header
	 */
	do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

	<?php /* translators: %s: Customer first name */ ?>
    <p><?php printf( __( 'Hi %s,', 'woocommerce' ), $order->get_billing_first_name() ); ?></p><?php // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	?>

    <p>
		<?php
		if ( $partial_refund ) {
			/* translators: %s: Site title */
			printf( __( 'Your order on %s has been partially refunded. There are more details below for your reference:', 'woocommerce' ), wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES ) ); // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
		} else {
			/* translators: %s: Site title */
			printf( __( 'Your order on %s has been refunded. There are more details below for your reference:', 'woocommerce' ), wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES ) ); // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
		}
		?>
    </p>
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
		<?php _e( 'We hope to see you again soon.', 'woocommerce' ); // phpcs:ignore WordPress.XSS.EscapeOutput
		?>
    </p>
	<?php

	/*
	 * @hooked WC_Emails::email_footer() Output the email footer
	 */
	do_action( 'woocommerce_email_footer', $email );

}