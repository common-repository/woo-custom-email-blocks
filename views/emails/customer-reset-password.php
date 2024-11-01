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
$temp_id   = $mailer->email_follow_locate( 'customer_reset_password' );
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

	$site_title       = esc_html( get_bloginfo( 'name', 'display' ) );
	$order_user_login = esc_html( $user_login );

	$link = esc_url( add_query_arg(
		array( 'key' => $reset_key, 'id' => $user_id ),
		wc_get_endpoint_url( 'lost-password', '', wc_get_page_permalink( 'myaccount' ) ) ) );

	$order_link_reset = "<a class='link' href='" . $link . "' >" . __( 'Click here to reset your password', 'woo-email-customizer' ) . "</a>";

	$order_account_page = make_clickable( esc_url( wc_get_page_permalink( 'myaccount' ) ) );
	if ( 'yes' == get_option( 'woocommerce_registration_generate_password' ) && $password_generated ) {
		$order_user_pass = "<strong>" . esc_html( $user_pass ) . "</strong>";
	} else {
		$order_user_pass = '';
	}

	$arr_searches = array( '{customer_name}', '{new_password}', '{account_page}', '{reset_password_link}' );
	$arr_replaces = array( esc_html( $user_login ), '', $order_account_page, $order_link_reset );

	$result = str_replace( $arr_searches, $arr_replaces, $template );

	$result = $mailer->over_write_no_order( $result, $email );
	echo $result;

	?>
    </body>
    </html>
	<?php
} else {
	do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

	<?php /* translators: %s: Customer first name */ ?>
    <p><?php printf( esc_html__( 'Hi %s,', 'woocommerce' ), esc_html( $user_login ) ); ?>
		<?php /* translators: %s: Store name */ ?>
    <p><?php printf( esc_html__( 'Someone has requested a new password for the following account on %s:', 'woocommerce' ), esc_html( wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES ) ) ); ?></p>
	<?php /* translators: %s Customer username */ ?>
    <p><?php printf( esc_html__( 'Username: %s', 'woocommerce' ), esc_html( $user_login ) ); ?></p>
    <p><?php esc_html_e( 'If you didn\'t make this request, just ignore this email. If you\'d like to proceed:', 'woocommerce' ); ?></p>
    <p>
        <a class="link" href="<?php echo esc_url( add_query_arg( array(
			'key' => $reset_key,
			'id'  => $user_id
		), wc_get_endpoint_url( 'lost-password', '', wc_get_page_permalink( 'myaccount' ) ) ) ); ?>"><?php // phpcs:ignore
			?>
			<?php esc_html_e( 'Click here to reset your password', 'woocommerce' ); ?>
        </a>
    </p>
    <p><?php esc_html_e( 'Thanks for reading.', 'woocommerce' ); ?></p>

	<?php do_action( 'woocommerce_email_footer', $email );

}