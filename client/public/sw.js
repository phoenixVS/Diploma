if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise((async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},s=(s,c)=>{Promise.all(s.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(s)};self.define=(s,n,r)=>{c[s]||(c[s]=Promise.resolve().then((()=>{let c={};const a={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return c;case"module":return a;default:return e(s)}}))).then((e=>{const s=r(...e);return c.default||(c.default=s),c}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/16.1d4073582883290dc713.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/17.32f056aa08fc67ee25c6.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/286df04bf771432da5fc3783c003d18834d5e3fa.b173290ead1647894fc4.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/30.e91df7a5369eb22f6d02.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/31.c8a6d533ce96c2635062.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/32.509fbf9a14daaa713999.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/33.090f977b3c29f44bf9e6.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/5cece009dcde465b1d65c914f4253d107f9dfa92.05b78211d312e116e25d.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/66ba52e52f961f1df755762c77de9050233a2030.db2e217879a73b7f0dba.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/7479380b.32da8a96607e6ab94e02.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/765ab80717a65dd4977e5b723606198f74c11994.36779ca42f9f1170748a.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/905bffb6faa8abd2526eaaa7d213486b9a39a30d.f14cb5de4bdde1f11141.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/acafbb0ebd0febd1f776b88cc9fde9f0e793d9bb.5bc2e10242edb785edb2.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/b3fc7d1b1a313958c229678504119306bdd49337.5c37039a684778345c60.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/c6901fdfb1dd23f17c64ad3a864e2f4ac7ef579f.77176831e6e7e8cd0d3d.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.5f0cd70cceb5047e19d9.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/commons.ed7ccc6c531e08b7843e.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/df3ad41d27bd5f92936bd8459c18782680fce601.d64c49a1c962498ea69c.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/e29ac2eebcfdfc2a1b4338064a0ec7d5924c129c.acd83fcbf9787eaf09c4.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/fe6d3210bbc3977929e01df61c4b5f7d38cc5106.102ec3d06c4873491255.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/main-3a32e3d3a1e4d87bd95b.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/_app-aa8e58c07f941b2e46fb.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/_error-8c5a503e0acf29451c00.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/blog-6166bc98cae01f724e5d.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/blog/post/%5Burl%5D-cdd3278cafcd86e2ec19.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/c/create-team-21d107232ace444facb1.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/c/dashboard-5c9601f33fdceed929c5.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/c/posts-8b63354505a7b6506632.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/c/subscription-6b5a07aee5e9a45cf8b2.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/index-337d01979ae6d409020e.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/pages/test-b15dd03f085a9235459e.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/polyfills-8ea62713cb036fff36fa.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/chunks/webpack-f08eb04cf9c205d8f703.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/css/6c15a9b5deca1f7adac0.css",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/css/d408779a74f60e3f1b04.css",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/re_ZLbruVq_kScyHYny9h/_buildManifest.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/_next/static/re_ZLbruVq_kScyHYny9h/_ssgManifest.js",revision:"re_ZLbruVq_kScyHYny9h"},{url:"/favicon.ico",revision:"e3fb9c3b5667dd55c707db25f521f986"},{url:"/icons/apple-icon.png",revision:"d02a2fc0770679bb2fc70da30fadaf00"},{url:"/icons/icon-128x128.png",revision:"edb07d01690244e37a53f85a0ea707fe"},{url:"/icons/icon-144x144.png",revision:"fc27c94809aaf27496ed9cf84d8484ff"},{url:"/icons/icon-152x152.png",revision:"4d004450f26a310061c24c6fdc9174ff"},{url:"/icons/icon-16x16.png",revision:"362f9d954aac9bf7e72b33bba3ddf3a8"},{url:"/icons/icon-192x192.png",revision:"d02a2fc0770679bb2fc70da30fadaf00"},{url:"/icons/icon-32x32.png",revision:"5258761fd1eae7500de0b3b318b17c4c"},{url:"/icons/icon-384x384.png",revision:"7c33002b992f484ca41fd71d076c9be8"},{url:"/icons/icon-512x512.png",revision:"7221a3204042e5cc34b4d281fe1d4122"},{url:"/icons/icon-72x72.png",revision:"308b283b2016335dde00e2569579520b"},{url:"/icons/icon-96x96.png",revision:"49559923e1e5d9978efcf42b5b4919d8"},{url:"/images/logged_in/image1.jpg",revision:"e69e6026a423d9ec529b57455907b2b1"},{url:"/images/logged_in/image10.jpg",revision:"8bb0c1c3f829049e059c5af0d0417f64"},{url:"/images/logged_in/image2.jpg",revision:"1191dc67c78553a89fe1d8f7c671fdfe"},{url:"/images/logged_in/image3.jpg",revision:"bda67d264e2b4b06614c31670c6a8948"},{url:"/images/logged_in/image4.jpg",revision:"79ebeb1fee81de72e553c9b30632711e"},{url:"/images/logged_in/image5.jpg",revision:"39a17f69e21b46e0cecbf738282960b6"},{url:"/images/logged_in/image6.jpg",revision:"8b868e181cca8220ca5e725a1f7b984d"},{url:"/images/logged_in/image7.jpg",revision:"e052cbd6b2db7efc7de674d3047c998c"},{url:"/images/logged_in/image8.jpg",revision:"b23293625f3b70e68020633ce1427566"},{url:"/images/logged_in/image9.jpg",revision:"b43804d383d9ba29df937e93cca4f1c1"},{url:"/images/logged_in/profilePicture.jpg",revision:"3068bc41f0dff0fc6b48442dad234a06"},{url:"/images/logged_out/blogPost1.jpg",revision:"2b466f14430eac13337c9452ff05635c"},{url:"/images/logged_out/blogPost2.jpg",revision:"f574380de5938344b4dafe04d833270f"},{url:"/images/logged_out/blogPost3.jpg",revision:"8d115020e50d1cdeeb160b7a2f3a88fb"},{url:"/images/logged_out/blogPost4.jpg",revision:"29e641ea808c1389ddc7973e7e6b37c8"},{url:"/images/logged_out/blogPost5.jpg",revision:"eed51f556c7b96ada363087472035509"},{url:"/images/logged_out/blogPost6.jpg",revision:"070efa17c85068a75cf78b4e6874a570"},{url:"/images/logged_out/headerImage.jpg",revision:"863c192b97b0ba7fb245afd8b6c11cb6"},{url:"/images/logged_out/hero.jpg",revision:"7406fcaef146396f2574e66198c5733b"},{url:"/images/logged_out/hero2.jpg",revision:"30a744519354197e1020adc3492dd4b8"},{url:"/locales/en/blog.json",revision:"f3893bab65205ab5b231f71864ce39fb"},{url:"/locales/en/common.json",revision:"ead0aca4084e23fb3cb33bc75e38e761"},{url:"/locales/en/dashboard.json",revision:"ff998968ecb3a2171a7892550de700dd"},{url:"/locales/en/home.json",revision:"0a8dfc0a51acd0c14f73198fc1b04825"},{url:"/locales/en/posts.json",revision:"105fade7f28ea4e0d3825f347086d87f"},{url:"/locales/ua/blog.json",revision:"17468ef1ce50b12ffb769969e555ca11"},{url:"/locales/ua/common.json",revision:"dcf12e33d42f44d8191645bd525a6da3"},{url:"/locales/ua/dashboard.json",revision:"70c4aed9c2b95ae628194405d0795655"},{url:"/locales/ua/home.json",revision:"2ca157499b725c59a479a4f06833d221"},{url:"/locales/ua/posts.json",revision:"22027fe2ba870a1fc76329bca9e1ec3e"},{url:"/manifest.json",revision:"22a3ff7a8d6636335a94767035cfaeb3"},{url:"/robots.txt",revision:"5e0bd1c281a62a380d7a948085bfe2d1"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
