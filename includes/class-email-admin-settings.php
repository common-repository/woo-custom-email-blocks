<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 09/01/2019
 * Time: 11:28 SA
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WEC_Email_Admin_Settings {

	public function __construct() {
		//Create CPT & Taxonomy & MetaBox
		add_action( 'init', array( $this, 'register_wec_post_type' ) );
		add_action( 'init', array( $this, 'register_wec_taxonomy' ) );
		add_action( 'add_meta_boxes_wec_email_customizer', array( $this, 'adding_custom_meta_boxes' ), 10 );

		//Add button edit template in WC email setting
		add_filter( 'woocommerce_email_setting_columns', array( $this, 'register_wec_column_email_setting' ) );
		add_action( 'woocommerce_email_setting_column_wec_edit', array( $this, 'show_template_setting' ) );

		//Checkbox active template
		add_filter( 'manage_wec_email_customizer_posts_columns', array( $this, 'header_column' ) );
		add_action( 'manage_wec_email_customizer_posts_custom_column', array( $this, 'content_column' ), 10, 2 );

		//Enqueue script
		add_action( 'admin_enqueue_scripts', array( $this, 'wec_admin_enqueue_script' ) );
		add_action( 'wp_ajax_wec_admin_action', array( $this, 'wec_ajax' ) );

		//Action when save post & trash post
		add_action( 'save_post_wec_email_customizer', array( $this, 'wec_save_post' ) );
		add_action( 'wp_trash_post', array( $this, 'wec_trash_post' ) );

		//Duplicate post
		add_filter( 'page_row_actions', array( $this, 'duplicate_post_link' ), 10, 2 );
		add_action( 'admin_action_duplicate_post_as_draft', array( $this, 'duplicate_post_as_draft' ) );

		//Support
		add_action( 'in_admin_footer', array( $this, 'villatheme_support' ) );

		add_filter( 'enter_title_here', array( $this, 'replace_title_to_subject' ) );

	}

	public function wec_admin_enqueue_script() {
		if ( ( 'wec_email_customizer' ) === get_current_screen()->id || ( 'edit-wec_email_customizer' === get_current_screen()->id ) ) {
			wp_enqueue_style( 'wec-select2-css', VI_WEC_CSS . "select2.min.css" );
			wp_enqueue_style( 'wec-checkbox-css', VI_WEC_CSS . "checkbox.min.css" );
			wp_enqueue_style( 'villatheme-support-form', VI_WEC_CSS . 'form.min.css' );
			wp_enqueue_style( 'villatheme-support-segment', VI_WEC_CSS . 'segment.min.css' );
			wp_enqueue_style( 'wec_admin', VI_WEC_CSS . 'admin.css' );

			wp_enqueue_script( 'wec-admin-js', VI_WEC_JS . "admin.js", array( 'jquery' ) );
			wp_enqueue_script( 'wec-select2', VI_WEC_JS . "select2.js", array( 'jquery' ) );
			wp_localize_script( "wec-admin-js", "ajax_url", array( admin_url( "admin-ajax.php" ) ) );
			wp_localize_script( "wec-admin-js", "wec_taxonomy", array( $this->wec_get_taxonomy() ) );
			wp_localize_script( "wec-admin-js", "wec_admin_get", $_GET );
		}
	}

	public function wec_get_taxonomy() {
		$terms = (array) get_terms( 'wec_email_template', 'hide_empty=0' );
		$list  = '';
		foreach ( $terms as $term ) {
			$list .= "<li><a href='" . admin_url( 'post-new.php?post_type=wec_email_customizer&id=' . $term->term_id . '&slug=' . $term->slug ) . "'><div>$term->name</div></a></li>";
		}

		return $list . "<li><a href='" . admin_url( 'post-new.php?post_type=wec_email_customizer' ) . "'><div>" . __( 'Other', 'woo-custom-email-blocks' ) . "</div></a></li>";
	}

	public function villatheme_support() {
		if ( 'edit-wec_email_customizer' == get_current_screen()->id ) {
			do_action( 'villatheme_support_woo-custom-email-blocks' );
		}

	}

	public function wec_save_post( $post_id ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( isset( $_POST['wec_email_note'] ) ) {
			$subject = sanitize_text_field( $_POST['wec_email_note'] );
			update_post_meta( $post_id, 'wec_email_note', $subject );
		}

		if ( isset( $_POST['wec_p_cats_ordering'] ) ) {
			$wec_ordering = sanitize_text_field( $_POST['wec_p_cats_ordering'] );
			update_post_meta( $post_id, 'wec_p_cats_ordering', $wec_ordering );
		}

		$option = get_option( WEC_OPTION );
		if ( ! empty( $_POST['tax_input'] ) && $_POST['post_status'] == 'publish' ) {
			$slug_temp = get_term_by( 'id', $_POST['tax_input']['wec_email_template'][0], 'wec_email_template' )->slug;

			if ( isset( $_POST['wec_product_categories'] ) ) {
				$cats = array_map( 'sanitize_text_field', $_POST['wec_product_categories'] );

				$option['list_categories'][ $slug_temp ][ $post_id ] = $cats;
				update_post_meta( $post_id, 'wec_list_categories', $cats );
			} else {
				$option['list_categories'][ $slug_temp ][ $post_id ] = array( 'all_cat' );
				update_post_meta( $post_id, 'wec_list_categories', '' );
			}

			if ( isset( $_POST['wec_languages'] ) ) {
				$langs = array_map( 'sanitize_text_field', $_POST['wec_languages'] );

				$option['list_languages'][ $slug_temp ][ $post_id ] = $langs;
				update_post_meta( $post_id, 'wec_list_languages', $langs );
			} else {
				$option['list_languages'][ $slug_temp ][ $post_id ] = array( 'all_lang' );
				update_post_meta( $post_id, 'wec_list_languages', '' );
			}

			if ( ! in_array( $post_id, $option['list_temp_active'][ $slug_temp ] ) ) {
				$option['list_temp_active'][ $slug_temp ][] = $post_id;
			}
			update_option( WEC_OPTION, $option, 'no' );
		} elseif ( ! empty( $_POST['tax_input'] ) && $_POST['post_status'] == 'draft' ) {
			$slug_temp = get_term_by( 'id', $_POST['tax_input']['wec_email_template'][0], 'wec_email_template' )->slug;
			$key       = array_search( $post_id, $option['list_temp_active'][ $slug_temp ] );
			if ( $key ) {
				unset( $option['list_temp_active'][ $slug_temp ][ $key ] );
				update_option( WEC_OPTION, $option, 'no' );
			}
		}
	}

	public function wec_trash_post( $post_id ) {
		$post_type = get_post( $post_id, ARRAY_A )['post_type'];
		if ( $post_type == 'wec_email_customizer' ) {
			$term    = wp_get_object_terms( $post_id, 'wec_email_template', array( 'field' => 'slug' ) );
			$tax     = $term[0]->slug;
			$option  = get_option( WEC_OPTION );
			$key_del = array_search( $post_id, $option['list_temp_active'][ $tax ] );
			unset( $option['list_temp_active'][ $tax ][ $key_del ] );
			update_option( WEC_OPTION, $option, 'no' );
		}
	}

	public function adding_custom_meta_boxes() {

		add_meta_box(
			'wec-email-rules',
			__( 'Email rules', 'woo-custom-email-blocks' ),
			array( $this, 'wec_email_rules' ),
			'wec_email_customizer',
			'side',
			'low'
		);
		add_meta_box(
			'wec-email-subject',
			__( 'Description', 'woo-custom-email-blocks' ),
			array( $this, 'email_note_meta_box' ),
			'wec_email_customizer',
			'side',
			'low'
		);
	}

	public function wec_email_rules( $post ) {
		echo "<div class='wec-email-rules wec-tooltip-country-hover'><label class='wec-tooltip wec-tooltip-country'>" . __( 'This email template will ONLY be applied to orders which have billing country belongs to these countries', 'woo-custom-email-blocks' ) . "</label><div class=''>" . __( 'Apply to Billing Country', 'woo-custom-email-blocks' );
		echo "</div>";
		$this->language_meta_box( $post );
		echo "</div><div class='wec-email-rules wec-tooltip-category-hover'><label class='wec-tooltip wec-tooltip-category'>" . __( 'This email template will ONLY be applied to orders which have products belong to these categories', 'woo-custom-email-blocks' ) . "</label><div class=''>" . __( 'Apply to Product Categories', 'woo-custom-email-blocks' );
		echo "</div>";
		$this->categories_meta_box( $post );
		echo "</div>";
		$this->priority_input( $post );
	}

	public function email_note_meta_box( $post ) {
		$subject = get_post_meta( $post->ID, 'wec_email_note', true );
		echo "<input type='text' class='wec-email-note' name='wec_email_note' value='$subject' placeholder='" . __( 'Your description for this post', 'woo-custom-email-blocks' ) . "'>";
	}


	public function language_meta_box( $post ) {

		$list_lang      = get_post_meta( $post->ID, 'wec_list_languages', true );
		$list_lang      = is_array( $list_lang ) ? $list_lang : array();
		$list_countries = $this->list_countries();
		echo "<select class='wec-languages' name='wec_languages[]' multiple='multiple'>";
		foreach ( $list_countries as $key => $country ) {
			$selected = in_array( $key, $list_lang ) ? 'selected' : '';
			echo "<option value='" . esc_html( $key ) . "' " . $selected . ">" . esc_html( $country ) . "</option>";
		}
		echo "</select>";
	}

	public function categories_meta_box( $post ) {
		$args = array(
			'taxonomy'   => "product_cat",
			'hide_empty' => 1,
			'parent'     => 0
		);

		$product_categories = get_terms( $args );

		$post_meta = get_post_meta( $post->ID, 'wec_list_categories', true );
		$post_meta = is_array( $post_meta ) ? $post_meta : array();


		ob_start();
		?>
        <select class='wec-select-product-cats' name='wec_product_categories[]' multiple='multiple'>
			<?php
			foreach ( $product_categories as $cat ) {
				$selected = in_array( $cat->term_id, $post_meta ) ? 'selected' : '';
				?>
                <option value="<?php esc_html_e( $cat->term_id ) ?> " <?php echo $selected ?>><?php esc_html_e( $cat->name ) ?></option>
				<?php
			}
			?>
        </select>

		<?php
		echo ob_get_clean();
	}

	public function priority_input( $post ) {
		$ordering = get_post_meta( $post->ID, 'wec_p_cats_ordering', true );
		$ordering = ! empty( $ordering ) ? $ordering : 1;
		ob_start();
		?>
        <div class="wec-p-cats-ordering wec-tooltip-priority-hover">
            <label><?php _e( 'Priority', 'woo-custom-email-blocks' ); ?></label>
            <label class="wec-tooltip wec-tooltip-priority"><?php _e( 'Incase an order matched 2 or more templates, the template with lower priority number will be used.', 'woo-custom-email-blocks' ); ?></label>
            <input class="wec-p-cats-ordering-number" type="number" maxlength="3" name="wec_p_cats_ordering" min="1"
                   value="<?php echo $ordering ?>">
        </div>
		<?php
		echo ob_get_clean();
	}

	public function wec_ajax() {
		if ( isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'wec_admin_action' ) {
			if ( isset( $_REQUEST['param'] ) ) {
				switch ( $_REQUEST['param'] ) {
					case 'change_active':
						$option = get_option( WEC_OPTION );
						$id     = ! empty( $_REQUEST['id'] ) && is_numeric( $_REQUEST['id'] ) ? sanitize_key( $_REQUEST['id'] ) : '';
						$slug   = ! empty( $_REQUEST['slug'] ) ? sanitize_text_field( $_REQUEST['slug'] ) : '';
						$action = isset( $_REQUEST['stt'] ) ? sanitize_text_field($_REQUEST['stt']) : '';

						$post_status = get_post( $id )->post_status;

						if ( $action === 'add' ) {
							if ( ! in_array( $id, $option['list_temp_active'][ $slug ] ) ) {
								$option['list_temp_active'][ $slug ][] = $id;
							}
							if ( $post_status == 'draft' ) {
								$arg = array(
									'ID'          => $id,
									'post_status' => 'publish'
								);
								wp_update_post( $arg );
							}
						} elseif ( $action === 'del' ) {
							$key = array_search( $id, $option['list_temp_active'][ $slug ] );
							unset( $option['list_temp_active'][ $slug ][ $key ] );
						}
						update_option( WEC_OPTION, $option );

						break;
				}
			}
		}
		wp_die();
	}

	public function register_wec_post_type() {
// Set UI labels for Custom Post Type
		$labels = array(
			'name'               => _x( 'WC Emails', 'Post Type General Name', 'woo-custom-email-blocks' ),
			'singular_name'      => _x( 'WC Emails', 'Post Type Singular Name', 'woo-custom-email-blocks' ),
			'menu_name'          => __( 'WC Emails', 'woo-custom-email-blocks' ),
			'parent_item_colon'  => __( 'Parent Email', 'woo-custom-email-blocks' ),
			'all_items'          => __( 'All Emails', 'woo-custom-email-blocks' ),
			'view_item'          => __( 'View Template', 'woo-custom-email-blocks' ),
			'add_new_item'       => __( 'Add New Email', 'woo-custom-email-blocks' ),
			'add_new'            => __( 'Add New', 'woo-custom-email-blocks' ),
			'edit_item'          => __( 'Edit Template', 'woo-custom-email-blocks' ),
			'update_item'        => __( 'Update Email', 'woo-custom-email-blocks' ),
			'search_items'       => __( 'Search Email', 'woo-custom-email-blocks' ),
			'not_found'          => __( 'Not Found', 'woo-custom-email-blocks' ),
			'not_found_in_trash' => __( 'Not found in Trash', 'woo-custom-email-blocks' ),
		);

// Set other options for Custom Post Type

		$args = array(
			'label'               => __( 'WC Email', 'woo-custom-email-blocks' ),
			'description'         => __( 'WC Email', 'woo-custom-email-blocks' ),
			'labels'              => $labels,
			// Features this CPT supports in Post Editor
			'supports'            => array(
				'title',
				'editor',
			),
			'hierarchical'        => true,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_nav_menus'   => true,
			'show_in_admin_bar'   => true,
			'menu_position'       => 5,
			'can_export'          => true,
			'has_archive'         => true,
			'exclude_from_search' => true,
			'publicly_queryable'  => true,
			'capability_type'     => 'page',
			'show_in_rest'        => true,  //ret
			'menu_icon'           => 'dashicons-email',
			'query_var'           => true,
			'template'            => array(
				array(
					'wec/woo-email-blocks',
					array( 'out_bg_color' => '#eeeeee', 'in_bg_color' => '#ffffff' )
				)
			),
		);

		// Registering your Custom Post Type
		register_post_type( 'wec_email_customizer', $args );

	}

	public static function register_wec_taxonomy() {
		$labels    = array(
			'name'      => __( 'Categories', 'woo-custom-email-blocks' ),
			'singular'  => __( 'Categories', 'woo-custom-email-blocks' ),
			'menu_name' => __( 'Categories', 'woo-custom-email-blocks' )
		);
		$args_temp = array(
			'labels'            => $labels,
			'hierarchical'      => true,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => true,
		);

		register_taxonomy( 'wec_email_template', 'wec_email_customizer', $args_temp );
	}

	public function header_column( $title ) {

		$title['title']           = __( 'Subject', 'woo-custom-email-blocks' );
		$title['check_active']    = __( 'Active', 'woo-custom-email-blocks' );
		$title['type']            = __( 'Mail to', 'woo-custom-email-blocks' );
		$title['wec_priority']    = __( 'Priority', 'woo-custom-email-blocks' );
		$title['wec_email_rules'] = __( 'Rules', 'woo-custom-email-blocks' );
		$title['description']     = __( 'Description', 'woo-custom-email-blocks' );

		return $title;
	}

	public function content_column( $column, $id ) {
		if ( $column == 'check_active' ) {
			$post_stt = get_post( $id )->post_status;
			if ( $post_stt == 'publish' ) {
				$find_cat = wp_get_object_terms( $id, 'wec_email_template', array( 'field' => 'slug' ) );
				$name     = isset( $find_cat ) && ! empty( $find_cat ) ? $find_cat[0]->slug : '';
				$option   = get_option( WEC_OPTION );

				if ( ! empty( $name ) ) {
					$option  = $option['list_temp_active'][ $name ];
					$checked = in_array( $id, $option ) ? 'checked' : '';
					?>
                    <div class="vi-ui slider checkbox">
                        <input type="checkbox" class="wec-cb-active" data-slug="<?php echo $name ?>"
                               name="<?php echo $name ?>"
                               value="<?php echo $id ?>" <?php echo $checked ?>><label> </label>
                    </div>
					<?php
				}
			}
		} elseif ( $column == 'wec_email_rules' ) {
			$countries_rules = $cat_rules = array();
			$country_codes   = (array) get_post_meta( $id, 'wec_list_languages', true );
			$categories      = (array) get_post_meta( $id, 'wec_list_categories', true );
			$list_countries  = $this->list_countries();

			foreach ( $country_codes as $code ) {
				if ( ! empty( $code ) ) {
					$countries_rules[] = $list_countries[ $code ];
				}
			}

			foreach ( $categories as $category ) {
				if ( ! empty( $category ) ) {
					$cat_rules[] = get_the_category_by_ID( $category );
				}
			}

			$countries_rules = ! empty( $countries_rules ) ? implode( ', ', $countries_rules ) : __( 'All countries', 'woo-email-editor-block' );
			$cat_rules       = ! empty( $cat_rules ) ? implode( ', ', $cat_rules ) : __( 'All categories', 'woo-email-editor-block' );

			echo esc_html_e( 'Countries: ', 'woo-custom-email-blocks' ) . $countries_rules . "<br/>";
			echo esc_html_e( 'Categories: ', 'woo-custom-email-blocks' ) . $cat_rules;

		} elseif ( $column == 'wec_priority' ) {
			echo $prio = get_post_meta( $id, 'wec_p_cats_ordering', true );
		} elseif ( $column == 'description' ) {
			echo $description = get_post_meta( $id, 'wec_email_note', true );
		} elseif ( $column == 'type' ) {
			$term_slug = ( wp_get_post_terms( $id, 'wec_email_template' ) );
			$term_slug = ! empty( $term_slug ) ? $term_slug[0]->slug : '';

			if ( empty( $term_slug ) ) {

			} elseif ( in_array( $term_slug, array( 'cancelled_order', 'new_order', 'failed_order' ) ) ) {
				echo __( 'Admin', 'woo-custom-email-blocks' );
			} else {
				echo __( 'Customer', 'woo-custom-email-blocks' );
			}
		}
	}

	public function list_countries() {
		return WC()->countries->get_countries();
	}

	public static function get_sample_data( $path ) {
		ob_start();
		include_once VI_WEC_TEMPLATES . $path;

		$result = ob_get_clean();

		return ( $result );
	}

	public static function email_array() {
		return array(
			'new_order'                 => '[{site_title}]: New order #{order_number}',
			'cancelled_order'           => '[{site_title}]: {customer_full_name} has cancelled order #{order_number}',
			'failed_order'              => '[{site_title}]: Order #{order_number} has failed',
			'customer_on_hold_order'    => 'Your {site_title} order has been received!',
			'customer_processing_order' => 'Your {site_title} order has been received!',
			'customer_completed_order'  => 'Your {site_title} order is now complete',
			'customer_refunded_order'   => 'Your {site_title} order #{order_number} has been refunded',
			'customer_invoice'          => 'Your latest {site_title} invoice',
			'customer_note'             => 'Note added to your {site_title} order from {order_date}',
			'customer_reset_password'   => 'Password reset request for {site_title}',
			'customer_new_account'      => 'Your {site_title} account has been created!',
		);
	}

	public static function email_type() {

		$email_types = self::email_array();
		$result      = array();
		foreach ( $email_types as $email_type_key => $value ) {
			$result[ $email_type_key ] = self::get_sample_data( $email_type_key . '.php' );
		}

		return $result;
	}

	public static function wec_activation() {

		$check_active = get_option( 'wec_data' );

		if ( empty( $check_active ) ) {

			$taxes = $option_val = array();

			self::register_wec_taxonomy();
			$content     = self::email_type();
			$email_types = self::email_array();

			$list_mails = $emails = wc()->mailer()->get_emails();
			foreach ( $list_mails as $list_mail ) {
				$taxes[] = array(
					'title' => $list_mail->title,
					'slug'  => $list_mail->id
				);
				wp_insert_term(
					$list_mail->title,
					'wec_email_template',
					array(
						'description' => '',
						'slug'        => $list_mail->id
					)
				);
			}

			foreach ( $taxes as $tax ) {

				$arr_search  = array( '%%domain%%', '%%store_address%%', '%%store_email%%' );
				$arr_replace = array(
					WP_PLUGIN_URL,
					get_option( 'woocommerce_store_address' ),
					get_option( 'admin_email' )
				);
				$_content    = str_replace( $arr_search, $arr_replace, $content[ $tax['slug'] ] );

				$post_arr = array(
					'post_status'  => 'publish',
					'post_content' => $_content,//( $tax['slug'] ),
					'post_title'   => $email_types[ $tax['slug'] ],
					'post_name'    => $tax['slug'],
					'post_type'    => 'wec_email_customizer',
					'ping_status'  => 'open',
				);
				$post_id  = wp_insert_post( $post_arr );

				wp_set_object_terms( $post_id, $tax['slug'], 'wec_email_template' );
				$option_val['list_temp_active'][ $tax['slug'] ][] = $post_id;
				$option_val['list_categories'][ $tax['slug'] ]    = array( $post_id => array( 'all_cat' ) );
				$option_val['list_languages'][ $tax['slug'] ]     = array( $post_id => array( 'all_lang' ) );
				$option_val['list_template'][]                    = $post_id;
				update_post_meta( $post_id, 'wec_p_cats_ordering', 1 );
			}
			update_option( 'wec_data', $option_val, 'yes' );
		}
	}

	public function register_wec_column_email_setting( $columns ) {
		$columns['wec_edit'] = __( 'Customizer', 'woo-custom-email-blocks' );

		return $columns;
	}

	public function show_template_setting( $email ) {
		?>
        <td>
            <a href="<?php echo admin_url() . 'edit.php?post_type=wec_email_customizer' ?>"
               class="button aligncenter">
				<?php _e( 'Edit by Email Block Editor', 'woo-custom-email-blocks' ) ?></a>
        </td>
		<?php
	}

	public function duplicate_post_link( $actions, $post ) {
		if ( current_user_can( 'edit_posts' ) && $post->post_type == 'wec_email_customizer' ) {
			unset( $actions['view'] );
			unset( $actions['inline hide-if-no-js'] );
			$actions['duplicate'] = '<a href="' . wp_nonce_url( 'admin.php?action=duplicate_post_as_draft&post=' . $post->ID, basename( __FILE__ ), 'duplicate_nonce' ) . '" title="Duplicate this item" rel="permalink">Duplicate</a>';
		}

		return $actions;
	}

	public function duplicate_post_as_draft() {

		if ( ! ( isset( $_GET['post'] ) || isset( $_POST['post'] ) || ( isset( $_REQUEST['action'] ) && 'duplicate_post_as_draft' == $_REQUEST['action'] ) ) ) {
			wp_die( 'No post to duplicate has been supplied!' );
		}
		if ( ! isset( $_GET['duplicate_nonce'] ) || ! wp_verify_nonce( $_GET['duplicate_nonce'], basename( __FILE__ ) ) ) {
			return;
		}

		$post_id = ( isset( $_GET['post'] ) ? absint( $_GET['post'] ) : absint( $_POST['post'] ) );

		$post = get_post( $post_id );

		$current_user    = wp_get_current_user();
		$new_post_author = $current_user->ID;

		$post_content = str_replace( '\\', '\\\\', $post->post_content );

		if ( isset( $post ) && $post != null ) {
			$args = array(
				'comment_status' => $post->comment_status,
				'ping_status'    => $post->ping_status,
				'post_author'    => $new_post_author,
				'post_content'   => $post_content,
				'post_excerpt'   => $post->post_excerpt,
				'post_name'      => $post->post_name,
				'post_parent'    => $post->post_parent,
				'post_password'  => $post->post_password,
				'post_status'    => 'draft',
				'post_title'     => $post->post_title,
				'post_type'      => $post->post_type,
				'to_ping'        => $post->to_ping,
				'menu_order'     => $post->menu_order
			);

			/*
			 * insert the post by wp_insert_post() function
			 */
			$new_post_id = wp_insert_post( $args );

			/*
			 * get all current post terms ad set them to the new post draft
			 */
			$taxonomies = get_object_taxonomies( $post->post_type ); // returns array of taxonomy names for post type, ex array("category", "post_tag");
			foreach ( $taxonomies as $taxonomy ) {
				$post_terms = wp_get_object_terms( $post_id, $taxonomy, array( 'fields' => 'slugs' ) );
				wp_set_object_terms( $new_post_id, $post_terms, $taxonomy, false );
			}

			wp_redirect( admin_url( 'post.php?action=edit&post=' . $new_post_id ) );
			exit;

		} else {
			wp_die( 'Post creation failed, could not find original post: ' . $post_id );
		}
	}

	public function replace_title_to_subject( $title ) {
		if ( get_current_screen()->id == 'wec_email_customizer' ) {
			return $title = __( 'Add Subject', 'woo-custom-email-blocks' );
		} else {
			return $title;
		}
	}
}

new WEC_Email_Admin_Settings();


