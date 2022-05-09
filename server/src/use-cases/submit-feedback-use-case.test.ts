import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const createSendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: createSendMailSpy }
)
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64_example_image'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(createSendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit a without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64_example_image'
        })).rejects.toThrow()
    })

    it('should not be able to submit a without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'example type',
            comment: '',
            screenshot: 'data:image/png;base64_example_image'
        })).rejects.toThrow()
    })

    it('should not be able to submit a invalid image', async () => {
        await expect(submitFeedback.execute({
            type: 'example type',
            comment: 'example comment',
            screenshot: 'image.png'
        })).rejects.toThrow()
    })
    

})