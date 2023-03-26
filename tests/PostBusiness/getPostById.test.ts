import { PostBusiness } from "../../src/business/PostBusiness"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { GetPostByIdInputDTO } from "../../src/dtos/userDTO"

describe("getPostsById", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar um post pelo id", async () => {
        const input: GetPostByIdInputDTO = {
            postId: "p001",
            token: "token-mock-normal"
        }

        const response = await postBusiness.getPostById(input)
        expect(response).toHaveLength(1)
        expect(response).toContainEqual({
            id: "id-mock",
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
