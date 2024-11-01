const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.editor;
const {PanelBody, FontSizePicker, ColorPalette, RangeControl} = wp.components;

export class AddressTextFormat extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const sampleColors = [
            {color: '#fff', name: 'white'},
            {color: '#000', name: 'black'},
            {color: '#ff0000', name: 'red'},
        ];

        const fontSizes = [
            {size: 12, name: __('Small'), slug: 'small'},
            {size: 16, name: __('Medium'), slug: 'medium'},
            {size: 30, name: __('Large'), slug: 'medium'},
        ];

        const fallbackFontSize = 16;

        const {setAttributes, attributes: {heading_font_size, heading_color, line_height, text_color, font_size}} = this.props;

        return (

            <InspectorControls key="inspector">
                <PanelBody className={''} title={__('Text Format', 'woo-custom-email-blocks')}
                           initialOpen={true}>

                    <FontSizePicker
                        label={'Heading font-size'}
                        fontSizes={fontSizes}
                        value={heading_font_size}
                        fallbackFontSize={fallbackFontSize}
                        onChange={(newFontSize) => {
                            setAttributes({heading_font_size: newFontSize});
                        }}
                    />
                    <FontSizePicker
                        fontSizes={fontSizes}
                        value={font_size}
                        fallbackFontSize={fallbackFontSize}
                        onChange={(newFontSize) => {
                            setAttributes({font_size: newFontSize});
                        }}
                    />

                    <label>{__('Heading color', 'woo-custom-email-blocks')}</label>
                    <ColorPalette
                        value={heading_color}
                        colors={sampleColors}
                        onChange={(newValue) => {
                            setAttributes({heading_color: newValue})
                        }}/>

                    <label>{__('Body color', 'woo-custom-email-blocks')}</label>
                    <ColorPalette
                        value={text_color}
                        colors={sampleColors}
                        onChange={(newValue) => {
                            setAttributes({text_color: newValue})
                        }}/>

                    <RangeControl
                        label={__('Line height', 'woo-custom-email-blocks')}
                        value={line_height}
                        onChange={(newValue) => {
                            if (newValue <= 30) {
                                setAttributes({line_height: newValue});
                            }
                        }}
                        min={1} max={30}
                    />
                </PanelBody>
            </InspectorControls>
        );
    }
}
