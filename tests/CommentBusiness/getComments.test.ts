import { CommentBusiness } from "../../src/business/CommentBusiness"
import { GetCommentsInputDTO } from "../../src/dtos/userDTO"
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"


describe("get comments by post id", () => {
    const commentBusiness = new CommentBusiness(
        new PostDatabaseMock(),
        new CommentDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar um post pelo seu id", async () => {
        const input: GetCommentsInputDTO = {
            postId: "post-id-mock",
            token: "token-mock-normal"
        }

        const response = await commentBusiness.getComments(input)
        expect(response).toContainEqual({
            id: "id-mock",
            postId: "post-id-mock",
            content: "Contéudo do post",
            likes: 1,
            dislikes: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            creator: {
                id: "creator-id-mock",
                name: "Creator Mock"
            }
        })
    })
})
