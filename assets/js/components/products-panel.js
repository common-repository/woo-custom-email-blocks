const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls,} = wp.editor;
const {PanelBody, SelectControl, RangeControl, FontSizePicker, ColorPalette} = wp.components;

export class ProductsPanel extends Component {
    constructor(props) {
        super(...props);

    }


    render() {
        const {setAttributes, attributes: {content, product_save, loaded, rows, cols}} = this.props;

        const createTable = (rows, cols) => {
            var children = '';
            // Outer loop to create parent
            for (let i = 0; i < rows; i++) {
                children = children + "<tr>";
                //Inner loop to create children
                for (let j = 0; j < cols; j++) {
                    var k = (j + i * cols) + 1;
                    children = children + "<td style='padding: 5px; text-align: inherit'><img src='" + object_localize.image_path + "product-" + k + ".jpg'/><div>Product name</div><div>$20</div></td>";
                }
                //Create the parent and add the children
                children = children + "</tr>";
            }

            return '<table style="margin:0; padding: 5px">' + children + '</table>';
        };

        if (!loaded) {
            // createTable(rows, cols);
            setAttributes({content: createTable(rows, cols)});
            // console.log('ss');
            setAttributes({loaded: true});
        }

        return ([
            <InspectorControls>
                <PanelBody title={__('Select Products', 'woo-custom-email-blocks')} initialOpen={true}>
                    <SelectControl
                        value={product_save}
                        options={[
                            {label: __('Related', 'woo-custom-email-blocks'), value: 'related'},
                            {label: __('Best Selling', 'woo-custom-email-blocks'), value: 'best_selling'},
                            {label: __('Cross Sell', 'woo-custom-email-blocks'), value: 'cross_sell'},
                            {label: __('Featured', 'woo-custom-email-blocks'), value: 'featured'},
                            {label: __('On Sale', 'woo-custom-email-blocks'), value: 'on_sale'},
                            {label: __('Top Rated', 'woo-custom-email-blocks'), value: 'top_rated'},
                            {label: __('Up Sell', 'woo-custom-email-blocks'), value: 'up_sell'},
                            {label: __('In the same Category', 'woo-custom-email-blocks'), value: 'in_same_category'},
                        ]}
                        onChange={
                            (value) => {
                                setAttributes({product_save: value});

                            }
                        }
                    />
                    <RangeControl
                        label={__('Rows', 'woo-custom-email-blocks')}
                        value={rows}
                        onChange={(newValue) => {
                            if (newValue <= 5) {
                                setAttributes({rows: newValue});
                                setAttributes({content: createTable(newValue, cols)});
                            }
                        }}
                        min={1} max={5}
                    />
                    <RangeControl
                        label={__('Columns', 'woo-custom-email-blocks')}
                        value={cols}
                        onChange={(newValue) => {
                            if (newValue <= 5) {
                                setAttributes({cols: newValue});
                                setAttributes({content: createTable(rows, newValue)});

                            }
                        }}
                        min={1} max={5}
                    />

                </PanelBody>
            </InspectorControls>
        ]);
    }
}

