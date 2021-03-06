'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "d2d9770a7c43823d0d72b971a628e815",
"assets/assets/ashrafiabir.png": "6f79f17c66df286e056a32438f022a06",
"assets/assets/ba.png": "f2fc087245c5f68b0b44814b8a2a7f89",
"assets/assets/banner.gif": "36209dfebc0e0444a82fdd9321a91f29",
"assets/assets/banner1.png": "82d4735a5a7c7872ed1a9770b691ba6c",
"assets/assets/banner2.png": "f96e12bffb4f57887544da6b9efdede6",
"assets/assets/banner3.png": "2c51f71023823a1883d187837b374bbe",
"assets/assets/banner4.png": "1e1dc210d0d92615d83c994fabc3aa72",
"assets/assets/codecolors.PNG": "638d1120489d6dda3d1b1231bfd2a80b",
"assets/assets/dart.png": "492774934022db36bafeb49cdb18ab50",
"assets/assets/editcolors.PNG": "15fbec6636d3fab88e4e82630396e1e4",
"assets/assets/gitcard.PNG": "05533c9d9679c1ffa3ffce27728bac56",
"assets/assets/gitcolors.PNG": "bcb81239d2f891f6f27371877ffbd129",
"assets/assets/html.png": "25b694ba78065655dcee6237019aceda",
"assets/assets/js.png": "ea17445db737223599e73eb587aa0f6b",
"assets/assets/json.png": "0c64544f3438c4134d0860e607b04883",
"assets/assets/mainbranch.PNG": "b5018cc3ecbb496b0cc2b4b6e2628aef",
"assets/assets/maingit.png": "cac7321c6e8a1284715124836f803e99",
"assets/assets/markdown.png": "1a0b000881c31746ae8fa59e2e549399",
"assets/assets/messagecolors.PNG": "2738322565a2a40f848e60be588e443a",
"assets/assets/savecolors.PNG": "588ae10d3cbfbe5570c57ff8259ceb0e",
"assets/assets/vscode.png": "a78dfa30bc7f1e6e652284bdd386d0d6",
"assets/assets/vscode2.png": "02e32b44869ebfc35120740a2e41897d",
"assets/assets/vscodep.PNG": "de44e1b5b12ab69d82244e1abac4195d",
"assets/assets/windowicon.PNG": "ab4d27b7d353f2c301be6e84c3cbe560",
"assets/bc.gif": "f8a20161ee7d98c506c44cd3501698be",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/loading.gif": "c77394c24dae72ce81931e766c1476e2",
"assets/NOTICES": "2ca765d0d7d23d4ac7b372700b5b8d95",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "e79b1dc05827915501d1e97ae0fe5eec",
"/": "e79b1dc05827915501d1e97ae0fe5eec",
"main.dart.js": "167335c1669cbddb1d78d90a1d68304e",
"manifest.json": "4743e1ab11d2240a205e970090ac2d69",
"version.json": "28339f22ab561c10a8d0b0601da1c8ef",
"vscode.png": "a78dfa30bc7f1e6e652284bdd386d0d6"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
