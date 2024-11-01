const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText} = wp.editor;

import attributes from "./attributes";
import {Format} from "./format";
import {Border} from "./border";
import {TableOrderItemsFormat} from "./table-order-items-format";

export const wec_order_items = () => {

    registerBlockType('wec/order-items', {
        title: __('Order Items', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            content: {type: 'string'},
            alignment: {type: 'string'},
            text_color: {type: 'string'},
            th_font_size: {type: 'number', default: 14,},
            tbody_font_size: {type: 'number', default: 14,},
            th_product: {type: 'string', default: 'Product'},
            th_description: {type: 'string', default: 'Description'},
            th_quantity: {type: 'string', default: 'Quantity'},
            th_price: {type: 'string', default: 'Amount'},
            th_text_color: {type: 'string'},
            tbody_text_color: {type: 'string'},
            th_bg_color: {type: 'string'},
            tbody_bg_color: {type: 'string'},
            image_width: {type: 'number', default: 100},
            border_bottom_width: {type: 'number'},
            border_bottom_color: {type: 'string'},
            border_bottom_type: {type: 'string', default: 'solid'},
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                attributes: {padding_top, padding_bottom, border_bottom_type, border_bottom_color, border_bottom_width, tbody_bg_color, tbody_text_color, tbody_font_size, th_font_size, th_text_color, th_bg_color, image_width, th_description, th_price, th_quantity, th_product, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
            } = props;

            return ([
                <Format {...props}/>, <Border {...props}/>, <TableOrderItemsFormat{...props}/>,
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
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px',
                    }}>

                        <table style={{
                            width: '100%', borderCollapse: 'collapse', margin: 0,
                            border: border_width + 'px solid ' + border_color,
                            tableLayout: 'fixed'
                        }}>

                            <thead style={{
                                backgroundColor: th_bg_color,
                                color: th_text_color,
                                fontSize: th_font_size + 'px'
                            }}>
                            <tr>
                                <th style={{textAlign: 'left', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'PRODUCT'}
                                </th>
                                <th style={{textAlign: 'left', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'DESCRIPTION'}
                                </th>
                                <th style={{textAlign: 'center', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'QTY'}
                                </th>
                                <th style={{textAlign: 'center', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'AMOUNT'}
                                </th>
                            </tr>
                            </thead>

                            <tbody
                                style={{
                                    backgroundColor: tbody_bg_color,
                                    color: tbody_text_color,
                                    fontSize: tbody_font_size + 'px'
                                }}>
                            <tr style={{borderBottom: border_bottom_width + 'px ' + border_bottom_type + ' ' + border_bottom_color}}>
                                <td style={{textAlign: 'left', padding: '5px 15px'}}>
                                    <div style={{
                                        textAlign: 'center',
                                        width: 'fit-content',
                                        border: '1px solid #eee',
                                        padding: '5px'
                                    }}>
                                        <img style={{width: image_width + 'px'}}
                                             src={object_localize.image_path + 'product-26.jpg'}/>
                                    </div>
                                </td>
                                <td style={{textAlign: 'left', padding: '5px 15px'}}>Product name</td>
                                <td style={{textAlign: 'center', padding: '5px 15px'}}>1</td>
                                <td style={{textAlign: 'center', padding: '5px 15px'}}>$20</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'left', padding: '5px 15px'}}>
                                    <div style={{
                                        textAlign: 'center',
                                        width: 'fit-content',
                                        border: '1px solid #eee',
                                        padding: '5px'
                                    }}>
                                        <img style={{
                                            width: '100%', maxWidth: image_width + 'px'
                                        }}
                                             src={object_localize.image_path + 'product-27.jpg'}/>
                                    </div>
                                </td>
                                <td style={{textAlign: 'left', padding: '5px 15px'}}>Product name</td>
                                <td style={{textAlign: 'center', padding: '5px 15px'}}>1</td>
                                <td style={{textAlign: 'center', padding: '5px 15px'}}>$20</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ]);
        },

        save(props) {
            const {
                attributes: {padding_top, padding_bottom, border_bottom_type, border_bottom_color, border_bottom_width, tbody_bg_color, tbody_text_color, tbody_font_size, th_font_size, th_text_color, th_bg_color, image_width, th_description, th_price, th_quantity, th_product, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px',
                    }}>

                        <table style={{
                            width: '100%', borderCollapse: 'collapse', margin: 0,
                            border: border_width + 'px solid ' + border_color, tableLayout: 'fixed'
                        }}>

                            <thead style={{
                                backgroundColor: th_bg_color,
                                color: th_text_color,
                                fontSize: th_font_size + 'px'
                            }}>
                            <tr>
                                <th style={{textAlign: 'left', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'PRODUCT'}
                                </th>
                                <th style={{textAlign: 'left', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'DESCRIPTION'}
                                </th>
                                <th style={{textAlign: 'center', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'QTY'}
                                </th>
                                <th style={{textAlign: 'center', padding: '15px', backgroundColor: th_bg_color}}>
                                    {'PRICE'}
                                </th>
                            </tr>
                            </thead>

                            <tbody
                                style={{
                                    backgroundColor: tbody_bg_color,
                                    color: tbody_text_color,
                                    fontSize: tbody_font_size + 'px'
                                }}>
                            {'%%order_items'}
                            <tr style={{borderBottom: border_bottom_width + 'px ' + border_bottom_type + ' ' + border_bottom_color}}>
                                <td style={{textAlign: 'left', padding: '5px 15px', verticalAlign: 'middle'}}>
                                    <div style={{
                                        textAlign: 'center',
                                        width: 'fit-content',
                                        border: '1px solid #eee',
                                        padding: '5px'
                                    }}>
                                        <img style={{
                                            width: '100%',
                                            maxWidth: image_width + 'px',
                                        }}
                                             src={'%%product_image%%'}/>
                                    </div>
                                </td>
                                <td style={{
                                    textAlign: 'left',
                                    padding: '5px 15px', verticalAlign: 'middle'
                                }}>{'%%product_name%%'}</td>
                                <td style={{
                                    textAlign: 'center',
                                    padding: '5px 15px', verticalAlign: 'middle'
                                }}>{'%%product_quantity%%'}</td>
                                <td style={{
                                    textAlign: 'center',
                                    padding: '5px 15px', verticalAlign: 'middle'
                                }}>{'%%product_price%%'}</td>
                            </tr>
                            {'%%'}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        },

        deprecated: [{
            attributes,
            save(props) {
                const {
                    attributes: {padding_top, padding_bottom, border_bottom_type, border_bottom_color, border_bottom_width, tbody_bg_color, tbody_text_color, tbody_font_size, th_font_size, th_text_color, th_bg_color, image_width, th_description, th_price, th_quantity, th_product, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                            maxWidth: '100%',
                            color: text_color,
                            fontSize: font_size,
                            lineHeight: line_height / 10,
                            borderRadius: border_radius + 'px',
                        }}>

                            <table style={{
                                width: '100%', borderCollapse: 'collapse', margin: 0,
                                border: border_width + 'px solid ' + border_color, tableLayout: 'fixed'
                            }}>

                                <thead style={{
                                    backgroundColor: th_bg_color,
                                    color: th_text_color,
                                    fontSize: th_font_size + 'px'
                                }}>
                                <tr>
                                    <th style={{textAlign: 'left', padding: '15px', backgroundColor: th_bg_color}}>
                                        {'PRODUCT'}
                                    </th>
                                    <th style={{textAlign: 'left', padding: '15px', backgroundColor: th_bg_color}}>
                                        {'DESCRIPTION'}
                                    </th>
                                    <th style={{textAlign: 'center', padding: '15px', backgroundColor: th_bg_color}}>
                                        {'QTY'}
                                    </th>
                                    <th style={{textAlign: 'center', padding: '15px', backgroundColor: th_bg_color}}>
                                        {'PRICE'}
                                    </th>
                                </tr>
                                </thead>

                                <tbody
                                    style={{
                                        backgroundColor: tbody_bg_color,
                                        color: tbody_text_color,
                                        fontSize: tbody_font_size + 'px'
                                    }}>
                                {'%%order_items'}
                                <tr style={{borderBottom: border_bottom_width + 'px ' + border_bottom_type + ' ' + border_bottom_color}}>
                                    <td style={{textAlign: 'left', padding: '5px 15px', verticalAlign: 'middle'}}>
                                        <div style={{
                                            textAlign: 'center',
                                            width: 'fit-content',
                                            border: '1px solid #eee',
                                            padding: '5px'
                                        }}>
                                            <img style={{
                                                width: '100%',
                                                maxWidth: image_width + 'px',
                                            }}
                                                 src={'%%product_image%%'}/>
                                        </div>
                                    </td>
                                    <td style={{
                                        textAlign: 'left',
                                        padding: '5px 15px', verticalAlign: 'middle'
                                    }}>{'%%product_name%%'}</td>
                                    <td style={{
                                        textAlign: 'center',
                                        padding: '5px 15px', verticalAlign: 'middle'
                                    }}>{'%%product_quantity%%'}</td>
                                    <td style={{
                                        textAlign: 'center',
                                        padding: '5px 15px', verticalAlign: 'middle'
                                    }}>{'%%product_price%%'}</td>
                                </tr>
                                {'%%'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
        }]

    });
};