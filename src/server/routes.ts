
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import { api } from './models';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

export function registerRoutes(app: Koa) {

    const router = new KoaRouter();

    const schema = api.getGraphQLSchema();
    router.post('/graphql', graphqlKoa({ schema: schema }));
    router.get('/graphql', graphqlKoa({ schema: schema }));
    router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

    app.use(router.routes());
    app.use(router.allowedMethods());

}
