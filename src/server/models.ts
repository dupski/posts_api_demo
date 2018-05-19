import * as rev from 'rev-models';
import { ModelApiManager } from 'rev-api';

export class User {
    @rev.AutoNumberField({ primaryKey: true })
        id: number;
    @rev.EmailField()
        email: string;
    @rev.TextField()
        full_name: string;
    @rev.RelatedModelList({ model: 'Post', field: 'user' })
        posts: Post[];

    constructor(data?: Partial<User>) {
        Object.assign(this, data);
    }
}

export class Post {
    @rev.AutoNumberField({ primaryKey: true })
        id: number;
    @rev.DateField()
        post_date: string;
    @rev.TextField({ multiLine: true, maxLength: 2000 })
        body: string;
    @rev.RelatedModel({ model: 'User', label: 'Author' })
        user: User;

    constructor(data?: Partial<Post>) {
        Object.assign(this, data);
    }

    validate(ctx: rev.IValidationContext) {
        if (this.body.includes('fake news')) {
            ctx.result.addFieldError('body', 'Post must not include fake news!');
        }
    }
}

export class Comment {
    @rev.AutoNumberField({ primaryKey: true })
        id: number;
    @rev.DateField()
        comment_date: string;
    @rev.TextField({ multiLine: true, maxLength: 500 })
        comment: string;
    @rev.RelatedModel({ model: 'User', label: 'Author' })
        user: User;

    constructor(data?: Partial<Comment>) {
        Object.assign(this, data);
    }
}

export const modelManager = new rev.ModelManager();
modelManager.registerBackend('default', new rev.InMemoryBackend())
modelManager.register(User);
modelManager.register(Post);
modelManager.register(Comment);

export const api = new ModelApiManager(modelManager);
api.register(User, { operations: ['read'] })
api.register(Post, { operations: ['read', 'create', 'update', 'remove'] })
api.register(Comment, { operations: ['read', 'create', 'update', 'remove'] })
