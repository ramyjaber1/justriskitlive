export interface Post{
    _id:string;
    title:string;
    publishedAt:string
    description:string;
    comments:Comment[]
    author:{
        name:string;
        image:string;
        slug:{
            current:string
        }
    }
    mainImage:{
        asset:{
            url:string
        }
    }
    slug:{
        current:string,
    }
    body:[object]

}

export interface Comment {
    approved:boolean;
    comment:string;
    email:string;
    name:string;
    post:{
        _ref:string;
        _type:string;
    }
    _createdAt:string;
    _id:string;
    _rev:string;
    _type:string;
    _updatedAt:string;
}

export interface Author {
    name:string,
    bio:any,
    image:{
        asset:{
            url:string
        }
    }
    posts:[Post]
}