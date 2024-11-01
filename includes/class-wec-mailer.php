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

class WEC_Mailer {
	public function __construct() {
		add_filter( 'woocommerce_email_styles', array( $this, 'set_style' ) );
		add_filter( 'wc_get_template', array( $this, 'change_email_template' ), 3, 2 );
//		add_filter( 'wc_get_template', array( $this, 'change_email_header' ), 3, 2 );
//		add_filter( 'woocommerce_email_subject_customer_processing_order', array($this, 'customizing_new_order_subject'), 10, 2 );

	}

	function change_email_template( $located, $template_name ) {
		$tem_arr = array(
			'emails/customer-processing-order.php' => 'customer_processing_order', //ok
			'emails/admin-new-order.php'           => 'new_order', //ok
			'emails/admin-cancelled-order.php'     => 'cancelled_order', //ok
			'emails/admin-failed-order.php'        => 'failed_order', //ok
			'emails/customer-completed-order.php'  => 'customer_completed_order', //ok
			'emails/customer-invoice.php'          => 'customer_invoice',
			'emails/customer-new-account.php'      => 'customer_new_account', //ok
			'emails/customer-note.php'             => 'customer_note',//ok
			'emails/customer-on-hold-order.php'    => 'customer_on_hold_order', //ok
			'emails/customer-refunded-order.php'   => 'customer_refunded_order',//ok
			'emails/customer-reset-password.php'   => 'customer_reset_password', //ok
		);
		if ( array_key_exists( $template_name, $tem_arr ) ) {
			$temp   = $tem_arr[ $template_name ];
			$option = get_option( WEC_OPTION );
			$option = $option['list_temp_active'][ $temp ];
			if ( ! empty( $option ) ) {
				$located = VI_WEC_VIEWS . $template_name;
			}
		}

		return $located;
	}


	function change_email_header( $located, $template_name ) {
		if ( $template_name == 'emails/email-header.php' ) {
			$located = VI_WEC_VIEWS . 'emails/email-header.php';
		}

		return $located;
	}


	public function set_style( $style ) {
		$custom_style = "a {color: inherit !important; text-decoration:none !important} th{color: inherit !important}";
		$custom_style .= "table { border-collapse: collapse;}";
		$custom_style .= "a[href] {color: inherit !important; text-decoration:none !important}";

		return $style . $custom_style;
	}


	public function replace_product_related( $order ) {
		$result = "<div style='overflow: auto'><table style='margin: 0 auto;'><tr>";
		if ( ! empty( $order ) ) {
			$list_products = $order->get_items();
			$list_products = array_slice( $list_products, 0, 2 );
			if ( count( $list_products ) == 1 ) {
				$limit = 6;
			} else {
				$limit = 3;
			}
			foreach ( $list_products as $item_id => $item_values ) {

				$item_data     = $item_values->get_data();
				$p_id          = $item_data['product_id'];
				$product_ids[] = $p_id;
				$products      = wc_get_related_products( $p_id, $limit );
				foreach ( $products as $p_id2 ) {
					$product = wc_get_product( $p_id2 );
					$link    = get_permalink( $p_id2 );
					$thumb   = wp_get_attachment_image_src( get_post_thumbnail_id( $p_id2 ), 'shop_thumbnail' );
					$url_img = $thumb['0'];
					$price   = $product->get_price();
					$price   = wc_price( $price );
					$result  .= "<td style='text-align: center;'>
							<a href='$link' style='text-decoration: none;'><img src='$url_img'>
							<div style='margin-top: 10px'>" . $price . "</div></a>
							</td>";
				}
			}
		} else {
			$arg      = array(
				'posts_per_page' => 6,
				'post_type'      => 'product',
				'post_status'    => 'publish',
			);
			$products = ( get_posts( $arg ) );
			foreach ( $products as $product ) {
				$link    = get_permalink( $product->ID );
				$thumb   = wp_get_attachment_image_src( get_post_thumbnail_id( $product->ID ), 'shop_thumbnail' );
				$url_img = $thumb['0'];
				$product = wc_get_product( $product->ID );
				$price   = $product->get_price();
				$price   = wc_price( $price );

				$result .= "<td style='text-align: center;'>
							<a href='$link' style='text-decoration: none;'><img src='$url_img'>
							<div style='margin-top: 10px'>" . $price . "</div></a>
							</td>";
			}
		}
		$result .= "</tr></table></div>";

		return $result;
	}

	public function email_rules( $temp_id, $order ) {


		$cats = $langs = $result = $langs_all = $result_all = $product_ids = $parent_cats = $prio = array();

		$option         = get_option( WEC_OPTION );
		$option_actives = $option['list_temp_active'][ $temp_id ];
		$option_cats    = $option['list_categories'][ $temp_id ];
		$option_langs   = $option['list_languages'][ $temp_id ];
		$country        = $order->get_billing_country();

		$order_products = $order->get_items();
		foreach ( $order_products as $product ) {
			$product_ids[] = $product->get_data()['product_id'];
		}

		foreach ( $product_ids as $id ) {
			$pre_cats = wc_get_product_term_ids( $id, 'product_cat' );
			foreach ( $pre_cats as $cat ) {
				$parent_cat = get_term( $cat, 'product_cat' )->parent;
				if ( $parent_cat != 0 ) {
					$cats[] = $parent_cat;
				} else {
					$cats[] = $cat;
				}
			}
		}

		$cats = array_unique( $cats );
		foreach ( $option_actives as $post_id ) {
			if ( in_array( $country, $option_langs[ $post_id ] ) ) {
				$langs[] = $post_id;
			} elseif ( in_array( 'all_lang', $option_langs[ $post_id ] ) ) {
				$langs_all[] = $post_id;
			}
		}

		$langs = ! empty( $langs ) ? $langs : $langs_all;

		if ( ! empty( $langs ) ) {
			foreach ( $langs as $post_id ) {
				foreach ( $cats as $cat ) {
					if ( in_array( $cat, $option_cats[ $post_id ] ) ) {
						$result[] = $post_id;
					} elseif ( in_array( 'all_cat', $option_cats[ $post_id ] ) ) {
						$result_all[] = $post_id;
					}
				}
			}
		}

		$results = ! empty( $result ) ? $result : $result_all;

		foreach ( $results as $id ) {
			$ordering    = get_post_meta( $id, 'wec_p_cats_ordering', true );
			$prio[ $id ] = $ordering;
		}
		$_result = array_keys( $prio, min( $prio ) );

		return ( $_result[0] );
	}

	public function email_follow_locate( $email_id ) {
		$geo      = new WC_Geolocation(); // Get WC_Geolocation instance object
		$user_ip  = $geo->get_ip_address(); // Get user IP
		$user_geo = $geo->geolocate_ip( $user_ip ); // Get geolocated user data.
		$country  = $user_geo['country']; // Get the country code

		$option         = get_option( WEC_OPTION );
		$option_actives = $option['list_temp_active'][ $email_id ];
		$option_langs   = $option['list_languages'][ $email_id ];


		foreach ( $option_actives as $post_id ) {
			if ( in_array( $country, $option_langs[ $post_id ] ) ) {
				$langs[] = $post_id;
			}
		}

		if ( empty( $langs ) ) {
			foreach ( $option_actives as $post_id ) {
				if ( in_array( 'all_lang', $option_langs[ $post_id ] ) ) {
					$langs[] = $post_id;
				}
			}
			if ( empty( $langs ) ) {
				$langs[] = 1;
			}
		}

		return reset( $langs );
	}

	public function over_write( $template, $order, $sent_to_admin, $plain_text, $email ) {

		$result = $this->replace_short_code( $order, $template );
		$result = $this->replace_order_items( $order, $result );
		$result = $this->replace_order_total( $order, $result );
		$result = $this->replace_suggest_product( $order, $result );

		return $result;
	}

	public function over_write_no_order( $template, $email ) {

		$result = $this->replace_short_code_no_order( $template );
		$result = $this->replace_suggest_product_no_order( $result );

		return $result;
	}

	public function replace_short_code_no_order( $template ) {
		$pattern_1 = '/%%order_items.*%%/';
		preg_match( $pattern_1, $template, $match1 );

		$pattern_2 = '/%%order_total.*%%/';
		preg_match( $pattern_2, $template, $match2 );

		$arr_searches = array(
			'{site_title}',
			'{order_number}',
			'%%order_billing%%',
			'%%order_shipping%%',
			$match1[0],
			$match2[0],
			'{customer_full_name}',
			'{order_date}'
		);

		$arr_replaces = array(
			esc_html( get_bloginfo( 'name', 'display' ) ),
			'',
			'',
			'',
			'',
			'',
			'',
			'',
		);

		$result = str_replace( $arr_searches, $arr_replaces, $template );

		return $result;
	}

	public function replace_short_code( $order, $template ) {

		$arr_searches = array(
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

		$arr_replaces = array(
			esc_html( get_bloginfo( 'name', 'display' ) ),
			esc_html( $order->get_order_number() ),
			esc_html( $order->get_billing_first_name() ),
			esc_html( $order->get_formatted_billing_full_name() ),
			( $order->get_formatted_billing_address() . '<br/>' . $order->get_billing_phone() . '<br/>' . $order->get_billing_email() ),
			( $order->get_formatted_shipping_address() ? $order->get_formatted_shipping_address() : $order->get_formatted_billing_address() ),
			'',
			'',
			wc_format_datetime( $order->get_date_created() )
		);

		$result = str_replace( $arr_searches, $arr_replaces, $template );

		return $result;
	}

	public function replace_order_items( $order, $template ) {
		$order_items = array();
		$items       = $order->get_items();
		foreach ( $items as $key => $item ) {

			$thumb = wp_get_attachment_image_src( get_post_thumbnail_id( $item['product_id'] ), 'shop_catalog' );

			$order_items[] = array(
				$thumb['0'],
				$item->get_name(),
				$item->get_quantity(),
				wc_price( $item['subtotal'] )
			);
		}


		$pattern = '/%%order_items([\s\n\r\w<>\"\'=\-:\d\w#;%\/]*)%%/';

		$out = '';
		if ( preg_match( $pattern, $template, $match ) ) {

			foreach ( $order_items as $item ) {
				$search = array( '%%product_image%%', '%%product_name%%', '%%product_quantity%%', '%%product_price%%' );
				$out    .= str_replace( $search, $item, $match[1] );
			}
			$template = str_replace( $match[0], $out, $template );
		}

		return $template;
	}

	public function replace_order_total( $order, $template ) {

		$order_totals = $order->get_order_item_totals();
		$pattern      = '/%%order_total([\s\n\r\w<>\"\'=\-:\d\w#;%\/]*)%%/';

		$out = '';
		if ( preg_match( $pattern, $template, $match ) ) {
			foreach ( $order_totals as $total ) {
				$search = array( '%%total_title%%', '%%total_value%%' );
				$out    .= str_replace( $search, $total, $match[1] );
			}
			$template = str_replace( $match[0], $out, $template );
		}

		return $template;
	}

	public function replace_suggest_product( $order, $template ) {
		$product_data = new WEC_Data_API();
		$pattern      = '/%%\w+-\d+-\d+%%/';
		if ( preg_match_all( $pattern, $template, $matches ) ) {
			foreach ( $matches[0] as $match ) {
				$arr_match = str_replace( '%', '', $match );
				$arr_match = explode( '-', $arr_match );
				$method    = 'get_product_' . $arr_match[0];

				if ( method_exists( $product_data, $method ) ) {
					$template = str_replace( $match, $product_data->$method( $order, $arr_match[1], $arr_match[2], true ), $template );
				}
			}
		}

		return $template;
	}

	public function replace_suggest_product_no_order( $template ) {
		$product_data = new WEC_Data_API();
		$pattern      = '/%%\w+-\d+-\d+%%/';
		if ( preg_match_all( $pattern, $template, $matches ) ) {
			foreach ( $matches[0] as $match ) {
				$arr_match = str_replace( '%', '', $match );
				$arr_match = explode( '-', $arr_match );
				if ( in_array( $arr_match[0], array( 'related', 'cross_sell', 'up_sell', 'in_same_category' ) ) ) {
					$method = 'get_product_no_order';

				} else {
					$method = 'get_product_' . $arr_match[0];
				}

				if ( method_exists( $product_data, $method ) ) {
					$template = str_replace( $match, $product_data->$method( '', $arr_match[1], $arr_match[2], true ), $template );
				}
			}
		}

		return $template;
	}

}

new WEC_Mailer();

