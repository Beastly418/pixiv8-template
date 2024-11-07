import { GameManager } from "./managers/GameManager";

declare global {
    interface Window {
        WebFontConfig:any;
    }
}

window.WebFontConfig = {
    google: {
        families: ['Open Sans', 'Wittgenstein'],
    },

    active() {
        GameManager.init();
    },
};

/* eslint-disable */
// include the web-font loader script
(function() {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
    }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = true;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode!.insertBefore(wf, s);
}());
/* eslint-enabled */
