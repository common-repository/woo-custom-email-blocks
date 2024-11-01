import attributes from "./attributes";
import {Border} from "./border";
import {Format} from "./format";

const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.editor;
const {TextControl, PanelBody} = wp.components;
const {registerBlockType} = wp.blocks;

const facebookIcon = object_localize.image_path + 'facebook.png';
const twitterIcon = object_localize.image_path + 'twitter.png';
const googleIcon = object_localize.image_path + 'google.png';
const youtubeIcon = object_localize.image_path + 'youtube.png';
const pinterestIcon = object_localize.image_path + 'pinterest.png';
const instagramIcon = object_localize.image_path + 'instagram.png';
const linkedInIcon = object_localize.image_path + 'linkedIn.png';

export const wec_socials = () => {

    registerBlockType('wec/socials', {
        title: __('Socials', 'woo-custom-email-blocks'),
        description: __('Custom your email template', 'woo-custom-email-blocks'),
        icon: 'email',
        category: 'wec-email-block-editor',
        attributes: Object.assign({}, attributes, {
            facebookURL: {type: 'url'},
            twitterURL: {type: 'url'},
            googleURL: {type: 'url'},
            youtubeURL: {type: 'url'},
            instagramURL: {type: 'url'},
            linkedInURL: {type: 'url'},
            pinterestURL: {type: 'url'},
        }),
        // parent: ['wec/woo-email-customizer'],
        placeholder: __('Customizer email template - socials', 'woo-custom-email-blocks'),

        edit(props) {
            const {
                setAttributes,
                attributes: {padding_top, padding_bottom, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, out_bg_color, in_bg_color, alignment, border_width, border_color}
            } = props;
            setAttributes({enable_width: true});

            return ([
                <Format {...props}/>, <Border {...props}/>,
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        height: height + 'px',
                        margin: 'auto',
                        backgroundColor: in_bg_color,
                        textAlign: alignment,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px'
                    }}>
                        <Socials {...props}/>
                    </div>
                </div>

            ]);
        },

        save(props) {
            const {
                attributes: {facebookURL, twitterURL, googleURL, youtubeURL, pinterestURL, linkedInURL, instagramURL, padding_top, padding_bottom, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, out_bg_color, in_bg_color, alignment, border_width, border_color}
            } = props;

            return (
                <div style={{
                    backgroundColor: out_bg_color,
                    padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                }}>
                    <div style={{
                        width: width + 'px',
                        height: height + 'px',
                        margin: 'auto',
                        backgroundColor: in_bg_color,
                        textAlign: alignment,
                        border: border_width + 'px solid ' + border_color,
                        maxWidth: '100%',
                        color: text_color,
                        fontSize: font_size,
                        lineHeight: line_height / 10,
                        borderRadius: border_radius + 'px'
                    }}>
                        <div className={'wp-block-wec-socials-element'}
                             style={{padding: '10px', maxWidth: '400px', margin: 'auto'}}>
                            <div style={{margin: 'auto', width: 'fit-content'}}>
                                <table style={{textAlign: 'center'}}>
                                    <tr>
                                        {facebookURL ?
                                            <td style={{padding: '2px'}}><a href={facebookURL}>
                                                <img style={{width: '100%'}} src={facebookIcon}/></a>
                                            </td> : ''}
                                        {twitterURL ?
                                            <td style={{padding: '2px'}}><a href={twitterURL}>
                                                <img style={{width: '100%'}} src={twitterIcon}/></a>
                                            </td> : ''}
                                        {googleURL ?
                                            <td style={{padding: '2px'}}><a href={googleURL}>
                                                <img style={{width: '100%'}} src={googleIcon}/></a>
                                            </td> : ''}
                                        {youtubeURL ?
                                            <td style={{padding: '2px'}}><a href={youtubeURL}>
                                                <img style={{width: '100%'}} src={youtubeIcon}/></a>
                                            </td> : ''}
                                        {pinterestURL ?
                                            <td style={{padding: '2px'}}><a href={pinterestURL}>
                                                <img style={{width: '100%'}} src={pinterestIcon}/></a>
                                            </td> : ''}
                                        {linkedInURL ?
                                            <td style={{padding: '2px'}}><a href={linkedInURL}>
                                                <img style={{width: '100%'}} src={linkedInIcon}/></a>
                                            </td> : ''}
                                        {instagramURL ?
                                            <td style={{padding: '2px'}}><a href={instagramURL}>
                                                <img style={{width: '100%'}} src={instagramIcon}/></a>
                                            </td> : ''}
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        },

        deprecated: [
            {
                attributes,
                save(props) {
                    const {
                        attributes: {facebookURL, twitterURL, googleURL, youtubeURL, pinterestURL, linkedInURL, instagramURL, padding_top, padding_bottom, line_height, border_radius, font_size, text_color, width, height, padding_left, padding_right, out_bg_color, in_bg_color, alignment, border_width, border_color}
                    } = props;

                    return (
                        <div style={{
                            backgroundColor: out_bg_color,
                            padding: padding_top + '% ' + padding_right + '% ' + padding_bottom + '% ' + padding_left + '% '
                        }}>
                            <div style={{
                                width: width + 'px',
                                height: height + 'px',
                                margin: 'auto',
                                backgroundColor: in_bg_color,
                                textAlign: alignment,
                                border: border_width + 'px solid ' + border_color,
                                maxWidth: '100%',
                                color: text_color,
                                fontSize: font_size,
                                lineHeight: line_height / 10,
                                borderRadius: border_radius + 'px'
                            }}>
                                <div className={'wp-block-wec-socials-element'}
                                     style={{padding: '10px', maxWidth: '400px', margin: 'auto'}}>
                                    <div style={{margin: 'auto', width: 'fit-content'}}>
                                        <table style={{textAlign: 'center'}}>
                                            <tr>
                                                {facebookURL ?
                                                    <td style={{padding: '2px'}}><a href={facebookURL}>
                                                        <img style={{width: '100%'}} src={facebookIcon}/></a>
                                                    </td> : ''}
                                                {twitterURL ?
                                                    <td style={{padding: '2px'}}><a href={twitterURL}>
                                                        <img style={{width: '100%'}} src={twitterIcon}/></a>
                                                    </td> : ''}
                                                {googleURL ?
                                                    <td style={{padding: '2px'}}><a href={googleURL}>
                                                        <img style={{width: '100%'}} src={googleIcon}/></a>
                                                    </td> : ''}
                                                {youtubeURL ?
                                                    <td style={{padding: '2px'}}><a href={youtubeURL}>
                                                        <img style={{width: '100%'}} src={youtubeIcon}/></a>
                                                    </td> : ''}
                                                {pinterestURL ?
                                                    <td style={{padding: '2px'}}><a href={pinterestURL}>
                                                        <img style={{width: '100%'}} src={pinterestIcon}/></a>
                                                    </td> : ''}
                                                {linkedInURL ?
                                                    <td style={{padding: '2px'}}><a href={linkedInURL}>
                                                        <img style={{width: '100%'}} src={linkedInIcon}/></a>
                                                    </td> : ''}
                                                {instagramURL ?
                                                    <td style={{padding: '2px'}}><a href={instagramURL}>
                                                        <img style={{width: '100%'}} src={instagramIcon}/></a>
                                                    </td> : ''}
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        ]
    });
};

class Socials extends Component {
    constructor(props) {
        super(...props);
    }

    render() {
        const {
            attributes: {
                facebookURL, twitterURL, googleURL, youtubeURL, pinterestURL, linkedInURL, instagramURL,
            }, setAttributes
        } = this.props;
        return ([
            <InspectorControls>
                <PanelBody title={__('Social Media Links', 'woo-custom-email-blocks')} initialOpen={true}>
                    <TextControl label={__('Facebook URL', 'woo-custom-email-blocks')} type={'url'} value={facebookURL}
                                 placeholder={'https://www.facebook.com/your_facebook/'}
                                 onChange={(newURL) => setAttributes({facebookURL: newURL})}/>
                    <TextControl label={__('Twitter URL', 'woo-custom-email-blocks')} type={'url'} value={twitterURL}
                                 placeholder={'https://twitter.com/your_twitter/'}
                                 onChange={(newURL) => setAttributes({twitterURL: newURL})}/>
                    <TextControl label={__('Google+ URL', 'woo-custom-email-blocks')} type={'url'} value={googleURL}
                                 placeholder={'https://plus.google.com/your_google+/'}
                                 onChange={(newURL) => setAttributes({googleURL: newURL})}/>
                    <TextControl label={__('Youtube URL', 'woo-custom-email-blocks')} type={'url'} value={youtubeURL}
                                 placeholder={'https://www.youtube.com/your_youtube/'}
                                 onChange={(newURL) => setAttributes({youtubeURL: newURL})}/>
                    <TextControl label={__('Pinterest URL', 'woo-custom-email-blocks')} type={'url'}
                                 value={pinterestURL}
                                 placeholder={'https://www.pinterest.com/your_pinterest/'}
                                 onChange={(newURL) => setAttributes({pinterestURL: newURL})}/>
                    <TextControl label={__('LinkedIn URL', 'woo-custom-email-blocks')} type={'url'} value={linkedInURL}
                                 placeholder={'https://www.linkedin.com/your_linkedin/'}
                                 onChange={(newURL) => setAttributes({linkedInURL: newURL})}/>
                    <TextControl label={__('Instagram URL', 'woo-custom-email-blocks')} type={'url'}
                                 value={instagramURL}
                                 placeholder={'https://www.instagram.com/your_instagram/'}
                                 onChange={(newURL) => setAttributes({instagramURL: newURL})}/>
                </PanelBody>
            </InspectorControls>,
            <div className={'wp-block-wec-socials-element'}
                 style={{padding: '10px', maxWidth: '400px', margin: 'auto'}}>
                <div style={{margin: 'auto', width: 'fit-content'}}>
                    <table style={{textAlign: 'center'}}>
                        {!(facebookURL || twitterURL || googleURL || youtubeURL || pinterestURL || linkedInURL || instagramURL) ?

                            <tr>
                                <td style={{padding: '2px'}}><img className={'wec-socials'} src={facebookIcon}/></td>
                                <td style={{padding: '2px'}}><img className={'wec-socials'} src={twitterIcon}/></td>
                                <td style={{padding: '2px'}}><img className={'wec-socials'} src={googleIcon}/></td>
                                <td style={{padding: '2px'}}><img className={'wec-socials'} src={youtubeIcon}/></td>
                                <td style={{padding: '2px'}}><img className={'wec-socials'} src={pinterestIcon}/></td>
                                <td style={{padding: '2px'}}><img className={'wec-socials'} src={linkedInIcon}/></td>
                                <td style={{padding: '2px'}}><img className={'wec-socials'} src={instagramIcon}/></td>
                            </tr>
                            :
                            <tr>
                                {facebookURL ?
                                    <td style={{padding: '2px'}}><a href={facebookURL}>
                                        <img style={{width: '100%'}} src={facebookIcon}/></a>
                                    </td> : ''}
                                {twitterURL ?
                                    <td style={{padding: '2px'}}><a href={twitterURL}>
                                        <img style={{width: '100%'}} src={twitterIcon}/></a>
                                    </td> : ''}
                                {googleURL ?
                                    <td style={{padding: '2px'}}><a href={googleURL}>
                                        <img style={{width: '100%'}} src={googleIcon}/></a></td> : ''}
                                {youtubeURL ?
                                    <td style={{padding: '2px'}}><a href={youtubeURL}>
                                        <img style={{width: '100%'}} src={youtubeIcon}/></a>
                                    </td> : ''}
                                {pinterestURL ?
                                    <td style={{padding: '2px'}}><a href={pinterestURL}>
                                        <img style={{width: '100%'}} src={pinterestIcon}/></a>
                                    </td> : ''}
                                {linkedInURL ?
                                    <td style={{padding: '2px'}}><a href={linkedInURL}>
                                        <img style={{width: '100%'}} src={linkedInIcon}/></a>
                                    </td> : ''}
                                {instagramURL ?
                                    <td style={{padding: '2px'}}><a href={instagramURL}>
                                        <img style={{width: '100%'}} src={instagramIcon}/></a>
                                    </td> : ''}
                            </tr>}
                    </table>
                </div>
            </div>
        ]);
    }
}
