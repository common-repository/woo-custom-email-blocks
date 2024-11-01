export default {
    default_text: [
        ['wec/text', {content: 'Order Heading', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
        ['wec/text', {
            content: 'Hello, {customer_name}! Thank you for shopping at {site_title} and for your order!',
            text_color: '#ffffff',
        }, []],
        ['wec/text', {
            content: 'Fortunately all the items you’ve ordered are available in stock and will be dispatched within 24 hours. Please review the order details within this email and if there are any changes you wish to make to your order contact us within the next 12 hours.',
            text_color: '#ffffff',
            padding_top: 3,
        }, []],
        ['wec/text', {
            content: 'Order Number: #{order_number}',
            alignment: 'center',
            font_size: 16,
            text_color: '#ffffff',
            border_width: 5,
            border_color: '#f7c11d',
            padding_left: 28,
            padding_right: 28,
            text_padding: 5,
            padding_bottom: 8,
            border_radius: 10
        }, []],
    ],
    cancelled_order:
        [
            ['wec/text', {content: 'Cancelled Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Alas. Just to let you know — {customer_name} has cancelled order ',
                text_color: '#ffffff',
                alignment: 'center'
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_completed_order:
        [
            ['wec/text', {content: 'Complete Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello, {customer_name}! Thank you for shopping at {site_title} and your order has been marked complete on our side.',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_invoice:
        [
            ['wec/text', {content: 'Invoice Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello, {customer_name}! Thank you for shopping at {site_title}. Your invoice is below.{pay_for_this_order}.',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Here are the details of your order.',
                text_color: '#ffffff',
                padding_top: 0
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_note:
        [
            ['wec/text', {content: 'Customer Note', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello, {customer_name}! The following note has been added to your order: {customer_note}.',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'As a reminder, here are your order details:',
                text_color: '#ffffff',
                padding_top: 0
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    failed_order:
        [
            ['wec/text', {content: 'Failed Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Payment for order #{order_number} from {customer_name} has failed. The order was as follows.',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_new_account:
        [
            ['wec/text', {content: 'New Account', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello, {customer_name}! ',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Thanks for creating an account on {site_title}. As a reminder, the username you chose is {customer_name}. You can access your account area to view orders, change your password, and more at: {account_page}',
                text_color: '#ffffff',
                padding_top: 0
            }, []],
            ['wec/text', {
                content: 'Username: {customer_name}',
                text_color: '#ffffff',
                padding_top: 0
            }, []],
            ['wec/text', {
                content: 'Your password has been automatically generated: {new_password}',
                text_color: '#ffffff',
                padding_top: 0
            }, []],
            ['wec/text', {
                content: 'We look forward to seeing you soon.',
                text_color: '#ffffff',
                padding_top: 0
            }, []],
        ],

    new_order:
        [
            ['wec/text', {content: 'New Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'You’ve received the following order from {customer_name}',
                text_color: '#ffffff',
                alignment: 'center'
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_on_hold_order:
        [
            ['wec/text', {content: 'On-hold Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello {customer_name}!',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Thanks for your order. It’s on-hold until we confirm that payment has been received. In the meantime, here’s a reminder of what you ordered',
                text_color: '#ffffff',
                padding_top: 0,
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_processing_order:
        [
            ['wec/text', {content: 'Processing Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello {customer_name}!',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Just to let you know, your payment has been confirmed, and your order is now being processed',
                text_color: '#ffffff',
                padding_top: 0,
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_refunded_order:
        [
            ['wec/text', {content: 'Refunded Order', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello {customer_name}!',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Your order on {site_title}  has been refunded. There are more details below for your reference',
                text_color: '#ffffff',
                padding_top: 0,
            }, []],
            ['wec/text', {
                content: 'Order Number: #{order_number}',
                alignment: 'center',
                font_size: 16,
                text_color: '#ffffff',
                border_width: 5,
                border_color: '#f7c11d',
                padding_left: 28,
                padding_right: 28,
                text_padding: 5,
                padding_bottom: 8,
                border_radius: 10
            }, []],
        ],

    customer_reset_password:
        [
            ['wec/text', {content: 'Reset Password', alignment: 'center', font_size: 30, text_color: '#ffffff'}, []],
            ['wec/text', {
                content: 'Hello {customer_name}!',
                text_color: '#ffffff',
            }, []],
            ['wec/text', {
                content: 'Someone has requested a new password for the following account on {site_title}',
                text_color: '#ffffff',
                padding_top: 0,
            }, []],
            ['wec/text', {
                content: 'Username: {customer_name}',
                text_color: '#ffffff',
                padding_top: 0,
            }, []],
            ['wec/text', {
                content: "If you didn't make this request, just ignore this email. If you'd like to proceed",
                text_color: '#ffffff',
                padding_top: 0,
            }, []],
            ['wec/text', {
                content: "{reset_password_link}",
                text_color: '#ffffff',
                padding_top: 0,
            }, []],
        ],
}