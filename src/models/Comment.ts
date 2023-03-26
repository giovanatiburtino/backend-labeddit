import { CommentDB, CommentModel } from "../types"

export class Comment {
    constructor(
        private id: string,
        private postId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string,
    ){}

    public getId():string{
        return this.id 
    }

    public setId(newId: string):void{
        this.id = newId
    }

    public getPostId(): string{
        return this.postId
    }

    public setPostId(value: string): void{
        this.postId = value
    }

    public getCreatorId(): string{
        return this.creatorId
    }

    public setCreatorId(value: string): void{
        this.creatorId = value
    }

    public getContent(): string{
        return this.content
    }

    public setContent(value: string): void{
        this.content = value
    }

    public getLikes(): number{
        return this.likes
    }

    public setLikes(value: number): void{
        this.likes = value
    }

    public addLike(){
        this.likes += 1
    }

    public removeLike(){
        this.likes -= 1
    }

    public getDislikes(): number{
        return this.dislikes
    }

    public addDislike(){
        this.dislikes += 1
    }

    public removeDislike(){
        this.dislikes -= 1
    }

    public setDislikes(value: number): void{
        this.dislikes = value
    }

    public getCreatedAt(): string{
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string{
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void{
        this.updatedAt = value
    }
    

    public toDBModel(): CommentDB{
        return {
            id: this.id,
            post_id: this.postId,
            user_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): CommentModel{
        return {
            id: this.id,
            postId: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }
}

