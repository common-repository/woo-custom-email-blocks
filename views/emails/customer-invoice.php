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
$temp_id   = $mailer->email_rules( 'customer_invoice', $order );
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

	if ( $order->has_status( 'pending' ) ) {
		$order_customer_invoice = "<a href='" . esc_url( $order->get_checkout_payment_url() ) . "'>" . esc_html__( 'Pay for this order when you’re ready', 'woo-email-customizer' ) . "</a>";
	} else {
		$order_customer_invoice = '';
	}

	$template = str_replace( '{pay_for_this_order}', $order_customer_invoice, $template );
	echo $mailer->over_write( $template, $order, $sent_to_admin, $plain_text, $email );

	?>
    </body>
    </html>
	<?php
} else {

	/**
	 * Executes the e-mail header.
	 *
	 * @hooked WC_Emails::email_header() Output the email header
	 */
	do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

	<?php /* translators: %s: Customer first name */ ?>
    <p><?php printf( esc_html__( 'Hi %s,', 'woocommerce' ), esc_html( $order->get_billing_first_name() ) ); ?></p>

	<?php if ( $order->has_status( 'pending' ) ) { ?>
        <p>
			<?php
			printf(
				wp_kses(
				/* translators: %1$s Site title, %2$s Order pay link */
					__( 'An order has been created for you on %1$s. Your invoice is below, with a link to make payment when you’re ready: %2$s', 'woocommerce' ),
					array(
						'a' => array(
							'href' => array(),
						),
					)
				),
				esc_html( get_bloginfo( 'name', 'display' ) ),
				'<a href="' . esc_url( $order->get_checkout_payment_url() ) . '">' . esc_html__( 'Pay for this order', 'woocommerce' ) . '</a>'
			);
			?>
        </p>

	<?php } else { ?>
        <p>
			<?php
			/* translators: %s Order date */
			printf( esc_html__( 'Here are the details of your order placed on %s:', 'woocommerce' ), esc_html( wc_format_datetime( $order->get_date_created() ) ) );
			?>
        </p>
		<?php
	}

	/**
	 * Hook for the woocommerce_email_order_details.
	 *
	 * @hooked WC_Emails::order_details() Shows the order details table.
	 * @hooked WC_Structured_Data::generate_order_data() Generates structured data.
	 * @hooked WC_Structured_Data::output_structured_data() Outputs structured data.
	 * @since 2.5.0
	 */
	do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

	/**
	 * Hook for the woocommerce_email_order_meta.
	 *
	 * @hooked WC_Emails::order_meta() Shows order meta data.
	 */
	do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

	/**
	 * Hook for woocommerce_email_customer_details.
	 *
	 * @hooked WC_Emails::customer_details() Shows customer details
	 * @hooked WC_Emails::email_address() Shows email address
	 */
	do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

	?>
    <p>
		<?php esc_html_e( 'Thanks for reading.', 'woocommerce' ); ?>
    </p>
	<?php

	/**
	 * Executes the email footer.
	 *
	 * @hooked WC_Emails::email_footer() Output the email footer
	 */
	do_action( 'woocommerce_email_footer', $email );

}