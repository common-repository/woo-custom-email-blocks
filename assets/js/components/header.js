const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText, MediaUpload} = wp.editor;
const {PanelBody, ColorPalette, Button} = wp.components;

import attributes from "./attributes";
import {Format} from "./format";
import Alignment from "./alignment";
import {Border} from "./border";
import {TextFormat} from "./text-format";
import {MarkUp} from "./mark-up";

export const wec_header = () => {

    registerBlockType('wec/header', {
        title: __('Header', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            content: {type: 'string'},
            alignment: {type: 'string'},
            text_color: {type: 'string'},
            mediaURL: {type: 'url'},
            mediaID: {type: 'number'},
            font_size: {type: 'number', default: 14}
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {mediaURL, mediaID, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
            } = props;

            return ([
                <Format {...props}/>, <Border {...props}/>, <Alignment {...props}/>,
                <TextFormat {...props}/>,
                <div className={'wceb-block-header'} style={{
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
                        overflow: 'hidden'
                    }}>
                        <table style={{width: '100%', color: 'inherit'}}>
                            <tr>
                                <td style={{width: '30%', textAlign: alignment, padding: '10px 0'}}>
                                    <div style={{position: 'relative', minHeight: '40px'}}>
                                        <img style={{width: '100%'}} src={mediaURL}/>
                                        <MediaUpload
                                            onSelect={(media) => {
                                                setAttributes({
                                                    mediaURL: media.url,
                                                    mediaID: media.id
                                                })
                                            }}
                                            allowedTypes={['image']}
                                            value={mediaID}
                                            render={({open}) => (
                                                <Button
                                                    style={mediaID ? {
                                                        opacity: 0,
                                                    } : {opacity: 1}}
                                                    className={'wec-upload-logo-btn'}
                                                    onClick={open}>
                                                    {__('Logo')}
                                                </Button>
                                            )}
                                        />
                                    </div>
                                </td>
                                <td style={{
                                    width: '70%',
                                    textAlign: alignment,
                                    color: text_color,
                                    fontSize: font_size,
                                    verticalAlign: 'middle'
                                }}>
                                    <div><RichText value={content}
                                        // placeholder={__('Your text', 'woo-custom-email-blocks')}
                                                   onChange={(newValue) => {
                                                       setAttributes({content: newValue});
                                                   }}/>
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
                attributes: {mediaURL, mediaID, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                        overflow: 'hidden'
                    }}>
                        <table style={{width: '100%'}}>
                            <tr>
                                <td style={{width: '30%', textAlign: alignment, padding: '10px 0'}}>
                                    <div style={{}}>
                                        <img style={{width: '100%'}} src={mediaURL}/>
                                    </div>
                                </td>
                                <td style={{
                                    width: '70%',
                                    textAlign: alignment,
                                    color: text_color,
                                    fontSize: font_size,
                                    verticalAlign: 'middle'
                                }}>
                                    <div><RichText.Content value={content}/></div>
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
                    attributes: {mediaURL, mediaID, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                            overflow: 'hidden'
                        }}>
                            <table style={{width: '100%'}}>
                                <tr>
                                    <td style={{width: '30%', textAlign: alignment, padding: '10px 0'}}>
                                        <div style={{}}>
                                            <img style={{width: '100%'}} src={mediaURL}/>
                                        </div>
                                    </td>
                                    <td style={{
                                        width: '70%',
                                        textAlign: alignment,
                                        color: text_color,
                                        fontSize: font_size,
                                        verticalAlign: 'middle'
                                    }}>
                                        <div><RichText.Content value={content}/></div>
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