<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 14/01/2019
 * Time: 3:50 CH
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WEC_Data_API {

	public function __construct() {
	}

	public function random_order() {
		$args        = array(
			'posts_per_page'   => 1,
			'offset'           => 0,
			'orderby'          => 'date',
			'order'            => 'DESC',
			'post_type'        => 'shop_order',
			'post_status'      => 'wc-processing',
			'suppress_filters' => true,
		);
		$posts_array = get_posts( $args );
		$order_id    = $posts_array[0]->ID ? $posts_array[0]->ID : '';
		$order       = wc_get_order( $order_id );

		return $order;
	}

	public function get_product_related( $order, $rows, $cols, $link = false ) {
		$product_ids       = array();
		$order_product_ids = $this->get_list_order_product_ids( $order );
		foreach ( $order_product_ids as $id ) {
			foreach ( wc_get_related_products( $id ) as $_id ) {
				$product_ids[] = $_id;
			};
		}

		return $this->get_final_ids_no_arg( $order, $product_ids, $rows, $cols, $link );
	}

	public function get_product_up_sell( $order, $rows, $cols, $link = false ) {

		$product_ids = $this->get_related_up_cross_sell_ids( $order, '_upsell_ids' );


		return $this->get_final_ids_no_arg( $order, $product_ids, $rows, $cols, $link );

	}

	public function get_product_cross_sell( $order, $rows, $cols, $link = false ) {
		$product_ids = $this->get_related_up_cross_sell_ids( $order, '_crosssell_ids' );

		return $this->get_final_ids_no_arg( $order, $product_ids, $rows, $cols, $link );
	}

	public function get_related_up_cross_sell_ids( $order, $type ) {

		$ids = array();

		$order_product_ids = $this->get_list_order_product_ids( $order );
		foreach ( $order_product_ids as $order_id ) {
			foreach ( get_post_meta( $order_id, $type, true ) as $_id ) {
				$ids[] = $_id;
			}
		}

		return $ids;
	}

	public function get_product_in_same_category( $order, $rows, $cols, $link = false ) {

		$product_cats_ids  = array();
		$order_product_ids = $this->get_list_order_product_ids( $order );

		foreach ( $order_product_ids as $product_id ) {
			foreach ( wc_get_product_term_ids( $product_id, 'product_cat' ) as $cat_id ) {
				$product_cats_ids[] = $cat_id;
			};
		}

		$arg = array(
			'tax_query' => array(
				array(
					'taxonomy' => 'product_cat',
					'field'    => 'term_id', //This is optional, as it defaults to 'term_id'
					'terms'    => array_unique( $product_cats_ids ),
					'operator' => 'IN' // Possible values are 'IN', 'NOT IN', 'AND'.
				)
			)
		);

		return $this->get_final_ids_have_arg( $order, $arg, $rows, $cols, $link );
	}

	public function get_product_on_sale( $order, $rows, $cols, $link ) {

		$arg = array(
			'meta_query' => array(
				'relation' => 'OR',
				array( // Simple products type
					'key'     => '_sale_price',
					'value'   => 0,
					'compare' => '>',
					'type'    => 'numeric'
				),
				array( // Variable products type
					'key'     => '_min_variation_sale_price',
					'value'   => 0,
					'compare' => '>',
					'type'    => 'numeric'
				)
			)
		);

		return $this->get_final_ids_have_arg( $order, $arg, $rows, $cols, $link );
	}

	public function get_product_best_selling( $order, $rows, $cols, $link ) {
		$arg = array(
			'meta_key' => 'total_sales',
			'orderby'  => 'meta_value_num',
		);

		return $this->get_final_ids_have_arg( $order, $arg, $rows, $cols, $link );
	}

	public function get_product_featured( $order, $rows, $cols, $link ) {
		$arg = array(
			'tax_query' => array(
				array(
					'taxonomy' => 'product_visibility',
					'field'    => 'name',
					'terms'    => 'featured',
					'operator' => 'IN',
				)
			)
		);

		return $this->get_final_ids_have_arg( $order, $arg, $rows, $cols, $link );
	}

	public function get_product_top_rated( $order, $rows, $cols, $link ) {
		$arg = array(
			'meta_key'   => '_wc_average_rating',
			'orderby'    => 'meta_value_num',
			'meta_query' => WC()->query->get_meta_query(),
			'tax_query'  => WC()->query->get_tax_query(),
		);

		return $this->get_final_ids_have_arg( $order, $arg, $rows, $cols, $link );
	}

	public function get_final_ids_have_arg( $order, $arg, $rows, $cols, $link ) {

		$order_product_ids = $this->get_list_order_product_ids( $order );
		$products          = $this->wec_get_products( $arg, $order_product_ids, $rows, $cols );
		$final_ids         = array_values( array_diff( $products, $order_product_ids ) );

		return $this->get_information( $final_ids, $rows, $cols, $link );
	}

	public function get_final_ids_no_arg( $order, $ids, $rows, $cols, $link ) {

		$order_product_ids = $this->get_list_order_product_ids( $order );
		if ( empty( $ids ) ) {
			$ids = $this->wec_get_products( '', $order_product_ids, $rows, $cols );
		}

		$final_ids = array_values( array_unique( array_diff( $ids, $order_product_ids ) ) );

		return $this->get_information( $final_ids, $rows, $cols, $link );
	}

	public function get_list_order_product_ids( $order ) {
		$order_ids = array();

		if ( is_object( $order ) ) {
			$list_products = $order->get_items();
			foreach ( $list_products as $item_id => $item_values ) {
				$item_data   = $item_values->get_data();
				$p_id        = $item_data['product_id'];
				$order_ids[] = $p_id;
			}
		}

		return $order_ids;
	}

	public function get_information( $products = array(), $rows = 1, $cols = 3, $link = false ) {
		$output = "<div style='overflow-x: auto'><table style='margin: 0 auto; width: 100%;'>";

		for ( $i = 0; $i < $rows; $i ++ ) {
			$output .= "<tr>";
			for ( $j = 0; $j < $cols; $j ++ ) {
				$key = $j + $i * $cols;
//				$id  = $products[ $key ];
				if ( isset( $products[ $key ] ) ) {
					$id        = $products[ $key ];
					$product   = wc_get_product( $id );
					$price     = $product->get_price_html();
					$permalink = $product->get_permalink();
					$name      = $product->get_name();
					$thumb     = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), 'shop_catalog' );
					$image     = ! empty( $thumb[0] ) ? $thumb[0] : wc_placeholder_img_src();

					if ( $link == true ) {
						$output .= "<td style='text-align: center; '><a href='$permalink'><img style='width: 100%' src='$image' ><div>{$name}</div><div>{$price}</div></a></td>";
					} else {
						$output .= "<td style='text-align: center; '><img style='width: 100%' src='$image' ><div>{$name}</div><div>{$price}</div></td>";
					}
				}
			}
			$output .= "</tr>";
		}

		$output .= "</table></div>";

		return $output;
	}

	public function wec_get_products( $arg, $order_product_ids, $rows, $cols ) {
		$ids  = array();
		$args = array(
			'post_type'      => 'product',
			'posts_per_page' => $rows * $cols,
			'post__not_in'   => $order_product_ids,
		);


		$args = wp_parse_args( $args, $arg );

		$products = new WP_Query( $args );
		foreach ( $products->get_posts() as $product ) {
			$ids[] = $product->ID;
		}

		return $ids;
	}

	public function get_product_no_order( $order, $rows, $cols, $link ) {
		$product = $this->wec_get_products( '', '', $rows, $cols );

		return $this->get_information( $product, $rows, $cols, $link );
	}

}

new WEC_Data_API();
