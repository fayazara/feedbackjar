export const useHelper = () => {
    const getBrowser = (event: any) => {
       const { headers } = event;
       return headers['User-Agent'];
    };

    return {
        getBrowser
    }
}
