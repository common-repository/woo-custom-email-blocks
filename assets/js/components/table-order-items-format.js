const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.editor;
const {PanelBody, FontSizePicker, ColorPalette, RangeControl, SelectControl} = wp.components;

export class TableOrderItemsFormat extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const sampleColors = [
            {color: '#fff', name: 'white'},
            {color: '#1bb3a7', name: 'cyan'},
            {color: '#ff0000', name: 'red'},
        ];

        const fontSizes = [
            {size: 12, name: __('Small'), slug: 'small'},
            {size: 16, name: __('Medium'), slug: 'medium'},
            {size: 30, name: __('Large'), slug: 'medium'},
        ];

        const fallbackFontSize = 16;

        const {setAttributes, attributes: {border_bottom_type, border_bottom_color, border_bottom_width, image_width, tbody_bg_color, tbody_text_color, tbody_font_size, th_font_size, th_text_color, th_bg_color, line_height,}} = this.props;

        return (

            <InspectorControls key="inspector">
                <PanelBody className={''} title={__('Table Format', 'woo-custom-email-blocks')}
                           initialOpen={true}>
                    <div>
                        <label className={'wec-panel-label'}>{__('Header', 'woo-custom-email-blocks')}</label>

                        <FontSizePicker
                            fontSizes={fontSizes}
                            value={th_font_size}
                            fallbackFontSize={fallbackFontSize}
                            onChange={(newFontSize) => {
                                setAttributes({th_font_size: newFontSize});
                            }}
                        />
                        <label>{__('Text color', 'woo-custom-email-blocks')}</label>
                        <ColorPalette
                            value={th_text_color}
                            colors={sampleColors}
                            onChange={(newValue) => {
                                setAttributes({th_text_color: newValue})
                            }}/>
                        <label>{__('Background color', 'woo-custom-email-blocks')}</label>
                        <ColorPalette
                            value={th_bg_color}
                            colors={sampleColors}
                            onChange={(newValue) => {
                                setAttributes({th_bg_color: newValue})
                            }}/>

                        <RangeControl
                            label={__('Line height', 'woo-custom-email-blocks')}
                            value={line_height}
                            onChange={(newValue) => {
                                if (newValue <= 10) {
                                    setAttributes({line_height: newValue});
                                }
                            }}
                            min={1} max={10}
                        />

                    </div>

                    <div>
                        <label className={'wec-panel-label'}>{__('Body', 'woo-custom-email-blocks')}</label>

                        <FontSizePicker
                            fontSizes={fontSizes}
                            value={tbody_font_size}
                            fallbackFontSize={fallbackFontSize}
                            onChange={(newFontSize) => {
                                setAttributes({tbody_font_size: newFontSize});
                            }}
                        />
                        <label>{__('Text color', 'woo-custom-email-blocks')}</label>
                        <ColorPalette
                            value={tbody_text_color}
                            colors={sampleColors}
                            onChange={(newValue) => {
                                setAttributes({tbody_text_color: newValue})
                            }}/>
                        <label>{__('Background color', 'woo-custom-email-blocks')}</label>
                        <ColorPalette
                            value={tbody_bg_color}
                            colors={sampleColors}
                            onChange={(newValue) => {
                                setAttributes({tbody_bg_color: newValue})
                            }}/>

                        <RangeControl
                            label={__('Image width', 'woo-custom-email-blocks')}
                            value={image_width}
                            onChange={(newValue) => {
                                if (newValue <= 110) {
                                    setAttributes({image_width: newValue});
                                }
                            }}
                            min={1} max={110}
                        />

                        <RangeControl
                            label={__('Border row', 'woo-custom-email-blocks')}
                            value={border_bottom_width}
                            onChange={(newValue) => {
                                if (newValue <= 5) {
                                    setAttributes({border_bottom_width: newValue});
                                }
                            }}
                            min={0} max={5}
                        />

                        <label>{__('Color', 'woo-custom-email-blocks')}</label>
                        <ColorPalette
                            value={border_bottom_color}
                            colors={sampleColors}
                            onChange={(newValue) => {
                                setAttributes({border_bottom_color: newValue})
                            }}/>

                        <SelectControl
                            value={border_bottom_type}
                            options={[
                                {label: __('Dotted', 'woo-custom-email-blocks'), value: 'dotted'},
                                {label: __('Solid', 'woo-custom-email-blocks'), value: 'solid'},
                            ]}
                            onChange={
                                (newValue) => {
                                    setAttributes({border_bottom_type: newValue})
                                }
                            }
                        />

                    </div>

                </PanelBody>
            </InspectorControls>
        );
    }
}
