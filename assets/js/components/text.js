const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText} = wp.editor;

import attributes from "./attributes";
import {Format} from "./format";
import Alignment from "./alignment";
import {Border} from "./border";
import {TextFormat} from "./text-format";
import {MarkUp} from "./mark-up";

export const wec_text = () => {

    registerBlockType('wec/text', {
        title: __('Email Text', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            content: {type: 'string'},
            alignment: {type: 'string'},
            text_color: {type: 'string', default: '#000'},
            font_size: {type: 'number', default: 14},
            text_opacity: {type: 'number', default: 100},
            text_padding: {type: 'number', default: 0},
            enable_text_padding: {type: 'boolean', default: true},
        }),
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {text_padding, text_opacity, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
            } = props;

            return ([
                <MarkUp {...props}/>, <Format {...props}/>, <Border {...props}/>, <Alignment {...props}/>,
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
                        opacity: text_opacity / 100,
                        padding: text_padding + '% 0'

                    }}>
                        <RichText value={content}
                            // placeholder={__('Your text', 'woo-custom-email-blocks')}
                                  onChange={(newValue) => {
                                      setAttributes({content: newValue});
                                  }}/>
                    </div>
                </div>
            ]);
        },

        save(props) {
            const {
                attributes: {text_padding, text_opacity, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                        opacity: text_opacity / 100,
                        padding: text_padding + '% 0'
                    }}>
                        <RichText.Content value={content}/>
                    </div>
                </div>
            );
        },

        deprecated: [{
            attributes,
            save(props) {
                const {
                    attributes: {text_padding, text_opacity, line_height, border_radius, font_size, text_color, width, height, padding_top, padding_bottom, padding_left, padding_right, content, out_bg_color, in_bg_color, alignment, border_width, border_color}
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
                            opacity: text_opacity / 100,
                            padding: text_padding + '% 0'
                        }}>
                            <RichText.Content value={content}/>
                        </div>
                    </div>
                );
            }
        }]
    });


};