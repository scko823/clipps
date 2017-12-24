import { fromEvent } from 'graphcool-lib';
import * as validator from 'validator';

async function getUser(api, email) {
    const query = `
    query getUser($email: String!) {
      User(email: $email) {
        id,
        email,
        id,
        validated,
        validationSecret
      }
    }
  `;

    const variables = {
        email
    };

    return api.request(query, variables);
}

async function validateEmailMutation(api, id) {
    const mutation = `
    mutation validateUserEmail($id: ID!){
        updateUser(id: $id, validated: true){
            id
            validated
            email
        }
    }
  `;

    const variables = {
        id
    };

    return api.request(mutation, variables).then(r => r.updateUser);
}

export default async event => {
    console.log(JSON.stringify(event));

    try {
        const graphcool = fromEvent(event);
        const api = graphcool.api('simple/v1');

        console.log(JSON.stringify(event.data));
        const { email, validationSecret } = event.data;

        if (!validator.isEmail(email)) {
            return {
                error: 'Not a valid email'
            };
        }

        // check if user exists already
        const userPayload = await getUser(api, email);
        console.log('===========User Payload');
        console.log(JSON.stringify(userPayload));
        const userExists = userPayload.User !== null;
        if (!userExists) {
            return { error: 'Email validation fail' };
        }
        const user = userPayload.User;
        const userId = user.id;
        if (user.validationSecret === validationSecret) {
            // happy path
            await validateEmailMutation(api, userId);
            return {
                data: {
                    id: userId,
                    validated: true
                }
            };
        }
        return { error: 'Email validation fail' };
    } catch (e) {
        console.log(JSON.stringify(e));
        return {
            error: 'An unexpected error occured during validate email.',
            detail: JSON.stringify(e)
        };
    }
};
