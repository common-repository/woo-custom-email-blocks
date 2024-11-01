const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls, MediaUpload, PanelColorSettings} = wp.editor;
const {PanelBody, ColorPalette, Button} = wp.components;

export class ImageBackground extends Component {
    constructor(props) {
        super(...props);
    }

    render() {

        const {setAttributes, attributes: {mediaID, mediaURL}} = this.props;

        const onSelect = (media) => {
            setAttributes({
                mediaURL: media.url,
                mediaID: media.id
            });
        };
        return (

            <InspectorControls key="inspector">

                <PanelBody title={__('Image Background', 'woo-custom-email-blocks')} initialOpen={true}>
                    <label
                        className={'wec-background-control-label'}>{__('Image', 'woo-custom-email-blocks')}</label>
                    <MediaUpload
                        onSelect={onSelect}
                        allowedTypes={['image']}
                        value={mediaID}
                        render={({open}) => (
                            <Button
                                className={'components-icon-button editor-media-placeholder__button is-button is-default is-large'}
                                onClick={open}>
                                {__('Open Media Library')}
                            </Button>
                        )}
                    />

                </PanelBody>
            </InspectorControls>
        );
    }
}
