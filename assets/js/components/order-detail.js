const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls, AlignmentToolbar, PanelColorSettings} = wp.editor;
const {PanelBody, TextControl, ColorPalette} = wp.components;

export class OrderDetailColor extends Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const {
            setAttributes,
            attributes: {background_color, text_color, order_num_color, order_num_align, item_border_color, total_border_color, table_border_color, heading_color_bg, table_border, item_alignment, total_alignment, item_color_bg, total_color_bg, item_border, total_border}
        } = this.props;
        const textColors = [
            {color: '#000', name: 'black'},
            {color: '#3373dc', name: 'royal blue'},
            {color: '#ff0000', name: 'red'},
            // {color: '#7941b6', name: 'purple'},
        ];
        return (
            <InspectorControls key="inspector">

                <PanelColorSettings
                    title={__('Color', 'woo-custom-email-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: text_color,
                            colors: textColors,
                            onChange: (value) => setAttributes({text_color: value}),
                            label: __('Table Text Color', 'woo-custom-email-blocks'),
                        },
                        {
                            value: background_color,
                            colors: textColors,
                            onChange: (value) => setAttributes({background_color: value}),
                            label: __('Block Color', 'woo-custom-email-blocks'),
                        },
                        {
                            value: heading_color_bg,
                            colors: textColors,
                            onChange: (value) => setAttributes({heading_color_bg: value}),
                            label: __('Header Color', 'woo-custom-email-blocks'),
                        },
                        {
                            value: item_color_bg,
                            colors: textColors,
                            onChange: (value) => setAttributes({item_color_bg: value}),
                            label: __('Body Color', 'woo-custom-email-blocks'),
                        },
                        {
                            value: total_color_bg,
                            colors: textColors,
                            onChange: (value) => setAttributes({total_color_bg: value}),
                            label: __('Footer Color', 'woo-custom-email-blocks'),
                        },
                    ]}
                />

            </InspectorControls>

        );
    }
}


export class OrderDetailAlignment extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const {setAttributes, attributes: {order_num_align, item_alignment, total_alignment}} = this.props;

        return (
            <InspectorControls key="inspector">
                <PanelBody className={'wec-border-style'} title={__('Alignment', 'woo-custom-email-blocks')}
                           initialOpen={true}>

                    <label>{__('Number Order Align', 'woo-custom-email-blocks')}</label>
                    <AlignmentToolbar value={order_num_align}
                                      onChange={(newAlignment) => setAttributes({order_num_align: newAlignment})}/>
                    {/*
                    <label>{__('Body Table Align', 'woo-custom-email-blocks')}</label>
                    <AlignmentToolbar value={item_alignment}
                                      onChange={(newAlignment) => setAttributes({item_alignment: newAlignment})}/>

                    <label>{__('Footer Table Align', 'woo-custom-email-blocks')}</label>
                    <AlignmentToolbar value={total_alignment}
                                      onChange={(newAlignment) => setAttributes({total_alignment: newAlignment})}/>
*/}
                </PanelBody>
            </InspectorControls>
        );
    }
}


export class OrderDetailBorder extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const {setAttributes, attributes: {border_top_width, border_bottom_width, border_color, table_border, table_border_color, item_border, item_border_color, total_border, total_border_color}} = this.props;
        const backgroundColors = [
            {color: '#b7b7b7', name: 'gray'},
            {color: '#3373dc', name: 'royal blue'},
            {color: '#ff0000', name: 'red'},
            // {color: '#7941b6', name: 'purple'},
        ];
        return (
            <InspectorControls key="inspector">
                <PanelBody className={'wec-border-style'} title={__('Border', 'woo-custom-email-blocks')}
                           initialOpen={true}>

                    <TextControl
                        label={__('Block border top', 'woo-custom-email-blocks')}
                        type={'number'} value={border_top_width} min={0} max={5}
                        onChange={(newWidth) => {
                            setAttributes({border_top_width: newWidth})
                        }}/>
                    <TextControl
                        label={__('Block border bottom', 'woo-custom-email-blocks')}
                        type={'number'} value={border_bottom_width} min={0} max={5}
                        onChange={(newWidth) => {
                            setAttributes({border_bottom_width: newWidth})
                        }}/>

                    <ColorPalette
                        label={__('Border color', 'woo-custom-email-blocks')}
                        value={border_color}
                        colors={backgroundColors}
                        onChange={(newColor) => {
                            setAttributes({border_color: newColor})
                        }}/>

                    <TextControl
                        label={__('Table border', 'woo-custom-email-blocks')}
                        type={'number'} value={table_border} min={0} max={5}
                        onChange={(newWidth) => {
                            setAttributes({table_border: newWidth})
                        }}/>
                    <ColorPalette
                        value={table_border_color}
                        colors={backgroundColors}
                        onChange={(newColor) => {
                            setAttributes({table_border_color: newColor})
                        }}/>

                    {/*<TextControl*/}
                    {/*label={__('Body border', 'woo-custom-email-blocks')}*/}
                        {/*type={'number'} value={item_border} min={0} max={5}*/}
                        {/*onChange={(newWidth) => {*/}
                            {/*setAttributes({item_border: newWidth})*/}
                        {/*}}/>*/}
                    {/*<ColorPalette*/}
                        {/*value={item_border_color}*/}
                        {/*colors={backgroundColors}*/}
                        {/*onChange={(newColor) => {*/}
                            {/*setAttributes({item_border_color: newColor})*/}
                        {/*}}/>*/}

                    {/*<TextControl*/}
                    {/*label={__('Footer border', 'woo-custom-email-blocks')}*/}
                        {/*type={'number'} value={total_border} min={0} max={5}*/}
                        {/*onChange={(newWidth) => {*/}
                            {/*setAttributes({total_border: newWidth})*/}
                        {/*}}/>*/}
                    {/*<ColorPalette*/}
                        {/*value={total_border_color}*/}
                        {/*colors={backgroundColors}*/}
                        {/*onChange={(newColor) => {*/}
                            {/*setAttributes({total_border_color: newColor})*/}
                        {/*}}/>*/}

                </PanelBody>
            </InspectorControls>
        );
    }
}