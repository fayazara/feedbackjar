export const useHelper = () => {
    const getBrowser = (event: any) => {
       const { headers } = event.req;
       return headers['user-agent'];
    };

    return {
        getBrowser
    }
}
