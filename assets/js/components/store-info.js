import attributes from "./attributes";
import {Format} from "./format";
import {Border} from "./border";
import {TextFormat} from "./text-format";

const {__} = wp.i18n;
const {RichText} = wp.editor;
const {registerBlockType} = wp.blocks;


export const wec_store_info = () => {

    registerBlockType('wec/store-info', {
        title: __('Store Info', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            store_address: {type: 'string', default: object_localize.store_add},
            store_phone: {type: 'string', default: 'phone number'},
            store_mail: {type: 'string', default: object_localize.store_email},
            text_color: {type: 'string', default: '#bababa'},
            font_size: {type: 'number', default: 12},
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {store_mail, store_phone, text_color, line_height, font_size, store_address, border_radius, border_width, border_color, width, height, padding_left, padding_right, padding_top, padding_bottom, out_bg_color, in_bg_color}
            } = props;
            setAttributes({enable_width: true});
            return ([
                <Format {...props}/>, <TextFormat {...props}/>, <Border {...props}/>,
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
                        // backgroundImage: 'url(' + mediaURL + ')',
                        backgroundSize: 'cover',
                        borderRadius: border_radius + 'px',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 100
                    }}>
                        <table style={{margin: 'auto !important', width: '100%'}}>
                            <tr>
                                <td style={{paddingLeft: '5px'}}>
                                    <div>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img width={16}
                                                         src={object_localize.image_path + 'location.png'}/>

                                                </td>
                                                <td>
                                                    <RichText style={{minWidth: '50px'}}
                                                              value={store_address ? store_address : 'Store address'}
                                                              onChange={(newValue) => {
                                                                  setAttributes({store_address: newValue})
                                                              }}/>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td style={{paddingLeft: '5px'}}>
                                    <div>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img width={16}
                                                         src={object_localize.image_path + 'mobile.png'}/>
                                                </td>
                                                <td>
                                                    <RichText style={{minWidth: '50px'}}
                                                              value={store_phone ? store_phone : 'Store phone number'}
                                                              onChange={(newValue) => {
                                                                  setAttributes({store_phone: newValue})
                                                              }}/>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td style={{paddingLeft: '5px'}}>
                                    <div>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img width={16}
                                                         src={object_localize.image_path + 'email.png'}/>
                                                </td>
                                                <td>
                                                    <RichText style={{minWidth: '50px'}}
                                                              value={store_mail ? store_mail : ' Store email'}
                                                              onChange={(newValue) => {
                                                                  setAttributes({store_mail: newValue})
                                                              }}/>
                                                </td>
                                            </tr>
                                        </table>
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
                attributes: {store_mail, store_phone, text_color, line_height, font_size, store_address, border_radius, border_width, border_color, width, height, padding_left, padding_right, padding_top, padding_bottom, out_bg_color, in_bg_color}
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
                        // backgroundImage: 'url(' + mediaURL + ')',
                        backgroundSize: 'cover',
                        borderRadius: border_radius + 'px',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 100
                    }}>
                        <table style={{margin: 'auto !important', width: '100%'}}>
                            <tr>
                                <td style={{paddingLeft: '5px'}}>
                                    <div>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img width={16}
                                                         src={object_localize.image_path + 'location.png'}/>

                                                </td>
                                                <td>
                                                    <RichText.Content style={{minWidth: '50px'}}
                                                                      value={store_address}/>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td style={{paddingLeft: '5px'}}>
                                    <div>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img width={16}
                                                         src={object_localize.image_path + 'mobile.png'}/>

                                                </td>
                                                <td>
                                                    <RichText.Content style={{minWidth: '50px'}}
                                                                      value={store_phone}/>

                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td style={{paddingLeft: '5px'}}>
                                    <div>
                                        <table>
                                            <tr>
                                                <td>
                                                    <img width={16}
                                                         src={object_localize.image_path + 'email.png'}/>

                                                </td>
                                                <td>
                                                    <RichText.Content style={{minWidth: '50px'}}
                                                                      value={store_mail}/>

                                                </td>
                                            </tr>
                                        </table>
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
                    attributes: {store_mail, store_phone, text_color, line_height, font_size, store_address, border_radius, border_width, border_color, width, height, padding_left, padding_right, padding_top, padding_bottom, out_bg_color, in_bg_color}
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
                            // backgroundImage: 'url(' + mediaURL + ')',
                            backgroundSize: 'cover',
                            borderRadius: border_radius + 'px',
                            color: text_color,
                            fontSize: font_size,
                            lineHeight: line_height / 100
                        }}>
                            <table style={{margin: 'auto !important', width: '100%'}}>
                                <tr>
                                    <td style={{paddingLeft: '5px'}}>
                                        <div>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <img width={16}
                                                             src={object_localize.image_path + 'location.png'}/>

                                                    </td>
                                                    <td>
                                                        <RichText.Content style={{minWidth: '50px'}}
                                                                          value={store_address}/>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                    <td style={{paddingLeft: '5px'}}>
                                        <div>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <img width={16}
                                                             src={object_localize.image_path + 'mobile.png'}/>

                                                    </td>
                                                    <td>
                                                        <RichText.Content style={{minWidth: '50px'}}
                                                                          value={store_phone}/>

                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                    <td style={{paddingLeft: '5px'}}>
                                        <div>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <img width={16}
                                                             src={object_localize.image_path + 'email.png'}/>

                                                    </td>
                                                    <td>
                                                        <RichText.Content style={{minWidth: '50px'}}
                                                                          value={store_mail}/>

                                                    </td>
                                                </tr>
                                            </table>
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