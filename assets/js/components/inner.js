const {__} = wp.i18n;
const {InnerBlocks} = wp.editor;
const {registerBlockType} = wp.blocks;

import attributes from "./attributes";
import textChoice from "./default-text";
import {Format} from "./format";
import {Border} from "./border";
import {ImageBackground} from "./image-background";

var template = textChoice.default_text;
switch (object_localize.wec_get.slug) {
    case 'cancelled_order':
        template = textChoice.cancelled_order;
        break;
    case 'customer_completed_order':
        template = textChoice.customer_completed_order;
        break;
    case 'customer_invoice':
        template = textChoice.customer_invoice;
        break;
    case 'customer_note':
        template = textChoice.customer_note;
        break;
    case 'failed_order':
        template = textChoice.failed_order;
        break;
    case 'customer_new_account':
        template = textChoice.customer_new_account;
        break;
    case 'new_order':
        template = textChoice.new_order;
        break;
    case 'customer_on_hold_order':
        template = textChoice.customer_on_hold_order;
        break;
    case 'customer_processing_order':
        template = textChoice.customer_processing_order;
        break;
    case 'customer_refunded_order':
        template = textChoice.customer_refunded_order;
        break;
    case 'customer_reset_password':
        template = textChoice.customer_reset_password;
        break;
}

const ALLOW_BLOCK = ['wec/email-blocks', 'wec/header', 'wec/text', 'wec/inner-block', 'wec/order-items', 'wec/order-total', 'wec/products', 'wec/socials', 'wec/billing-address', 'wec/shipping-address', 'wec/columns', 'wec/column'];

export const wec_inner_block = () => {

    registerBlockType('wec/inner-block', {
        title: __('Inner Block', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            mediaID: {type: 'string'},
            mediaURL: {type: 'url'},
            width: {type: 'number',}
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {border_radius, mediaURL, border_width, border_color, width, height, padding_left, padding_right, padding_top, padding_bottom, out_bg_color, in_bg_color}
            } = props;
            setAttributes({enable_width: true});
            return ([
                <ImageBackground {...props}/>, <Format {...props}/>, <Border {...props}/>,
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        height: height + 'px',
                        minHeight: '100px',
                        margin: 'auto',
                        backgroundColor: in_bg_color,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        backgroundImage: 'url(' + mediaURL + ')',
                        backgroundSize: 'cover',
                        borderRadius: border_radius + 'px',
                    }}>
                        <InnerBlocks template={template} allowedBlocks={ALLOW_BLOCK}/>
                    </div>
                </div>
            ]);
        },

        save(props) {

            const {
                attributes: {border_radius, mediaURL, border_width, border_color, width, height, padding_left, padding_right, padding_top, padding_bottom, out_bg_color, in_bg_color}
            } = props;
            return (
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        height: height + 'px',
                        minHeight: '100px',
                        margin: 'auto',
                        backgroundColor: in_bg_color,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        backgroundImage: 'url(' + mediaURL + ')',
                        backgroundSize: 'cover',
                        borderRadius: border_radius + 'px',
                    }}>
                        <InnerBlocks.Content/>
                    </div>
                </div>
            );
        },

        deprecated: [{
            attributes,
            save(props) {

                const {
                    attributes: {border_radius, mediaURL, border_width, border_color, width, height, padding_left, padding_right, padding_top, padding_bottom, out_bg_color, in_bg_color}
                } = props;
                return (
                    <div style={{
                        backgroundColor: out_bg_color,
                        padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                    }}>
                        <div style={{
                            width: width + 'px',
                            height: height + 'px',
                            minHeight: '100px',
                            margin: 'auto',
                            backgroundColor: in_bg_color,
                            border: border_width + 'px solid ' + border_color,
                            maxWidth: '100%',
                            backgroundImage: 'url(' + mediaURL + ')',
                            backgroundSize: 'cover',
                            borderRadius: border_radius + 'px',
                        }}>
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                );
            }
        }]

    });
};