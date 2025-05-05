const external_urls_that_need_to_use_no_cors = ["https://static.cloudflareinsights.com/beacon.min.js"];
const external_urls_that_do_not_need_to_use_no_cors = ["https://cloudflareinsights.com/cdn-cgi/rum"]

self.addEventListener("fetch", (e)=>{

    e.respondWith(
        (async ()=>{
            if (e.request.method!=="GET"){
                const response = await fetch(e.request);
                return response;
            }

            if (external_urls_that_do_not_need_to_use_no_cors.includes(e.request.url)){
                const response = await fetch(e.request);
                return response;
            }

            if (external_urls_that_need_to_use_no_cors.includes(e.request.url)){
                const response = await fetch(e.request, {mode:"no-cors"});
                return response;
            }

            const responseFromNetwork = (async()=>{
                try{
                    const response = await fetch(e.request);
                    if (response.ok){
                        const cache = await caches.open("cache");
                        await cache.put(e.request, response.clone());
                    }
                    return response;
                } catch(error){
                    return undefined;
                }
            })();

            return await caches.match(e.request) || await responseFromNetwork;
        }
    )(),
    );
});