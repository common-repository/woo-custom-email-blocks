const {__} = wp.i18n;
const {InnerBlocks} = wp.editor;
const {registerBlockType} = wp.blocks;

import Template from "./templates";
import attributes from "./attributes";
import {Format} from "./format";
import {Border} from "./border";
import {ImageBackground} from "./image-background";

var template = Template.default_template;
switch (object_localize.wec_get.slug) {
    case 'cancelled_order':
        template = Template.cancelled_order;
        break;
    case 'customer_completed_order':
        template = Template.customer_completed_order;
        break;
    case 'customer_invoice':
        template = Template.customer_invoice;
        break;
    case 'customer_note':
        template = Template.customer_note;
        break;
    case 'failed_order':
        template = Template.failed_order;
        break;
    case 'customer_new_account':
        template = Template.customer_new_account;
        break;
    case 'new_order':
        template = Template.new_order;
        break;
    case 'customer_on_hold_order':
        template = Template.customer_on_hold_order;
        break;
    case 'customer_processing_order':
        template = Template.customer_processing_order;
        break;
    case 'customer_refunded_order':
        template = Template.customer_refunded_order;
        break;
    case 'customer_reset_password':
        template = Template.customer_reset_password;
        break;
}
// const template = slug ? templates.slug : templates.default_template;

const ALLOW_BLOCK = ['wec/store-info', 'wec/email-blocks', 'wec/header', 'wec/text', 'wec/inner-block', 'wec/order-items', 'wec/order-total', 'wec/products', 'wec/socials', 'wec/billing-address', 'wec/shipping-address', 'wec/columns', 'wec/column', 'wec/order-address'];

export const wec_email_blocks = () => {

    registerBlockType('wec/woo-email-blocks', {
        title: __('Email Customizer', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            mediaID: {type: 'string'}, mediaURL: {type: 'url', default: ''}, width: {type: 'number', default: 600},
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {border_radius, mediaURL, border_width, border_color, width, height, padding_left, padding_right, padding_top, padding_bottom, out_bg_color, in_bg_color}
            } = props;
            setAttributes({enable_width: true, out_bg_color: '#dddddd', in_bg_color: '#ffffff'});
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
                        fontFamily: 'Lato, sans-serif'
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
                        fontFamily: 'Lato, sans-serif'
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
                            fontFamily: 'Lato, sans-serif'
                        }}>
                            <InnerBlocks.Content/>
                        </div>
                    </div>
                );
            }
        }]
    });
};