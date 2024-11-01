const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls, PanelColorSettings} = wp.editor;
const {PanelBody, TextControl, ColorPalette, RangeControl} = wp.components;

class Format extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const sampleColors = [
            {color: '#000', name: 'black'},
            {color: '#1bb3a7', name: 'cyan'},
            {color: '#ff0000', name: 'red'},
        ];

        const {setAttributes, attributes: {text_opacity, enable_width, enable_height, width, height, padding_left, padding_right, padding_top, padding_bottom, in_bg_color, out_bg_color}} = this.props;

        return (

            <InspectorControls key="inspector">
                <PanelBody className={'wec-border-style'} title={__('Format', 'woo-custom-email-blocks')}
                           initialOpen={true}>

                    {enable_width ? <RangeControl
                        label={__('Width', 'woo-custom-email-blocks')}
                        value={width}
                        onChange={(newValue) => {
                            if (newValue <= 800) {
                                setAttributes({width: newValue});
                            }
                        }}
                        min={0} max={800}
                    /> : ''}

                    {enable_height ? <RangeControl
                        label={__('Height', 'woo-custom-email-blocks')}
                        value={height}
                        onChange={(newValue) => {
                            if (newValue <= 1000) {
                                setAttributes({height: newValue});
                            }
                        }}
                        min={0} max={1000}
                    /> : ''}

                    <RangeControl
                        label={__('Padding top', 'woo-custom-email-blocks')}
                        value={padding_top}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({padding_top: newValue});
                            }
                        }}
                        min={0} max={100}
                    />
                    <RangeControl
                        label={__('Padding bottom', 'woo-custom-email-blocks')}
                        value={padding_bottom}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({padding_bottom: newValue});
                            }
                        }}
                        min={0} max={100}
                    />
                    <RangeControl
                        label={__('Padding left', 'woo-custom-email-blocks')}
                        value={padding_left}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({padding_left: newValue});
                            }
                        }}
                        min={0} max={100}
                    />
                    <RangeControl
                        label={__('Padding right', 'woo-custom-email-blocks')}
                        value={padding_right}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({padding_right: newValue});
                            }
                        }}
                        min={0} max={100}
                    />

                    <label>{__('Background color inside', 'woo-custom-email-blocks')}</label>
                    <ColorPalette
                        label={__('Background color inside', 'woo-custom-email-blocks')}
                        value={in_bg_color}
                        colors={sampleColors}
                        onChange={(newValue) => {
                            setAttributes({in_bg_color: newValue})
                        }}/>

                    {text_opacity ? <RangeControl
                        label={__('Opacity', 'woo-custom-email-blocks')}
                        value={text_opacity}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({text_opacity: newValue});
                            }
                        }}
                        min={0} max={100}
                    /> : ''}

                    <label>{__('Background color outside', 'woo-custom-email-blocks')}</label>
                    <ColorPalette
                        label={__('Background color outside', 'woo-custom-email-blocks')}
                        value={out_bg_color}
                        colors={sampleColors}
                        onChange={(newValue) => {
                            setAttributes({out_bg_color: newValue})
                        }}/>

                </PanelBody>
            </InspectorControls>
        );
    }
}


export {Format}