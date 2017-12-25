import { fromEvent } from 'graphcool-lib';
import { email as sendemail } from 'sendemail';

async function getUser(api, email) {
    const query = `
    query getUser($email: String!) {
      User(email: $email) {
        id
        validated
        validationSecret
      }
    }
  `;

    const variables = {
        email
    };

    return api.request(query, variables);
}

export default async event => {
    try {
        console.log('inside try block \n');
        sendemail.set_template_directory('../email-templates');
        const { email } = event.data;

        const graphcool = fromEvent(event);
        const api = graphcool.api('simple/v1');

        console.log('about to get user');
        const user = await getUser(api, email).then(r => r.User);
        console.log(`got user ${JSON.stringify(user)}\n`);
        if (user.validated) {
            return {
                data: event.data
            };
        }
        const emailOpts = {
            user_email: email,
            validation_secert: user.validationSecret,
            email: 'sko.axway.1@gmail.com',
            subject: 'Welcome to Clipps'
        };
        console.log('about to send email');
        const sendEmailPromise = new Promise((resolve, reject) => {
            email('emailValidation', emailOpts, (error, result) => {
                console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
                console.log(JSON.stringify(result));
                console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
        console.log('got sendEmailPromise');

        const result = await sendEmailPromise;
        console.log('====================result:');
        console.log(JSON.stringify(result));
        return {
            data: event.data
        };
    } catch (e) {
        console.log(JSON.stringify(e));
        return {
            error: 'An unexpected error occured during send validation email.'
        };
    }
};
