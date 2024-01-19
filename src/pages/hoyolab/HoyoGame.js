import { Hoyolab, LanguageEnum } from 'hoyoapi'
import { HoyoAPIError } from 'hoyoapi'

const hoyolab = new Hoyolab({
  cookie: 'YOUR COOKIE HERE',
  lang: LanguageEnum.ENGLISH,
})

try {
    // code that may throw an error
  } catch (error: HoyoAPIError) {
    console.error(`Error occurred: ${error.message}`)
    // handle the error
  }