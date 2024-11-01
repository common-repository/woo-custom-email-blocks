const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;

import attributes from "./attributes";
import {Format} from "./format";
import {Border} from "./border";
import {AddressTextFormat} from "./address-text-format";
import Alignment from "./alignment";

export const wec_shipping_address = () => {

    registerBlockType('wec/shipping-address', {
        title: __('Shipping Address', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            content: {type: 'string'},
            alignment: {type: 'string'},
            alignment_right: {type: 'string'},
            text_color: {type: 'string'},
            heading_color: {type: 'string'},
            font_size: {type: 'number', default: 13},
            heading_font_size: {type: 'number', default: 15}
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {heading_color, heading_font_size, alignment, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
            } = props;
            setAttributes({enable_height: true});
            return ([
                <Format {...props}/>, <Border {...props}/>, <Alignment {...props}/>,
                <AddressTextFormat {...props}/>,
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        minHeight: '180px',
                        height: height + 'px',
                        margin: 'auto',
                        backgroundColor: in_bg_color,
                        border: border_width + 'px solid ' + border_color,
                        textAlign: alignment,
                        maxWidth: '100%',
                        color: text_color,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px'
                    }}>
                        <div style={{padding: '10px 20px'}}>
                            <div style={{
                                fontWeight: 'bold',
                                color: heading_color,
                                fontSize: heading_font_size,
                                paddingBottom: '5px'
                            }}>
                                Shipping address
                            </div>
                            <div style={{color: text_color, fontSize: font_size,}}>
                                John Doe<br/>
                                San Francisco<br/>
                                California<br/>
                                United States (US)<br/>
                            </div>
                        </div>
                    </div>
                </div>
            ]);
        },

        save(props) {
            const {
                attributes: {heading_color, heading_font_size, alignment, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
            } = props;
            return (
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        minHeight: '180px',
                        height: height + 'px',
                        margin: 'auto',
                        backgroundColor: in_bg_color,
                        border: border_width + 'px solid ' + border_color,
                        textAlign: alignment,
                        maxWidth: '100%',
                        color: text_color,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px'
                    }}>
                        <div style={{padding: '10px 20px'}}>
                            <div style={{
                                fontWeight: 'bold',
                                color: heading_color,
                                fontSize: heading_font_size,
                                paddingBottom: '5px'
                            }}>
                                Shipping address
                            </div>
                            <div style={{color: text_color, fontSize: font_size,}}>
                                {'%%order_shipping%%'}
                            </div>
                        </div>
                    </div>
                </div>
            );
        },

        deprecated: [{
            attributes,
            save(props) {
                const {
                    attributes: {heading_color, heading_font_size, alignment, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
                } = props;
                return (
                    <div style={{
                        backgroundColor: out_bg_color,
                        padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                    }}>
                        <div style={{
                            width: width + 'px',
                            minHeight: '180px',
                            height: height + 'px',
                            margin: 'auto',
                            backgroundColor: in_bg_color,
                            border: border_width + 'px solid ' + border_color,
                            textAlign: alignment,
                            maxWidth: '100%',
                            color: text_color,
                            lineHeight: line_height / 10,
                            borderRadius: border_radius + 'px'
                        }}>
                            <div style={{padding: '10px 20px'}}>
                                <div style={{
                                    fontWeight: 'bold',
                                    color: heading_color,
                                    fontSize: heading_font_size,
                                    paddingBottom: '5px'
                                }}>
                                    Shipping address
                                </div>
                                <div style={{color: text_color, fontSize: font_size,}}>
                                    {'%%order_shipping%%'}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }]

    });
};

