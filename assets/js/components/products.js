const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RawHTML} = wp.element;

import attributes from "./attributes";
import {Format} from "./format";
import Alignment from "./alignment";
import {Border} from "./border";
import {TextFormat} from "./text-format";
import {ProductsPanel} from "./products-panel";

export const wec_products = () => {

    registerBlockType('wec/products', {
        title: __('Products', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            content: {type: 'string'},
            product_save: {type: 'string', default: 'related'},
            alignment: {type: 'string'},
            text_color: {type: 'string'},
            title_color: {type: 'string'},
            title_bg_color: {type: 'string'},
            font_size: {type: 'number', default: 13},
            font_size_title: {type: 'number', default: 16},
            rows: {type: 'number', default: 1},
            cols: {type: 'number', default: 3},
            loaded: {type: 'boolean', default: false},
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {padding_top, padding_bottom, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
            } = props;
            setAttributes({enable_width: true});
            return ([
                <Format {...props}/>, <Border {...props}/>, <ProductsPanel {...props}/>, <Alignment {...props}/>,
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
                        textAlign: alignment,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px',
                        padding: '5px'
                    }}>
                        <RawHTML>
                            {content}
                        </RawHTML>

                    </div>
                </div>
            ]);
        },

        save(props) {
            const {
                attributes: {product_save, rows, cols, padding_top, padding_bottom, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                        textAlign: alignment,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px',
                        padding: '5px'
                    }}>
                        {'%%' + product_save + '-' + rows + '-' + cols + '%%'}
                    </div>
                </div>
            );
        },

        deprecated: [{
            attributes,
            save(props) {
                const {
                    attributes: {product_save, rows, cols, padding_top, padding_bottom, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                            textAlign: alignment,
                            border: border_width + 'px solid ' + border_color,
                            maxWidth: '100%',
                            color: text_color,
                            fontSize: font_size,
                            lineHeight: line_height / 10,
                            borderRadius: border_radius + 'px',
                            padding: '5px'
                        }}>
                            {'%%' + product_save + '-' + rows + '-' + cols + '%%'}
                        </div>
                    </div>
                );
            }
        }]
    });


};