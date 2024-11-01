const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.editor;
const {PanelBody, FontSizePicker} = wp.components;

export default class FontSize extends Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const {attributes: {font_size}, setAttributes} = this.props;
        const fontSizes = [
            {size: 12, name: __('Small'), slug: 'small'},
            {size: 16, name: __('Medium'), slug: 'medium'},
            {size: 30, name: __('Large'), slug: 'medium'},
        ];
        const fallbackFontSize = 16;
        // const fallbackFontSize = () => {
        //     setAttributes({font_size: 16})
        // };
        return (
            <InspectorControls>
                <PanelBody title={__('Font Size', 'woo-custom-email-blocks')} initialOpen={true}>
                    <FontSizePicker
                        fontSizes={fontSizes}
                        value={font_size}
                        fallbackFontSize={fallbackFontSize}
                        // withSlider={true}
                        onChange={(newFontSize) => {
                            setAttributes({font_size: newFontSize});
                        }}
                    />
                </PanelBody>
            </InspectorControls>
        );
    }
}