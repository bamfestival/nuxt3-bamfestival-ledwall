export const getMediaUrl = (media) => {
    const runtimeConfig = useRuntimeConfig();
    const fetchURL = runtimeConfig.public.apiUrl + '/jsonapi/media/video/'+media+'?include=field_media_video_file';
    const { data:url } = $fetch(fetchURL)
    console.log(url)
    return fetchURL;
    }