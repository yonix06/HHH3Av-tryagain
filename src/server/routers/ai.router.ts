import { DateHelper } from '@/core/helpers/date'
import { FileHelper } from '@/core/helpers/file'
import { Trpc } from '@/core/trpc/server'
import { TRPCError } from '@trpc/server'
import axios from 'axios'
import { z } from 'zod'
import { OpenaiService } from '../libraries/openai'
import { UploadFileType, UploadService } from '../libraries/upload'

/**
 * @provider AiApi
 * @description An AI library to query OpenAI
 * @function {({ prompt: string }) => Promise<{ answer: string}>} generateText - Send the prompt to OpenAI and get back its answer
 * @function {({ prompt: string }) => Promise<{ url: string }>} generateImage - Send the prompt to OpenAI to generate an Image and get back the URL of the image in the answer
 * @function {({ url: string }) => Promise<{ translation: string }>} audioToText - Send the readStream of an audio file to OpenAI to transcribe it into text and get back the text in the answer
 * @function {({ text: string } => Promise<{ url: string }>} textToAudio - Send the text to OpenAI to convert it into an mp3 file and get back the url of the audio file
 * @usage `const generateText = Api.ai.generateText.useMutation(); generateText.mutateAsync({ prompt: 'How are you?' }).then(response => response.answer);`
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */
const check = () => {
  if (!OpenaiService.isActive()) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Set SERVER_OPENAI_API_KEY in your .env to activate OpenAI',
    })
  }
}

export const AiRouter = Trpc.createRouter({
  addLanguage: Trpc.procedure
    .input(z.object({ languageCode: z.string() }))
    .mutation(async ({ input }) => {
      // Implementation for adding a language
      // This is a placeholder and should be replaced with actual logic
      return { success: true, message: `Language ${input.languageCode} added` }
    }),

  editLanguage: Trpc.procedure
    .input(z.object({ oldLanguageCode: z.string(), newLanguageCode: z.string() }))
    .mutation(async ({ input }) => {
      // Implementation for editing a language
      // This is a placeholder and should be replaced with actual logic
      return { success: true, message: `Language ${input.oldLanguageCode} updated to ${input.newLanguageCode}` }
    }),

  removeLanguage: Trpc.procedure
    .input(z.object({ languageCode: z.string() }))
    .mutation(async ({ input }) => {
      // Implementation for removing a language
      // This is a placeholder and should be replaced with actual logic
      return { success: true, message: `Language ${input.languageCode} removed` }
    }),

  updateUserLanguagePreference: Trpc.procedure
    .input(z.object({ userId: z.string(), languageCode: z.string() }))
    .mutation(async ({ input }) => {
      // Implementation for updating user language preference
      // This is a placeholder and should be replaced with actual logic
      return { success: true, message: `User ${input.userId} language preference updated to ${input.languageCode}` }
    }),

  generateText: Trpc.procedure
    .input(
      z.object({
        prompt: z.string(),
        attachmentUrls: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { prompt, attachmentUrls } = input
      check()

      const answer = await OpenaiService.generateText({
        prompt,
        attachmentUrls,
      })

      return { answer }
    }),

  /**
   * ? The schema in this function is an example. You should update it to your use-case.
   * ? If you need multiple schemas, you can create one dedicated function for each.
   */
  generateJson: Trpc.procedure
    .input(
      z.object({
        instruction: z.string(),
        content: z.string(),
        attachmentUrls: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const schema = z.object({
        results: z.array(
          z.object({
            description: z.string(),
          }),
        ),
      })

      const json = await OpenaiService.generateJson(
        input.instruction,
        input.content,
        schema,
        input.attachmentUrls,
      )

      return json
    }),

  generateImage: Trpc.procedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      check()

      const url = await OpenaiService.generateImage(input.prompt)

      return { url }
    }),

  audioToText: Trpc.procedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      check()

      const arrayBuffer = await axios
        .get<ArrayBuffer>(input.url, { responseType: 'arraybuffer' })
        .then(response => response.data)

      const readstream = await FileHelper.createReadStreamFromArrayBuffer(
        arrayBuffer,
        'audio.wav',
      )

      const translation = await OpenaiService.fromAudioToText(readstream)

      return { translation }
    }),

  textToAudio: Trpc.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      check()

      const buffer = await OpenaiService.fromTextToAudio(input.text)

      const now = DateHelper.getNow()

      const name = `${now.getTime()}__text-to-audio.mp3`

      const file: UploadFileType = {
        name,
        mimetype: 'audio/mp3',
        buffer,
      }

      const urls = await UploadService.uploadPublic(file)

      const url = urls[0].url

      return { url }
    }),
})
