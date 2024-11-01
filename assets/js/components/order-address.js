const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {Component} = wp.element;
const {BlockControls, AlignmentToolbar} = wp.editor;

import attributes from "./attributes";
import {Format} from "./format";
import {Border} from "./border";
// import {TextFormat} from "./text-format";
import {AddressTextFormat} from "./address-text-format";

export const wec_order_address = () => {

    registerBlockType('wec/order-address', {
        title: __('Order Address', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            content: {type: 'string'},
            alignment_left: {type: 'string'},
            alignment_right: {type: 'string'},
            text_color: {type: 'string'},
            heading_color: {type: 'string'},
            font_size: {type: 'number', default: 13},
            heading_font_size: {type: 'number', default: 15}
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                attributes: {heading_color, heading_font_size, alignment_left, alignment_right, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
            } = props;

            return ([
                <Format {...props}/>, <Border {...props}/>, <Alignment {...props}/>,
                <AddressTextFormat {...props}/>,
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        height: height + 'px',
                        margin: 'auto',
                        maxWidth: '100%',
                        lineHeight: line_height / 10,
                    }}>
                        <table style={{width: '100%', tableLayout: 'fixed'}}>
                            <tr>
                                <td style={{
                                    width: '48%',
                                    padding: '10px',
                                    textAlign: alignment_left,
                                    border: border_width + 'px solid ' + border_color,
                                    borderRadius: border_radius + 'px',
                                    backgroundColor: in_bg_color,
                                }}>
                                    {/*<div style={{padding: '10px'}}>*/}
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            color: heading_color,
                                            fontSize: heading_font_size,
                                            paddingBottom: '5px'
                                        }}>BILLING ADDRESS
                                    </div>

                                    <div style={{color: text_color, fontSize: font_size,}}>
                                        John Doe<br/>
                                        San Francisco<br/>
                                        California<br/>
                                        United States (US)<br/>
                                        +1-541-123-4567<br/>
                                        johndoe@your_site.com
                                    </div>
                                </td>
                                <td style={{padding: '10px'}}></td>
                                <td
                                    className={'wec-address-align-top'}
                                    style={{
                                        width: '48%',
                                        verticalAlign: 'top !important',
                                        padding: '10px',
                                        textAlign: alignment_right,
                                        border: border_width + 'px solid ' + border_color,
                                        borderRadius: border_radius + 'px',
                                        backgroundColor: in_bg_color,
                                    }}>
                                    <div style={{
                                        fontWeight: 'bold',
                                        color: heading_color,
                                        fontSize: heading_font_size,
                                        paddingBottom: '5px'
                                    }}>
                                        SHIPPING ADDRESS
                                    </div>
                                    <div style={{color: text_color, fontSize: font_size,}}>
                                        John Doe<br/>
                                        San Francisco<br/>
                                        California<br/>
                                        United States (US)<br/>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            ]);
        },

        save(props) {
            const {
                attributes: {heading_color, heading_font_size, alignment_left, alignment_right, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
            } = props;

            return (
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        height: height + 'px',
                        margin: 'auto',
                        maxWidth: '100%',
                        lineHeight: line_height / 10,
                    }}>
                        <table style={{width: '100%', tableLayout: 'fixed'}}>
                            <tr>
                                <td style={{
                                    width: '48%',
                                    padding: '10px',
                                    textAlign: alignment_left,
                                    border: border_width + 'px solid ' + border_color,
                                    borderRadius: border_radius + 'px',
                                    backgroundColor: in_bg_color,
                                }}>
                                    {/*<div style={{padding: '10px'}}>*/}
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            color: heading_color,
                                            fontSize: heading_font_size,
                                            paddingBottom: '5px'
                                        }}>BILLING ADDRESS
                                    </div>

                                    <div style={{color: text_color, fontSize: font_size,}}>
                                        {'%%order_billing%%'}
                                    </div>
                                </td>
                                <td style={{padding: '10px'}}></td>
                                <td style={{
                                    width: '48%',
                                    verticalAlign: 'top !important',
                                    padding: '10px',
                                    textAlign: alignment_right,
                                    border: border_width + 'px solid ' + border_color,
                                    borderRadius: border_radius + 'px',
                                    backgroundColor: in_bg_color,
                                }}>
                                    <div style={{
                                        fontWeight: 'bold',
                                        color: heading_color,
                                        fontSize: heading_font_size,
                                        paddingBottom: '5px'
                                    }}>
                                        SHIPPING ADDRESS
                                    </div>
                                    <div style={{color: text_color, fontSize: font_size,}}>
                                        {'%%order_shipping%%'}
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            );
        },

        deprecated: [{
            attributes,
            save(props) {
                const {
                    attributes: {heading_color, heading_font_size, alignment_left, alignment_right, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
                } = props;

                return (
                    <div style={{
                        backgroundColor: out_bg_color,
                        padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                    }}>
                        <div style={{
                            width: width + 'px',
                            height: height + 'px',
                            margin: 'auto',
                            maxWidth: '100%',
                            lineHeight: line_height / 10,
                        }}>
                            <table style={{width: '100%', tableLayout: 'fixed'}}>
                                <tr>
                                    <td style={{
                                        width: '48%',
                                        padding: '10px',
                                        textAlign: alignment_left,
                                        border: border_width + 'px solid ' + border_color,
                                        borderRadius: border_radius + 'px',
                                        backgroundColor: in_bg_color,
                                    }}>
                                        {/*<div style={{padding: '10px'}}>*/}
                                        <div
                                            style={{
                                                fontWeight: 'bold',
                                                color: heading_color,
                                                fontSize: heading_font_size,
                                                paddingBottom: '5px'
                                            }}>BILLING ADDRESS
                                        </div>

                                        <div style={{color: text_color, fontSize: font_size,}}>
                                            {'%%order_billing%%'}
                                        </div>
                                    </td>
                                    <td style={{padding: '10px'}}></td>
                                    <td style={{
                                        width: '48%',
                                        verticalAlign: 'top !important',
                                        padding: '10px',
                                        textAlign: alignment_right,
                                        border: border_width + 'px solid ' + border_color,
                                        borderRadius: border_radius + 'px',
                                        backgroundColor: in_bg_color,
                                    }}>
                                        <div style={{
                                            fontWeight: 'bold',
                                            color: heading_color,
                                            fontSize: heading_font_size,
                                            paddingBottom: '5px'
                                        }}>
                                            SHIPPING ADDRESS
                                        </div>
                                        <div style={{color: text_color, fontSize: font_size,}}>
                                            {'%%order_shipping%%'}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                );
            }
        }]

    });
};

class Alignment extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const {setAttributes, attributes: {alignment_left, alignment_right,}} = this.props;

        return (

            <BlockControls key="block_control">
                <AlignmentToolbar value={alignment_left}
                                  onChange={(newAlignment) => setAttributes({alignment_left: newAlignment})}/>
                <AlignmentToolbar value={alignment_right}
                                  onChange={(newAlignment) => setAttributes({alignment_right: newAlignment})}/>
            </BlockControls>
        );
    }
}