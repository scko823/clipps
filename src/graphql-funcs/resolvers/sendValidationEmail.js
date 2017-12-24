// import { fromEvent } from 'graphcool-lib';

export default async event => {
    try {
        // const graphcool = fromEvent(event);
        // const api = graphcool.api('simple/v1');

        // const { email, validationSecret } = event.data;

        return {
            data: event.data
        };
    } catch (e) {
        console.log(e);
        return {
            error: 'An unexpected error occured during send validation email.'
        };
    }
};
