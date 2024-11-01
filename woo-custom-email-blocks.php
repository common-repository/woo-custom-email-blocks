<?php
/**
 *Plugin Name: Custom Email Blocks for WooCommerce
 *Plugin URI: https://villatheme.com/extensions/woocommerce-custom-email-blocks/
 *Description: Custom Email Blocks for WooCommerce plugin helps create your own professional email design & content for all your outgoing emails
 *Version: 1.0.1
 *Author: VillaTheme
 *Author URI: https://villatheme.com
 *Text Domain: woo-custom-email-blocks
 *Domain Path: /languages
 *Copyright 2019 VillaTheme.com. All rights reserved.
 *Tested up to: 5.2
 * WC tested up to: 3.5.7
 **/
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
define( 'VI_WCEB_VERSION', '1.0.1' );
/**
 * Detect plugin. For use on Front End only.
 */
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
global $wp_version;
$wp = '5.0';

if ( ! defined( 'VI_WCEB_PRE_VERSION' ) ) {

	if ( is_plugin_active( 'woocommerce/woocommerce.php' ) && version_compare( $wp_version, $wp, '>' ) ) {
		$init_file = WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . "woo-custom-email-blocks" . DIRECTORY_SEPARATOR . "includes" . DIRECTORY_SEPARATOR . "define.php";
		require_once $init_file;

		register_activation_hook( __FILE__, array( 'WEC_Email_Admin_Settings', 'wec_activation' ) );

		add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'wec_add_action_links' );
		function wec_add_action_links( $links ) {
			$mylinks = array(
				'<a href="' . admin_url( 'edit.php?post_type=wec_email_customizer' ) . '">' . __( 'Settings', 'woo-custom-email-blocks' ) . '</a>',
			);

			return array_merge( $links, $mylinks );
		}

	} else {

		if ( ! function_exists( 'wceb_notification' ) ) {
			function wceb_notification() {
				?>
				<div id="message" class="error">
					<p><?php _e( 'Please install and activate WooCommerce or update WordPress to version 5.0 or higher to use Custom Email Blocks for WooCommerce.', 'woo-custom-email-blocks' ); ?></p>
				</div>
				<?php
			}
		}
		add_action( 'admin_notices', 'wceb_notification' );
	}
} else {
	deactivate_plugins( plugin_basename( __FILE__ ) );

}