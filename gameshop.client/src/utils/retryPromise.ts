export const retryUntilSuccess = async<T>
(asyncFn: () => Promise<T>, 
maxRetry = 10, 
delay = 500): Promise<T> => {
    let attempt = 0;
    while (true) {
        try {
            return await asyncFn();
        } catch (e) {
            attempt++;
            if (attempt >= maxRetry) {
                throw e;
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

