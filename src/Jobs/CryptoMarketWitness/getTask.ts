import { getDefaultLogger } from '@xylabs/sdk-api-express-ecs'
import { XyoCryptoMarketCoinGeckoPayload, XyoCryptoMarketUniswapPayload, XyoPayloadBase } from '@xyo-network/sdk-xyo-client-js'

import { Task } from '../../Model'
import { getCryptoMarketPanel } from '../../Panels'
import { calculatePrice } from './calculatePrice'
import { getAdHocWitness } from './getAdHocPanel'

const uniswapSchema = 'network.xyo.crypto.market.uniswap'
const coingeckoSchema = 'network.xyo.crypto.market.coingecko'

const isUniswapPayload = (p: XyoPayloadBase): p is XyoCryptoMarketUniswapPayload => p.schema === uniswapSchema
const isCoingeckoPayload = (p: XyoPayloadBase): p is XyoCryptoMarketCoinGeckoPayload => p.schema === coingeckoSchema

export const getTask = (): Task => {
  const logger = getDefaultLogger()
  const task: Task = async () => {
    try {
      logger.log('Witnessing Crypto Prices')
      const result = await getCryptoMarketPanel().report()
      const uniswapPayload = result._payloads?.filter(isUniswapPayload)?.pop()
      const coingeckoPayload = result._payloads?.filter(isCoingeckoPayload)?.pop()
      logger.log('Witnessed Crypto Prices')
      logger.log('Witnessing Aggregated Crypto Prices')
      const prices = calculatePrice(uniswapPayload, coingeckoPayload)
      const panel = getAdHocWitness(prices)
      await panel.report()
      logger.log('Witnessed Aggregated Crypto Prices')
    } catch (error) {
      logger.error(error)
    }
  }
  return task
}
