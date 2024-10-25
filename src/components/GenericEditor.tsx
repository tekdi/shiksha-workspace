import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import $ from 'jquery';
import _ from 'lodash';
import 'izimodal/css/iziModal.css';
import 'izimodal/js/iziModal.js';
import editorConfig from './editor.config.json';
import { getLocalStoredUserData } from "@/services/LocalStorageService";

const GenericEditor: React.FC = () => {
    const router = useRouter();
    const { identifier, editorforlargecontent } = router.query;
    const [showLoader, setShowLoader] = useState(true);
    const buildNumber = '';
    const extContWhitelistedDomains = 'youtube.com,youtu.be';
    const videoMaxSize = "150";
    const defaultContentFileSize = "150";
    let isLargeFileUpload = false;
    if (editorforlargecontent) {
        isLargeFileUpload = true;
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Attach jQuery to window and window.parent
            window.$ = window.jQuery = $;
            if (window.parent) {
                window.parent.$ = window.$;
                window.parent.jQuery = window.jQuery;
            }

            console.log('editorConfig ==>', editorConfig);
            getContentDetails(identifier)
                .then((data: any) => {
                    initEditor();
                    setWindowContext(data);
                    setWindowConfig();
                    console.log('window.config ==>', window.config);
                    console.log('window.context ==>', window.context);
                    $('#genericEditor').iziModal('open');
                    setShowLoader(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    closeModal();
                });
        }
    }, [identifier]);

    const getContentDetails = async (contentId: any) => {
        if (!contentId) {
            return {}; // Return empty object if contentId is undefined
        }

        try {
            const response = await fetch(`/action/content/v3/read/${contentId}?fields=createdBy,status,mimeType,contentType,resourceType,collaborators,contentDisposition,primaryCategory,framework,targetFWIds&mode=edit`);

            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }

            const data = await response.json();
            return data.result.content;
        } catch (err: any) {
            console.error(err);
            return null;
        }
    };

    // Initialize the modal and open iframe
    const initEditor = () => {
        if (typeof window !== 'undefined') {
            $('#genericEditor').iziModal({
                title: '',
                iframe: true,
                iframeURL: `generic-editor/index.html?${buildNumber}`,
                navigateArrows: false,
                fullscreen: true,
                openFullscreen: true,
                closeOnEscape: true,
                overlayClose: false,
                overlay: false,
                history: false,
                closeButton: true,
                onClosing: () => {
                    closeModal();
                }
            });
        }
    };

    // Set window context for the iframe
    const setWindowContext = (data: any) => {
        if (typeof window !== 'undefined') {
            window['context'] = _.cloneDeep(editorConfig.GENERIC_EDITOR.WINDOW_CONTEXT);
            if (identifier) {
                window['context'].contentId = identifier;
            }
            window['context'].user.id = getLocalStoredUserData();
            window['context'].uid = getLocalStoredUserData();

            if (isLargeFileUpload || (_.get(data, 'contentDisposition') === 'online-only')) {
                window.context['uploadInfo'] = {
                    isLargeFileUpload: true
                };
            }
        }
    };

    // Set window config for the iframe
    const setWindowConfig = () => {
        if (typeof window !== 'undefined') {
            window['config'] = _.cloneDeep(editorConfig.GENERIC_EDITOR.WINDOW_CONFIG);
            window['config'].build_number = buildNumber;
            window['config'].headerLogo = 'https://staging.sunbirded.org/assets/images/sunbird_logo.png';
            window['config'].lock = {};
            window['config'].extContWhitelistedDomains = extContWhitelistedDomains;
            window['config'].enableTelemetryValidation = false;
            window['config'].videoMaxSize = videoMaxSize;
            window['config'].defaultContentFileSize = defaultContentFileSize;
            window['config'].cloudStorage = {
                provider: 'aws',
                presigned_headers: {}
            };
        }
    };

    // Function to close the modal and navigate away
    const closeModal = () => {
        setShowLoader(false);
        const editorElement = document.getElementById('genericEditor');
        if (editorElement) {
            editorElement.remove();
        }
        window.history.back();
    };

    return (
        <div>
            <div id="genericEditor"></div>
            {showLoader && <div>Loading.....</div>}
        </div>
    );

};

export default GenericEditor;
