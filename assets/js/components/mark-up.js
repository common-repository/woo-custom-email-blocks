const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.editor;
const {TextControl, PanelBody} = wp.components;
const {Button, ButtonGroup} = wp.components;


export class MarkUp extends Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const {attributes: {content}, setAttributes, className} = this.props;
        const markUp = [
            {symbol: '{account_page}'},
            {symbol: '{customer_name}'},
            {symbol: '{customer_full_name}'},
            {symbol: '{customer_note}'},
            {symbol: '{new_password}'},
            {symbol: '{order_number}'},
            {symbol: '{order_date}'},
            {symbol: '{reset_password_link}'},
            {symbol: '{site_title}'},
        ];

        const showBtn = (markUp, index) => {
            return <tr>
                <td>{markUp.symbol}</td>
                <td className={className + '-markup-btn'}><Button value={markUp.symbol} isLarge onClick={() => {
                    var newContent = content.replace('<br><br>', '<br>');
                    // var sub_string = window.getSelection().anchorNode.data;
                    // var position = (content.indexOf(sub_string) + sub_string.length);
                    // var position = window.getSelection().anchorOffset;
                    // var before = content.slice(0, position);
                    // var after = content.slice(position);
                    // var str_replace = before + markUp.symbol + after;

                    //document.getSelection().getRangeAt(0).cloneRange().getBoundingClientRect()
                    //document.getSelection().anchorNode.parentNode.offsetParent.getBoundingClientRect()

                    // setAttributes({content: before + markUp.symbol + after});
                    setAttributes({content: newContent + markUp.symbol});
                }}>{__("Use", 'woo-custom-email-blocks')}</Button></td>
            </tr>
        };
        return ([
            <InspectorControls>
                <PanelBody title={__('Shortcodes', 'woo-custom-email-blocks')} initialOpen={true}>
                    <table className={className + '-markup'}>
                        {markUp.map(showBtn)}
                    </table>
                </PanelBody>
            </InspectorControls>,
        ]);
    }
}
