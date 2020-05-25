/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","bfe0b6da04400d3fe30430a4a68a8ad3"],["/about/index.assets/p1781165485.webp","197b4267471e00113838c6c9e6f77789"],["/about/index.html","8bc5c912335f8789093962663f44dbcf"],["/archives/2020/04/index.html","158223850e38405addd9d22c91420bfd"],["/archives/2020/04/page/2/index.html","c0ddeccd6eecda19c437f7df5d3a4060"],["/archives/2020/04/page/3/index.html","d875deb2ca3ff9f3ab0b23b7b6b5d762"],["/archives/2020/05/index.html","9ca78a38eeedb08cd7f3fcdfa5245227"],["/archives/2020/05/page/2/index.html","5286fcf2d869c1c675ec47e5a969f164"],["/archives/2020/05/page/3/index.html","bf9d1ea13e6b6baaa9198a501139397c"],["/archives/2020/index.html","eaac31d0d3a7b4cec23ef065665933ef"],["/archives/2020/page/2/index.html","56effbbe0c6107c49f11669f58426f66"],["/archives/2020/page/3/index.html","d7e056c533f8d344a9b4e7709f8e0c43"],["/archives/2020/page/4/index.html","851f842a8cdf2ed6b7f45dbd01654311"],["/archives/2020/page/5/index.html","2e3efcb9bd37a7f168d5cdf947d6d183"],["/archives/index.html","8242c11f9a6604ddc84f21267a25f2ed"],["/archives/page/2/index.html","2ee7bb1ba2eccda97665b825dd740edb"],["/archives/page/3/index.html","eb26a9949c35fee0137d676f8975989f"],["/archives/page/4/index.html","f2eefd2551d65acb13c4521eb337cc1e"],["/archives/page/5/index.html","cd22535ba52cb758bf6e1c619652b270"],["/assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/assets/js/Meting.min.js","bfac0368480fd344282ec018d28f173d"],["/atom.xml","cda4aa72db549dc8ca814f8833d77b14"],["/categories/index.html","38b0f7cdda0eb892b73f239f79d2dad9"],["/categories/原创/index.html","5f9ad51b214b4b70df24c756441865b0"],["/categories/原创/page/2/index.html","6fabc0e9132e25b5f67585630f1e3dd2"],["/categories/收藏/index.html","0daf3469cd47f7ba5ea7b83bb55baea0"],["/categories/收藏/page/2/index.html","937133cf3a5c15bf8de604d03e877407"],["/categories/收藏/原创/index.html","a6f9b2800434cab99a2f627ced05c715"],["/categories/转载/index.html","a184308a1f1240f96fa53f368e8ff5d9"],["/contact/index.html","5e84f5c45016e1842a865a99fe7a989c"],["/content.json","cd61ed7c1a32ab41a59a06e1a232ade7"],["/css/blog-encrypt.css","ee21c7086a59d52b97a9e7b6240a9414"],["/css/custom.css","ccec0d45c9a0431b3e3301a14d5ed11a"],["/css/main.css","654cdef1f4c7ce55fe9d9f5c17f99a20"],["/images/icons/icon-128x128.png","fdd7e0757ab0d310a994ab0beda4dcd5"],["/images/icons/icon-144x144.png","8f0f4584e03b4d0510da9620d13ed33e"],["/images/icons/icon-152x152.png","7038b8594619e1cdb2ff96bd62e014fb"],["/images/icons/icon-192x192.png","8ca789f04d42c78761092e02667b2799"],["/images/icons/icon-384x384.png","faa994ad28e0c79ef401444d0c3ec730"],["/images/icons/icon-512x512.png","38d774f9389013fe67037a5440cf603f"],["/images/icons/icon-72x72.png","47e9a77b5bd68f2a69ef5926ad98e05c"],["/images/icons/icon-96x96.png","daba43d13a7642a3fb017b623c3dc83c"],["/images/pasted-0.png","8c68a242bd8527b515088cf55b819e5c"],["/images/pasted-1.png","7f09ef708228eadc567befc9fae63731"],["/images/pasted-2.png","6cc28bb1865d4b8c6926bd4bf69bed40"],["/images/pasted-3.png","7fcfdb46fd54d1384ca6f746c2c24553"],["/images/pasted-4.png","6b7fb6dcd017b9faef08d19d5e088980"],["/images/pasted-5.png","f7dd12aef15c8d3b68498b9878bde8f2"],["/img/1favicon.png","62d4fd1ddce50c85ab088bf84305cd21"],["/img/alipay.jpg","bdb86592099d585003bb4149beb6b373"],["/img/alipay.webp","0b07516d5d7b1c9bdd29015ef8c5a0fa"],["/img/apple-touch-icon.png","b291c7744b662c826f8b1e3fe6391c75"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/dog.png","97bd11c16b209a24f15e94869b00f08c"],["/img/donate.webp","26a6f487dab96a2917323512c2d380fe"],["/img/eh.png","ef2c0cbc44bf9476ff1307ce9c07c7a9"],["/img/favicon.png","b291c7744b662c826f8b1e3fe6391c75"],["/img/gy.jpg","22d29b1acad945058ebccd752d158704"],["/img/gy.webp","aa0af89dd9f20eba8caabaed79fa272d"],["/img/hejiu.png","d2d1998522e0e8d142aa9813c685c1e1"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/lyf.webp","56cad45a5466c25eb6288a09e201f73d"],["/img/lyf0.webp","c8412fb659f3c79511b75c85aa8e55bd"],["/img/lyf2.webp","878145456ce17db3a4b33c97e0a62c61"],["/img/lyf3.jpg","1cfa7e68faa202cb6264cb83f719cd5f"],["/img/lyf3.webp","de05388dd5ff917a49294a9a94727382"],["/img/lyf4.jpg","b8f0854e478c602b6c35d5df38cd2bc7"],["/img/nb.png","14dfcd25b22361cd6241b3a8f66bf144"],["/img/pj.png","7e2f05690052110ee3f4766f6ad89d52"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/img/wechat.png","a2eb1952fba0138f2a5bfe157bc2456c"],["/img/wechat.webp","4e1b9a7dbac50326473e775fec0f1abd"],["/img/wxtx.png","bd8d8f8a8d32d275f5c32aab6aa14e73"],["/img/wxtx.webp","1be2eb1d74c41277f271307e1b3b9bd8"],["/img/wxtx1.webp","d11fb1b9763fbfdcd39b504b5f03c24a"],["/img/zsm.webp","fce59cea3ec2af6f9cf85f2ad7324774"],["/img/zsm_resized.webp","26464fb0a735eb6c611f27333ce468f1"],["/img/兔子.png","a80e5eca2d4caebaa01b69638cc8b443"],["/index.html","31a7568d34484e90a9ce77f4e0bc63ab"],["/js/canvas-nest.mini.js","9ec8a560d500fb6f74802331091c09f9"],["/js/clipboard-use.js","bd6a376bb3a3f3a7348a06a0b6cfc399"],["/js/lazyload.js","b4c2ec92b36570d9af5d34a65d2ad530"],["/js/local-search.js","e9093657a10085d74435b313a4b8c557"],["/js/main.js","01921fdfcf15217952a4cd9e976cfbfd"],["/js/tagcanvas.js","222f58419252597da4e4b17828824a8f"],["/js/tagcloud.js","b0e4d5eb42968ddde11dacc994c3d6a9"],["/lib/blog-encrypt.js","f1c932790ec55934e04634fd752a3d8e"],["/links/index.html","58230f692519e73b20d991de49d71a42"],["/local-search.xml","7e4c9104806d5edec531833c938fb850"],["/manifest.json","b083e53d3824b4caf3050c8b414d01d0"],["/messageboard/index.html","652af1711a3c6e921bfd51f6979e0575"],["/page/2/index.html","6880d95925b034a28d35c7b8c67a137a"],["/page/3/index.html","a5d9174e027e5b10c123b64e126f58f0"],["/page/4/index.html","125c6631c59519b41b1cbe3723b20b75"],["/page/5/index.html","9a6ed93e18b4fea8a273d0f3410b9bf7"],["/page/6/index.html","97c2bd60397598ed7c2baf27ee3492f5"],["/page/7/index.html","1ee229075eed63a19c0da47bdce99b22"],["/posts/11481.html","f733ddf50c96928c35730d653529765d"],["/posts/11503.html","62684357f1034678c2d89d15257e9cbc"],["/posts/11753.html","c85ae01d8f7e50072d30ed2d08f76a4c"],["/posts/12720.html","1dda67282d491586a5c2071a1f502ab9"],["/posts/12835.html","300704a959c283a650899ba3c39c6b25"],["/posts/12908.html","37c5e9b86aa44df821611cae5a25338f"],["/posts/13113.html","52d31ed2da95c9484ae2937472c082b9"],["/posts/13755.html","0a2ec3a284e997c72e5abb79475ebd04"],["/posts/14367.html","a42bc3e520f771f91ef9b0a9631798a2"],["/posts/1472.html","0668090f7436379815fe01f91855f224"],["/posts/14751.html","d1c9614e958f518b1abb76a240a95ac6"],["/posts/1478.html","6b992ed084ae72c5bfc69daa93248c41"],["/posts/15656.html","dfdaae69b3a98c9ab9796f13e9c322db"],["/posts/16408.html","ef1e22d458e4786d43ec093e399b9f3e"],["/posts/17243.html","171a17992f4c633d1f828067af4af7d1"],["/posts/17328.html","e06a65892152b0cc25475ed2a12b23fd"],["/posts/1862.html","2afcc79cbc3318d282cd97eb2cd6910a"],["/posts/19229.html","1a740b7ba3cdb04d07200b80f0330209"],["/posts/19963.html","0341cb04592bb7b72e3ab084698811b3"],["/posts/2086.html","353951139dbbc28b6291a1ff693abd70"],["/posts/21420.html","94ca3c3092e11ed12393e2cb6675b04e"],["/posts/21979.html","1f885df2941ed8bf2630834e2785cef6"],["/posts/22389.html","79b4c2e94fae58268fe62799443c8a21"],["/posts/23700.html","2aef50ae24f00d39d53924cd247178d3"],["/posts/23956.html","c0782609c8c3a43fb2e6e6f615abbdd3"],["/posts/24299.html","8157d25c458c61a5d1f1d69dd4032e9f"],["/posts/25351.html","372198efd77f6104a5d6fdeb7c6f9f2b"],["/posts/27208.html","4814dad005dbe7526854e836a9b11000"],["/posts/27341.html","85caea94fd3a47bc57a125194b0b27fd"],["/posts/27487.html","4c9c082db33205f1760b4cf2b8168d2c"],["/posts/28684.html","11233aeb9c6408125ead7499d5bc02b9"],["/posts/29894.html","19a98bc4a9ee5e58fab518809378fdca"],["/posts/30685.html","dbcd93053e1fc4744418306eb6d800c9"],["/posts/30756.html","de36cc6c4110aa2298b75b5a700bac0b"],["/posts/30773.html","dd54d504897e694acf138c6c25f3e88a"],["/posts/30858.html","2784cbdb147065011a7dfa2cef4c2b89"],["/posts/31289.html","de0e6245d4def9fa1e722c3ff178001e"],["/posts/33265.html","7df9b75292fbe441fb7c45cb4e27a10c"],["/posts/33329.html","9be887dd016fd6d9ba72ee1c409efa19"],["/posts/33649.html","7034a0a23c2b3de98e36b3e716f42838"],["/posts/34874.html","8568952888001c453bcdbcbc829f56f6"],["/posts/34972.html","eacfb6fca2c67a939372cacebe40d513"],["/posts/35226.html","f1b35e0bac2ec16809ae3577503a399e"],["/posts/35514.html","d723c7c1c4c98ab0a720c5878c5b1959"],["/posts/35787.html","19b9a46b3572ef44b7210485b58336c5"],["/posts/35864.html","9d6ab94de3a180e3765946402abe5e2c"],["/posts/37175.html","ffd0d5b32b8999995e0bdd9262ca8e99"],["/posts/37473.html","8f8bc7f9a6ee3bc334c6e197672092c6"],["/posts/38234.html","b6ae7cb80d375b60a66907dcb86b4285"],["/posts/39717.html","37057685df8c8ecc062a353f9501b807"],["/posts/40720.html","70f9f4e6502e468ae396f1c96752c914"],["/posts/41000.html","a0543905928a6d1d94f0f01bf1ac693e"],["/posts/41357.html","ed0e4329bf5bf16a071790cf27e356ef"],["/posts/42114.html","be244aa5a618ab08b9203ea22abf2b65"],["/posts/43961.html","2f0c3b3d395659cf144b5be935ac34d8"],["/posts/45521.html","3426bedb86c6ec13f1d2104a634c38e7"],["/posts/46255.html","13eb7c98fbc906d10b720fc8aa4fd5bc"],["/posts/46873.html","6dbe9dc0e60069259b1efa3e76959d2b"],["/posts/47881.html","7acdf9a046df3cf3448f7503765438da"],["/posts/48063.html","76e4767b9d05da766b0c7a6528b77fb9"],["/posts/48104.html","bae5df4a80e6336daa17b03be3a74a6f"],["/posts/48120.html","ead4d4cf872f1ecd97bbabc7fddf9064"],["/posts/48183.html","3fbce69230b96031a0015c1c2c02a507"],["/posts/48703.html","d6d2a1f7122b3f288d33d6351148247e"],["/posts/49442.html","f32b9e2a5e5b9d48af7047b177019c2f"],["/posts/4985.html","29c39f79bff6560730740636150f4701"],["/posts/49990.html","0f8868dbd440300fa97b8fd922477ca2"],["/posts/50972.html","744966a0ff7cca1b5c44d9c9565c69ed"],["/posts/51493.html","ca03b1920f7323205a39aee03c6c6342"],["/posts/51590.html","3825e892676e53cf6ac7d3c0b2e5126b"],["/posts/51966.html","d1a4a292eb8910a92e8b79891d7a7405"],["/posts/52581.html","4ce8a646674f65a3693f186773c602e0"],["/posts/52632.html","a19632a3b0476502e5d7ea26e7ec4e35"],["/posts/54954.html","d8f7d099b462b37daf50d1d64b1e6ae4"],["/posts/55257.html","783021c49fd4abf411d435931e79717e"],["/posts/57540.html","b67c867de2021c958f2c0bd6a237525e"],["/posts/58413.html","390f7e3c5be98fce0b586d8aec6db0fb"],["/posts/59836.html","fe6b8d6142fb5ed794a8556805f5cbcd"],["/posts/60555.html","2ec5be48616de2bd75ad26b12b08aad2"],["/posts/62386.html","0d9060aba4e561319fb5e7102c75b0d7"],["/posts/62503.html","9ed708874f749d4ebb132bafd49ef3c1"],["/posts/62840.html","011e37cc9d5b96bc51520ece42aa5ded"],["/posts/63355.html","e3925eefcf760ef33a177b787ffba0ec"],["/posts/63700.html","b74e2c83dd499bf8d31fc83741365c76"],["/posts/63794.html","112a07198b700dfcaad03a56cd6f9007"],["/posts/64918.html","ee5c4879498674c47f1e6987c613c595"],["/search.xml","de16d262289d0d423f80c8f7b5a8bccc"],["/sitemap.xml","99e5d7119caee92a2b5add53a8d116f4"],["/tags/Fusion/index.html","ad2d73d39a3f4ce10ed5bae76da411ea"],["/tags/Havoc/index.html","198b20767f9a84aace91513569366ec1"],["/tags/PS/index.html","0be136b796294f30626270e0c1f56309"],["/tags/Typora/index.html","10d80c6246c1d5e3095c1084b643bc92"],["/tags/Windows/index.html","e484e97283ae17acd4171da98ace5796"],["/tags/app/index.html","4a7c41800368c0fa8ffacd0b11b380d7"],["/tags/chrome/index.html","1dfc6e3face9459022d7272f074a01e3"],["/tags/hexo/index.html","366f152787a19abd5f538cd3309627c2"],["/tags/index.html","20cabcab2153a1d43834250cadba5077"],["/tags/substratum/index.html","55d4eb33355bd2ae53e42b2a6c2a5246"],["/tags/xp模块/index.html","6e9ff6ef12f342eb92c17804efe63667"],["/tags/下载/index.html","4b44c9eca0c6bda3c090ffcdd19f09f8"],["/tags/云盘/index.html","48b4d370a8a4964d4c3b4927764d4a57"],["/tags/刷机/index.html","3698b4125b612b18cce0a780b0a1a275"],["/tags/勇气/index.html","7cc71b54bab53a20225ef14ad0e3d91d"],["/tags/友情/index.html","aeea05aa52d7afef302206b1692bcce4"],["/tags/古文/index.html","4d1cadbffd69db0e658bff03ca1a2c9d"],["/tags/台词/index.html","7306a091d88e173690fcc3bf9d32822a"],["/tags/名词解释/index.html","85710935f006ce096beaa14521b9b490"],["/tags/哲学/index.html","a1e975fc50bc6b4fb97e8c062e2a91a5"],["/tags/图床/index.html","c51ef074eec0804e9c68c9de60a72ef7"],["/tags/图片处理/index.html","0e329ceace7d542e0f4ba5db1482053b"],["/tags/头皮发麻/index.html","dca059901e99dabe0976b39999343c70"],["/tags/好图/index.html","e850fe1b9e04df0a2085f0072edaf89e"],["/tags/工具/index.html","ee8e8b3b735d7e9da65b39a7bde8cc68"],["/tags/幻觉/index.html","bdc4a86403d6ddaece2f7aadcda2bbb2"],["/tags/影视截图/index.html","6decda2333ebe9a5f9f835c6bd9c4266"],["/tags/战争-和平/index.html","6026ee8e855f7c370a4a733ab0a39fb3"],["/tags/技巧/index.html","baf47a7d21519e918522462ffd1b7a80"],["/tags/拾人牙慧/index.html","086b9681abcfe53c7cfa579e4f5847d4"],["/tags/搜索/index.html","869d5098b294a290e14edf545e87aed2"],["/tags/故事/index.html","6d2ccf03d00e5366d85742f689764121"],["/tags/教程/index.html","87a86c852db5f4fadf58a7daa74b7025"],["/tags/教育/index.html","4d11a34a5c399b866d4041dbe57c87a2"],["/tags/智慧/index.html","6037005cb4cf5fe3ba3d5329456c3095"],["/tags/梦/index.html","7c87110b8abec11891f75409a405e695"],["/tags/毛/index.html","1b8179b850a6178c0ce00a09405c3b4c"],["/tags/爱因斯坦/index.html","a6ef5c4837f8b55e3db9cf1dd975ffde"],["/tags/爱情/index.html","c0739477c0f3abc0e4ce9e0a38a05884"],["/tags/物理/index.html","2fd644185d31ff5307890fc9e78ece24"],["/tags/白嫖/index.html","bdf6293b9743132830210c6574afba2f"],["/tags/矫情/index.html","082df3b577f7143fe0cbc3c9ca78fad7"],["/tags/神雕侠侣/index.html","02be07c5fa5eb134dcc6a36b03ddf7e5"],["/tags/笑话/index.html","aa449e9e3866e2772bf42aa429166edf"],["/tags/絮絮念/index.html","e6b54a8abc44c9e96b6ce6c412d02169"],["/tags/美/index.html","21e959220c8521c7d881eba927f76696"],["/tags/美化/index.html","f5ae6418737b9b50e27b8c2183a14165"],["/tags/自勉/index.html","2e648e48e4c9fe45763b8bd8b870fb95"],["/tags/记录/index.html","6a1e87aa459b80f58994598a74f0493d"],["/tags/讽刺/index.html","9ce626072b2fcedae341754c261dc03c"],["/tags/诗/index.html","69d48326aae4135d79188abbbe11b1f1"],["/tags/资源/index.html","3fcaa4fd3275883df67fc2c3f7830319"],["/tags/道/index.html","e6fead0253a6daa19eab70c8ebd01444"],["/tags/金庸/index.html","de73c017bcfde0dbcb1bf37c65c09877"],["/tags/问题-解决/index.html","e6b7ff90ca4d9ab185cb15ff41670465"],["/tags/问题/index.html","3c465c6321bcb1ac66d260ba9c940754"],["/tags/音乐/index.html","0021fcd4196e257a5692c5964f88b6fc"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdnjs.cloudflare.com"});




