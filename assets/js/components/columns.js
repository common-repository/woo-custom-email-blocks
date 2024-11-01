import attributes from "./attributes";

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {InnerBlocks} = wp.editor;

const template_columns = [
    ['wec/column', {}, []],
    ['wec/column', {}, []],
];

export const wec_columns = () => {

    registerBlockType('wec/columns', {
        title: __('Columns', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: attributes,
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),
        // supports: {
        //     align: ['wide', 'full'],
        //     html: false,
        // },

        edit(props) {
            const {
                attributes: {background_color, font_family, border_bottom_width, text_color, border_top_width, border_color},
                className
            } = props;

            return ([
                    <div className={'wec-woo-email-customizer-columns'}
                         style={{
                             backgroundColor: background_color,
                             color: text_color,
                             borderTop: border_top_width + 'px solid ' + border_color,
                             borderBottom: border_bottom_width + 'px solid ' + border_color
                         }}>
                        <InnerBlocks template={template_columns} templateLock={'insert'}
                                     allowedBlocks={['wec/column']}/>
                        {/*<div style={{clear: 'both', display: 'none'}}>.</div>*/}
                    </div>
                ]
            );// allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} template={template_columns} templateLock={'insert'}
        },

        save(props) {
            return (
                <div className={'wec-woo-email-customizer-columns'}
                     style={{}}>
                    <InnerBlocks.Content/>
                    <div style={{clear: 'both', opacity: '0', height: '0'}}>.</div>
                </div>
            );
        },
        deprecated: [{
            save(props) {
                return (
                    <div className={'wec-woo-email-customizer-columns'}
                         style={{}}>
                        <InnerBlocks.Content/>
                        <div style={{clear: 'both', opacity: '0', height: '0'}}>.</div>
                    </div>
                );
            }
        }]
    });
};

export const wec_column = () => {

    registerBlockType('wec/column', {
        title: __('Column', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: attributes,
        placeholder: __('Customizer email template', 'woo-custom-email-blocks'),
        supports: {
            inserter: false,
        },
        edit(props) {
            return (

                <div className={'wec-woo-email-customizer-column'}>
                    <InnerBlocks templateLock={false}/>
                </div>

            );// allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE}
        },

        save(props) {
            return (
                <div className={'wec-woo-email-customizer-column'} style={{width: '49%', float: 'left'}}>
                    <InnerBlocks.Content/>
                </div>
            );
        },
        deprecated: [{
            save(props) {
                return (
                    <div className={'wec-woo-email-customizer-column'} style={{width: '49%', float: 'left'}}>
                        <InnerBlocks.Content/>
                    </div>
                );
            }
        }]
    });
};