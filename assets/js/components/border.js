const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.editor;
const {PanelBody, TextControl, ColorPalette, RangeControl} = wp.components;

export class Border extends Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const sampleColors = [
            {color: '#b7b7b7', name: 'gray'},
            {color: '#1bb3a7', name: 'cyan'},
            {color: '#ff0000', name: 'red'},
        ];
        const {setAttributes, attributes: {border_radius, border_width, border_top_width, border_bottom_width, border_color}} = this.props;

        return (

            <InspectorControls key="inspector">
                <PanelBody title={__('Border', 'woo-custom-email-blocks')} initialOpen={false}>
                    <RangeControl
                        label={__('Border width', 'woo-custom-email-blocks')}
                        value={border_width}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({border_width: newValue});
                            }
                        }}
                        min={0} max={100}
                    />

                    <ColorPalette
                        label={__('Border color', 'woo-custom-email-blocks')}
                        value={border_color}
                        colors={sampleColors}
                        onChange={(newColor) => {
                            setAttributes({border_color: newColor})
                        }}/>

                    <RangeControl
                        label={__('Border radius', 'woo-custom-email-blocks')}
                        value={border_radius}
                        onChange={(newValue) => {
                            if (newValue <= 100) {
                                setAttributes({border_radius: newValue});
                            }
                        }}
                        min={0} max={100}
                    />
                </PanelBody>
            </InspectorControls>
        );
    }
}

export class BorderOutSide extends Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const backgroundColors = [
            {color: '#b7b7b7', name: 'gray'},
            {color: '#3373dc', name: 'royal blue'},
            {color: '#ff0000', name: 'red'},
        ];
        const {setAttributes, attributes: {border_main_width, border_color}} = this.props;

        return (

            <InspectorControls key="inspector">
                <PanelBody className={'wec-border-style'} title={__('Border', 'woo-custom-email-blocks')}
                           initialOpen={false}>

                    <TextControl
                        label={__('Border width', 'woo-custom-email-blocks')}
                        type={'number'} value={border_main_width} min={0} max={5}
                        onChange={(newWidth) => {
                            setAttributes({border_main_width: newWidth})
                        }}/>

                    {/*<TextControl*/}
                    {/*label={__('Border radius', 'woo-custom-email-blocks')}*/}
                    {/*type={'number'} value={border_radius} min={0} max={100}*/}
                    {/*onChange={(newValue) => {*/}
                    {/*setAttributes({border_radius: newValue})*/}
                    {/*}}/>*/}

                    <ColorPalette
                        label={__('Border color', 'woo-custom-email-blocks')}
                        value={border_color}
                        colors={backgroundColors}
                        onChange={(newColor) => {
                            setAttributes({border_color: newColor})
                        }}/>

                </PanelBody>
            </InspectorControls>
        );
    }
}