<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 29/12/2018
 * Time: 2:15 CH
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WEC_Block_API {

	protected $list_dep = array( 'editor_script' => 'wec-blocks', 'editor_style' => 'wec-style', );

	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'wec_vlt_block_enqueue_script' ) );
		add_action( 'init', array( $this, 'woo_email_customizer_list_block' ) );
		add_filter( 'block_categories', array( $this, 'email_customizer_categories_block' ) );

		add_action( 'wp_ajax_wec_send_test_email', array( $this, 'wec_send_test_email' ) );
	}

	public function wec_vlt_block_enqueue_script() {
		if ( 'wec_email_customizer' === get_current_screen()->id ) {
			wp_enqueue_script( 'wec-blocks', VI_WEC_JS . "block.min.js", array(
				'wp-blocks',
				'wp-editor',
				'wp-components',
				'wp-element',
				'wp-i18n',
				'wp-edit-post',
				'wp-plugins',
				'wp-hooks',
				'wp-compose',
				'wp-format-library',
				'jquery'
			), true, true );

			wp_enqueue_style( 'wec-style', VI_WEC_CSS . "block.css", filemtime( VI_WEC_CSS_DIR . "block.css" ) );
			$image_path = VI_WEC_IMAGES;

			$object_value = array(
				'image_path'  => $image_path,
				'wec_get'     => $_GET,
				'store_add'   => get_option( 'woocommerce_store_address' ),
				'ajax_url'    => admin_url( 'admin-ajax.php?action=wec_send_test_email' ),
				'store_email' => get_bloginfo( 'admin_email' )
			);
			wp_localize_script( 'wec-blocks', 'object_localize', $object_value );

			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'wec-blocks', 'woo-custom-email-blocks', VI_WEC_LANGUAGES . 'languages' );
			}
		}

	}

	public function email_customizer_categories_block( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'wec-email-block-editor',
					'title' => __( 'Email Blocks', 'woo-custom-email-blocks' ),
				),
			),
			$categories
		);
	}

	public function woo_email_customizer_list_block() {
		register_block_type( 'woo-custom-email-blocks/email-customizer', $this->list_dep );
	}


	public function wec_send_test_email() {
		$email_to = sanitize_email( $_POST['mail_to'] );
		$content  = ! empty( $_POST['content'] ) ? ( $_POST['content'] ) : false;
		$subject  = ! empty( $_POST['subject'] ) ? sanitize_text_field( $_POST['subject'] ) : 'WooCommerce Custom Email Template';

		if ( $content && $email_to ) {
			$content = stripslashes( $this->replace_suggest_product( $this->replace_order_total( $this->replace_short_code( $this->replace_order_items( $content ) ) ) ) );
			$subject = $this->replace_short_code( $subject );
			$type    = 'Content-Type: text/html; charset=utf-8;';

			$send_mail = wp_mail( $email_to, $subject, $content, $type );

			if ( $send_mail ) {
				esc_html_e( 'Email was sent successfully.', 'woo-custom-email-blocks' );
			} else {
				esc_html_e( "Email has not been sent yet.", 'woo-custom-email-blocks' );
			}
		}
		wp_die();
	}


	public function replace_short_code( $content ) {

		$arr_search = array(
			'{site_title}',
			'{order_number}',
			'{customer_name}',
			'{customer_full_name}',
			'%%order_billing%%',
			'%%order_shipping%%',
			'{new_password}',
			'{reset_password_link}',
			'{order_date}'
		);

		$arr_replace = array(
			esc_html( get_bloginfo( 'name', 'display' ) ),
			'123',
			'John',
			'John Doe',
			'  John Doe<br/>
   				San Francisco<br/>
                California<br/>
                United States (US)<br/>
                +1-541-123-4567<br/>
                johndoe@your_site.com',
			'  John Doe<br/>
	            San Francisco<br/>
	            California<br/>
	            United States (US)<br/>',
			'12345678',
			'<a>Click here to reset your password</a>',
			'March 16, 2019'
		);
		$result      = str_replace( $arr_search, $arr_replace, $content );

		return $result;
	}

	public function replace_order_items( $content ) {
		$pattern = '/%%order_items(.*)%%/';
//		preg_match( $pattern, $content, $match );
		$out = '';

		$items = array(
			array( VI_WEC_IMAGES . 'product-26.jpg', "Product name", '1', '$20' ),
			array( VI_WEC_IMAGES . 'product-27.jpg', "Product name", '1', '$20' ),
		);
		if ( preg_match( $pattern, $content, $match ) ) {
			foreach ( $items as $item ) {
				$search = array( '%%product_image%%', '%%product_name%%', '%%product_quantity%%', '%%product_price%%' );
				$out    .= str_replace( $search, $item, $match[1] );
			}
			$content = str_replace( $match[0], $out, $content );

		}

		return $content;

	}

	public function replace_order_total( $content ) {
		$pattern = '/%%order_total(.*)%%/';

		$out          = '';
		$order_totals = array(
			array( 'Subtotal:', '$40' ),
			array( 'Payment method :', 'Cash on delivery' ),
			array( 'Total :', '$40' ),
		);

		if ( preg_match( $pattern, $content, $match ) ) {
			foreach ( $order_totals as $total ) {
				$search = array( '%%total_title%%', '%%total_value%%' );
				$out    .= str_replace( $search, $total, $match[1] );
			}
			$content = str_replace( $match[0], $out, $content );
		}

		return $content;
	}

	public function replace_suggest_product( $content ) {

		$pattern = '/%%\w+-\d+-\d+%%/';
		if ( preg_match_all( $pattern, $content, $matches ) ) {
			foreach ( $matches[0] as $match ) {
				$arr_match = str_replace( '%', '', $match );
				$arr_match = explode( '-', $arr_match );

				$result = '<table style="margin:0; padding: 5px; width:100%;">';
				for ( $i = 0; $i < $arr_match[1]; $i ++ ) {
					$result .= "<tr>";
					for ( $j = 0; $j < $arr_match[2]; $j ++ ) {
						$k      = ( $j + $i * $arr_match[2] ) + 1;
						$result .= "<td style='padding: 5px; text-align: inherit'><img style='width: 100%' src='" . VI_WEC_IMAGES . "product-" . $k . ".jpg'/><div>Product name</div><div>$20</div></td>";
					}
					$result .= "</tr>";
				}
				$result  .= "</table>";
				$content = str_replace( $match, $result, $content );
			}
		}

		return $content;
	}


}

new WEC_Block_API();
