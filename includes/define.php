<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
define( 'WEC_OPTION', 'wec_data' );
define( 'VI_WEC_DIR', WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . "woo-custom-email-blocks" . DIRECTORY_SEPARATOR );
define( 'VI_WEC_LANGUAGES', VI_WEC_DIR . "languages" . DIRECTORY_SEPARATOR );
define( 'VI_WEC_INCLUDES', VI_WEC_DIR . "includes" . DIRECTORY_SEPARATOR );
define( 'VI_WEC_VIEWS', VI_WEC_DIR . "views" . DIRECTORY_SEPARATOR );
define( 'VI_WEC_TEMPLATES', VI_WEC_VIEWS . "templates" . DIRECTORY_SEPARATOR );
//$plugin_url = plugins_url( 'woo-custom-email-blocks' );
$plugin_url = plugins_url( '', __FILE__ );
$plugin_url = str_replace( '/includes', '', $plugin_url );

define( 'VI_WEC_CSS', $plugin_url . "/assets/css/" );
define( 'VI_WEC_CSS_DIR', VI_WEC_DIR . "assets" . DIRECTORY_SEPARATOR . "css" . DIRECTORY_SEPARATOR );
define( 'VI_WEC_JS', $plugin_url . "/assets/js/" );
define( 'VI_WEC_JS_R', $plugin_url . "/assets/js-r/" );
define( 'VI_WEC_JS_DIR', VI_WEC_DIR . "assets" . DIRECTORY_SEPARATOR . "js" . DIRECTORY_SEPARATOR );
define( 'VI_WEC_IMAGES', $plugin_url . "/assets/img/" );

//
///*Include functions file*/

if ( is_file( VI_WEC_INCLUDES . "class-email-admin-settings.php" ) ) {
	require_once VI_WEC_INCLUDES . "class-email-admin-settings.php";
}
if ( is_file( VI_WEC_INCLUDES . "class-wec-block.php" ) ) {
	require_once VI_WEC_INCLUDES . "class-wec-block.php";
}

if ( is_file( VI_WEC_INCLUDES . "class-wec-rest-api.php" ) ) {
	require_once VI_WEC_INCLUDES . "class-wec-rest-api.php";
}
if ( is_file( VI_WEC_INCLUDES . "class-wec-mailer.php" ) ) {
	require_once VI_WEC_INCLUDES . "class-wec-mailer.php";
}
if ( is_file( VI_WEC_INCLUDES . "class-wec-taxonomy-setting.php" ) ) {
	require_once VI_WEC_INCLUDES . "class-wec-taxonomy-setting.php";
}
if ( is_file( VI_WEC_INCLUDES . "support.php" ) ) {
	require_once VI_WEC_INCLUDES . "support.php";
}
if ( is_file( VI_WEC_INCLUDES . "subject.php" ) ) {
	require_once VI_WEC_INCLUDES . "subject.php";
}

