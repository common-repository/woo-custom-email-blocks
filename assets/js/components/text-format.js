const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.editor;
const {PanelBody, FontSizePicker, ColorPalette, RangeControl} = wp.components;

export class TextFormat extends Component {
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
            {size: 13, name: __('Small'), slug: 'small'},
            {size: 18, name: __('Medium'), slug: 'medium'},
            {size: 30, name: __('Large'), slug: 'medium'},
        ];

        const fallbackFontSize = 16;

        const {setAttributes, attributes: {text_padding, enable_text_padding, line_height, text_color, font_size}} = this.props;

        return (

            <InspectorControls key="inspector">
                <PanelBody className={''} title={__('Text Format', 'woo-custom-email-blocks')}
                           initialOpen={true}>

                    <FontSizePicker
                        fontSizes={fontSizes}
                        value={font_size}
                        fallbackFontSize={fallbackFontSize}
                        // withSlider={true}
                        onChange={(newFontSize) => {
                            setAttributes({font_size: newFontSize});
                        }}
                    />

                    <label>{__('Text color', 'woo-custom-email-blocks')}</label>
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
                    {enable_text_padding ? <RangeControl
                        label={__('Padding', 'woo-custom-email-blocks')}
                        value={text_padding}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({text_padding: newValue});
                            }
                        }}
                        min={0} max={100}
                    /> : ''}
                </PanelBody>
            </InspectorControls>
        );
    }
}
