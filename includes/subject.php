<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 29/01/2019
 * Time: 4:38 CH
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WEC_Subject {
	public function __construct() {
		add_filter( 'woocommerce_email_subject_customer_processing_order',
			array( $this, 'customizing_subject_customer_processing_order' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_new_order',
			array( $this, 'customizing_subject_new_order' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_failed_order',
			array( $this, 'customizing_subject_failed_order' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_cancelled_order',
			array( $this, 'customizing_subject_cancelled_order' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_customer_completed_order',
			array( $this, 'customizing_subject_customer_completed_order' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_customer_invoice',
			array( $this, 'customizing_subject_customer_invoice' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_customer_on_hold_order',
			array( $this, 'customizing_subject_customer_on_hold_order' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_customer_refunded_order',
			array( $this, 'customizing_subject_customer_refunded_order' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_customer_note',
			array( $this, 'customizing_subject_customer_note' ), 10, 2 );

		add_filter( 'woocommerce_email_subject_customer_new_account',
			array( $this, 'customizing_subject_customer_new_account' ) );

		add_filter( 'woocommerce_email_subject_customer_reset_password',
			array( $this, 'customizing_subject_customer_reset_password' ) );

	}

	public function change_sub( $id, $formated_subject, $order ) {
		$mailer  = new WEC_Mailer();
		$temp_id = $mailer->email_rules( $id, $order );
		$option  = get_option( WEC_OPTION )['list_temp_active'][ $id ];

		if ( in_array( $temp_id, $option ) ) {

			if ( get_post( $temp_id )->post_type == 'wec_email_customizer' ) {
//				$subject = get_post_meta( $temp_id, 'wec_email_subject', true );
				$subject = get_post( $temp_id )->post_title;
				if ( ! empty( $subject ) ) {
					$email = WC()->mailer->get_emails()['WC_Email_Customer_Processing_Order'];

					$arr_search  = array( '{order_number}', '{customer_name}', '{customer_full_name}' );
					$arr_replace = array(
						esc_html( $order->get_order_number() ),
						esc_html( $order->get_billing_first_name() ),
						esc_html( $order->get_formatted_billing_full_name() ),
					);
					$subject     = str_replace( $arr_search, $arr_replace, $subject );


					return $email->format_string( $subject );

				} else {
					return $formated_subject;
				}
			} else {
				return $formated_subject;
			}
		} else {
			return $formated_subject;
		}
	}

	public function customizing_subject_customer_processing_order( $formated_subject, $order ) {
		return $this->change_sub( 'customer_processing_order', $formated_subject, $order );
	}

	public function customizing_subject_new_order( $formated_subject, $order ) {
		return $this->change_sub( 'new_order', $formated_subject, $order );
	}

	public function customizing_subject_failed_order( $formated_subject, $order ) {
		return $this->change_sub( 'failed_order', $formated_subject, $order );
	}

	public function customizing_subject_cancelled_order( $formated_subject, $order ) {
		return $this->change_sub( 'cancelled_order', $formated_subject, $order );
	}

	public function customizing_subject_customer_completed_order( $formated_subject, $order ) {
		return $this->change_sub( 'customer_completed_order', $formated_subject, $order );
	}

	public function customizing_subject_customer_invoice( $formated_subject, $order ) {
		return $this->change_sub( 'customer_invoice', $formated_subject, $order );
	}

	public function customizing_subject_customer_on_hold_order( $formated_subject, $order ) {
		return $this->change_sub( 'customer_on_hold_order', $formated_subject, $order );
	}

	public function customizing_subject_customer_refunded_order( $formated_subject, $order ) {
		return $this->change_sub( 'customer_refunded_order', $formated_subject, $order );
	}

	public function customizing_subject_customer_note( $formated_subject, $order ) {
		return $this->change_sub( 'customer_note', $formated_subject, $order );
	}

	public function customizing_subject_customer_new_account( $formated_subject ) {
		$mailer  = new WEC_Mailer();
		$temp_id = $mailer->email_follow_locate( 'customer_new_account' );
		if ( get_post( $temp_id )->post_type == 'wec_email_customizer' ) {
			$subject = get_post( $temp_id )->post_title;
			$email   = WC()->mailer->get_emails()['WC_Email_Customer_New_Account'];

			return $email->format_string( $subject );
		} else {
			return $formated_subject;
		}
	}

	public function customizing_subject_customer_reset_password( $formated_subject ) {
		$mailer  = new WEC_Mailer();
		$temp_id = $mailer->email_follow_locate( 'customer_reset_password' );
		if ( get_post( $temp_id )->post_type == 'wec_email_customizer' ) {
			$subject = get_post( $temp_id )->post_title;
			$email   = WC()->mailer->get_emails()['WC_Email_Customer_Reset_Password'];

			return $email->format_string( $subject );
		} else {
			return $formated_subject;
		}
	}

}

new WEC_Subject();
