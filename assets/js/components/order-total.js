const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;

import attributes from "./attributes";
import {Format} from "./format";
import {Border} from "./border";
import {TextFormat} from "./text-format";

export const wec_order_total = () => {

    registerBlockType('wec/order-total', {
        title: __('Order Total', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            content: {type: 'string'},
            alignment_left: {type: 'string'},
            alignment_right: {type: 'string'},
            text_color: {type: 'string'},
            font_size: {type: 'number', default: 14},
            line_height: {type: 'number', default: 10},
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {alignment_left, alignment_right, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
            } = props;

            return ([
                <Format {...props}/>, <Border {...props}/>, <Alignment {...props}/>,
                <TextFormat {...props}/>,
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        height: height + 'px',
                        margin: 'auto',
                        backgroundColor: in_bg_color,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px',
                        padding: '10px'
                    }}>
                        <table style={{width: '100%', color: 'inherit'}}>
                            <tr>
                                <td style={{
                                    textAlign: alignment_left,
                                    fontWeight: 'bold',
                                    padding: '5px 30px'
                                }}>Subtotal :
                                </td>
                                <td style={{textAlign: alignment_right, padding: '5px 30px'}}>$40</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: alignment_left, fontWeight: 'bold', padding: '5px 30px'}}>Payment
                                    method :
                                </td>
                                <td style={{textAlign: alignment_right, padding: '5px 30px'}}>Cash on delivery</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: alignment_left, fontWeight: 'bold', padding: '5px 30px'}}>Total
                                    :
                                </td>
                                <td style={{textAlign: alignment_right, padding: '5px 30px'}}>$40</td>
                            </tr>
                        </table>
                    </div>
                </div>
            ]);
        },

        save(props) {
            const {
                attributes: {alignment_left, alignment_right, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
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
                        backgroundColor: in_bg_color,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px',
                        padding: '10px'
                    }}>
                        <table style={{width: '100%'}}>
                            {'%%order_total'}
                            <tr>
                                <td style={{
                                    textAlign: alignment_left,
                                    fontWeight: 'bold',
                                    padding: '5px 30px'
                                }}>{'%%total_title%%'}
                                </td>
                                <td style={{textAlign: alignment_right, padding: '5px 30px'}}>{'%%total_value%%'}</td>
                            </tr>
                            {'%%'}
                        </table>
                    </div>
                </div>
            );
        },

        deprecated: [{
            attributes,
            save(props) {
                const {
                    attributes: {alignment_left, alignment_right, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, border_width, border_color}
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
                            backgroundColor: in_bg_color,
                            border: border_width + 'px solid ' + border_color,
                            maxWidth: '100%',
                            color: text_color,
                            fontSize: font_size,
                            lineHeight: line_height / 10,
                            borderRadius: border_radius + 'px',
                            padding: '10px'
                        }}>
                            <table style={{width: '100%'}}>
                                {'%%order_total'}
                                <tr>
                                    <td style={{
                                        textAlign: alignment_left,
                                        fontWeight: 'bold',
                                        padding: '5px 30px'
                                    }}>{'%%total_title%%'}
                                    </td>
                                    <td style={{
                                        textAlign: alignment_right,
                                        padding: '5px 30px'
                                    }}>{'%%total_value%%'}</td>
                                </tr>
                                {'%%'}
                            </table>
                        </div>
                    </div>
                );
            }
        }]

    });
};

const {Component} = wp.element;
const {BlockControls, AlignmentToolbar} = wp.editor;

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
