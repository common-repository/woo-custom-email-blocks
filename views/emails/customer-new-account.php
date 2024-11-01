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
	$product_data = new WEC_Data_API();

	$order_account_page = make_clickable( esc_url( wc_get_page_permalink( 'myaccount' ) ) );
	if ( 'yes' == get_option( 'woocommerce_registration_generate_password' ) && $password_generated ) {
		$order_user_pass = "<strong>" . esc_html( $user_pass ) . "</strong>";
	} else {
		$order_user_pass = '';
	}

	$arr_searches = array( '{customer_name}', '{new_password}', '{account_page}', '{reset_password_link}' );
	$arr_replaces = array( esc_html( $user_login ), $order_user_pass, $order_account_page, '' );

	$result = str_replace( $arr_searches, $arr_replaces, $template );

	$result = $mailer->over_write_no_order( $result, $email );

	echo $result;
	?>
    </body>
    </html>
	<?php

} else {

	do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

	<?php /* translators: %s Customer first name */ ?>
    <p><?php printf( esc_html__( 'Hi %s,', 'woocommerce' ), esc_html( $user_login ) ); ?></p>
	<?php /* translators: %1$s: Site title, %2$s: Username, %3$s: My account link */ ?>
    <p><?php printf( __( 'Thanks for creating an account on %1$s. As a reminder, the username you chose is %2$s. You can access your account area to view orders, change your password, and more at: %3$s', 'woocommerce' ), esc_html( $blogname ), '<strong>' . esc_html( $user_login ) . '</strong>', make_clickable( esc_url( wc_get_page_permalink( 'myaccount' ) ) ) ); ?></p><?php // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	?>

	<?php if ( 'yes' === get_option( 'woocommerce_registration_generate_password' ) && $password_generated ) : ?>
		<?php /* translators: %s Auto generated password */ ?>
        <p><?php printf( esc_html__( 'Your password has been automatically generated: %s', 'woocommerce' ), '<strong>' . esc_html( $user_pass ) . '</strong>' ); ?></p>
	<?php endif; ?>

    <p><?php esc_html_e( 'We look forward to seeing you soon.', 'woocommerce' ); ?></p>

	<?php
	do_action( 'woocommerce_email_footer', $email );
}