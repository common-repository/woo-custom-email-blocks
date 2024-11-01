const {Component} = wp.element;
const {BlockControls, AlignmentToolbar} = wp.editor;

export default class Alignment extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const {setAttributes, attributes: {alignment}} = this.props;

        return (

            <BlockControls key="block_control">
                <AlignmentToolbar value={alignment}
                                  onChange={(newAlignment) => setAttributes({alignment: newAlignment})}/>
            </BlockControls>
        );
    }
}
